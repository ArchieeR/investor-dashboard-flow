
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { NewsFilters } from '@/components/news/NewsFilters';
import { NewsTable } from '@/components/news/NewsTable';
import { SentimentLogo } from '@/components/news/SentimentLogo';

const News = () => {
  const [activeTab, setActiveTab] = useState('News');

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SentimentLogo />
              <h1 className="text-3xl font-bold text-foreground">News</h1>
            </div>
          </div>
          
          <NewsFilters />
          
          {/* News table with full page scrolling */}
          <div className="pb-8">
            <NewsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
