import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questId, action, reviewerId, notes } = body; // action: "approve" | "reject"
    
    // TODO: Add admin authentication check
    // TODO: Update quest status in database
    // TODO: If approved, update user's XP, coins, and level
    // TODO: Recalculate eligibility score
    // TODO: Send notification to user
    
    console.log("Quest review:", { questId, action, reviewerId, notes });
    
    if (action === "approve") {
      // TODO: Award XP and coins
      // TODO: Check for level up
      // TODO: Update eligibility score
    }
    
    return NextResponse.json({
      success: true,
      message: `Quest ${action}d successfully`,
      data: {
        questId,
        status: action === "approve" ? "approved" : "rejected",
        reviewedAt: new Date().toISOString(),
        reviewedBy: reviewerId
      }
    });
  } catch (error) {
    console.error("Error reviewing quest:", error);
    return NextResponse.json(
      { success: false, error: "Failed to review quest" },
      { status: 500 }
    );
  }
}
