import React, { useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import ReportCard from '../components/reports/ReportCard';
import MetricsLogForm from '../components/reports/MetricsLogForm';
import MetricsTable from '../components/reports/MetricsTable';
import LoadingState from '../components/shared/LoadingState';
import { AlertCircle } from 'lucide-react';

export default function ReportsPage() {
  const [metrics, setMetrics] = useState([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  const [timeframe, setTimeframe] = useState('weekly');
  const [loadingReport, setLoadingReport] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [reportError, setReportError] = useState(null);

  const fetchMetrics = async () => {
    try {
      setLoadingMetrics(true);
      const res = await fetch('/api/metrics');
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      }
    } catch (err) {
      console.error('Failed to fetch metrics:', err);
    } finally {
      setLoadingMetrics(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleGenerateReport = async () => {
    setLoadingReport(true);
    setReportError(null);

    const endpoint = timeframe === 'weekly' ? '/api/reports/weekly' : '/api/reports/monthly';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setReportData(data);
    } catch (err) {
      console.error('Report generation error:', err);
      setReportError('Failed to generate report. Please try again.');
    } finally {
      setLoadingReport(false);
    }
  };

  const handleAddMetric = async (newMetric) => {
    const res = await fetch('/api/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMetric)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.entry) {
        setMetrics((prev) => [data.entry, ...prev]);
      }
    }
  };

  return (
    <PageContainer
      title="Performance Reports & Metrics Log"
      description="Track metrics for published reels and generate weekly or monthly AI performance reports."
      action={<MetricsLogForm onAddMetric={handleAddMetric} />}
    >
      <div className="space-y-8">
        {/* Error Alert */}
        {reportError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{reportError}</span>
          </div>
        )}

        {/* AI Report Card */}
        <ReportCard
          reportData={reportData}
          timeframe={timeframe}
          setTimeframe={(tf) => {
            setTimeframe(tf);
            setReportData(null); // Clear previous report when switching tabs
          }}
          onGenerate={handleGenerateReport}
          loading={loadingReport}
        />

        {/* Logged Metrics Table */}
        <div>
          <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-wider mb-4">
            Published Reels Database
          </h3>
          {loadingMetrics ? (
            <LoadingState message="Loading performance metrics dataset..." />
          ) : (
            <MetricsTable metrics={metrics} />
          )}
        </div>
      </div>
    </PageContainer>
  );
}
