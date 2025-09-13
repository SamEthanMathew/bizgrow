import { NextRequest, NextResponse } from "next/server";

// Mock quest data - will be replaced with Supabase queries
const QUESTS = [
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

export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check
    // TODO: Get user's quest statuses from database
    // TODO: Filter quests based on user level
    
    return NextResponse.json({
      success: true,
      data: QUESTS
    });
  } catch (error) {
    console.error("Error fetching quests:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch quests" },
      { status: 500 }
    );
  }
}
