import React, { useState } from 'react';
import { Lightbulb, Copy, Check, Target, Gauge } from 'lucide-react';

export default function ContentIdeasList({ ideas = [] }) {
  const [copiedIdx, setCopiedIdx] = useState(null);

  const handleCopy = (hookText, idx) => {
    navigator.clipboard.writeText(hookText);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const getDifficultyBadge = (difficulty) => {
    if (difficulty === 'Easy') return 'bg-green-100 text-green-800 border-green-300';
    if (difficulty === 'Medium') return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  return (
    <div className="bg-white rounded-[12px] p-6 border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-[#E5E7EB]">
        <Lightbulb className="w-5 h-5 text-[#6FCB65]" />
        <h3 className="text-base font-bold text-[#1F2937]">High-Retention Content Ideas</h3>
      </div>

      <div className="space-y-3">
        {ideas.map((idea, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-50 rounded-xl border border-[#E5E7EB] flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-gray-200 text-gray-700">
                  {idea.format}
                </span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${getDifficultyBadge(idea.difficulty)}`}>
                  <Gauge className="w-3 h-3 inline mr-1" />
                  {idea.difficulty}
                </span>
              </div>
              <p className="text-sm font-bold text-[#1F2937] font-mono">"{idea.hook}"</p>
              <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                <Target className="w-3.5 h-3.5 text-[#6FCB65]" />
                <span>Goal: {idea.goal}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(idea.hook, idx)}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-white border border-[#E5E7EB] text-[#1F2937] hover:bg-gray-100 flex items-center justify-center gap-1.5 transition shrink-0 cursor-pointer shadow-xs"
            >
              {copiedIdx === idx ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#6FCB65]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#6B7280]" />
                  <span>Copy Hook</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
