"use client";

import { useState } from "react";

// Mock leaderboard data
const mockLeaderboard = [
  { id: 1, name: "Priya Sharma", village: "Village A", level: 4, levelName: "Builder", score: 85, xp: 320, businessType: "Tailoring" },
  { id: 2, name: "Raj Kumar", village: "Village B", level: 3, levelName: "Starter", score: 72, xp: 280, businessType: "General Shop" },
  { id: 3, name: "Sunita Devi", village: "Village A", level: 3, levelName: "Starter", score: 68, xp: 250, businessType: "Food Cart" },
  { id: 4, name: "Amit Singh", village: "Village C", level: 2, levelName: "Planner", score: 55, xp: 180, businessType: "Mechanic" },
  { id: 5, name: "Kavita Patel", village: "Village B", level: 2, levelName: "Planner", score: 48, xp: 150, businessType: "Handicraft" },
  { id: 6, name: "Vikram Yadav", village: "Village A", level: 1, levelName: "Dreamer", score: 35, xp: 80, businessType: "Farming" },
  { id: 7, name: "Meera Joshi", village: "Village C", level: 1, levelName: "Dreamer", score: 28, xp: 60, businessType: "Transport" },
  { id: 8, name: "Suresh Gupta", village: "Village B", level: 0, levelName: "Dreamer", score: 15, xp: 20, businessType: "General Shop" }
];

export default function LeaderboardPage() {
  const [selectedVillage, setSelectedVillage] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const villages = ["all", ...Array.from(new Set(mockLeaderboard.map(user => user.village)))];
  const levels = ["all", "Loan-Ready", "Seller", "Builder", "Starter", "Planner", "Dreamer"];

  const filteredLeaderboard = mockLeaderboard.filter(user => {
    const villageMatch = selectedVillage === "all" || user.village === selectedVillage;
    const levelMatch = selectedLevel === "all" || user.levelName === selectedLevel;
    return villageMatch && levelMatch;
  });

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

  const getRankIcon = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
          <p className="text-gray-600 mt-1">See how you rank against other entrepreneurs</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {villages.map(village => (
                  <option key={village} value={village}>
                    {village === "all" ? "All Villages" : village}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === "all" ? "All Levels" : level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Top Entrepreneurs</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredLeaderboard.map((user, index) => (
              <div key={user.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12">
                      <span className="text-2xl">{getRankIcon(index)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${getLevelColor(user.level)} rounded-full flex items-center justify-center`}>
                        <span className="text-white font-bold text-sm">L{user.level}</span>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.village} • {user.businessType}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-indigo-600">{user.score}%</div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-yellow-600">{user.xp}</div>
                      <div className="text-xs text-gray-500">XP</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">{user.levelName}</div>
                      <div className="text-xs text-gray-500">Level</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {mockLeaderboard.length}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Total Entrepreneurs</h3>
            <p className="text-gray-600">Across all villages</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {mockLeaderboard.filter(u => u.level >= 4).length}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Loan-Ready</h3>
            <p className="text-gray-600">Score ≥ 70%</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Math.round(mockLeaderboard.reduce((acc, u) => acc + u.score, 0) / mockLeaderboard.length)}%
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Average Score</h3>
            <p className="text-gray-600">Community average</p>
          </div>
        </div>
      </div>
    </div>
  );
}
