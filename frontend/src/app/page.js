import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Caterers Directory
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Find caterers for your events. Compare options and prices.
        </p>

        <Link
          href="/caterers"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          View Caterers
        </Link>
      </div>
    </main>
  );
}
