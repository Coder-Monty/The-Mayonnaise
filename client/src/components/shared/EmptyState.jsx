import React from 'react';
import { Sparkles } from 'lucide-react';

export default function EmptyState({
  title = 'No analysis generated yet',
  description = 'Paste your script and click Predict Performance to get your AI readiness score and suggestions.',
  icon: Icon = Sparkles
}) {
  return (
    <div className="bg-white rounded-[12px] p-12 border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center space-y-3">
      <div className="w-14 h-14 rounded-2xl bg-[#A8E6A1]/30 flex items-center justify-center text-[#1F2937]">
        <Icon className="w-7 h-7 text-[#6FCB65]" />
      </div>
      <h3 className="text-lg font-semibold text-[#1F2937] tracking-tight">{title}</h3>
      <p className="text-sm text-[#6B7280] max-w-md">{description}</p>
    </div>
  );
}
