import React from 'react';
import ReadinessBadge from '../shared/ReadinessBadge';
import { ExternalLink, Sparkles } from 'lucide-react';

export default function HistoryTable({ reports = [], onSelectReport }) {
  if (reports.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-[#6B7280] bg-white rounded-[12px] border border-[#E5E7EB]">
        No saved prediction history yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="p-4 border-b border-[#E5E7EB] flex justify-between items-center bg-gray-50">
        <h4 className="text-sm font-bold text-[#1F2937]">Past Script Evaluations</h4>
        <span className="text-xs font-semibold text-[#6B7280]">{reports.length} Saved Records</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[#1F2937]">
          <thead className="bg-gray-100/70 text-[#6B7280] font-semibold border-b border-[#E5E7EB]">
            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Script Title & Niche</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4 text-center">Score & Verdict</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {reports.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelectReport(item)}
                className="hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="py-3 px-4 text-[#6B7280] whitespace-nowrap font-mono">{item.date}</td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-[#1F2937]">{item.title}</div>
                  <div className="text-[10px] text-[#6B7280]">{item.niche || 'General'}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700">
                    <Sparkles className="w-3 h-3 text-[#6FCB65]" />
                    Reel Reviewer
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-bold text-[#1F2937]">{item.readinessScore}/100</span>
                    <ReadinessBadge verdict={item.verdict} score={item.readinessScore} />
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectReport(item);
                    }}
                    className="px-3 py-1.5 bg-white border border-[#E5E7EB] hover:bg-gray-100 font-bold text-xs rounded-lg inline-flex items-center gap-1 transition text-[#1F2937] shadow-xs cursor-pointer"
                  >
                    <span>Reopen</span>
                    <ExternalLink className="w-3 h-3 text-[#6B7280]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
