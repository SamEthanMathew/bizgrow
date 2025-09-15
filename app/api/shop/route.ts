import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/client';
import { ShopResponse } from '@/lib/types';
import { mockShopItems } from '@/lib/data/shopMockData';

export async function GET() {
  try {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project') || supabaseKey.includes('your-anon-key')) {
      // Return mock data if Supabase is not configured
      console.log('Supabase not configured, returning mock data');
      return NextResponse.json({
        success: true,
        data: {
          user_balance: 100, // Default balance - will be overridden by frontend
          items: mockShopItems
        }
      });
    }
    
    const supabase = createServerClient();
    
    if (!supabase) {
      // Fallback to mock data if client creation failed
      return NextResponse.json({
        success: true,
        data: {
          user_balance: 100,
          items: mockShopItems
        }
      });
    }
    
    // For demo purposes, we'll use a mock user ID
    // In a real app, this would come from authentication
    const userId = 'demo-user-123';
    
    // Get user's coin balance from scores table
    const { data: scoreData, error: scoreError } = await supabase
      .from('scores')
      .select('coins_total')
      .eq('user_id', userId)
      .single();
    
    // If no score record exists, create one with default coins
    let userBalance = 100; // Default starting coins
    if (scoreData) {
      userBalance = scoreData.coins_total;
    } else if (scoreError && scoreError.code === 'PGRST116') {
      // No record found, create default one
      const { error: insertError } = await supabase
        .from('scores')
        .insert({
          user_id: userId,
          coins_total: 100,
          xp_total: 0,
          eligibility_score: 0,
          level: 0,
          updated_at: new Date().toISOString()
        });
      
      if (insertError) {
        console.error('Error creating default score record:', insertError);
      }
    }
    
    // Get active shop items
    const { data: items, error: itemsError } = await supabase
      .from('shop_items')
      .select('*')
      .eq('is_active', true)
      .order('coin_price', { ascending: true });
    
    if (itemsError) {
      console.error('Error fetching shop items:', itemsError);
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch shop items'
      }, { status: 500 });
    }
    
    const response: ShopResponse = {
      user_balance: userBalance,
      items: items || []
    };
    
    return NextResponse.json({
      success: true,
      data: response
    });
    
  } catch (error) {
    console.error('Shop API error:', error);
    // Fallback to mock data on error
    return NextResponse.json({
      success: true,
      data: {
        user_balance: 100,
        items: mockShopItems
      }
    });
  }
}
