import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import EmptyState from '../components/shared/EmptyState';
import { History } from 'lucide-react';

export default function HistoryPage() {
  return (
    <PageContainer
      title="Saved Predictions History"
      description="Access your past script predictions and saved content evaluations."
    >
      <EmptyState
        title="No saved history"
        description="Save your predictions from the Reel Reviewer page to reopen them anytime."
        icon={History}
      />
    </PageContainer>
  );
}
