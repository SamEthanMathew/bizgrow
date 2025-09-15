"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShopResponse } from "@/lib/types";
import { ShopItemWithCategory, mockShopItems } from "@/lib/data/shopMockData";

export default function ShopPage() {
  const [shopData, setShopData] = useState<ShopResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [balanceAnimation, setBalanceAnimation] = useState(false);

  // Get user balance from localStorage or default to 100
  const getUserBalance = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userBizCoins');
      return stored ? parseInt(stored, 10) : 100;
    }
    return 100;
  };

  // Update user balance in localStorage
  const updateUserBalance = (newBalance: number) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userBizCoins', newBalance.toString());
    }
  };

  useEffect(() => {
    // Initialize user balance if it doesn't exist
    if (typeof window !== 'undefined' && !localStorage.getItem('userBizCoins')) {
      localStorage.setItem('userBizCoins', '100');
    }
    fetchShopData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retryCount]);

  const fetchShopData = async () => {
    try {
      console.log('Fetching shop data...');
      const response = await fetch('/api/shop');
      console.log('Shop API response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Shop API result:', result);
      
      if (result.success) {
        // Update the balance with the actual user balance from localStorage
        const userBalance = getUserBalance();
        setShopData({
          ...result.data,
          user_balance: userBalance
        });
        console.log('Shop data loaded successfully:', result.data);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to load shop data' });
      }
    } catch (error) {
      console.error('Shop fetch error:', error);
      if (retryCount < 2) {
        console.log(`Retrying... attempt ${retryCount + 1}`);
        setRetryCount(prev => prev + 1);
        setTimeout(() => {
          fetchShopData();
        }, 1000);
        return;
      }
      setMessage({ type: 'error', text: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}` });
      
      // Fallback to mock data if all retries failed
      console.log('Using fallback mock data');
      const userBalance = getUserBalance();
      setShopData({
        user_balance: userBalance,
        items: mockShopItems
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (itemId: number) => {
    setPurchasing(itemId);
    setMessage(null);
    
    try {
      console.log('Attempting to purchase item:', itemId);
      const currentBalance = getUserBalance();
      const response = await fetch('/api/shop/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, currentBalance }),
      });
      
      console.log('Purchase API response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Purchase API result:', result);
      
      if (result.success) {
        // Update the user's balance in localStorage
        const newBalance = result.data.new_balance;
        updateUserBalance(newBalance);
        
        setMessage({ 
          type: 'success', 
          text: `Successfully purchased ${result.data.item.title}! New balance: ${newBalance} coins` 
        });
        
        // Update the local state immediately
        if (shopData) {
          setShopData({
            ...shopData,
            user_balance: newBalance
          });
        }
        
        // Trigger balance animation
        setBalanceAnimation(true);
        setTimeout(() => setBalanceAnimation(false), 1000);
      } else {
        setMessage({ 
          type: 'error', 
          text: result.error || 'Purchase failed' 
        });
      }
    } catch (error) {
      console.error('Purchase error:', error);
      
      // Fallback to mock purchase if API fails
      const item = mockShopItems.find(i => i.id === itemId);
      if (item) {
        console.log('Using fallback mock purchase');
        const currentBalance = getUserBalance();
        const newBalance = Math.max(0, currentBalance - item.coin_price);
        
        // Update balance in localStorage
        updateUserBalance(newBalance);
        
        setMessage({ 
          type: 'success', 
          text: `Successfully purchased ${item.title}! New balance: ${newBalance} coins (Mock purchase - API unavailable)` 
        });
        
        // Update balance locally
        if (shopData) {
          setShopData({
            ...shopData,
            user_balance: newBalance
          });
        }
        
        // Trigger balance animation
        setBalanceAnimation(true);
        setTimeout(() => setBalanceAnimation(false), 1000);
      } else {
        setMessage({ type: 'error', text: `Purchase error: ${error instanceof Error ? error.message : 'Unknown error'}` });
      }
    } finally {
      setPurchasing(null);
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'consultation': return 'Consultation';
      case 'template': return 'Template';
      case 'service': return 'Service';
      case 'guide': return 'Guide';
      case 'training': return 'Training';
      default: return 'Item';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f4f2ee 0%, #eceae3 100%)' }}>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#2d892c' }}></div>
            <p style={{ color: '#545454' }}>Loading shop...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f4f2ee 0%, #eceae3 100%)' }}>
      {/* Header */}
      <div className="backdrop-blur-sm shadow-lg border-b" style={{ backgroundColor: '#f4f2ee', borderColor: '#eceae3' }}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/" 
              className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              style={{ backgroundColor: '#2d892c' }}
              onMouseEnter={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = '#153930'; }}
              onMouseLeave={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = '#2d892c'; }}
            >
              <span className="text-white text-xl font-bold">←</span>
            </Link>
            <div>
              <h1 className="text-4xl font-bold" style={{ color: '#153930' }}>BizGrow Shop</h1>
              <p className="mt-2 text-lg" style={{ color: '#545454' }}>Spend your BizCoins on valuable business resources</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Balance Display */}
        {shopData && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="backdrop-blur-sm rounded-2xl shadow-xl p-6 border" style={{ backgroundColor: '#f4f2ee', borderColor: '#eceae3' }}>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-4xl mr-3">🪙</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#545454' }}>Your Balance</p>
                      <p 
                        className={`text-4xl font-bold transition-all duration-500 ${balanceAnimation ? 'scale-110 text-yellow-600' : ''}`}
                        style={{ color: balanceAnimation ? '#D97706' : '#153930' }}
                      >
                        {shopData.user_balance}
                      </p>
                      <p className="text-sm font-semibold" style={{ color: '#2d892c' }}>BizCoins</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div className={`max-w-4xl mx-auto mb-6 p-4 rounded-xl flex items-center ${
            message.type === 'success' 
              ? 'border border-green-200' 
              : 'border border-red-200'
          }`} style={{ 
            backgroundColor: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
            color: message.type === 'success' ? '#166534' : '#dc2626'
          }}>
            <span className="text-2xl mr-3">{message.type === 'success' ? '✅' : '❌'}</span>
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        {/* Shop Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {(shopData?.items as ShopItemWithCategory[])?.map((item) => (
            <div
              key={item.id}
              className="backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              style={{ 
                backgroundColor: '#f4f2ee',
                borderColor: '#eceae3'
              }}
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: item.gradient }}
                >
                  {getCategoryLabel(item.category)}
                </span>
                <span className="text-3xl">{item.icon}</span>
              </div>
              
              {/* Item Details */}
              <h3 className="text-xl font-bold mb-3" style={{ color: '#153930' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#545454' }}>{item.description}</p>
              
              {/* Price and Buy Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-xl" style={{ backgroundColor: '#737373' }}>
                  <span className="text-white text-lg">🪙</span>
                  <span className="text-sm font-bold text-white">{item.coin_price}</span>
                </div>
                
                <button
                  onClick={() => handlePurchase(item.id)}
                  disabled={purchasing === item.id || (shopData?.user_balance || 0) < item.coin_price}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                    purchasing === item.id
                      ? 'cursor-not-allowed'
                      : (shopData?.user_balance || 0) < item.coin_price
                      ? 'cursor-not-allowed'
                      : 'hover:-translate-y-1'
                  }`}
                  style={{
                    backgroundColor: purchasing === item.id 
                      ? '#737373' 
                      : (shopData?.user_balance || 0) < item.coin_price
                      ? '#737373'
                      : '#2d892c',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    if (e.target instanceof HTMLButtonElement && !e.target.disabled) {
                      e.target.style.backgroundColor = '#153930';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (e.target instanceof HTMLButtonElement && !e.target.disabled) {
                      e.target.style.backgroundColor = '#2d892c';
                    }
                  }}
                >
                  {purchasing === item.id ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Buying...
                    </div>
                  ) : (shopData?.user_balance || 0) < item.coin_price ? (
                    'Insufficient'
                  ) : (
                    'Buy Now'
                  )}
                </button>
              </div>
              
              {/* Insufficient Coins Warning */}
              {(shopData?.user_balance || 0) < item.coin_price && (
                <div className="mt-3 p-2 rounded-lg" style={{ backgroundColor: '#eceae3' }}>
                  <p className="text-xs text-center font-medium" style={{ color: '#545454' }}>
                    Need {item.coin_price - (shopData?.user_balance || 0)} more coins
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {shopData?.items.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🛒</span>
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#153930' }}>No Items Available</h3>
            <p style={{ color: '#545454' }}>Check back later for new items!</p>
          </div>
        )}

        {/* How to Earn Coins */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="backdrop-blur-sm rounded-2xl shadow-xl p-8 border" style={{ backgroundColor: '#f4f2ee', borderColor: '#eceae3' }}>
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#153930' }}>How to Earn BizCoins</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center p-4 rounded-xl" style={{ backgroundColor: '#2d892c' }}>
                <span className="text-3xl mr-4">⚡</span>
                <div>
                  <p className="font-bold text-white text-lg">Complete Quests</p>
                  <p className="text-sm text-white opacity-90">Earn 10-50 coins per quest</p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-xl" style={{ backgroundColor: '#737373' }}>
                <span className="text-3xl mr-4">📊</span>
                <div>
                  <p className="font-bold text-white text-lg">Log Sales</p>
                  <p className="text-sm text-white opacity-90">Earn 5 coins per entry</p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-xl" style={{ backgroundColor: '#545454' }}>
                <span className="text-3xl mr-4">🎯</span>
                <div>
                  <p className="font-bold text-white text-lg">Level Up</p>
                  <p className="text-sm text-white opacity-90">Earn bonus coins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
