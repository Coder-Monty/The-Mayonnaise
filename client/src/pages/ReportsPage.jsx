import React, { useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import MetricsLogForm from '../components/reports/MetricsLogForm';
import MetricsTable from '../components/reports/MetricsTable';
import EmptyState from '../components/shared/EmptyState';
import LoadingState from '../components/shared/LoadingState';
import { BarChart3 } from 'lucide-react';

export default function ReportsPage() {
  const [metrics, setMetrics] = useState([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

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
      description="Track performance numbers for published reels and generate AI intelligence pattern reports."
      action={<MetricsLogForm onAddMetric={handleAddMetric} />}
    >
      <div className="space-y-8">
        {/* Placeholder / Notice for Reports Section (Stage 10 will build AI report generation) */}
        <div className="bg-white rounded-[12px] p-6 border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#A8E6A1]/40 flex items-center justify-center text-[#1F2937]">
                <BarChart3 className="w-5 h-5 text-[#6FCB65]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1F2937]">AI Intelligence Reports</h3>
                <p className="text-xs text-[#6B7280]">
                  Analyze top performing patterns across your {metrics.length} logged + seeded reels.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics History Table */}
        <div>
          {loadingMetrics ? (
            <LoadingState message="Loading logged performance metrics..." />
          ) : (
            <MetricsTable metrics={metrics} />
          )}
        </div>
      </div>
    </PageContainer>
  );
}
