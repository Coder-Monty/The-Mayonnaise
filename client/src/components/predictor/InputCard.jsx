import React from 'react';
import { Sparkles, Loader2, FileText, Tag, Video, Upload } from 'lucide-react';
import { useState } from 'react';

export default function InputCard({
  script,
  setScript,
  title,
  setTitle,
  niche,
  setNiche,
  onPredict,
  loading
}) {
  const niches = [
    'Tech & AI',
    'Business & Finance',
    'Lifestyle & Fitness',
    'Education & Productivity',
    'Entertainment & Gaming',
    'General / Other'
  ];

  const [n, setN] = useState(1);

  const handleSampleScript = () => {
    // n++;
    // alert(n);
    if (n == 1) {
      setN(2);
      setTitle('3 AI Tools to Save 10 Hours a Week');
      setNiche('Tech & AI');
      setScript(
        `Stop wasting time doing manual task switching in 2026. Here are 3 AI tools that will save you 10+ hours every single week.\n\nTool #1: Notion AI for automatic meeting summaries.\nTool #2: Antigravity for automated code generation.\nTool #3: Midjourney v7 for instant graphic design.\n\nWhich one will you try first? Comment 'AI' below and I'll send you the direct access links!`
      );
    } else if (n == 2) {
      setN(3);
      setTitle('2 Side Hustles You Can Start This Weekend');
      setNiche('Business & Finance');
      setScript(
        `Looking to earn extra income without quitting your job? Here are 3 side hustles you can start this weekend.

Side Hustle #1: Sell digital templates on Etsy.
Side Hustle #2: Start a faceless YouTube Shorts channel.

The best part? You can start each of these with little to no upfront investment.

Which one would you try first? Comment 'START' below and I'll share more ideas!`
      );
    }
    else if (n == 3) {
      setN(1);
      setTitle('5 Video Games With Plot Twists Nobody Saw Coming');
      setNiche('Entertainment & Gaming');
      setScript(
        `Think you've seen every crazy game ending? Think again.

Game #1: BioShock – The unforgettable "Would you kindly..." twist.
Game #2: Red Dead Redemption 2 – An emotional ending that changed everything.
Game #3: NieR: Automata – Every new ending completely changes the story.
Game #4: Minecraft was originally called "Cave Game."
Game #5: The PlayStation 2 is still the best-selling console of all time."

If you haven't played these yet, avoid spoilers at all costs!

Which game had the biggest plot twist? Comment your favorite below!`
      );
    }

  };

  return (
    <div className="bg-white rounded-[12px] p-6 border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] space-y-5">
      <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#6FCB65]" />
          <h2 className="text-base font-bold text-[#1F2937]">Script Input</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group inline-flex items-center">
            <button
              type="button"
              title="Coming soon using transcript for demo"
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[#4B5563] bg-gray-100 hover:bg-gray-200 border border-[#E5E7EB] rounded-lg transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>Upload Video</span>
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center pointer-events-none z-20">
              <span className="bg-gray-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap">
                Coming soon using transcript for demo
              </span>
              <div className="w-2 h-2 -mt-1 bg-gray-900 rotate-45"></div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSampleScript}
            className="text-xs font-semibold text-[#6B7280] hover:text-[#1F2937] underline cursor-pointer"
          >
            Insert Sample Script
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Optional Title & Niche */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5" />
              Reel Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 3 AI Tools to Save 10 Hours"
              className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6A1] focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              Content Niche
            </label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6A1] focus:bg-white transition"
            >
              {niches.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Script Textarea */}
        <div>
          <label className="block text-xs font-semibold text-[#6B7280] mb-1">
            Script / Transcript Text <span className="text-red-500">*</span>
          </label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Paste your reel script here... Include hooks, body lines, visual notes, and call-to-action."
            rows={7}
            className="w-full p-3.5 text-sm bg-gray-50 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6A1] focus:bg-white transition font-mono"
          />
          <div className="flex justify-between items-center text-xs text-[#6B7280] mt-1">
            <span>Estimated length: ~{Math.round(script.trim().split(/\s+/).filter(Boolean).length / 2.5)}s read time</span>
            <span>{script.length} chars</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onPredict}
          disabled={loading || !script.trim()}
          className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${loading || !script.trim()
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            : 'bg-[#A8E6A1] text-[#1F2937] hover:bg-[#6FCB65] active:scale-[0.99] cursor-pointer'
            }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Script & Scoring...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Predict Performance</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
