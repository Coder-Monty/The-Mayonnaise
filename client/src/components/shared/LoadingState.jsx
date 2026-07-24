import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = 'AI is analyzing your content...' }) {
  return (
    <div className="bg-white rounded-[12px] p-12 border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-[#A8E6A1]/30 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#1F2937] animate-spin" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-[#1F2937]">{message}</h3>
        <p className="text-xs text-[#6B7280] mt-1">This usually takes a few seconds</p>
      </div>
    </div>
  );
}
