import React, { useState } from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';

export default function MetricsLogForm({ onAddMetric }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];

  const [title, setTitle] = useState('');
  const [niche, setNiche] = useState('Tech & AI');
  const [views, setViews] = useState('');
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [avgWatchPercent, setAvgWatchPercent] = useState('');
  const [date, setDate] = useState(todayStr);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await onAddMetric({
        title: title.trim(),
        niche,
        views: Number(views) || 0,
        likes: Number(likes) || 0,
        comments: Number(comments) || 0,
        avgWatchPercent: Number(avgWatchPercent) || 0,
        date: date || todayStr,
      });

      // Reset form
      setTitle('');
      setViews('');
      setLikes('');
      setComments('');
      setAvgWatchPercent('');
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to log metric:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-4 py-2.5 bg-[#A8E6A1] text-[#1F2937] hover:bg-[#6FCB65] font-bold text-xs rounded-xl flex items-center gap-2 transition cursor-pointer shadow-xs"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Log New Reel Performance</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-[12px] p-5 border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]">
        <h4 className="text-sm font-bold text-[#1F2937]">Log Published Reel Metrics</h4>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-xs text-[#6B7280] hover:text-[#1F2937]"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1">
              Reel Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 5 VS Code Extensions"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6A1] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1">Niche</label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6A1] focus:bg-white"
            >
              <option value="Tech & AI">Tech & AI</option>
              <option value="Business & Finance">Business & Finance</option>
              <option value="Lifestyle & Fitness">Lifestyle & Fitness</option>
              <option value="Education & Productivity">Education & Productivity</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1">Views</label>
            <input
              type="number"
              min="0"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              placeholder="e.g. 25000"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-[#E5E7EB] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1">Likes</label>
            <input
              type="number"
              min="0"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
              placeholder="e.g. 1800"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-[#E5E7EB] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1">Comments</label>
            <input
              type="number"
              min="0"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="e.g. 140"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-[#E5E7EB] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1">Avg Watch %</label>
            <input
              type="number"
              min="0"
              max="100"
              value={avgWatchPercent}
              onChange={(e) => setAvgWatchPercent(e.target.value)}
              placeholder="e.g. 75"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-[#E5E7EB] rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="w-48">
            <label className="block text-xs font-semibold text-[#6B7280] mb-1">Publish Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-[#E5E7EB] rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !title.trim()}
            className="px-5 py-2.5 bg-[#A8E6A1] text-[#1F2937] hover:bg-[#6FCB65] font-bold text-xs rounded-xl flex items-center gap-2 transition cursor-pointer shadow-xs"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
            <span>Save Metric</span>
          </button>
        </div>
      </form>
    </div>
  );
}
