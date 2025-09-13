// Mock data for static export (GitHub Pages)
export const mockQuests = [
  {
    id: 1,
    key: "basics_form",
    title: "Basics Form",
    description: "Tell us about your business sector and revenue/expense ranges",
    xp: 50,
    coinReward: 10,
    levelGate: 0,
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
    icon: "✍️"
  }
];

export const mockUser = {
  id: "user1",
  name: "John Doe",
  phone: "+1234567890",
  email: "john@example.com",
  village: "Sample Village",
  language: "en",
  businessType: "general_shop",
  level: 0,
  levelName: "Dreamer",
  xp: 0,
  coins: 0,
  eligibilityScore: 0,
  createdAt: "2024-01-01T00:00:00Z"
};

export const mockScore = {
  eligibilityScore: 64,
  breakdown: {
    revenueStability: 80,
    expenseDiscipline: 41,
    inventorySignal: 123,
    questCompletion: 38,
    docsPresent: 0,
    communityRef: 100
  },
  tips: [
    "Track expenses daily; aim expenses ≤ 70% of sales.",
    "Upload national ID (photo allowed).",
    "Finish required quests Q2, Q3, Q5."
  ],
  level: 0,
  xp: 150,
  coins: 25
};

export const mockLeaderboard = [
  { id: 1, name: "Priya Sharma", village: "Village A", level: 4, levelName: "Builder", score: 85, xp: 320, businessType: "Tailoring" },
  { id: 2, name: "Raj Kumar", village: "Village B", level: 3, levelName: "Starter", score: 72, xp: 280, businessType: "General Shop" },
  { id: 3, name: "Sunita Devi", village: "Village A", level: 3, levelName: "Starter", score: 68, xp: 250, businessType: "Food Cart" },
  { id: 4, name: "Amit Singh", village: "Village C", level: 2, levelName: "Planner", score: 55, xp: 180, businessType: "Mechanic" },
  { id: 5, name: "Kavita Patel", village: "Village B", level: 2, levelName: "Planner", score: 48, xp: 150, businessType: "Handicraft" },
  { id: 6, name: "Vikram Yadav", village: "Village A", level: 1, levelName: "Dreamer", score: 35, xp: 80, businessType: "Farming" },
  { id: 7, name: "Meera Joshi", village: "Village C", level: 1, levelName: "Dreamer", score: 28, xp: 60, businessType: "Transport" },
  { id: 8, name: "Suresh Gupta", village: "Village B", level: 0, levelName: "Dreamer", score: 15, xp: 20, businessType: "General Shop" }
];
