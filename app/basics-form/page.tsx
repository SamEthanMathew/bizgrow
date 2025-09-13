"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const BUSINESS_SECTORS = [
  { id: "retail", name: "Retail & Trade", icon: "🏪", description: "General stores, shops, trading" },
  { id: "food", name: "Food & Beverage", icon: "🍜", description: "Restaurants, food carts, catering" },
  { id: "services", name: "Services", icon: "🔧", description: "Repair, maintenance, professional services" },
  { id: "manufacturing", name: "Manufacturing", icon: "🏭", description: "Production, assembly, processing" },
  { id: "agriculture", name: "Agriculture", icon: "🌾", description: "Farming, livestock, crops" },
  { id: "handicraft", name: "Handicraft", icon: "🎨", description: "Artisan work, crafts, handmade items" },
  { id: "transport", name: "Transport", icon: "🚚", description: "Logistics, delivery, transportation" },
  { id: "technology", name: "Technology", icon: "💻", description: "IT services, digital solutions" },
  { id: "healthcare", name: "Healthcare", icon: "🏥", description: "Medical, wellness, health services" },
  { id: "education", name: "Education", icon: "📚", description: "Training, tutoring, educational services" },
  { id: "other", name: "Other", icon: "💼", description: "Other business types" },
];

const REVENUE_RANGES = [
  { id: "0-10k", label: "¥0 - ¥10,000", description: "Very small business" },
  { id: "10k-25k", label: "¥10,000 - ¥25,000", description: "Small business" },
  { id: "25k-50k", label: "¥25,000 - ¥50,000", description: "Growing business" },
  { id: "50k-100k", label: "¥50,000 - ¥100,000", description: "Established business" },
  { id: "100k-250k", label: "¥100,000 - ¥250,000", description: "Medium business" },
  { id: "250k-500k", label: "¥250,000 - ¥500,000", description: "Large business" },
  { id: "500k+", label: "¥500,000+", description: "Enterprise level" },
];

const EXPENSE_RANGES = [
  { id: "0-5k", label: "¥0 - ¥5,000", description: "Minimal expenses" },
  { id: "5k-15k", label: "¥5,000 - ¥15,000", description: "Low expenses" },
  { id: "15k-30k", label: "¥15,000 - ¥30,000", description: "Moderate expenses" },
  { id: "30k-60k", label: "¥30,000 - ¥60,000", description: "High expenses" },
  { id: "60k-100k", label: "¥60,000 - ¥100,000", description: "Very high expenses" },
  { id: "100k+", label: "¥100,000+", description: "Enterprise expenses" },
];

