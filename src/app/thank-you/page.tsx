"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const level = searchParams.get("candidate_level");

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white rounded-lg p-6 shadow text-center">
          <h1 className="text-xl font-semibold mb-4">
            Thank you for submitting your assignment!
          </h1>

          {(name || email || level) && (
            <div className="p-4 mb-6 text-left">
              <h2 className="font-medium mb-3">Submission Summary</h2>
              {name && (
                <p>
                  <strong>Name:</strong> {name}
                </p>
              )}
              {email && (
                <p>
                  <strong>Email:</strong> {email}
                </p>
              )}
              {level && (
                <p>
                  <strong>Candidate Level:</strong> {level}
                </p>
              )}
            </div>
          )}

          <Link
            href="/"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit Another Assignment
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
