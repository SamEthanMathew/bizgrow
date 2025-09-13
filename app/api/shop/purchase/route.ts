import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/client';
import { PurchaseResponse, ShopItem } from '@/lib/types';
import { mockShopItems, ShopItemWithCategory } from '@/lib/data/shopMockData';

export async function POST(request: Request) {
  try {
    const { itemId, currentBalance } = await request.json();
    
    if (!itemId || typeof itemId !== 'number') {
      return NextResponse.json({
        success: false,
        error: 'Invalid item ID'
      }, { status: 400 });
    }
    
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project') || supabaseKey.includes('your-anon-key')) {
      // Mock purchase logic
      console.log('Supabase not configured, using mock purchase logic');
      
      const item = mockShopItems.find(i => i.id === itemId) as ShopItemWithCategory;
      if (!item) {
        return NextResponse.json({
          success: false,
          error: 'Item not found'
        }, { status: 404 });
      }
      
      // Use the current balance from the frontend, or default to 100
      const mockUserBalance = currentBalance || 100;
      
      if (mockUserBalance < item.coin_price) {
        return NextResponse.json({
          success: false,
          error: 'Insufficient coins',
          required: item.coin_price,
          available: mockUserBalance
        }, { status: 400 });
      }
      
      // Convert extended item to basic ShopItem for response
      const basicItem: ShopItem = {
        id: item.id,
        title: item.title,
        description: item.description,
        coin_price: item.coin_price,
        is_active: item.is_active,
        created_at: item.created_at,
        updated_at: item.updated_at
      };
      
      // Mock successful purchase
      return NextResponse.json({
        success: true,
        data: {
          purchase_id: Math.floor(Math.random() * 10000),
          item: basicItem,
          new_balance: mockUserBalance - item.coin_price
        }
      });
    }
    
    const supabase = createServerClient();
    
    if (!supabase) {
      // Fallback to mock data if client creation failed
      const item = mockShopItems.find(i => i.id === itemId) as ShopItemWithCategory;
      if (!item) {
        return NextResponse.json({
          success: false,
          error: 'Item not found'
        }, { status: 404 });
      }
      
      const mockUserBalance = 100;
      if (mockUserBalance < item.coin_price) {
        return NextResponse.json({
          success: false,
          error: 'Insufficient coins',
          required: item.coin_price,
          available: mockUserBalance
        }, { status: 400 });
      }
      
      const basicItem: ShopItem = {
        id: item.id,
        title: item.title,
        description: item.description,
        coin_price: item.coin_price,
        is_active: item.is_active,
        created_at: item.created_at,
        updated_at: item.updated_at
      };
      
      return NextResponse.json({
        success: true,
        data: {
          purchase_id: Math.floor(Math.random() * 10000),
          item: basicItem,
          new_balance: mockUserBalance - item.coin_price
        }
      });
    }
    
    // For demo purposes, we'll use a mock user ID
    // In a real app, this would come from authentication
    const userId = 'demo-user-123';
    
    // Call the atomic purchase RPC function
    const { data, error } = await supabase.rpc('purchase_shop_item', {
      p_user_id: userId,
      p_item_id: itemId
    });
    
    if (error) {
      console.error('Purchase RPC error:', error);
      return NextResponse.json({
        success: false,
        error: 'Purchase failed: ' + error.message
      }, { status: 500 });
    }
    
    const result = data as PurchaseResponse;
    
    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error,
        required: result.required,
        available: result.available
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: true,
      data: {
        purchase_id: result.purchase_id,
        item: result.item,
        new_balance: result.new_balance
      }
    });
    
  } catch (error) {
    console.error('Purchase API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
