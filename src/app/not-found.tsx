import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-usmc-scarlet dark:text-usmc-gold mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-navy-blue dark:text-white mb-4">Page Not Found</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link 
          href="/" 
          className="bg-usmc-scarlet hover:bg-usmc-gold text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}