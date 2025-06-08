
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Heart, Share2, TrendingUp, TrendingDown, Eye, Users, Calendar } from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('Community');

  const portfolioShares = [
    {
      id: 1,
      user: 'InvestorPro',
      avatar: 'IP',
      timeAgo: '2h ago',
      title: 'My Tech-Heavy Portfolio - Up 23% YTD',
      description: 'Sharing my tech-focused portfolio strategy that has been performing well this year.',
      performance: '+23.4%',
      isPositive: true,
      likes: 45,
      comments: 12,
      views: 234,
      tags: ['Tech', 'Growth', 'Long-term']
    },
    {
      id: 2,
      user: 'DividendKing',
      avatar: 'DK',
      timeAgo: '4h ago',
      title: 'Dividend Portfolio for Passive Income',
      description: 'Built a solid dividend portfolio generating 4.2% yield annually.',
      performance: '+8.7%',
      isPositive: true,
      likes: 67,
      comments: 23,
      views: 456,
      tags: ['Dividends', 'Income', 'Conservative']
    },
    {
      id: 3,
      user: 'ValueHunter',
      avatar: 'VH',
      timeAgo: '6h ago',
      title: 'Value Investing in Market Downturn',
      description: 'Finding opportunities in beaten-down value stocks.',
      performance: '-2.1%',
      isPositive: false,
      likes: 34,
      comments: 18,
      views: 189,
      tags: ['Value', 'Contrarian', 'Opportunities']
    }
  ];

  const forumPosts = [
    {
      id: 1,
      title: 'Best ETFs for 2025?',
      author: 'NewInvestor',
      replies: 45,
      lastActivity: '1h ago',
      category: 'ETFs',
      isHot: true
    },
    {
      id: 2,
      title: 'Tesla earnings discussion - Q4 2024',
      author: 'TechAnalyst',
      replies: 127,
      lastActivity: '2h ago',
      category: 'Earnings',
      isHot: true
    },
    {
      id: 3,
      title: 'How to handle market volatility?',
      author: 'WorryInvestor',
      replies: 23,
      lastActivity: '3h ago',
      category: 'Strategy',
      isHot: false
    },
    {
      id: 4,
      title: 'REITs vs Rental Property Investment',
      author: 'RealEstateGuru',
      replies: 34,
      lastActivity: '5h ago',
      category: 'Real Estate',
      isHot: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Community</h1>
              <p className="text-muted-foreground mt-2">Connect with fellow investors and share your portfolio strategies</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              Share Portfolio
            </Button>
          </div>

          <Tabs defaultValue="portfolios" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="portfolios">Portfolio Shares</TabsTrigger>
              <TabsTrigger value="forum">Forum Discussions</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolios" className="space-y-4">
              <div className="grid gap-4">
                {portfolioShares.map((portfolio) => (
                  <Card key={portfolio.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{portfolio.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{portfolio.user}</h3>
                              <span className="text-sm text-muted-foreground">{portfolio.timeAgo}</span>
                            </div>
                            <CardTitle className="text-lg mt-1">{portfolio.title}</CardTitle>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${portfolio.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {portfolio.isPositive ? <TrendingUp className="h-4 w-4 inline mr-1" /> : <TrendingDown className="h-4 w-4 inline mr-1" />}
                            {portfolio.performance}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">{portfolio.description}</CardDescription>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {portfolio.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{portfolio.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{portfolio.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{portfolio.views}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="forum" className="space-y-4">
              <div className="grid gap-4">
                {forumPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant={post.isHot ? "destructive" : "secondary"}>
                              {post.category}
                            </Badge>
                            {post.isHot && <Badge variant="outline" className="text-orange-600 border-orange-600">🔥 Hot</Badge>}
                          </div>
                          <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>by {post.author}</span>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.replies} replies</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{post.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Discussion
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Community;
