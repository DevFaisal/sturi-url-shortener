"use client";
import { createURL } from "@/actions/createURL";
import { useState } from "react";
import { Link2, ArrowRight, ExternalLink, Loader2 } from "lucide-react";
import validUrl from "valid-url";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (checkValidUrl(url)) {
        const result = await createURL({ url });
        console.log(result);
        if (result.success) {
          setLoading(false);
          return setShortenedUrl(CLIENT_URL + "/".concat(result.data));
        }
        setError(result.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-between items-center bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="container mx-auto px-4 py-6 sm:py-10">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-36">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Link2 className="h-8 w-8 sm:h-12 sm:w-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Sturi URL Shortener
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your long URLs into short, memorable links in seconds
          </p>
        </div>

        {/* URL Shortener Form */}
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste your long URL here..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-indigo-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 text-base transition-all duration-200"
                  required
                />
                {error && (
                  <span className="text-red-500 italic font-semibold text-sm mt-1 block">
                    {error}
                  </span>
                )}
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Shorten <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Result Section */}
          {shortenedUrl && (
            <div className="mt-6 sm:mt-8 p-4 bg-white rounded-lg shadow-lg border border-indigo-100">
              <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">
                Your shortened URL is ready!
              </h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  value={shortenedUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-50 rounded border border-gray-200 text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(shortenedUrl)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors duration-200 text-sm"
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
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="flex justify-center items-center mb-3">
              <div className="p-2 bg-indigo-100 rounded-full">
                <ArrowRight className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-600 text-sm">
              Generate shortened URLs instantly with our optimized service
            </p>
          </div>
          <div className="p-4">
            <div className="flex justify-center items-center mb-3">
              <div className="p-2 bg-indigo-100 rounded-full">
                <Link2 className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Secure & Reliable
            </h3>
            <p className="text-gray-600 text-sm">
              Your links are safe with us and available 24/7
            </p>
          </div>
          <div className="p-4">
            <div className="flex justify-center items-center mb-3">
              <div className="p-2 bg-indigo-100 rounded-full">
                <ExternalLink className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Easy to Share
            </h3>
            <p className="text-gray-600 text-sm">
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
