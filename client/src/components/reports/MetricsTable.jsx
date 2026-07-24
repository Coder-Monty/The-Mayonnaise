import React from 'react';
import { Eye, ThumbsUp, MessageSquare, Clock } from 'lucide-react';

export default function MetricsTable({ metrics = [] }) {
  if (metrics.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-[#6B7280] bg-white rounded-[12px] border border-[#E5E7EB]">
        No performance metrics logged yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="p-4 border-b border-[#E5E7EB] flex justify-between items-center bg-gray-50">
        <h4 className="text-sm font-bold text-[#1F2937]">Logged Performance History</h4>
        <span className="text-xs font-semibold text-[#6B7280]">{metrics.length} Total Reels</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[#1F2937]">
          <thead className="bg-gray-100/70 text-[#6B7280] font-semibold border-b border-[#E5E7EB]">
            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Reel Title & Niche</th>
              <th className="py-3 px-4 text-right">Views</th>
              <th className="py-3 px-4 text-right">Likes</th>
              <th className="py-3 px-4 text-right">Comments</th>
              <th className="py-3 px-4 text-right">Avg Watch %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {metrics.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-4 text-[#6B7280] whitespace-nowrap font-mono">{item.date}</td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-[#1F2937]">{item.title}</div>
                  <div className="text-[10px] text-[#6B7280]">{item.niche || 'General'}</div>
                </td>
                <td className="py-3 px-4 text-right font-medium">
                  <span className="flex items-center justify-end gap-1">
                    <Eye className="w-3 h-3 text-[#6B7280]" />
                    {Number(item.views).toLocaleString()}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-medium">
                  <span className="flex items-center justify-end gap-1">
                    <ThumbsUp className="w-3 h-3 text-[#6B7280]" />
                    {Number(item.likes).toLocaleString()}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-medium">
                  <span className="flex items-center justify-end gap-1">
                    <MessageSquare className="w-3 h-3 text-[#6B7280]" />
                    {Number(item.comments).toLocaleString()}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      item.avgWatchPercent >= 75
                        ? 'bg-[#A8E6A1]/40 text-[#2E7D32]'
                        : item.avgWatchPercent >= 60
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    <Clock className="w-3 h-3 inline" />
                    {item.avgWatchPercent}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
