"use client";

import { useState } from "react";

// Mock quest data - will be replaced with API calls
const QUESTS = [
  {
    id: 1,
    key: "basics_form",
    title: "Basics Form",
    description: "Tell us about your business sector and revenue/expense ranges",
    xp: 50,
    coinReward: 10,
    levelGate: 0,
    status: "available", // available, in_progress, completed, locked
    icon: "📝"
  },
  {
    id: 2,
    key: "sales_log",
    title: "Sales Log",
    description: "Enter 7 days of demo sales data",
    xp: 70,
    coinReward: 10,
    levelGate: 1,
    status: "locked",
    icon: "📊"
  },
  {
    id: 3,
    key: "expense_log",
    title: "Expense Log",
    description: "Enter 7 days of demo expense data",
    xp: 70,
    coinReward: 10,
    levelGate: 1,
    status: "locked",
    icon: "💰"
  },
  {
    id: 4,
    key: "shop_photo",
    title: "Upload Shop Photo",
    description: "Upload a photo of your shop or stall",
    xp: 40,
    coinReward: 5,
    levelGate: 2,
    status: "locked",
    icon: "📸"
  },
  {
    id: 5,
    key: "reference_contact",
    title: "Reference Contact",
    description: "Provide phone number of supplier or community leader",
    xp: 40,
    coinReward: 5,
    levelGate: 2,
    status: "locked",
    icon: "📞"
  },
  {
    id: 6,
    key: "inventory_count",
    title: "Simple Inventory Count",
    description: "Count and list your current inventory",
    xp: 60,
    coinReward: 10,
    levelGate: 3,
    status: "locked",
    icon: "📦"
  },
  {
    id: 7,
    key: "price_check",
    title: "Price Check",
    description: "Research 3 competitor prices for your products",
    xp: 60,
    coinReward: 10,
    levelGate: 3,
    status: "locked",
    icon: "🔍"
  },
  {
    id: 8,
    key: "repayment_pledge",
    title: "Repayment Pledge",
    description: "Sign the repayment commitment agreement",
    xp: 30,
    coinReward: 5,
    levelGate: 4,
    status: "locked",
    icon: "✍️"
  }
];

export default function QuestsPage() {
  const [selectedQuest, setSelectedQuest] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "available": return "bg-indigo-100 text-indigo-800";
      case "locked": return "bg-gray-100 text-gray-500";
      default: return "bg-gray-100 text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "in_progress": return "In Progress";
      case "available": return "Available";
      case "locked": return "Locked";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quests</h1>
              <p className="text-gray-600 mt-1">Complete quests to level up and earn rewards</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">L0</div>
                <div className="text-sm text-gray-500">Dreamer</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">0</div>
                <div className="text-sm text-gray-500">XP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-gray-500">Coins</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quests Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUESTS.map((quest) => (
            <div
              key={quest.id}
              className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all cursor-pointer ${
                quest.status === "locked" 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:shadow-xl hover:border-indigo-200"
              }`}
              onClick={() => quest.status !== "locked" && setSelectedQuest(quest.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{quest.icon}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quest.status)}`}>
                  {getStatusText(quest.status)}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{quest.title}</h3>
              <p className="text-gray-600 mb-4">{quest.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-indigo-600">⚡</span>
                    <span className="text-sm font-medium">{quest.xp} XP</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-purple-600">🪙</span>
                    <span className="text-sm font-medium">{quest.coinReward} coins</span>
                  </div>
                </div>
                {quest.status === "locked" && (
                  <div className="text-xs text-gray-500">
                    Level {quest.levelGate} required
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quest Detail Modal */}
      {selectedQuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Quest Details</h3>
              <button
                onClick={() => setSelectedQuest(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              This is where the quest form would appear. The actual implementation 
              would include specific forms for each quest type.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedQuest(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setSelectedQuest(null)}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Start Quest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
