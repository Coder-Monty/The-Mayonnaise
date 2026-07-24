import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import EmptyState from '../components/shared/EmptyState';

export default function PredictorPage() {
  return (
    <PageContainer
      title="AI Pre-Publish Reel Reviewer"
      description="Paste your script to get an instant readiness score, category breakdown, and actionable edits before publishing."
    >
      <EmptyState />
    </PageContainer>
  );
}
