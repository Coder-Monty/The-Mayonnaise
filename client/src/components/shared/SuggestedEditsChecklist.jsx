import React from 'react';
import { ListChecks } from 'lucide-react';

export default function SuggestedEditsChecklist({ edits = [] }) {
  return (
    <div className="bg-white rounded-[12px] p-5 border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <h4 className="text-sm font-bold text-[#1F2937] flex items-center gap-2 mb-3">
        <ListChecks className="w-4 h-4 text-[#1F2937]" />
        Actionable Suggested Edits
      </h4>
      {edits.length > 0 ? (
        <div className="space-y-2.5">
          {edits.map((edit, idx) => (
            <div key={idx} className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-lg border border-[#E5E7EB]">
              <input type="checkbox" id={`edit-${idx}`} className="mt-1 rounded text-[#6FCB65] focus:ring-[#A8E6A1]" />
              <label htmlFor={`edit-${idx}`} className="text-sm text-[#1F2937] cursor-pointer">
                {edit}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-[#6B7280]">No edits suggested.</p>
      )}
    </div>
  );
}
