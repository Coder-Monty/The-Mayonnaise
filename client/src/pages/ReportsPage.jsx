import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import EmptyState from '../components/shared/EmptyState';
import { BarChart3 } from 'lucide-react';

export default function ReportsPage() {
  return (
    <PageContainer
      title="Performance Reports"
      description="View logged metrics and generate weekly or monthly AI intelligence reports."
    >
      <EmptyState
        title="No reports generated yet"
        description="Select a time window (Weekly or Monthly) to generate AI pattern insights."
        icon={BarChart3}
      />
    </PageContainer>
  );
}
