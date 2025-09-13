"use client";

import { useRouter } from "next/navigation";

export default function ShopReturnPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #f4f2ee 0%, #eceae3 100%)' }}>
      <h1 className="text-4xl font-bold mb-6" style={{ color: '#153930' }}>Return to Home</h1>
      <p className="mb-8 text-lg" style={{ color: '#545454' }}>You can go back to the main shop/home page at any time.</p>
      <button
        className="px-8 py-4 text-white rounded-xl font-bold text-lg shadow-lg"
        style={{ backgroundColor: '#2d892c' }}
        onClick={() => router.push("/")}
      >
        ← Go to Home Page
      </button>
    </div>
  );
}
