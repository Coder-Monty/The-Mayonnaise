import React from 'react';
import { Search, Loader2, Sparkles } from 'lucide-react';

export default function TopicInputCard({ topic, setTopic, onGenerate, loading }) {
  const popularTopics = [
    'AI Tools',
    'Personal Finance',
    'Fitness & Health',
    'Social Media Marketing',
    'Productivity Hacks'
  ];

  return (
    <div className="bg-white rounded-[12px] p-6 border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-[#6FCB65]" />
          <h2 className="text-base font-bold text-[#1F2937]">Research Topic</h2>
        </div>
        <span className="text-xs text-[#6B7280]">Generates trends, ideas & top reels</span>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-[#6B7280] mb-1">
            Target Topic / Niche <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && topic.trim() && !loading) {
                  onGenerate();
                }
              }}
              placeholder="e.g. AI Productivity Tools, Crypto Trading, Home Workouts"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6A1] focus:bg-white transition"
            />
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Popular Topic Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-[#6B7280]">Popular:</span>
          {popularTopics.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTopic(item)}
              className="px-2.5 py-1 text-xs rounded-full bg-gray-100 text-[#1F2937] hover:bg-[#A8E6A1]/40 border border-[#E5E7EB] transition cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onGenerate}
          disabled={loading || !topic.trim()}
          className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
            loading || !topic.trim()
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              : 'bg-[#A8E6A1] text-[#1F2937] hover:bg-[#6FCB65] active:scale-[0.99] cursor-pointer'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Topic Landscape...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Research</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
