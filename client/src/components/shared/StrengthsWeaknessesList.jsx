import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function StrengthsWeaknessesList({ strengths = [], weaknesses = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Strengths */}
      <div className="bg-white rounded-[12px] p-5 border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <h4 className="text-sm font-bold text-[#1F2937] flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-4 h-4 text-[#6FCB65]" />
          Key Strengths
        </h4>
        {strengths.length > 0 ? (
          <ul className="space-y-2 text-sm text-[#1F2937]">
            {strengths.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#6FCB65] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-[#6B7280]">No explicit strengths listed.</p>
        )}
      </div>

      {/* Weaknesses */}
      <div className="bg-white rounded-[12px] p-5 border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <h4 className="text-sm font-bold text-[#1F2937] flex items-center gap-2 mb-3">
          <AlertCircle className="w-4 h-4 text-[#EF4444]" />
          Areas for Improvement
        </h4>
        {weaknesses.length > 0 ? (
          <ul className="space-y-2 text-sm text-[#1F2937]">
            {weaknesses.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#EF4444] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-[#6B7280]">No major weaknesses identified.</p>
        )}
      </div>
    </div>
  );
}
