import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StockContext } from "../../context/StocksContext";
import {
  TrendingUp,
  Shield,
  LineChart,
  Users,
  Search,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const { setUpdateSearchData } = useContext(StockContext);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setUpdateSearchData(inputValue); 
    } else {
      setUpdateSearchData("Tata Steel"); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-12 h-12 text-blue-500" />
            <h1 className="text-5xl font-bold text-white">StockAnalysis</h1>
          </div>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-2xl">
            Make informed investment decisions with real-time data analysis,
            advanced charting, and professional insights.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-12">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search for a company (e.g.,Tata Steel, Reliance, MRF)"
                className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition duration-300"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              <span>View Market Overview</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8 text-blue-500" />}
            title="Real-Time Analytics"
            description="Track stock prices, market trends, and key metrics in real-time"
          />
          <FeatureCard
            icon={<LineChart className="w-8 h-8 text-blue-500" />}
            title="Advanced Charts"
            description="Interactive charts with technical indicators and historical data"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-blue-500" />}
            title="Market Insights"
            description="Get detailed company information, financials, and market analysis"
          />
        </div>
      </div>

      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Real-Time Market Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <MarketStat
              label="S&P 500"
              value="4,783.83"
              change="+1.2%"
              positive
            />
            <MarketStat
              label="NASDAQ"
              value="15,003.22"
              change="+0.9%"
              positive
            />
            <MarketStat label="DOW" value="37,305.16" change="-0.3%" />
            <MarketStat label="VIX" value="12.98" change="-5.2%" positive />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg transform hover:scale-105 transition duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function MarketStat({ label, value, change, positive = false }) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-white text-2xl font-bold mb-1">{value}</p>
      <p
        className={`text-sm font-semibold ${positive ? "text-green-500" : "text-red-500"}`}
      >
        {change}
      </p>
    </div>
  );
}
