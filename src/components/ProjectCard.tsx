
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    skills: string[];
    difficulty: string;
    estimatedTime: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">{project.title}</CardTitle>
        <div className="flex gap-2">
          <Badge variant={project.difficulty === 'Easy' ? 'default' : project.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
            {project.difficulty}
          </Badge>
          <Badge variant="outline">{project.estimatedTime}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{project.description}</p>
        <div className="space-y-2">
          <p className="text-sm font-medium">Required Skills:</p>
          <div className="flex flex-wrap gap-1">
            {project.skills.map((skill: string, skillIndex: number) => (
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

export default ProjectCard;
