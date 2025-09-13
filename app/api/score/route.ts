import { NextRequest, NextResponse } from "next/server";

// Mock scoring function - will be replaced with actual implementation
function computeEligibility(input: {
  revenue: number[];
  expenses: number[];
  inventory_value: number;
  questsApproved: number;
  coreQuests: number;
  govId: boolean;
  hasRef: boolean;
}) {
  const eps = 1e-6;
  const avgRev = input.revenue.reduce((a, b) => a + b, 0) / Math.max(1, input.revenue.length);
  const mean = avgRev || eps;
  const sd = Math.sqrt(input.revenue.map(r => (r - mean) ** 2).reduce((a, b) => a + b, 0) / Math.max(1, input.revenue.length));
  
  const RevenueStability = Math.max(0, Math.min(1, 1 - sd / Math.max(mean, eps)));
  const ExpenseDiscipline = Math.max(0, Math.min(1, 1 - (avgRev ? (input.expenses.reduce((a, b) => a + b, 0) / Math.max(1, input.expenses.length)) / avgRev : 1)));
  const InventorySignal = Math.max(0, Math.min(1, Math.log1p(input.inventory_value) / Math.log1p(1000))); // 1000 = demo cap
  const QuestCompletion = Math.max(0, Math.min(1, input.questsApproved / Math.max(1, input.coreQuests)));
  const DocsPresent = input.govId ? 1 : 0;
  const CommunityRef = input.hasRef ? 1 : 0;
  
  const raw = 0.25 * RevenueStability + 0.15 * ExpenseDiscipline + 0.20 * InventorySignal +
              0.20 * QuestCompletion + 0.10 * DocsPresent + 0.10 * CommunityRef;
  
  return Math.round(Math.max(0, Math.min(1, raw)) * 100);
}

export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check
    // TODO: Get user's business data from Supabase
    // TODO: Calculate actual eligibility score
    
    // Mock data for demonstration
    const mockData = {
      revenue: [1000, 1200, 800, 1500, 1100, 900, 1300],
      expenses: [600, 700, 500, 800, 650, 550, 750],
      inventory_value: 5000,
      questsApproved: 3,
      coreQuests: 8,
      govId: false,
      hasRef: true
    };
    
    const score = computeEligibility(mockData);
    
    const breakdown = {
      revenueStability: Math.round((1 - Math.sqrt(mockData.revenue.map(r => (r - 1100) ** 2).reduce((a, b) => a + b, 0) / 7) / 1100) * 100),
      expenseDiscipline: Math.round((1 - 650 / 1100) * 100),
      inventorySignal: Math.round((Math.log1p(5000) / Math.log1p(1000)) * 100),
      questCompletion: Math.round((3 / 8) * 100),
      docsPresent: mockData.govId ? 100 : 0,
      communityRef: mockData.hasRef ? 100 : 0
    };
    
    const tips = [];
    if (breakdown.expenseDiscipline < 50) tips.push("Track expenses daily; aim expenses ≤ 70% of sales.");
    if (breakdown.docsPresent === 0) tips.push("Upload national ID (photo allowed).");
    if (breakdown.questCompletion < 60) tips.push("Finish required quests Q2, Q3, Q5.");
    
    return NextResponse.json({
      success: true,
      data: {
        eligibilityScore: score,
        breakdown,
        tips,
        level: Math.floor(score / 20), // Simple level calculation
        xp: 150, // Mock XP
        coins: 25 // Mock coins
      }
    });
  } catch (error) {
    console.error("Error calculating score:", error);
    return NextResponse.json(
      { success: false, error: "Failed to calculate score" },
      { status: 500 }
    );
  }
}
