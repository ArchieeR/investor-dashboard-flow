
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';

const Broker = () => {
  const [activeTab, setActiveTab] = useState('Broker');

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Broker</h1>
          <div className="text-muted-foreground">
            Broker information and tools will be available here.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Broker;
