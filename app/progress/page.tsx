"use client";

import { useState } from "react";
// import { mockUser, mockScore } from "@/lib/data/mockData";

// Use mock data for static export
const mockUserData = {
  level: 0,
  levelName: "Dreamer",
  xp: 0,
  xpToNext: 50,
  coins: 0,
  eligibilityScore: 0,
  completedQuests: 0,
  totalQuests: 8
};

const mockScoreBreakdown = {
  revenueStability: 0,
  expenseDiscipline: 0,
  inventorySignal: 0,
  questCompletion: 0,
  docsPresent: 0,
  communityRef: 0
};

const mockTips = [
  "Complete the Basics Form quest to get started",
  "Track your daily sales and expenses",
  "Upload a photo of your business location",
  "Get a reference from a community leader"
];

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const getLevelColor = (level: number) => {
    const colors = [
      "bg-gray-500", // Dreamer
      "bg-blue-500", // Planner
      "bg-green-500", // Starter
      "bg-yellow-500", // Builder
      "bg-purple-500", // Seller
      "bg-indigo-500" // Loan-Ready
    ];
    return colors[level] || "bg-gray-500";
  };

  const getLevelName = (level: number) => {
    const names = ["Dreamer", "Planner", "Starter", "Builder", "Seller", "Loan-Ready"];
    return names[level] || "Unknown";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>
          <p className="text-gray-600 mt-1">Track your journey to loan eligibility</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className={`w-16 h-16 ${getLevelColor(mockUserData.level)} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <span className="text-white font-bold text-xl">L{mockUserData.level}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{getLevelName(mockUserData.level)}</h3>
            <p className="text-gray-600">Current Level</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{mockUserData.xp}</div>
            <h3 className="text-lg font-semibold text-gray-900">Experience Points</h3>
            <p className="text-gray-600">{mockUserData.xpToNext} XP to next level</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{mockUserData.coins}</div>
            <h3 className="text-lg font-semibold text-gray-900">BizCoins</h3>
            <p className="text-gray-600">Earned rewards</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{mockUserData.eligibilityScore}%</div>
            <h3 className="text-lg font-semibold text-gray-900">Eligibility Score</h3>
            <p className="text-gray-600">Loan readiness</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Level Progress</h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(mockUserData.xp / (mockUserData.xp + mockUserData.xpToNext)) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {mockUserData.xp} / {mockUserData.xp + mockUserData.xpToNext} XP
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", name: "Overview" },
                { id: "score", name: "Score Breakdown" },
                { id: "tips", name: "Improvement Tips" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Quest Progress</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Completed Quests</span>
                      <span className="text-sm text-gray-600">{mockUserData.completedQuests} / {mockUserData.totalQuests}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(mockUserData.completedQuests / mockUserData.totalQuests) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Eligibility Score</span>
                      <span className="text-sm text-gray-600">{mockUserData.eligibilityScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${mockUserData.eligibilityScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "score" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Score Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { key: "revenueStability", label: "Revenue Stability", weight: "25%", value: mockScoreBreakdown.revenueStability },
                    { key: "expenseDiscipline", label: "Expense Discipline", weight: "15%", value: mockScoreBreakdown.expenseDiscipline },
                    { key: "inventorySignal", label: "Inventory Signal", weight: "20%", value: mockScoreBreakdown.inventorySignal },
                    { key: "questCompletion", label: "Quest Completion", weight: "20%", value: mockScoreBreakdown.questCompletion },
                    { key: "docsPresent", label: "Documents Present", weight: "10%", value: mockScoreBreakdown.docsPresent },
                    { key: "communityRef", label: "Community Reference", weight: "10%", value: mockScoreBreakdown.communityRef }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                        <span className="text-xs text-gray-500 ml-2">({item.weight})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-500 h-2 rounded-full"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "tips" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">How to Improve Your Score</h3>
                <div className="space-y-3">
                  {mockTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
