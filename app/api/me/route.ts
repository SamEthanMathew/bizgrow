import { NextRequest, NextResponse } from "next/server";

// Mock user data - will be replaced with Supabase queries
const mockUser = {
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

export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check
    // TODO: Get user data from Supabase
    // TODO: Calculate current level, XP, coins, and eligibility score
    
    return NextResponse.json({
      success: true,
      data: mockUser
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
