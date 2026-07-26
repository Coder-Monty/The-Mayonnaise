import React, { useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import HistoryTable from '../components/history/HistoryTable';
import PredictorResultScreen from '../components/predictor/ResultScreen';
import LoadingState from '../components/shared/LoadingState';
import { ArrowLeft, FileText, Calendar, Trash2 } from 'lucide-react';

export default function HistoryPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/history');
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = async (id) => {
    try {
      const res = await fetch(`/api/history/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
        if (selectedReport && selectedReport.id === id) {
          setSelectedReport(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete report:', err);
    }
  };

  const handleClearAll = async () => {
    try {
      const res = await fetch('/api/history', { method: 'DELETE' });
      if (res.ok) {
        setReports([]);
        setSelectedReport(null);
      }
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (selectedReport) {
    return (
      <PageContainer
        title={`Reopened Analysis — ${selectedReport.title}`}
        description={`Evaluated on ${selectedReport.date} | Niche: ${selectedReport.niche || 'General'}`}
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleDeleteReport(selectedReport.id)}
              className="px-3 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Record</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedReport(null)}
              className="px-4 py-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#1F2937] font-bold text-xs rounded-xl flex items-center gap-2 transition cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-[#6B7280]" />
              <span>Back to History</span>
            </button>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Saved Script Preview */}
          {selectedReport.script && (
            <div className="bg-white rounded-[12px] p-5 border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] space-y-2">
              <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#6FCB65]" />
                Original Script Text
              </h4>
              <p className="text-xs text-[#1F2937] font-mono bg-gray-50 p-3 rounded-lg border border-gray-200 whitespace-pre-wrap">
                {selectedReport.script}
              </p>
            </div>
          )}

          {/* Re-rendered Result Screen */}
          <PredictorResultScreen
            data={selectedReport}
            onSave={() => {}}
            isSaved={true}
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Saved Predictions History"
      description="Access and reopen past script evaluations and readiness scores."
    >
      <div>
        {loading ? (
          <LoadingState message="Loading saved evaluations..." />
        ) : (
          <HistoryTable
            reports={reports}
            onSelectReport={setSelectedReport}
            onDeleteReport={handleDeleteReport}
            onClearAll={handleClearAll}
          />
        )}
      </div>
    </PageContainer>
  );
}
