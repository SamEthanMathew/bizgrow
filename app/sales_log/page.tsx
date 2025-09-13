"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SalesLogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    revenueSources: "",
    cogs: "",
    otherExpenses: "",
    childExpenses: "",
    clothing: "",
    pension: "",
    otherIncome: "",
    assetsCurrent: "",
    assetsNonCurrent: "",
    liabilities: "",
    retainedEarnings: "",
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get previous progress from localStorage
    let prevProgress = { points: 0, coins: 0, level: 1, unlockedQuests: ["basics_form", "sales_log"] };
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("userProgress");
      if (stored) {
        prevProgress = JSON.parse(stored);
      }
    }
    // Send form data and previous progress to backend API
    fetch("/api/sales-log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, prevProgress }),
    })
      .then(async (res) => {
        const result = await res.json();
        if (result.success) {
          // Store progress info in localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem("userProgress", JSON.stringify(result.progress));
          }
          console.log("Sales log submitted successfully:", result.data);
          router.push("/quests");
        } else {
          alert("Error: " + result.message);
        }
      })
      .catch((err) => {
        alert("Submission failed: " + err);
      });
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f4f2ee 0%, #eceae3 100%)' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto backdrop-blur-sm rounded-2xl shadow-2xl p-10 border" style={{ backgroundColor: '#f4f2ee', borderColor: '#eceae3' }}>
          <h1 className="text-4xl font-bold mb-8" style={{ color: '#153930' }}>Sales Log</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block font-semibold mb-2">Revenue (all sources)</label>
              <textarea value={formData.revenueSources} onChange={e => handleInputChange("revenueSources", e.target.value)} className="w-full border rounded-lg px-4 py-2" rows={2} placeholder="List all sources of revenue..." />
            </div>
            <div>
              <label className="block font-semibold mb-2">Cost of Goods Sold (COGS)</label>
              <textarea value={formData.cogs} onChange={e => handleInputChange("cogs", e.target.value)} className="w-full border rounded-lg px-4 py-2" rows={2} placeholder="List all costs needed to produce revenue..." />
            </div>
            <div>
              <label className="block font-semibold mb-2">Personal/Other Expenses (electricity, water, phone, etc.)</label>
              <textarea value={formData.otherExpenses} onChange={e => handleInputChange("otherExpenses", e.target.value)} className="w-full border rounded-lg px-4 py-2" rows={2} placeholder="List all personal/other expenses..." />
            </div>
            <div>
              <label className="block font-semibold mb-2">Personal Expenses for Children</label>
              <input type="text" value={formData.childExpenses} onChange={e => handleInputChange("childExpenses", e.target.value)} className="w-full border rounded-lg px-4 py-2" placeholder="Children's expenses..." />
            </div>
            <div>
              <label className="block font-semibold mb-2">Clothing</label>
              <input type="text" value={formData.clothing} onChange={e => handleInputChange("clothing", e.target.value)} className="w-full border rounded-lg px-4 py-2" placeholder="Clothing expenses..." />
            </div>
            <div>
              <label className="block font-semibold mb-2">Pension</label>
              <input type="text" value={formData.pension} onChange={e => handleInputChange("pension", e.target.value)} className="w-full border rounded-lg px-4 py-2" placeholder="Pension amount..." />
            </div>
            <div>
              <label className="block font-semibold mb-2">Other Sources of Income (e.g. gifts, holidays)</label>
              <textarea value={formData.otherIncome} onChange={e => handleInputChange("otherIncome", e.target.value)} className="w-full border rounded-lg px-4 py-2" rows={2} placeholder="Other income sources..." />
            </div>
            <div>
              <label className="block font-semibold mb-2">Assets (Current)</label>
              <textarea value={formData.assetsCurrent} onChange={e => handleInputChange("assetsCurrent", e.target.value)} className="w-full border rounded-lg px-4 py-2" rows={2} placeholder="List current assets..." />
            </div>
            <div>
              <label className="block font-semibold mb-2">Assets (Non-Current, e.g. land, vehicles)</label>
              <textarea value={formData.assetsNonCurrent} onChange={e => handleInputChange("assetsNonCurrent", e.target.value)} className="w-full border rounded-lg px-4 py-2" rows={2} placeholder="List non-current assets..." />
            </div>
            <div>
              <label className="block font-semibold mb-2">Liabilities (e.g. loans)</label>
              <textarea value={formData.liabilities} onChange={e => handleInputChange("liabilities", e.target.value)} className="w-full border rounded-lg px-4 py-2" rows={2} placeholder="List all liabilities..." />
            </div>
            <div>
              <label className="block font-semibold mb-2">Retained Earnings</label>
              <input type="text" value={formData.retainedEarnings} onChange={e => handleInputChange("retainedEarnings", e.target.value)} className="w-full border rounded-lg px-4 py-2" placeholder="Retained earnings..." />
            </div>
            <div className="flex justify-end pt-8">
              <button type="submit" className="px-8 py-4 text-white rounded-xl font-bold text-lg shadow-lg" style={{ backgroundColor: '#2d892c' }}>
                ✅ Submit Sales Log
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
