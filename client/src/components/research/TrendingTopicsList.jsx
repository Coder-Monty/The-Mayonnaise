import React from 'react';
import { TrendingUp, Compass } from 'lucide-react';

export default function TrendingTopicsList({ trends = [] }) {
  const getConfidenceBadge = (confidence) => {
    if (confidence === 'High') return 'bg-[#A8E6A1]/40 text-[#2E7D32] border-[#6FCB65]';
    if (confidence === 'Medium') return 'bg-[#FEF08A]/40 text-[#854D0E] border-[#FDE047]';
    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <div className="bg-white rounded-[12px] p-6 border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-[#E5E7EB]">
        <TrendingUp className="w-5 h-5 text-[#6FCB65]" />
        <h3 className="text-base font-bold text-[#1F2937]">Trending Subtopics & Angles</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trends.map((item, idx) => (
          <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-[#E5E7EB] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-sm font-bold text-[#1F2937]">{item.topic}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getConfidenceBadge(item.confidence)}`}>
                  {item.confidence} Confidence
                </span>
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed">{item.whyTrending}</p>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <span className="text-[11px] font-bold text-[#1F2937] flex items-center gap-1 mb-0.5">
                <Compass className="w-3.5 h-3.5 text-[#6FCB65]" />
                Suggested Angle
              </span>
              <p className="text-xs text-[#1F2937] italic font-medium">{item.suggestedAngle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
