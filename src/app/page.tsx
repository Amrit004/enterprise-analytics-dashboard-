"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, TrendingUp, Users, DollarSign, Activity, 
  ArrowUp, ArrowDown, Globe, Zap, Brain, Database,
  PieChart, LineChart, Map, RefreshCw
} from "lucide-react";

const metrics = [
  { label: "Total Revenue", value: "$2.4M", change: "+12.5%", up: true, icon: DollarSign },
  { label: "Active Users", value: "48.2K", change: "+8.2%", up: true, icon: Users },
  { label: "Conversion Rate", value: "3.24%", change: "+1.8%", up: true, icon: TrendingUp },
  { label: "Avg Session", value: "4m 32s", change: "-2.1%", up: false, icon: Activity },
];

const chartData = [
  { name: "Jan", revenue: 180, users: 120, conversion: 2.1 },
  { name: "Feb", revenue: 220, users: 180, conversion: 2.4 },
  { name: "Mar", revenue: 280, users: 240, conversion: 2.8 },
  { name: "Apr", revenue: 320, users: 280, conversion: 3.1 },
  { name: "May", revenue: 380, users: 340, conversion: 3.4 },
  { name: "Jun", revenue: 420, users: 380, conversion: 3.6 },
];

const topSources = [
  { name: "Organic Search", value: 42, color: "bg-cyan-500" },
  { name: "Direct", value: 28, color: "bg-purple-500" },
  { name: "Social", value: 18, color: "bg-green-500" },
  { name: "Referral", value: 12, color: "bg-orange-500" },
];

const predictions = [
  { metric: "Revenue (Jul)", predicted: "$480K", confidence: "94%" },
  { metric: "Users (Jul)", predicted: "45K", confidence: "91%" },
  { metric: "Conversion (Jul)", predicted: "3.9%", confidence: "88%" },
];

const realTimeUsers = [
  { country: "United States", users: 1240, flag: "🇺🇸" },
  { country: "United Kingdom", users: 840, flag: "🇬🇧" },
  { country: "Germany", users: 620, flag: "🇩🇪" },
  { country: "France", users: 480, flag: "🇫🇷" },
  { country: "Canada", users: 320, flag: "🇨🇦" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">DataViz Pro</h1>
                <p className="text-xs text-slate-400">Enterprise Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-400">Last Updated</p>
                <p className="text-sm">{lastUpdate.toLocaleTimeString()}</p>
              </div>
              <button 
                onClick={refresh}
                className={`p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all ${isLoading ? 'animate-spin' : ''}`}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Dashboard Overview</h2>
            <p className="text-slate-400">Real-time analytics with AI-powered insights</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live Data
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <metric.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <span className={`flex items-center gap-1 text-sm ${metric.up ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.up ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {metric.change}
                </span>
              </div>
              <p className="text-3xl font-bold mb-1">{metric.value}</p>
              <p className="text-slate-400 text-sm">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Revenue & User Growth</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs">Revenue</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs">Users</span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-4">
              {chartData.map((d, i) => (
                <div key={d.name} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex gap-2 items-end h-48">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.revenue / 500) * 100}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.users / 500) * 100}%` }}
                      transition={{ delay: i * 0.1 + 0.1, duration: 0.5 }}
                      className="flex-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg"
                    />
                  </div>
                  <span className="text-xs text-slate-400">{d.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold mb-6">Traffic Sources</h3>
            <div className="space-y-4">
              {topSources.map((source) => (
                <div key={source.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{source.name}</span>
                    <span>{source.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${source.value}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className={`h-full ${source.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold">AI Predictions</h3>
            </div>
            <div className="space-y-4">
              {predictions.map((pred) => (
                <div key={pred.metric} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                  <div>
                    <p className="text-sm text-slate-400">{pred.metric}</p>
                    <p className="text-2xl font-bold text-cyan-400">{pred.predicted}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Confidence</p>
                    <p className="text-green-400 font-semibold">{pred.confidence}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold">Live Users by Region</h3>
            </div>
            <div className="space-y-3">
              {realTimeUsers.map((country) => (
                <div key={country.country} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <span>{country.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-semibold">{country.users.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-semibold">Real-Time Events</h3>
            </div>
            <span className="text-sm text-slate-400">Last 24 hours</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Page Views", value: "124,532" },
              { label: "Unique Visitors", value: "48,291" },
              { label: "Bounce Rate", value: "32.4%" },
              { label: "Avg. Time", value: "3m 42s" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 bg-slate-800/50 rounded-xl">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
