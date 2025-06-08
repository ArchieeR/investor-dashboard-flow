
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';

const Community = () => {
  const [activeTab, setActiveTab] = useState('Community');

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Community</h1>
          </div>
          
          <div className="text-center py-12">
            <p className="text-muted-foreground">Community features coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
