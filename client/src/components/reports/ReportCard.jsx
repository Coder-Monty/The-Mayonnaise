import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, Rocket, Loader2 } from 'lucide-react';

export default function ReportCard({
  reportData,
  timeframe,
  setTimeframe,
  onGenerate,
  loading
}) {
  return (
    <div className="bg-white rounded-[12px] p-6 border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] space-y-6">
      {/* Header & Timeframe Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E7EB] gap-4">
        <div>
          <h3 className="text-base font-bold text-[#1F2937] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#6FCB65]" />
            AI Performance Intelligence Report
          </h3>
          <p className="text-xs text-[#6B7280]">
            Pattern insights synthesized across your logged and seeded reel metrics.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-[#E5E7EB] shrink-0">
          <button
            type="button"
            onClick={() => setTimeframe('weekly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              timeframe === 'weekly'
                ? 'bg-white text-[#1F2937] shadow-xs'
                : 'text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            Weekly (7 Days)
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('monthly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              timeframe === 'monthly'
                ? 'bg-white text-[#1F2937] shadow-xs'
                : 'text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            Monthly (30 Days)
          </button>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onGenerate}
          disabled={loading}
          className="px-5 py-2.5 bg-[#A8E6A1] text-[#1F2937] hover:bg-[#6FCB65] font-bold text-xs rounded-xl flex items-center gap-2 transition cursor-pointer shadow-xs"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing {timeframe === 'weekly' ? '7-Day' : '30-Day'} Performance...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate {timeframe === 'weekly' ? 'Weekly' : 'Monthly'} Report</span>
            </>
          )}
        </button>
      </div>

      {/* 4-Section Insight Display */}
      {reportData ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top Pattern */}
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-2">
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-[#6FCB65]" />
                Top Performing Pattern
              </span>
              <p className="text-xs text-gray-800 leading-relaxed font-medium">
                {reportData.topPattern}
              </p>
            </div>

            {/* Underperforming Pattern */}
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-2">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Underperforming Pattern
              </span>
              <p className="text-xs text-gray-800 leading-relaxed font-medium">
                {reportData.underperformingPattern}
              </p>
            </div>
          </div>

          {/* Trend Note */}
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-2">
            <span className="text-xs font-bold text-blue-800 flex items-center gap-1.5 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-blue-600" />
              Audience & Retention Trend
            </span>
            <p className="text-xs text-gray-800 leading-relaxed font-medium">
              {reportData.trendNote}
            </p>
          </div>

          {/* Next Action Banner */}
          <div className="p-4 bg-[#A8E6A1]/30 rounded-xl border border-[#6FCB65]/50 flex items-start gap-3">
            <div className="p-2 bg-[#A8E6A1] text-[#1F2937] rounded-lg shrink-0 mt-0.5">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#1F2937]/70 uppercase tracking-wider">
                Highest-Impact Next Action
              </span>
              <p className="text-sm font-bold text-[#1F2937] mt-0.5">
                {reportData.nextAction}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-gray-50 rounded-xl border border-[#E5E7EB] text-xs text-[#6B7280]">
          Click "Generate {timeframe === 'weekly' ? 'Weekly' : 'Monthly'} Report" to summarize performance trends.
        </div>
      )}
    </div>
  );
}
