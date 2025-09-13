"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f4f2ee 0%, #eceae3 100%)' }}>
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #2d892c 0%, #153930 100%)' }}>
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-3xl font-bold" style={{ color: '#153930' }}>BizGrow</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/leaderboard" 
              className="transition-colors font-medium"
              style={{ color: '#545454' }}
              onMouseEnter={(e) => e.target.style.color = '#2d892c'}
              onMouseLeave={(e) => e.target.style.color = '#545454'}
            >
              Leaderboard
            </Link>
            <Link 
              href="/onboarding" 
              className="text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
              style={{ background: 'linear-gradient(135deg, #2d892c 0%, #153930 100%)' }}
              onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #153930 0%, #2d892c 100%)'}
              onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #2d892c 0%, #153930 100%)'}
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ backgroundColor: '#2d892c', color: 'white' }}>
              🎮 Gamified Micro-Lending Platform
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight" style={{ color: '#153930' }}>
            Turn Getting a Micro-Loan Into a{" "}
            <span style={{ color: '#2d892c' }}>Simple Game</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto" style={{ color: '#545454' }}>
            Complete quests, earn XP, and level up your business. 
            Build your way to loan eligibility through gamified challenges 
            designed for rural entrepreneurs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/onboarding"
              className="text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-2xl transform hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #2d892c 0%, #153930 100%)' }}
              onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #153930 0%, #2d892c 100%)'}
              onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #2d892c 0%, #153930 100%)'}
            >
              🚀 Start Your Journey
            </Link>
            <Link 
              href="/leaderboard"
              className="px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ border: '2px solid #2d892c', color: '#2d892c', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#2d892c'; e.target.style.color = 'white'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#2d892c'; }}
            >
              🏆 View Leaderboard
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{ backgroundColor: '#f4f2ee', border: '1px solid #eceae3' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: '#2d892c' }}>
                <span className="text-3xl">🎮</span>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#153930' }}>Gamified Experience</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#545454' }}>
                Complete quests, earn XP, and unlock levels as you build your business profile with engaging challenges.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{ backgroundColor: '#f4f2ee', border: '1px solid #eceae3' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: '#2d892c' }}>
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#153930' }}>Smart Scoring</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#545454' }}>
                Get real-time eligibility scores with actionable tips to improve your loan chances and business growth.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{ backgroundColor: '#f4f2ee', border: '1px solid #eceae3' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: '#2d892c' }}>
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#153930' }}>AI Business Plans</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#545454' }}>
                Generate personalized business plans in your local language with AI assistance and expert guidance.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-white py-12 mt-20" style={{ background: 'linear-gradient(135deg, #153930 0%, #2d892c 100%)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f4f2ee' }}>
                <span className="font-bold text-lg" style={{ color: '#153930' }}>B</span>
              </div>
              <span className="text-2xl font-bold">BizGrow</span>
            </div>
            <p className="text-lg mb-4" style={{ color: '#eceae3' }}>
              Empowering rural entrepreneurs through gamified micro-lending
            </p>
            <p style={{ color: '#737373' }}>
              © 2024 BizGrow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
