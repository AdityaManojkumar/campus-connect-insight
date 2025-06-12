
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CompanyCardProps {
  company: {
    name: string;
    description: string;
    requiredSkills: string[];
    type: string;
    hiring: boolean;
  };
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">{company.name}</CardTitle>
        <div className="flex gap-2">
          <Badge variant="secondary">{company.type}</Badge>
          {company.hiring && <Badge variant="default">Hiring</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{company.description}</p>
        <div className="space-y-2">
          <p className="text-sm font-medium">Looking for skills:</p>
          <div className="flex flex-wrap gap-1">
            {company.requiredSkills.map((skill: string, skillIndex: number) => (
              <Badge key={skillIndex} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
