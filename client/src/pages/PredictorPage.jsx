import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import InputCard from '../components/predictor/InputCard';
import PredictorResultScreen from '../components/predictor/ResultScreen';
import LoadingState from '../components/shared/LoadingState';
import { AlertCircle } from 'lucide-react';
import { useResultContext } from '../context/ResultContext';

export default function PredictorPage() {
  const { setLatestPredictorResult } = useResultContext();
  const [script, setScript] = useState('');
  const [title, setTitle] = useState('');
  const [niche, setNiche] = useState('Tech & AI');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // CRITICAL: Must initialize resultData to null so EmptyState shows on initial page load
  const [resultData, setResultData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const handlePredict = async () => {
    if (!script.trim()) return;

    setLoading(true);
    setError(null);
    setIsSaved(false);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ script, title, niche }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResultData(data);
      setLatestPredictorResult(data);
    } catch (err) {
      console.error('Predict API error:', err);
      setError(err.message || 'Failed to generate reel prediction analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!resultData) return;
    try {
      await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...resultData,
          title: title.trim() || 'Untitled Script Evaluation',
          script,
          niche
        })
      });
    } catch (err) {
      console.warn('History save warning:', err);
    } finally {
      setIsSaved(true);
    }
  };

  return (
    <PageContainer
      title="Predict Your Reel's Performance"
      description="Evaluate short-form video scripts against algorithmic engagement factors before publishing."
    >
      <div className="space-y-8">
        {/* Input Card */}
        <InputCard
          script={script}
          setScript={setScript}
          title={title}
          setTitle={setTitle}
          niche={niche}
          setNiche={setNiche}
          onPredict={handlePredict}
          loading={loading}
        />

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Results Section */}
        <div>
          <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-wider mb-4">
            Analysis & Scorecard
          </h3>

          {loading ? (
            <LoadingState message="AI is reasoning over script cues & calculating 6 sub-score dimensions..." />
          ) : (
            <PredictorResultScreen
              data={resultData}
              onSave={handleSave}
              isSaved={isSaved}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
}
