"use client";

import { checkURL } from "@/actions/checkURL";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import useDetectDevice from "@/hooks/useDetectDevice";
import { Loader2, XCircle, CheckCircle } from "lucide-react";

export default function UrlPage({ params }) {
  const router = useRouter();
  const [status, setStatus] = useState("loading");
  const { url } = use(params); 
  const data = useDetectDevice();

  useEffect(() => {
    let isMounted = true;

    async function checkUrlStatus() {
      try {
        const response = await checkURL({ url, data });
        if (isMounted) {
          if (response.success) {
            setStatus("success");
            router.push(response.path);
          } else {
            setStatus("error");
          }
        }
      } catch (error) {
        console.error("Error checking URL:", error);
        if (isMounted) setStatus("error");
      }
    }

    if (url) checkUrlStatus();

    // Cleanup to avoid state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [url, data, router]);

  return (
    <main className="flex justify-center items-center h-screen min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="text-center">
        {status === "loading" && <LoadingState message="Checking URL" />}
        {status === "success" && <SuccessState message="Redirecting" />}
        {status === "error" && (
          <ErrorState message="Invalid Link" onRetry={() => router.push("/")} />
        )}
      </div>
    </main>
  );
}

function LoadingState({ message }) {
  return (
    <div className="flex flex-col items-center">
      <Loader2 className="w-10 h-10 text-gray-400 animate-spin mb-4" />
      <h1 className="text-xl font-normal text-gray-600">{message}</h1>
    </div>
  );
}

function SuccessState({ message }) {
  return (
    <div className="flex flex-col items-center">
      <CheckCircle className="w-10 h-10 text-green-500 mb-4" />
      <h1 className="text-xl font-normal text-gray-600">{message}</h1>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center">
      <XCircle className="w-10 h-10 text-red-500 mb-4" />
      <h1 className="text-xl font-normal text-gray-600">{message}</h1>
      <button
        onClick={onRetry}
        className="mt-6 px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
      >
        Go Home
      </button>
    </div>
  );
}
