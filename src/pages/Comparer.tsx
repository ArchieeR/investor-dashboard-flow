
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';

const Comparer = () => {
  const [activeTab, setActiveTab] = useState('Comparer');

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Comparer</h1>
          <div className="text-muted-foreground">
            Comparison tools and analysis will be available here.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparer;
