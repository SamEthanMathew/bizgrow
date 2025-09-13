"use client";

import { useState, useEffect } from "react";
import { mockQuests } from "@/lib/data/mockData";

export default function QuestsPage() {
  const [selectedQuest, setSelectedQuest] = useState<number | null>(null);
  const [progress, setProgress] = useState({ points: 0, coins: 0, level: 0, unlockedQuests: ["basics_form"] });

  // Load progress from localStorage on mount
  useEffect(() => {
    const handleVisibility = () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("userProgress");
        if (stored) {
          setProgress(JSON.parse(stored));
        }
      }
    };
    handleVisibility();
    window.addEventListener("visibilitychange", handleVisibility);
    return () => window.removeEventListener("visibilitychange", handleVisibility);
  }, []);

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
  // Determine quest statuses: completed, available, locked
  let unlockedKeys = progress.unlockedQuests;
  let questsWithStatus = mockQuests.map((quest, idx) => {
    if (idx < unlockedKeys.length - 1) {
      return { ...quest, status: "completed" };
    } else if (idx === unlockedKeys.length - 1) {
      return { ...quest, status: "available" };
    } else {
      return { ...quest, status: "locked" };
    }
  });

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
                <div className="text-3xl font-bold text-white">L{progress.level}</div>
                <div className="text-sm text-white font-semibold">{progress.level === 0 ? "Dreamer" : "Achiever"}</div>
              </div>
              <div className="text-center p-4 rounded-2xl" style={{ backgroundColor: '#737373' }}>
                <div className="text-3xl font-bold text-white">{progress.points}</div>
                <div className="text-sm text-white font-semibold">XP</div>
              </div>
              <div className="text-center p-4 rounded-2xl" style={{ backgroundColor: '#545454' }}>
                <div className="text-3xl font-bold text-white">{progress.coins}</div>
                <div className="text-sm text-white font-semibold">Coins</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quests Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {questsWithStatus.map((quest, idx) => (
            <div
              key={quest.id}
              className={`backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 transition-all duration-300 ${
                quest.status !== "locked"
                  ? "cursor-pointer hover:shadow-2xl hover:-translate-y-2"
                  : "opacity-60 cursor-not-allowed"
              }`}
              style={{ 
                backgroundColor: quest.status === "locked" ? '#eceae3' : '#f4f2ee',
                borderColor: quest.status === "locked" ? '#737373' : '#2d892c'
              }}
              onClick={() => {
                if (quest.status !== "locked") {
                  if (quest.key === "basics_form") {
                    window.location.href = "/basics-form";
                  } else if (quest.key === "sales_log") {
                    window.location.href = "/sales_log";
                  }
                  // Add more quest keys/routes as needed
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

      {/* Quest Detail Modal removed: now clicking an available quest goes directly to its form */}
    </div>
  );
}