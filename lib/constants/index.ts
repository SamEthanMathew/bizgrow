// Quest definitions
export const QUESTS = [
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
] as const;

// Business types
export const BUSINESS_TYPES = [
  { id: "shop", name: "General Shop", icon: "🏪" },
  { id: "tailoring", name: "Tailoring", icon: "✂️" },
  { id: "food_cart", name: "Food Cart", icon: "🍜" },
  { id: "mechanic", name: "Mechanic", icon: "🔧" },
  { id: "farming", name: "Farming", icon: "🌾" },
  { id: "handicraft", name: "Handicraft", icon: "🎨" },
  { id: "transport", name: "Transport", icon: "🚚" },
  { id: "other", name: "Other", icon: "💼" }
] as const;

// Level definitions
export const LEVELS = [
  { id: 0, name: "Dreamer", description: "Create profile", xpRequired: 0 },
  { id: 1, name: "Planner", description: "Complete 3 quests incl. Basics Form", xpRequired: 50 },
  { id: 2, name: "Starter", description: "30-day sales log + expense log", xpRequired: 120 },
  { id: 3, name: "Builder", description: "Photo proof + supplier contact + pricing", xpRequired: 200 },
  { id: 4, name: "Seller", description: "First sale logged or reference", xpRequired: 260 },
  { id: 5, name: "Loan-Ready", description: "Score ≥ 70 + mandatory docs", xpRequired: 290 }
] as const;

// Scoring weights
export const SCORING_WEIGHTS = {
  REVENUE_STABILITY: 0.25,
  EXPENSE_DISCIPLINE: 0.15,
  INVENTORY_SIGNAL: 0.20,
  QUEST_COMPLETION: 0.20,
  DOCS_PRESENT: 0.10,
  COMMUNITY_REF: 0.10
} as const;

// Languages
export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "te", name: "Telugu" },
  { code: "mr", name: "Marathi" }
] as const;
