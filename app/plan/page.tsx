"use client";

import { useState } from "react";

export default function PlanPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(false);

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setPlanGenerated(true);
    }, 2000);
  };

  const mockPlan = {
    business: "General Shop in Village",
    goals: [
      "Increase daily revenue by 20%",
      "Reduce expenses by 15%",
      "Build stronger supplier relationships"
    ],
    actions: [
      "Keep detailed 7-day sales & expense log",
      "Compare prices at 3 nearby shops weekly",
      "Create bundle offers for slow days",
      "Negotiate better rates with suppliers",
      "Implement customer feedback system"
    ],
    budget: {
      revenue: 15000,
      expenses: 10000,
      margin: 5000
    },
    risks: "Seasonality, supplier delays, competition",
    mitigation: "Maintain small buffer stock, weekly price checks, diversify suppliers"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Business Plan</h1>
          <p className="text-gray-600 mt-1">Generate your personalized business plan</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!planGenerated ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤖</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Generate Your Business Plan
              </h2>
              <p className="text-gray-600 mb-8">
                Our AI will create a personalized business plan based on your profile, 
                quest completion, and business data. The plan will be in your preferred language.
              </p>
              
              <button
                onClick={handleGeneratePlan}
                disabled={isGenerating}
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isGenerating ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating Plan...</span>
                  </div>
                ) : (
                  "Generate Plan"
                )}
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                This may take a few moments. If AI is unavailable, we&apos;ll use a template.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Your Business Plan</h2>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    📄 Print
                  </button>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    📥 Download PDF
                  </button>
                </div>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Business: {mockPlan.business}
                </h3>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Goals (30 days):</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {mockPlan.goals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Actions:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {mockPlan.actions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Budget (monthly):</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">₹{mockPlan.budget.revenue.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Revenue</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">₹{mockPlan.budget.expenses.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Expenses</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-indigo-600">₹{mockPlan.budget.margin.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Margin (33%)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Risks:</h4>
                  <p className="text-gray-700">{mockPlan.risks}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Mitigation:</h4>
                  <p className="text-gray-700">{mockPlan.mitigation}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
