import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, BarChart3, Search, History } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { path: '/predictor', label: 'Reel Reviewer', icon: Sparkles },
    { path: '/research', label: 'AI Research', icon: Search },
    { path: '/reports', label: 'Performance Reports', icon: BarChart3 },
    { path: '/history', label: 'History', icon: History },
  ];

  return (
    <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A8E6A1] flex items-center justify-center text-[#1F2937] font-bold text-xl shadow-sm">
              ⚡
            </div>
            <div>
              <span className="text-xl font-bold text-[#1F2937] tracking-tight">Content Intelligence</span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#A8E6A1]/40 text-[#1F2937]">v2</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-[#A8E6A1] text-[#1F2937] font-semibold shadow-xs'
                        : 'text-[#6B7280] hover:text-[#1F2937] hover:bg-gray-100'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
