
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface LeetCodeCardProps {
  problem: {
    title: string;
    difficulty: string;
    description: string;
    topics: string[];
    link: string;
  };
}

const LeetCodeCard: React.FC<LeetCodeCardProps> = ({ problem }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          {problem.title}
          <Badge variant={problem.difficulty === 'Easy' ? 'default' : problem.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
            {problem.difficulty}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{problem.description}</p>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-1">Topics:</p>
            <div className="flex flex-wrap gap-1">
              {problem.topics.map((topic: string, topicIndex: number) => (
                <Badge key={topicIndex} variant="outline" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
          <Button asChild className="w-full">
            <a href={problem.link} target="_blank" rel="noopener noreferrer">
              Solve on LeetCode
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeetCodeCard;
