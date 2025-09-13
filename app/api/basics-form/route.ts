import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Simulate storing data (in-memory for now)
    // Simulate awarding points and level
    const pointsAwarded = 50;
    const coinsAwarded = 10;
    const newLevel = 1;
    // Simulate unlocked next quest (sales_log)
    const unlockedQuests = ["basics_form", "sales_log"];
    // Log for dev
    console.log('Received basics-form data:', data);
    // Return progress info
    return NextResponse.json({
      success: true,
      message: 'Form data received',
      data,
      progress: {
        points: pointsAwarded,
        coins: coinsAwarded,
        level: newLevel,
        unlockedQuests,
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error processing form data', error: String(error) }, { status: 400 });
  }
}
