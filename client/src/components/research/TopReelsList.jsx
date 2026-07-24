import React from 'react';
import { Video, Play, Zap } from 'lucide-react';

export default function TopReelsList({ topReels = [] }) {
  return (
    <div className="bg-white rounded-[12px] p-6 border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-[#E5E7EB]">
        <Video className="w-5 h-5 text-[#6FCB65]" />
        <h3 className="text-base font-bold text-[#1F2937]">Top-Performing Reel Formats & Hooks</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topReels.map((reel, idx) => (
          <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-[#E5E7EB] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#6FCB65]">
                <div className="w-5 h-5 rounded-full bg-[#A8E6A1]/40 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-[#1F2937] text-[#1F2937]" />
                </div>
                <span>Format #{idx + 1}</span>
              </div>
              <h4 className="text-sm font-bold text-[#1F2937]">{reel.title}</h4>
              <div className="p-2 bg-white rounded-lg border border-gray-200 text-xs font-mono text-gray-800">
                "{reel.hookUsed}"
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200 text-xs">
              <span className="font-bold text-[#1F2937] flex items-center gap-1 mb-0.5">
                <Zap className="w-3.5 h-3.5 text-[#6FCB65]" />
                Why it worked:
              </span>
              <p className="text-[#6B7280]">{reel.whyItWorked}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
