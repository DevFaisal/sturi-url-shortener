"use client";
import { createURL } from "@/actions/createURL";
import { useState } from "react";
import { Link2, ArrowRight, ExternalLink } from "lucide-react";
import validUrl from "valid-url";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");
  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkValidUrl(url)) {
      const result = await createURL({ url });
      if (result.success) {
        return setShortenedUrl(CLIENT_URL + "/".concat(result.data));
      }
      setError(result.data);
    }
  };

  return (
    <div className="min-h-screen flex justify-between items-center bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="container mx-auto px-4 py-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Link2 className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Sturi URL Shortener
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your long URLs into short, memorable links in seconds
          </p>
        </div>

        {/* URL Shortener Form */}
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <div className="flex flex-col w-full">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste your long URL here..."
                  className="flex-1 px-6 py-4 rounded-lg border-2 border-indigo-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 text-lg transition-all duration-200"
                  required
                />
                <span className="text-red-500 italic font-semibold text-sm">
                  {error}
                </span>
              </div>

              <button
                type="submit"
                className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2"
              >
                Shorten <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Result Section */}
          {shortenedUrl && (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-indigo-100">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Your shortened URL is ready!
              </h2>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={shortenedUrl}
                  readOnly
                  className="flex-1 px-4 py-2 bg-gray-50 rounded border border-gray-200"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(shortenedUrl)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors duration-200"
                >
                  Copy
                </button>
                <a
                  href={shortenedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-indigo-600 hover:text-indigo-700"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Lightning Fast
            </h3>
            <p className="text-gray-600">
              Generate shortened URLs instantly with our optimized service
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Secure & Reliable
            </h3>
            <p className="text-gray-600">
              Your links are safe with us and available 24/7
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Easy to Share
            </h3>
            <p className="text-gray-600">
              Perfect for social media, emails, and messages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function checkValidUrl(url) {
  if (validUrl.isUri(url) != undefined) {
    return true;
  }
  return false;
}
