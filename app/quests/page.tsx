"use client";

import { useState } from "react";
import { mockQuests } from "@/lib/data/mockData";

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

  // Add status to quests for display
  const questsWithStatus = mockQuests.map((quest, index) => ({
    ...quest,
    status: index === 0 ? "available" : "locked"
  }));

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f4f2ee 0%, #eceae3 100%)' }}>
      {/* Header */}
      <div className="backdrop-blur-sm shadow-lg border-b" style={{ backgroundColor: '#f4f2ee', borderColor: '#eceae3' }}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold" style={{ color: '#153930' }}>Quests</h1>
              <p className="mt-2 text-lg" style={{ color: '#545454' }}>Complete quests to level up and earn rewards</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center p-4 rounded-2xl" style={{ backgroundColor: '#2d892c' }}>
                <div className="text-3xl font-bold text-white">L0</div>
                <div className="text-sm text-white font-semibold">Dreamer</div>
              </div>
              <div className="text-center p-4 rounded-2xl" style={{ backgroundColor: '#737373' }}>
                <div className="text-3xl font-bold text-white">0</div>
                <div className="text-sm text-white font-semibold">XP</div>
              </div>
              <div className="text-center p-4 rounded-2xl" style={{ backgroundColor: '#545454' }}>
                <div className="text-3xl font-bold text-white">0</div>
                <div className="text-sm text-white font-semibold">Coins</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quests Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {questsWithStatus.map((quest) => (
            <div
              key={quest.id}
              className={`backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 transition-all duration-300 cursor-pointer ${
                quest.status === "locked" 
                  ? "opacity-60 cursor-not-allowed" 
                  : "hover:shadow-2xl hover:-translate-y-2"
              }`}
              style={{ 
                backgroundColor: quest.status === "locked" ? '#eceae3' : '#f4f2ee',
                borderColor: quest.status === "locked" ? '#737373' : '#2d892c'
              }}
              onClick={() => {
                if (quest.status !== "locked") {
                  if (quest.key === "basics_form") {
                    // Navigate to basics form page
                    window.location.href = "/basics-form";
                  } else {
                    setSelectedQuest(quest.id);
                  }
                }
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="text-5xl">{quest.icon}</div>
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(quest.status)}`}>
                  {getStatusText(quest.status)}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#153930' }}>{quest.title}</h3>
              <p className="mb-6 text-lg leading-relaxed" style={{ color: '#545454' }}>{quest.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-xl" style={{ backgroundColor: '#2d892c' }}>
                    <span className="text-white text-lg">⚡</span>
                    <span className="text-sm font-bold text-white">{quest.xp} XP</span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-xl" style={{ backgroundColor: '#737373' }}>
                    <span className="text-white text-lg">🪙</span>
                    <span className="text-sm font-bold text-white">{quest.coinReward} coins</span>
                  </div>
                </div>
                {quest.status === "locked" && (
                  <div className="text-sm px-3 py-1 rounded-lg" style={{ color: '#545454', backgroundColor: '#eceae3' }}>
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="rounded-2xl max-w-lg w-full p-8 shadow-2xl border" style={{ backgroundColor: '#f4f2ee', borderColor: '#eceae3' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold" style={{ color: '#153930' }}>Quest Details</h3>
              <button
                onClick={() => setSelectedQuest(null)}
                className="text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                style={{ color: '#737373' }}
                onMouseEnter={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = '#eceae3'; }}
                onMouseLeave={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = 'transparent'; }}
              >
                ✕
              </button>
            </div>
            <div className="mb-8">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-lg leading-relaxed" style={{ color: '#545454' }}>
                This is where the quest form would appear. The actual implementation 
                would include specific forms for each quest type with interactive elements.
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedQuest(null)}
                className="flex-1 px-6 py-3 border-2 rounded-xl font-semibold transition-colors"
                style={{ borderColor: '#737373', color: '#545454' }}
                onMouseEnter={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = '#eceae3'; }}
                onMouseLeave={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = 'transparent'; }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const quest = mockQuests.find(q => q.id === selectedQuest);
                  if (quest?.key === "basics_form") {
                    window.location.href = "/basics-form";
                  } else {
                    setSelectedQuest(null);
                  }
                }}
                className="flex-1 px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#2d892c' }}
                onMouseEnter={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = '#153930'; }}
                onMouseLeave={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = '#2d892c'; }}
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