"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const BUSINESS_TYPES = [
  { id: "shop", name: "General Shop", icon: "🏪" },
  { id: "tailoring", name: "Tailoring", icon: "✂️" },
  { id: "food_cart", name: "Food Cart", icon: "🍜" },
  { id: "mechanic", name: "Mechanic", icon: "🔧" },
  { id: "farming", name: "Farming", icon: "🌾" },
  { id: "handicraft", name: "Handicraft", icon: "🎨" },
  { id: "transport", name: "Transport", icon: "🚚" },
  { id: "other", name: "Other", icon: "💼" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    village: "",
    businessType: "",
    language: "en",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Reset user progress in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("userProgress", JSON.stringify({ points: 0, coins: 0, level: 0, unlockedQuests: ["basics_form"] }));
      }
      // TODO: Save user data and redirect to quests
      router.push("/quests");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(135deg, #f4f2ee 0%, #eceae3 100%)' }}>
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

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#2d892c', color: 'white' }}>
              🚀 Getting Started
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#153930' }}>Welcome to BizGrow</h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#545454' }}>Let&apos;s set up your business profile and start your journey to loan eligibility</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold" style={{ color: '#545454' }}>Step {step} of 4</span>
            <span className="text-lg font-semibold" style={{ color: '#2d892c' }}>{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="w-full rounded-full h-3 shadow-inner" style={{ backgroundColor: '#eceae3' }}>
            <div 
              className="h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${(step / 4) * 100}%`, backgroundColor: '#2d892c' }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <div className="max-w-3xl mx-auto backdrop-blur-sm rounded-2xl shadow-2xl p-10 border" style={{ backgroundColor: '#f4f2ee', borderColor: '#eceae3' }}>
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#153930' }}>👤 Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#545454' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ borderColor: '#737373', color: '#153930' }}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#153930' }}>🌍 Location & Language</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Village/Town
                  </label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => handleInputChange("village", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your village or town name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Language
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange("language", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="zh">中文 (Chinese)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#153930' }}>💼 Business Type</h2>
              <p className="text-lg mb-8" style={{ color: '#545454' }}>What type of business are you planning to start or already running?</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {BUSINESS_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleInputChange("businessType", type.id)}
                    className={`p-6 border-2 rounded-2xl text-center transition-all duration-300 transform hover:-translate-y-1 ${
                      formData.businessType === type.id
                        ? "shadow-lg"
                        : "hover:shadow-md"
                    }`}
                    style={{
                      borderColor: formData.businessType === type.id ? '#2d892c' : '#737373',
                      backgroundColor: formData.businessType === type.id ? '#f4f2ee' : '#eceae3'
                    }}
                  >
                    <div className="text-4xl mb-3">{type.icon}</div>
                    <div className="text-sm font-bold" style={{ color: '#153930' }}>{type.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* WeChat Pay Connection Step */}
          {step === 4 && (
            <div>
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#153930' }}>💳 Connect WeChat Pay</h2>
              <p className="text-lg mb-8" style={{ color: '#545454' }}>Connect your WeChat Pay account to enable payments and receive funds directly in the app.</p>
              <div className="flex flex-col items-center space-y-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/wechatpay-logo.png" alt="WeChat Pay" style={{ width: 80, height: 80 }} />
                <input
                  type="text"
                  placeholder="Enter your WeChat Pay ID or scan QR code"
                  className="w-full max-w-md px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
                  style={{ borderColor: '#737373', color: '#153930' }}
                />
                <button className="px-8 py-4 text-white rounded-xl font-bold text-lg shadow-lg" style={{ backgroundColor: '#2d892c' }}>
                  Connect WeChat Pay
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="px-8 py-4 border-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg transition-all duration-300"
              style={{ borderColor: '#737373', color: '#545454' }}
              onMouseEnter={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = '#eceae3'; }}
              onMouseLeave={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = 'transparent'; }}
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              className="px-8 py-4 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-bold text-lg transform hover:-translate-y-1"
              style={{ backgroundColor: '#2d892c' }}
              onMouseEnter={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = '#153930'; }}
              onMouseLeave={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = '#2d892c'; }}
            >
              {step === 4 ? "🚀 Complete Setup" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}