import React, { useState } from 'react';
import ReadinessBadge from '../shared/ReadinessBadge';
import { ExternalLink, Sparkles, Trash2, AlertTriangle, X } from 'lucide-react';

export default function HistoryTable({ reports = [], onSelectReport, onDeleteReport, onClearAll }) {
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false);

  if (reports.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-[#6B7280] bg-white rounded-[12px] border border-[#E5E7EB]">
        No saved prediction history yet.
      </div>
    );
  }

  const handleDeleteConfirm = () => {
    if (itemToDelete && onDeleteReport) {
      onDeleteReport(itemToDelete.id);
    }
    setItemToDelete(null);
  };

  const handleClearAllConfirm = () => {
    if (onClearAll) {
      onClearAll();
    }
    setShowClearAllConfirm(false);
  };

  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden relative">
      {/* Table Header Controls */}
      <div className="p-4 border-b border-[#E5E7EB] flex justify-between items-center bg-gray-50">
        <h4 className="text-sm font-bold text-[#1F2937]">Past Script Evaluations</h4>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#6B7280]">{reports.length} Saved Records</span>
          {onClearAll && (
            <button
              type="button"
              onClick={() => setShowClearAllConfirm(true)}
              className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[#1F2937]">
          <thead className="bg-gray-100/70 text-[#6B7280] font-semibold border-b border-[#E5E7EB]">
            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Script Title & Niche</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4 text-center">Score & Verdict</th>
              <th className="py-3 px-4 text-right">Actions</th>
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
                    Cheesy Reviewer
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-bold text-[#1F2937]">{item.readinessScore}/100</span>
                    <ReadinessBadge verdict={item.verdict} score={item.readinessScore} />
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
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
                    {onDeleteReport && (
                      <button
                        type="button"
                        title="Delete evaluation"
                        onClick={(e) => {
                          e.stopPropagation();
                          setItemToDelete(item);
                        }}
                        className="p-1.5 bg-white border border-[#E5E7EB] hover:border-red-300 hover:bg-red-50 text-[#6B7280] hover:text-red-600 font-bold text-xs rounded-lg transition shadow-xs cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Delete Single Item Confirmation */}
      {itemToDelete && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setItemToDelete(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100 space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-100 text-red-600 rounded-xl">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Delete Evaluation</h3>
                  <p className="text-xs text-gray-500">This action cannot be undone.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-200">
              Are you sure you want to delete <strong className="text-gray-900">"{itemToDelete.title}"</strong>?
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Clear All History Confirmation */}
      {showClearAllConfirm && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowClearAllConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100 space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-100 text-red-600 rounded-xl">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Clear Entire History</h3>
                  <p className="text-xs text-gray-500">Permanent delete operation.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowClearAllConfirm(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-200">
              Are you sure you want to delete all <strong className="text-gray-900">{reports.length}</strong> saved prediction history records? All history will be permanently erased.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowClearAllConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearAllConfirm}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All History</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
