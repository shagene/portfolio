import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = await readFile(new URL("../public/favicon.svg", import.meta.url));
const publicFile = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));

const renderPng = (size) => sharp(source)
  .resize(size, size)
  .png({ compressionLevel: 9 })
  .toBuffer();

const [png16, png32, png48, appleTouchIcon] = await Promise.all([
  renderPng(16),
  renderPng(32),
  renderPng(48),
  renderPng(180),
]);

const pngs = [
  { size: 16, buffer: png16 },
  { size: 32, buffer: png32 },
  { size: 48, buffer: png48 },
];
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);

let offset = header.length + (16 * pngs.length);
const directory = Buffer.concat(pngs.map(({ size, buffer }) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0);
  entry.writeUInt8(size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(buffer.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += buffer.length;
  return entry;
}));

await Promise.all([
  writeFile(publicFile("favicon.png"), png32),
  writeFile(publicFile("favicon.ico"), Buffer.concat([
    header,
    directory,
    ...pngs.map(({ buffer }) => buffer),
  ])),
  writeFile(publicFile("apple-touch-icon.png"), appleTouchIcon),
]);
