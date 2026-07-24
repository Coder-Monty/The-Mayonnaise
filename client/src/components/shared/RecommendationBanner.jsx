import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function RecommendationBanner({ recommendation = '' }) {
  if (!recommendation) return null;

  return (
    <div className="bg-[#A8E6A1]/25 border border-[#6FCB65]/40 rounded-[12px] p-4 flex items-start gap-3 shadow-xs">
      <div className="p-2 rounded-lg bg-[#A8E6A1] text-[#1F2937] shrink-0 mt-0.5">
        <Lightbulb className="w-5 h-5" />
      </div>
      <div>
        <h5 className="text-xs font-bold uppercase tracking-wider text-[#1F2937]/70">Key Recommendation</h5>
        <p className="text-sm font-semibold text-[#1F2937] mt-0.5">{recommendation}</p>
      </div>
    </div>
  );
}
