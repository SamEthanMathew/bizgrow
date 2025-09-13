import { SCORING_WEIGHTS } from "@/lib/constants";

export interface ScoringInput {
  revenue: number[];
  expenses: number[];
  inventory_value: number;
  questsApproved: number;
  coreQuests: number;
  govId: boolean;
  hasRef: boolean;
}

export interface ScoreBreakdown {
  revenueStability: number;
  expenseDiscipline: number;
  inventorySignal: number;
  questCompletion: number;
  docsPresent: number;
  communityRef: number;
}

export function computeEligibility(input: ScoringInput): { score: number; breakdown: ScoreBreakdown } {
  const eps = 1e-6;
  
  // Calculate average revenue
  const avgRev = input.revenue.reduce((a, b) => a + b, 0) / Math.max(1, input.revenue.length);
  const mean = avgRev || eps;
  
  // Calculate standard deviation for revenue stability
  const sd = Math.sqrt(
    input.revenue.map(r => (r - mean) ** 2).reduce((a, b) => a + b, 0) / 
    Math.max(1, input.revenue.length)
  );
  
  // Revenue Stability: 1 - (standard deviation / mean)
  const RevenueStability = Math.max(0, Math.min(1, 1 - sd / Math.max(mean, eps)));
  
  // Expense Discipline: 1 - (average expenses / average revenue)
  const avgExp = input.expenses.reduce((a, b) => a + b, 0) / Math.max(1, input.expenses.length);
  const ExpenseDiscipline = Math.max(0, Math.min(1, 1 - (avgRev ? avgExp / avgRev : 1)));
  
  // Inventory Signal: log(1 + inventory) / log(1 + upper_bound)
  const InventorySignal = Math.max(0, Math.min(1, Math.log1p(input.inventory_value) / Math.log1p(1000)));
  
  // Quest Completion: approved quests / total core quests
  const QuestCompletion = Math.max(0, Math.min(1, input.questsApproved / Math.max(1, input.coreQuests)));
  
  // Documents Present: binary (0 or 1)
  const DocsPresent = input.govId ? 1 : 0;
  
  // Community Reference: binary (0 or 1)
  const CommunityRef = input.hasRef ? 1 : 0;
  
  // Calculate weighted score
  const raw = 
    SCORING_WEIGHTS.REVENUE_STABILITY * RevenueStability +
    SCORING_WEIGHTS.EXPENSE_DISCIPLINE * ExpenseDiscipline +
    SCORING_WEIGHTS.INVENTORY_SIGNAL * InventorySignal +
    SCORING_WEIGHTS.QUEST_COMPLETION * QuestCompletion +
    SCORING_WEIGHTS.DOCS_PRESENT * DocsPresent +
    SCORING_WEIGHTS.COMMUNITY_REF * CommunityRef;
  
  const score = Math.round(Math.max(0, Math.min(1, raw)) * 100);
  
  const breakdown: ScoreBreakdown = {
    revenueStability: Math.round(RevenueStability * 100),
    expenseDiscipline: Math.round(ExpenseDiscipline * 100),
    inventorySignal: Math.round(InventorySignal * 100),
    questCompletion: Math.round(QuestCompletion * 100),
    docsPresent: Math.round(DocsPresent * 100),
    communityRef: Math.round(CommunityRef * 100)
  };
  
  return { score, breakdown };
}

export function generateImprovementTips(breakdown: ScoreBreakdown): string[] {
  const tips: string[] = [];
  
  if (breakdown.expenseDiscipline < 50) {
    tips.push("Track expenses daily; aim expenses ≤ 70% of sales.");
  }
  
  if (breakdown.docsPresent === 0) {
    tips.push("Upload national ID (photo allowed).");
  }
  
  if (breakdown.questCompletion < 60) {
    tips.push("Finish required quests Q2, Q3, Q5.");
  }
  
  if (breakdown.revenueStability < 60) {
    tips.push("Keep consistent daily sales records to improve revenue stability.");
  }
  
  if (breakdown.inventorySignal < 30) {
    tips.push("Build up your inventory to show business investment.");
  }
  
  if (breakdown.communityRef === 0) {
    tips.push("Get a reference from a supplier or community leader.");
  }
  
  return tips;
}
