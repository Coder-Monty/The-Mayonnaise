import React from 'react';
import EmptyState from '../shared/EmptyState';
import ReadinessBadge from '../shared/ReadinessBadge';
import ScoreCard from '../shared/ScoreCard';
import RecommendationBanner from '../shared/RecommendationBanner';
import StrengthsWeaknessesList from '../shared/StrengthsWeaknessesList';
import SuggestedEditsChecklist from '../shared/SuggestedEditsChecklist';
import { Bookmark, Check } from 'lucide-react';

export default function PredictorResultScreen({ data = null, onSave = () => {}, isSaved = false }) {
  // Section 7 contract behavior: If data is null, render EmptyState ONLY
  if (!data) {
    return <EmptyState />;
  }

  const { readinessScore, verdict, subScores = {}, strengths = [], weaknesses = [], suggestedEdits = [], recommendation } = data;

  const subScoreCategories = [
    { key: 'hook', label: 'Initial Hook (3s)' },
    { key: 'pacing', label: 'Delivery & Pacing' },
    { key: 'storytelling', label: 'Story & Engagement' },
    { key: 'visualQuality', label: 'Visual Quality (Est.)' },
    { key: 'subtitleQuality', label: 'Subtitle Readiness' },
    { key: 'cta', label: 'Call to Action' },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Score Header Card */}
      <div className="bg-white rounded-[12px] p-6 border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Circular Score Gauge */}
          <div className="w-20 h-20 rounded-2xl bg-[#A8E6A1]/30 border-2 border-[#6FCB65] flex flex-col items-center justify-center shrink-0">
            <span className="text-3xl font-extrabold text-[#1F2937] leading-none">{readinessScore}</span>
            <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mt-1">Score</span>
          </div>

          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h3 className="text-xl font-bold text-[#1F2937]">Publish Readiness</h3>
              <ReadinessBadge verdict={verdict} score={readinessScore} />
            </div>
            <p className="text-xs text-[#6B7280]">
              Visual and subtitle quality scores are heuristic estimates derived from script text cues.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={onSave}
          disabled={isSaved}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 border transition ${
            isSaved
              ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-default'
              : 'bg-white text-[#1F2937] border-[#E5E7EB] hover:bg-gray-50 shadow-xs cursor-pointer'
          }`}
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4 text-[#6FCB65]" />
              <span>Saved to History</span>
            </>
          ) : (
            <>
              <Bookmark className="w-4 h-4 text-[#6FCB65]" />
              <span>Save Prediction</span>
            </>
          )}
        </button>
      </div>

      {/* Key Recommendation */}
      <RecommendationBanner recommendation={recommendation} />

      {/* 6 Sub-Scores Grid */}
      <div>
        <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">
          Sub-Score Category Breakdown
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {subScoreCategories.map((cat) => (
            <ScoreCard
              key={cat.key}
              label={cat.label}
              value={subScores[cat.key] ?? 70}
            />
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <StrengthsWeaknessesList strengths={strengths} weaknesses={weaknesses} />

      {/* Suggested Edits Checklist */}
      <SuggestedEditsChecklist edits={suggestedEdits} />
    </div>
  );
}
