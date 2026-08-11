import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";

const port = Number.parseInt(process.env.PORT ?? "4331", 10);
const host = process.env.HOST ?? "127.0.0.1";
const distDirectory = resolve(process.cwd(), "dist");
const notFoundFile = resolve(distDirectory, "404.html");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

const existsAsFile = async (path) => {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
};

const resolveRequest = async (pathname) => {
  const decoded = decodeURIComponent(pathname);
  const relative = decoded.replace(/^\/+/, "");
  const direct = resolve(distDirectory, relative);
  const insideDist = direct === distDirectory || direct.startsWith(`${distDirectory}${sep}`);
  if (!insideDist) return null;

  const candidates = decoded.endsWith("/")
    ? [resolve(direct, "index.html")]
    : [direct, resolve(direct, "index.html")];

  for (const candidate of candidates) {
    if (await existsAsFile(candidate)) return candidate;
  }
  return null;
};

const server = createServer(async (request, response) => {
  const method = request.method ?? "GET";
  if (!["GET", "HEAD"].includes(method)) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  try {
    const pathname = new URL(request.url ?? "/", `http://${host}:${port}`).pathname;
    const requestedFile = await resolveRequest(pathname);
    const filePath = requestedFile ?? notFoundFile;
    const statusCode = requestedFile ? 200 : 404;
    const contentType = contentTypes[extname(filePath).toLowerCase()] ?? "application/octet-stream";
    response.writeHead(statusCode, {
      "Cache-Control": "no-store",
      "Content-Type": contentType,
      "X-Content-Type-Options": "nosniff",
    });

    if (method === "HEAD") {
      response.end();
      return;
    }
    createReadStream(filePath).pipe(response);
  } catch (error) {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Bad request");
    console.error("[serve-dist]", error instanceof Error ? error.message : error);
  }
});

server.listen(port, host, () => {
  console.log(`[serve-dist] Serving ${distDirectory} at http://${host}:${port}`);
});
