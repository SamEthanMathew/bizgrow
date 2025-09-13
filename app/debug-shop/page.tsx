"use client";

import { useState } from "react";

export default function DebugShopPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      console.log('Testing API...');
      const response = await fetch('/api/shop');
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const data = await response.json();
      console.log('Response data:', data);
      setResult(data);
    } catch (error) {
      console.error('API test error:', error);
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const testPurchase = async () => {
    setLoading(true);
    try {
      console.log('Testing purchase...');
      const response = await fetch('/api/shop/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: 1 }),
      });
      
      const data = await response.json();
      console.log('Purchase response:', data);
      setResult(data);
    } catch (error) {
      console.error('Purchase test error:', error);
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8" style={{ background: 'linear-gradient(135deg, #f4f2ee 0%, #eceae3 100%)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#153930' }}>Shop API Debug</h1>
        
        <div className="space-y-4 mb-8">
          <button
            onClick={testAPI}
            disabled={loading}
            className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300"
            style={{ backgroundColor: '#2d892c' }}
          >
            {loading ? 'Testing...' : 'Test Shop API'}
          </button>
          
          <button
            onClick={testPurchase}
            disabled={loading}
            className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 ml-4"
            style={{ backgroundColor: '#737373' }}
          >
            {loading ? 'Testing...' : 'Test Purchase API'}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#153930' }}>API Response:</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