export default function BasicsFormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessSector: "",
    monthlyRevenue: "",
    monthlyExpenses: "",
    businessDescription: "",
    yearsInBusiness: "",
    employeeCount: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save form data and redirect back to quests
    console.log("Basics form submitted:", formData);
    router.push("/quests");
  };

  const isFormValid = formData.businessSector && formData.monthlyRevenue && formData.monthlyExpenses;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f4f2ee 0%, #eceae3 100%)' }}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#2d892c', color: 'white' }}>
              📝 Quest: Basics Form
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#153930' }}>Business Basics</h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#545454' }}>
            Tell us about your business sector and revenue/expense ranges to help us understand your business better
          </p>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto backdrop-blur-sm rounded-2xl shadow-2xl p-10 border" style={{ backgroundColor: '#f4f2ee', borderColor: '#eceae3' }}>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business Sector */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#153930' }}>🏢 Business Sector</h2>
              <p className="text-lg mb-6" style={{ color: '#545454' }}>What sector does your business operate in?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BUSINESS_SECTORS.map((sector) => (
                  <button
                    key={sector.id}
                    type="button"
                    onClick={() => handleInputChange("businessSector", sector.id)}
                    className={`p-4 border-2 rounded-xl text-left transition-all duration-300 transform hover:-translate-y-1 ${
                      formData.businessSector === sector.id
                        ? "shadow-lg"
                        : "hover:shadow-md"
                    }`}
                    style={{
                      borderColor: formData.businessSector === sector.id ? '#2d892c' : '#737373',
                      backgroundColor: formData.businessSector === sector.id ? '#f4f2ee' : '#eceae3'
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{sector.icon}</div>
                      <div>
                        <div className="font-bold text-sm" style={{ color: '#153930' }}>{sector.name}</div>
                        <div className="text-xs mt-1" style={{ color: '#545454' }}>{sector.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Revenue Range */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#153930' }}>💰 Monthly Revenue Range</h2>
              <p className="text-lg mb-6" style={{ color: '#545454' }}>What is your approximate monthly revenue?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REVENUE_RANGES.map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => handleInputChange("monthlyRevenue", range.id)}
                    className={`p-4 border-2 rounded-xl text-left transition-all duration-300 transform hover:-translate-y-1 ${
                      formData.monthlyRevenue === range.id
                        ? "shadow-lg"
                        : "hover:shadow-md"
                    }`}
                    style={{
                      borderColor: formData.monthlyRevenue === range.id ? '#2d892c' : '#737373',
                      backgroundColor: formData.monthlyRevenue === range.id ? '#f4f2ee' : '#eceae3'
                    }}
                  >
                    <div className="font-bold text-lg" style={{ color: '#153930' }}>{range.label}</div>
                    <div className="text-sm mt-1" style={{ color: '#545454' }}>{range.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Expense Range */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#153930' }}>💸 Monthly Expense Range</h2>
              <p className="text-lg mb-6" style={{ color: '#545454' }}>What are your approximate monthly business expenses?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXPENSE_RANGES.map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => handleInputChange("monthlyExpenses", range.id)}
                    className={`p-4 border-2 rounded-xl text-left transition-all duration-300 transform hover:-translate-y-1 ${
                      formData.monthlyExpenses === range.id
                        ? "shadow-lg"
                        : "hover:shadow-md"
                    }`}
                    style={{
                      borderColor: formData.monthlyExpenses === range.id ? '#2d892c' : '#737373',
                      backgroundColor: formData.monthlyExpenses === range.id ? '#f4f2ee' : '#eceae3'
                    }}
                  >
                    <div className="font-bold text-lg" style={{ color: '#153930' }}>{range.label}</div>
                    <div className="text-sm mt-1" style={{ color: '#545454' }}>{range.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#153930' }}>📋 Additional Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#545454' }}>
                    Business Description (Optional)
                  </label>
                  <textarea
                    value={formData.businessDescription}
                    onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ borderColor: '#737373', color: '#153930' }}
                    placeholder="Tell us more about your business..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#545454' }}>
                      Years in Business
                    </label>
                    <select
                      value={formData.yearsInBusiness}
                      onChange={(e) => handleInputChange("yearsInBusiness", e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ borderColor: '#737373', color: '#153930' }}
                    >
                      <option value="">Select years</option>
                      <option value="0">Just starting (0 years)</option>
                      <option value="1">1 year</option>
                      <option value="2">2 years</option>
                      <option value="3">3 years</option>
                      <option value="4">4 years</option>
                      <option value="5">5+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#545454' }}>
                      Number of Employees
                    </label>
                    <select
                      value={formData.employeeCount}
                      onChange={(e) => handleInputChange("employeeCount", e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ borderColor: '#737373', color: '#153930' }}
                    >
                      <option value="">Select count</option>
                      <option value="0">Just me (0 employees)</option>
                      <option value="1">1 employee</option>
                      <option value="2-5">2-5 employees</option>
                      <option value="6-10">6-10 employees</option>
                      <option value="11+">11+ employees</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <button
                type="button"
                onClick={() => router.push("/quests")}
                className="px-8 py-4 border-2 rounded-xl font-semibold text-lg transition-all duration-300"
                style={{ borderColor: '#737373', color: '#545454' }}
                onMouseEnter={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = '#eceae3'; }}
                onMouseLeave={(e) => { if (e.target instanceof HTMLElement) e.target.style.backgroundColor = 'transparent'; }}
              >
                ← Back to Quests
              </button>
              <button
                type="submit"
                disabled={!isFormValid}
                className="px-8 py-4 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-bold text-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{ backgroundColor: isFormValid ? '#2d892c' : '#737373' }}
                onMouseEnter={(e) => { 
                  if (e.target instanceof HTMLElement && isFormValid) {
                    e.target.style.backgroundColor = '#153930'; 
                  }
                }}
                onMouseLeave={(e) => { 
                  if (e.target instanceof HTMLElement && isFormValid) {
                    e.target.style.backgroundColor = '#2d892c'; 
                  }
                }}
              >
                ✅ Complete Quest
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

