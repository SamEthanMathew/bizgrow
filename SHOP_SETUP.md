# Shop Feature Setup Guide

## Overview
The Shop feature allows users to spend their BizCoins on valuable business resources like marketing counseling sessions, logo packs, and business plan templates.

## Database Setup

### 1. Run the Migration
Execute the SQL migration file to create the required tables:
```bash
# If using Supabase CLI
supabase db reset
# Or run the migration manually in your Supabase dashboard
```

The migration creates:
- `shop_items` table with sample items
- `shop_purchases` table for transaction history
- `purchase_shop_item` RPC function for atomic transactions

### 2. Environment Variables
Create a `.env.local` file with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

## Features Implemented

### Database Tables
- **shop_items**: Stores available items with prices and descriptions
- **shop_purchases**: Records all purchase transactions
- **Atomic RPC Function**: Ensures purchases are atomic (prevents negative balances)

### API Routes
- **GET /api/shop**: Returns user balance and active shop items
- **POST /api/shop/purchase**: Handles item purchases with atomic transactions

### Frontend
- **Shop Page** (`/shop`): Beautiful UI showing user balance, available items, and purchase functionality
- **Navigation**: Added shop link to main navigation
- **Responsive Design**: Works on mobile and desktop

## Sample Shop Items
The migration includes these default items:
- Marketing Counseling Session (50 coins)
- Logo Pack (30 coins)
- Business Plan Template (25 coins)
- Financial Planning Workshop (75 coins)
- Social Media Marketing Guide (20 coins)
- Customer Service Training (40 coins)

## Usage
1. Users earn BizCoins by completing quests and logging sales
2. Visit `/shop` to see available items and current balance
3. Click "Buy Now" to purchase items (if sufficient coins)
4. Purchases are atomic - either complete successfully or fail safely

## Security Features
- Atomic transactions prevent negative coin balances
- Server-side validation of purchase requests
- Proper error handling and user feedback
- RPC function ensures data consistency

## Customization
- Add new items by inserting into `shop_items` table
- Modify prices by updating `coin_price` column
- Enable/disable items using `is_active` flag
- Customize UI styling in `app/shop/page.tsx`
