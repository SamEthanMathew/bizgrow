import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
  // Get previous progress from request (if sent)
  const prevProgress = data.prevProgress || { points: 0, coins: 0, level: 1, unlockedQuests: ["basics_form", "sales_log"] };
  // Add 70 XP to previous XP
  const pointsAwarded = prevProgress.points + 70;
  const coinsAwarded = prevProgress.coins + 10;
  const newLevel = 2;
  // Simulate unlocked next quest (expense_log)
  const unlockedQuests = ["basics_form", "sales_log", "expense_log"];
    // Log for dev
    console.log('Received sales_log data:', data);
    // Return progress info
    return NextResponse.json({
      success: true,
      message: 'Sales log data received',
      data,
      progress: {
        points: pointsAwarded,
        coins: coinsAwarded,
        level: newLevel,
        unlockedQuests,
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error processing sales log data', error: String(error) }, { status: 400 });
  }
}
