import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Code, Building, BookOpen } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import CompanyCard from '@/components/CompanyCard';
import LeetCodeCard from '@/components/LeetCodeCard';
import EmptyState from '@/components/EmptyState';
import { toast } from '@/components/ui/use-toast';

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface Subject {
  id: string;
  name: string;
  semester: string;
}

const Recommendations = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [leetcodeProblems, setLeetcodeProblems] = useState<any[]>([]);
  const navigate = useNavigate();

  const generateRecommendations = useCallback((userSkills: Skill[]) => {
    console.log('Generating recommendations for skills:', userSkills);
    
    const allProblems = [
      { id: 1, title: "Two Sum", difficulty: "Easy", skills: ["Arrays", "Hash Tables"] },
      { id: 2, title: "Add Two Numbers", difficulty: "Medium", skills: ["Linked Lists", "Math"] },
      { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", skills: ["Hash Tables", "Two Pointers"] },
      { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", skills: ["Arrays", "Binary Search"] },
      { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium", skills: ["Dynamic Programming", "Strings"] },
      { id: 6, title: "ZigZag Conversion", difficulty: "Medium", skills: ["Strings", "Simulation"] },
      { id: 7, title: "Reverse Integer", difficulty: "Easy", skills: ["Math"] },
      { id: 8, title: "String to Integer (atoi)", difficulty: "Medium", skills: ["Strings", "Math"] },
      { id: 9, title: "Palindrome Number", difficulty: "Easy", skills: ["Math"] },
      { id: 10, title: "Regular Expression Matching", difficulty: "Hard", skills: ["Dynamic Programming", "Strings"] },
    ];

    const userSkillNames = userSkills.map(skill => skill.name);
    
    const matchedProblems = allProblems.filter(problem =>
      problem.skills.some(skill => userSkillNames.includes(skill))
    );
    
    setLeetcodeProblems(matchedProblems.slice(0, 6));
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

    const skills = JSON.parse(localStorage.getItem('skills') || '[]');
    const _subjects = JSON.parse(localStorage.getItem('subjects') || '[]');
    
    console.log('Loaded skills:', skills);
    console.log('Loaded subjects:', _subjects);
    
    setSkills(skills);
    setSubjects(_subjects);
    
    if (skills.length > 0) {
      generateRecommendations(skills);
    }
  }, [generateRecommendations, navigate]);

  const handleViewRecommendations = () => {
    const skills = JSON.parse(localStorage.getItem('skills') || '[]');
    const _subjects = JSON.parse(localStorage.getItem('subjects') || '[]');
    
    if (skills.length === 0) {
      toast({
        title: "No Skills Found",
        description: "Please add some skills first to get recommendations",
        variant: "destructive"
      });
      return;
    }
    
    navigate('/recommendations');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate('/student-details')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Personalized Recommendations</h1>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Your Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map(skill => (
                <Badge key={skill.id} variant="secondary">
                  {skill.name}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500">No skills added yet. Add some skills in your profile to get better recommendations!</p>
            )}
          </div>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Project Ideas ({projects.length})
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Companies ({companies.length})
            </TabsTrigger>
            <TabsTrigger value="leetcode" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              LeetCode Problems ({leetcodeProblems.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={Code} 
                message="No project recommendations available. Add some skills to your profile!" 
              />
            )}
          </TabsContent>

          <TabsContent value="companies">
            {companies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company, index) => (
                  <CompanyCard key={index} company={company} />
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={Building} 
                message="No company recommendations available. Add some skills to your profile!" 
              />
            )}
          </TabsContent>

          <TabsContent value="leetcode">
            {leetcodeProblems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {leetcodeProblems.map((problem, index) => (
                  <LeetCodeCard key={index} problem={problem} />
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={BookOpen} 
                message="No LeetCode problems available. Add some programming skills to your profile!" 
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Recommendations;
