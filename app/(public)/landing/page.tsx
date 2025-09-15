import Link from "next/link";
// import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#2d892c", color: "#153930" }}>
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-2xl font-bold" style={{ color: "#153930" }}>BizGrow</span>
          </div>   
          <div className="flex items-center space-x-4">
            <Link 
              href="/onboarding" 
              className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6" style={{ color: "#153930" }}>
            Turn Getting a Micro-Loan Into a{" "}
            <span className="text-green-700">Simple Game</span>
          </h1>
          <p className="text-xl mb-8 leading-relaxed" style={{ color: "#153930" }}>
            Complete quests, earn XP, and level up your business. 
            Build your way to loan eligibility through gamified challenges 
            designed for rural entrepreneurs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/onboarding"
              className="bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-800 transition-colors"
            >
              Start Your Journey
            </Link>
            <Link 
              href="/leaderboard"
              className="border-2 border-green-700 text-green-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-100 transition-colors"
            >
              View Leaderboard
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: "#153930" }}>Gamified Experience</h3>
              <p style={{ color: "#153930" }}>
                Complete quests, earn XP, and unlock levels as you build your business profile.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: "#153930" }}>Smart Scoring</h3>
              <p style={{ color: "#153930" }}>
                Get real-time eligibility scores with actionable tips to improve your loan chances.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-300 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: "#153930" }}>AI Business Plans</h3>
              <p style={{ color: "#153930" }}>
                Generate personalized business plans in your local language with AI assistance.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-green-200">
            © 2024 BizGrow. Empowering rural entrepreneurs through gamified micro-lending.
          </p>
        </div>
      </footer>
    </div>
  );
}