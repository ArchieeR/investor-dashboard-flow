
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { NewsFilters } from '@/components/news/NewsFilters';
import { NewsTable } from '@/components/news/NewsTable';
import { SentimentLogo } from '@/components/news/SentimentLogo';

const News = () => {
  const [activeTab, setActiveTab] = useState('News');
  const [importanceFilter, setImportanceFilter] = useState<string[]>(['HIGH']);
  const [assetFilter, setAssetFilter] = useState('All assets');

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
          
          <NewsFilters 
            onImportanceChange={setImportanceFilter}
            onAssetChange={setAssetFilter}
            currentImportance={importanceFilter}
            currentAsset={assetFilter}
          />
          
          <div className="pb-8">
            <NewsTable 
              importanceFilter={importanceFilter.join(',')}
              assetFilter={assetFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
