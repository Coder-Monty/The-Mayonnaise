import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import TopicInputCard from '../components/research/TopicInputCard';
import TrendingTopicsList from '../components/research/TrendingTopicsList';
import ContentIdeasList from '../components/research/ContentIdeasList';
import TopReelsList from '../components/research/TopReelsList';
import EmptyState from '../components/shared/EmptyState';
import LoadingState from '../components/shared/LoadingState';
import { Search, Sparkles, AlertCircle } from 'lucide-react';

export default function ResearchPage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // CRITICAL: Must initialize researchData to null so EmptyState renders on initial load
  const [researchData, setResearchData] = useState(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(false);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: topic.trim() }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResearchData(data);
    } catch (err) {
      console.error('Research API error:', err);
      setError(err.message || 'Failed to generate content research. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer
      title="AI Content Research"
      description="Uncover viral subtopics, high-converting hooks, and proven reel formats for any niche."
    >
      <div className="space-y-8">
        {/* Input Card */}
        <TopicInputCard
          topic={topic}
          setTopic={setTopic}
          onGenerate={handleGenerate}
          loading={loading}
        />

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Results Area */}
        <div>
          <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-wider mb-4">
            Research Intelligence
          </h3>

          {loading ? (
            <LoadingState message="AI is searching knowledge base & generating trends, hooks, and reel ideas..." />
          ) : !researchData ? (
            <EmptyState
              title="No research generated yet"
              description="Enter a topic above and click Generate Research to reveal tailored trends and video hooks."
              icon={Search}
            />
          ) : (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-[#A8E6A1]/25 border border-[#6FCB65]/40 rounded-[12px] p-5 shadow-xs flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#A8E6A1] text-[#1F2937] shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F2937]/70">
                    Topic Strategic Overview — "{topic}"
                  </h4>
                  <p className="text-sm text-[#1F2937] mt-1 leading-relaxed font-medium">
                    {researchData.summary}
                  </p>
                </div>
              </div>

              {/* 3 Main Sections */}
              <TrendingTopicsList trends={researchData.trends} />
              <ContentIdeasList ideas={researchData.contentIdeas} />
              <TopReelsList topReels={researchData.topReels} />
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
