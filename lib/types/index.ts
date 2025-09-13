// User types
export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  village: string;
  language: string;
  createdAt: string;
}

// Business profile types
export interface BusinessProfile {
  userId: string;
  sector: string;
  monthsInBusiness: number;
  avgMonthlyRevenue: number;
  avgMonthlyExpenses: number;
  inventoryValue: number;
  photoUrl?: string;
  govIdPresent: boolean;
}

// Quest types
export interface Quest {
  id: number;
  key: string;
  title: string;
  description: string;
  xp: number;
  coinReward: number;
  levelGate: number;
  icon: string;
}

export interface UserQuest {
  userId: string;
  questId: number;
  status: "pending" | "submitted" | "approved" | "rejected";
  evidenceUrl?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  submittedAt: string;
}

// Scoring types
export interface ScoreBreakdown {
  revenueStability: number;
  expenseDiscipline: number;
  inventorySignal: number;
  questCompletion: number;
  docsPresent: number;
  communityRef: number;
}

export interface UserScore {
  userId: string;
  eligibilityScore: number;
  level: number;
  xpTotal: number;
  coinsTotal: number;
  updatedAt: string;
}

// Business plan types
export interface BusinessPlan {
  userId: string;
  sector: string;
  planText: Record<string, unknown>; // Will be more specific based on AI response structure
  riskNotes?: string;
  generatedAt: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Level definitions
export const LEVELS = [
  { id: 0, name: "Dreamer", description: "Create profile" },
  { id: 1, name: "Planner", description: "Complete 3 quests incl. Basics Form" },
  { id: 2, name: "Starter", description: "30-day sales log + expense log" },
  { id: 3, name: "Builder", description: "Photo proof + supplier contact + pricing" },
  { id: 4, name: "Seller", description: "First sale logged or reference" },
  { id: 5, name: "Loan-Ready", description: "Score ≥ 70 + mandatory docs" }
] as const;

export type Level = typeof LEVELS[number];
