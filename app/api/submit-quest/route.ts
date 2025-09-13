import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questId, payload, evidenceUrl } = body;
    
    // TODO: Add authentication check
    // TODO: Validate quest data
    // TODO: Save to Supabase user_quests table with status="pending"
    // TODO: Upload evidence file to Supabase storage if provided
    
    console.log("Quest submission:", { questId, payload, evidenceUrl });
    
    // Mock response
    return NextResponse.json({
      success: true,
      message: "Quest submitted successfully",
      data: {
        questId,
        status: "pending",
        submittedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("Error submitting quest:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit quest" },
      { status: 500 }
    );
  }
}
