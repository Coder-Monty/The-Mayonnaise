import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import EmptyState from '../components/shared/EmptyState';
import { Search } from 'lucide-react';

export default function ResearchPage() {
  return (
    <PageContainer
      title="AI Content Research"
      description="Enter a topic to generate content ideas, trending angles, and top reel inspiration."
    >
      <EmptyState
        title="No research generated yet"
        description="Enter a topic above to generate tailored content trends and reel hooks."
        icon={Search}
      />
    </PageContainer>
  );
}
