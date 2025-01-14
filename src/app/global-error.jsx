"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html className="flex items-center justify-center min-h-screen">
      <body className="flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong!
        </h2>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
