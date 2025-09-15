"use client";

import { useState, useEffect } from "react";
import { mockQuests } from "@/lib/data/mockData";

export default function QuestsPage() {
  // const [selectedQuest, setSelectedQuest] = useState<number | null>(null);
  const [progress, setProgress] = useState({ points: 0, coins: 0, level: 0, unlockedQuests: ["basics_form"] });

  // Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [{ role: "assistant", content: "Hello! How can I help you with your quests?" }]
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Send message to backend API route
  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Error connecting to chatbot." }]);
    }
    setLoading(false);
  };

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
  const unlockedKeys = progress.unlockedQuests;
  const questsWithStatus = mockQuests.map((quest, idx) => {
    if (idx < unlockedKeys.length - 1) {
      return { ...quest, status: "completed" };
    } else if (idx === unlockedKeys.length - 1) {
      return { ...quest, status: "available" };
    } else {
      return { ...quest, status: "locked" };
    }
  });

  // --- Chatbot UI ---
  const Chatbot = (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed right-6 bottom-6 z-50 bg-green-700 hover:bg-green-800 text-white rounded-full shadow-lg px-5 py-4 flex items-center space-x-2"
        style={{ transition: "background 0.2s" }}
        aria-label="Open Chatbot"
      >
        <span className="text-xl">💬</span>
        <span className="font-semibold hidden sm:inline">Chat</span>
      </button>

      {/* Chatbot Modal */}
      {chatOpen && (
        <div className="fixed right-6 bottom-24 z-50 w-80 max-w-full bg-white rounded-2xl shadow-2xl border border-green-700 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-green-100 bg-green-700 rounded-t-2xl">
            <span className="text-white font-bold">BizGrow Chatbot</span>
            <button
              onClick={() => setChatOpen(false)}
              className="text-white hover:text-green-200 text-lg font-bold"
              aria-label="Close Chatbot"
            >
              ×
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: "24rem" }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <span className={`inline-block px-3 py-2 rounded-lg ${msg.role === "user" ? "bg-green-100 text-green-900" : "bg-gray-100 text-gray-900"}`}>
                  {msg.content}
                </span>
              </div>
            ))}
            {loading && <div className="text-gray-400 text-sm">Thinking...</div>}
          </div>
          <form
            className="flex border-t border-green-100 p-2"
            onSubmit={e => { e.preventDefault(); sendMessage(); }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-green-300 focus:outline-none"
              placeholder="Type your message..."
              disabled={loading}
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-green-700 text-white rounded-lg font-bold"
              disabled={loading}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(135deg, #f4f2ee 0%, #eceae3 100%)' }}>
      {Chatbot}
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
              <button
                className="px-6 py-3 ml-4 text-white rounded-xl font-bold text-lg shadow-lg"
                style={{ backgroundColor: '#2d892c' }}
                onClick={() => window.location.href = "/"}
              >
                🏠 Home
              </button>
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