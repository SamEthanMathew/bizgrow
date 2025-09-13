-- Create shop_items table
CREATE TABLE IF NOT EXISTS shop_items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  coin_price INTEGER NOT NULL CHECK (coin_price > 0),
  is_active BOOLEAN DEFAULT true,
  category VARCHAR(50) DEFAULT 'item',
  icon VARCHAR(10) DEFAULT '🛍️',
  gradient VARCHAR(255) DEFAULT 'linear-gradient(135deg, #2d892c 0%, #153930 100%)',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shop_purchases table
CREATE TABLE IF NOT EXISTS shop_purchases (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  item_id INTEGER NOT NULL REFERENCES shop_items(id),
  coins_spent INTEGER NOT NULL CHECK (coins_spent > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_shop_purchases_user_id ON shop_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_shop_purchases_item_id ON shop_purchases(item_id);
CREATE INDEX IF NOT EXISTS idx_shop_items_active ON shop_items(is_active);

-- Insert sample shop items
INSERT INTO shop_items (title, description, coin_price, is_active, category, icon, gradient) VALUES
('30-min Marketing Counseling Session', 'Talk with a mentor about promotion, pricing, or sales strategy', 50, true, 'consultation', '🎯', 'linear-gradient(135deg, #2d892c 0%, #153930 100%)'),
('Bookkeeping Starter Kit', 'Simple spreadsheet templates for tracking sales & expenses', 25, true, 'template', '📊', 'linear-gradient(135deg, #059669 0%, #047857 100%)'),
('Logo & Flyer Pack', 'Basic logo + printable flyer designs for shop/product promotion', 30, true, 'template', '🎨', 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'),
('Social Media Tips Bundle', 'Step-by-step guide to creating a WeChat/WhatsApp business profile', 20, true, 'guide', '📱', 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)'),
('Business Plan Review', 'Have your generated plan checked and annotated by an advisor', 60, true, 'consultation', '📋', 'linear-gradient(135deg, #7C2D12 0%, #991B1B 100%)'),
('Financial Literacy Quiz Unlock', 'Extra quizzes for practice with microloan concepts', 15, true, 'training', '🧠', 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)'),
('Success Story Library', 'Access to stories from other entrepreneurs in the community', 10, true, 'guide', '📚', 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)'),
('Pro Tips Bundle', 'Sector-specific "do''s and don''ts" (tailoring, food cart, mechanic, etc.)', 35, true, 'guide', '💡', 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)');

-- Create RPC function for atomic purchases
CREATE OR REPLACE FUNCTION purchase_shop_item(
  p_user_id VARCHAR(255),
  p_item_id INTEGER
) RETURNS JSON AS $$
DECLARE
  v_item shop_items%ROWTYPE;
  v_user_coins INTEGER;
  v_purchase_id INTEGER;
  v_result JSON;
BEGIN
  -- Get item details
  SELECT * INTO v_item FROM shop_items WHERE id = p_item_id AND is_active = true;
  
  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Item not found or inactive'
    );
  END IF;
  
  -- Get user's current coin balance (assuming scores table exists)
  -- For now, we'll use a mock value - in real implementation, this would come from scores table
  SELECT COALESCE(coins_total, 0) INTO v_user_coins 
  FROM scores 
  WHERE user_id = p_user_id;
  
  -- If scores table doesn't exist yet, use a default value
  IF v_user_coins IS NULL THEN
    v_user_coins := 100; -- Default starting coins
  END IF;
  
  -- Check if user has enough coins
  IF v_user_coins < v_item.coin_price THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Insufficient coins',
      'required', v_item.coin_price,
      'available', v_user_coins
    );
  END IF;
  
  -- Start transaction
  BEGIN
    -- Insert purchase record
    INSERT INTO shop_purchases (user_id, item_id, coins_spent)
    VALUES (p_user_id, p_item_id, v_item.coin_price)
    RETURNING id INTO v_purchase_id;
    
    -- Update user's coin balance
    UPDATE scores 
    SET coins_total = coins_total - v_item.coin_price,
        updated_at = NOW()
    WHERE user_id = p_user_id;
    
    -- If scores record doesn't exist, create it
    IF NOT FOUND THEN
      INSERT INTO scores (user_id, coins_total, xp_total, eligibility_score, level, updated_at)
      VALUES (p_user_id, v_user_coins - v_item.coin_price, 0, 0, 0, NOW());
    END IF;
    
    -- Get updated balance
    SELECT coins_total INTO v_user_coins 
    FROM scores 
    WHERE user_id = p_user_id;
    
    -- Return success response
    v_result := json_build_object(
      'success', true,
      'purchase_id', v_purchase_id,
      'item', json_build_object(
        'id', v_item.id,
        'title', v_item.title,
        'description', v_item.description,
        'coin_price', v_item.coin_price
      ),
      'new_balance', v_user_coins
    );
    
    RETURN v_result;
    
  EXCEPTION WHEN OTHERS THEN
    -- Rollback on any error
    RETURN json_build_object(
      'success', false,
      'error', 'Transaction failed: ' || SQLERRM
    );
  END;
END;
$$ LANGUAGE plpgsql;
