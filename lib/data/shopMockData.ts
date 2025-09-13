import { ShopItem, ShopResponse } from '@/lib/types';

export interface ShopItemWithCategory extends ShopItem {
  category: 'service' | 'template' | 'guide' | 'consultation' | 'training';
  icon: string;
  gradient: string;
}

export const mockShopItems: ShopItemWithCategory[] = [
  {
    id: 1,
    title: '30-min Marketing Counseling Session',
    description: 'Talk with a mentor about promotion, pricing, or sales strategy',
    coin_price: 50,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    category: 'consultation',
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #2d892c 0%, #153930 100%)'
  },
  {
    id: 2,
    title: 'Bookkeeping Starter Kit',
    description: 'Simple spreadsheet templates for tracking sales & expenses',
    coin_price: 25,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    category: 'template',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)'
  },
  {
    id: 3,
    title: 'Logo & Flyer Pack',
    description: 'Basic logo + printable flyer designs for shop/product promotion',
    coin_price: 30,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    category: 'template',
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
  },
  {
    id: 4,
    title: 'Social Media Tips Bundle',
    description: 'Step-by-step guide to creating a WeChat/WhatsApp business profile',
    coin_price: 20,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    category: 'guide',
    icon: '📱',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)'
  },
  {
    id: 5,
    title: 'Business Plan Review',
    description: 'Have your generated plan checked and annotated by an advisor',
    coin_price: 60,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    category: 'consultation',
    icon: '📋',
    gradient: 'linear-gradient(135deg, #7C2D12 0%, #991B1B 100%)'
  },
  {
    id: 6,
    title: 'Financial Literacy Quiz Unlock',
    description: 'Extra quizzes for practice with microloan concepts',
    coin_price: 15,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    category: 'training',
    icon: '🧠',
    gradient: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)'
  },
  {
    id: 7,
    title: 'Success Story Library',
    description: 'Access to stories from other entrepreneurs in the community',
    coin_price: 10,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    category: 'guide',
    icon: '📚',
    gradient: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)'
  },
  {
    id: 8,
    title: 'Pro Tips Bundle',
    description: 'Sector-specific "do\'s and don\'ts" (tailoring, food cart, mechanic, etc.)',
    coin_price: 35,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    category: 'guide',
    icon: '💡',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)'
  }
];

export const mockShopResponse: ShopResponse = {
  user_balance: 100,
  items: mockShopItems
};
