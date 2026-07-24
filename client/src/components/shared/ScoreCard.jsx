import React from 'react';

export default function ScoreCard({ label, value = 0 }) {
  const getScoreColor = (val) => {
    if (val >= 80) return 'text-[#2E7D32] bg-[#A8E6A1]/40 border-[#A8E6A1]';
    if (val >= 60) return 'text-[#B78103] bg-[#FEF08A]/40 border-[#FDE047]';
    return 'text-[#C62828] bg-[#FCA5A5]/30 border-[#FCA5A5]';
  };

  const getBarColor = (val) => {
    if (val >= 80) return 'bg-[#6FCB65]';
    if (val >= 60) return 'bg-[#EAB308]';
    return 'bg-[#EF4444]';
  };

  return (
    <div className="bg-white rounded-[12px] p-4 border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-3">
      <div className="flex justify-between items-start">
        <span className="text-sm font-medium text-[#6B7280] capitalize">{label}</span>
        <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${getScoreColor(value)}`}>
          {value}/100
        </span>
      </div>
      
      <div>
        <div className="flex justify-between text-xs text-[#6B7280] mb-1 font-medium">
          <span>Performance</span>
          <span>{value}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${getBarColor(value)}`}
            style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
