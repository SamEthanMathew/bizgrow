"use client";

import { useState } from "react";
import Link from "next/link";
import { mockLeaderboard } from "@/lib/data/mockData";

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

  // const getLevelColor = (level: number) => {
  //   const colors = [
  //     "bg-gray-500", // Dreamer
  //     "bg-blue-500", // Planner
  //     "bg-green-500", // Starter
  //     "bg-yellow-500", // Builder
  //     "bg-purple-500", // Seller
  //     "bg-indigo-500" // Loan-Ready
  //   ];
  //   return colors[level] || "bg-gray-500";
  // };

  const getRankIcon = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f4f2ee 0%, #eceae3 100%)' }}>
      {/* Header */}
      <div className="backdrop-blur-sm shadow-lg border-b" style={{ backgroundColor: '#f4f2ee', borderColor: '#eceae3' }}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/" 
              className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              style={{ backgroundColor: '#2d892c' }}
              onMouseEnter={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = '#153930'; }}
              onMouseLeave={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = '#2d892c'; }}
            >
              <span className="text-white text-xl font-bold">←</span>
            </Link>
            <div>
              <h1 className="text-4xl font-bold" style={{ color: '#153930' }}>Leaderboard</h1>
              <p className="mt-2 text-lg" style={{ color: '#545454' }}>See how you rank against other entrepreneurs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 border" style={{ backgroundColor: '#f4f2ee', borderColor: '#eceae3' }}>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#153930' }}>Filter Results</h2>
          <div className="flex flex-wrap gap-6">
            <div>
              <label className="block text-sm font-bold mb-3" style={{ color: '#545454' }}>🏘️ Village</label>
              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="px-6 py-3 border-2 rounded-xl bg-white font-semibold"
                style={{ borderColor: '#737373', color: '#545454' }}
              >
                {villages.map(village => (
                  <option key={village} value={village}>
                    {village === "all" ? "All Villages" : village}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-3" style={{ color: '#545454' }}>🎯 Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-6 py-3 border-2 rounded-xl bg-white font-semibold"
                style={{ borderColor: '#737373', color: '#545454' }}
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
        <div className="backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border" style={{ backgroundColor: '#f4f2ee', borderColor: '#eceae3' }}>
          <div className="px-8 py-6 border-b" style={{ borderColor: '#eceae3', backgroundColor: '#2d892c' }}>
            <h2 className="text-2xl font-bold text-white">🏆 Top Entrepreneurs</h2>
          </div>
          
          <div className="divide-y" style={{ borderColor: '#eceae3' }}>
            {filteredLeaderboard.map((user, index) => (
              <div key={user.id} className="px-8 py-6 transition-all duration-300" style={{ backgroundColor: '#f4f2ee' }} onMouseEnter={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = '#eceae3'; }} onMouseLeave={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = '#f4f2ee'; }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center justify-center w-16 h-16">
                      <span className="text-3xl">{getRankIcon(index)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#2d892c' }}>
                        <span className="text-white font-bold text-sm">L{user.level}</span>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold" style={{ color: '#153930' }}>{user.name}</h3>
                        <p className="font-medium" style={{ color: '#545454' }}>{user.village} • {user.businessType}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <div className="text-center p-4 rounded-xl" style={{ backgroundColor: '#2d892c' }}>
                      <div className="text-2xl font-bold text-white">{user.score}%</div>
                      <div className="text-sm text-white font-semibold">Score</div>
                    </div>
                    <div className="text-center p-4 rounded-xl" style={{ backgroundColor: '#737373' }}>
                      <div className="text-2xl font-bold text-white">{user.xp}</div>
                      <div className="text-sm text-white font-semibold">XP</div>
                    </div>
                    <div className="text-center p-4 rounded-xl" style={{ backgroundColor: '#545454' }}>
                      <div className="text-lg font-bold text-white">{user.levelName}</div>
                      <div className="text-sm text-white font-semibold">Level</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{ backgroundColor: '#f4f2ee', borderColor: '#eceae3' }}>
            <div className="text-5xl mb-4">👥</div>
            <div className="text-4xl font-bold mb-3" style={{ color: '#2d892c' }}>
              {mockLeaderboard.length}
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#153930' }}>Total Entrepreneurs</h3>
            <p className="font-medium" style={{ color: '#545454' }}>Across all villages</p>
          </div>
          
          <div className="backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{ backgroundColor: '#f4f2ee', borderColor: '#eceae3' }}>
            <div className="text-5xl mb-4">🏆</div>
            <div className="text-4xl font-bold mb-3" style={{ color: '#2d892c' }}>
              {mockLeaderboard.filter(u => u.level >= 4).length}
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#153930' }}>Loan-Ready</h3>
            <p className="font-medium" style={{ color: '#545454' }}>Score ≥ 70%</p>
          </div>
          
          <div className="backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{ backgroundColor: '#f4f2ee', borderColor: '#eceae3' }}>
            <div className="text-5xl mb-4">📊</div>
            <div className="text-4xl font-bold mb-3" style={{ color: '#2d892c' }}>
              {Math.round(mockLeaderboard.reduce((acc, u) => acc + u.score, 0) / mockLeaderboard.length)}%
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#153930' }}>Average Score</h3>
            <p className="font-medium" style={{ color: '#545454' }}>Community average</p>
          </div>
        </div>
      </div>
    </div>
  );
}