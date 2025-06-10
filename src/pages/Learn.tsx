
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Play, FileText, TrendingUp } from 'lucide-react';

const Learn = () => {
  const [activeTab, setActiveTab] = useState('Learn');

  const learningResources = [
    {
      title: 'ETF Basics',
      description: 'Learn the fundamentals of Exchange-Traded Funds',
      type: 'Article',
      icon: FileText,
      duration: '10 min read'
    },
    {
      title: 'Portfolio Diversification',
      description: 'Understanding risk management through diversification',
      type: 'Video',
      icon: Play,
      duration: '15 min watch'
    },
    {
      title: 'Investment Strategies',
      description: 'Long-term vs short-term investment approaches',
      type: 'Guide',
      icon: TrendingUp,
      duration: '20 min read'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Book className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Learn</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <resource.icon className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <div className="text-sm text-muted-foreground">{resource.type} • {resource.duration}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
