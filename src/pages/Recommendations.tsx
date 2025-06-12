
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ExternalLink, Code, Building, BookOpen } from 'lucide-react';

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

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

    const storedSkills = JSON.parse(localStorage.getItem('skills') || '[]');
    const storedSubjects = JSON.parse(localStorage.getItem('subjects') || '[]');
    
    console.log('Loaded skills:', storedSkills);
    console.log('Loaded subjects:', storedSubjects);
    
    setSkills(storedSkills);
    setSubjects(storedSubjects);
    
    generateRecommendations(storedSkills, storedSubjects);
  }, [navigate]);

  const generateRecommendations = (userSkills: Skill[], userSubjects: Subject[]) => {
    console.log('Generating recommendations for skills:', userSkills);
    
    // Generate project recommendations based on skills
    const projectRecommendations = generateProjectIdeas(userSkills);
    console.log('Project recommendations:', projectRecommendations);
    setProjects(projectRecommendations);

    // Generate company recommendations
    const companyRecommendations = generateCompanyRecommendations(userSkills);
    console.log('Company recommendations:', companyRecommendations);
    setCompanies(companyRecommendations);

    // Generate LeetCode problems
    const problemRecommendations = generateLeetCodeProblems(userSkills);
    console.log('LeetCode recommendations:', problemRecommendations);
    setLeetcodeProblems(problemRecommendations);
  };

  const generateProjectIdeas = (userSkills: Skill[]) => {
    const projectDatabase = [
      {
        title: "E-commerce Platform",
        description: "Build a full-stack e-commerce website with user authentication, product catalog, and payment integration",
        skills: ["React", "Node.js", "JavaScript", "MongoDB", "Express", "Web Development", "Frontend", "Backend"],
        difficulty: "Intermediate",
        estimatedTime: "4-6 weeks"
      },
      {
        title: "Task Management App",
        description: "Create a collaborative task management application with real-time updates",
        skills: ["React", "Firebase", "JavaScript", "CSS", "Web Development", "Frontend"],
        difficulty: "Beginner",
        estimatedTime: "2-3 weeks"
      },
      {
        title: "Data Visualization Dashboard",
        description: "Build an interactive dashboard for data analysis with charts and graphs",
        skills: ["Python", "React", "D3.js", "Data Science", "JavaScript", "Analytics", "Visualization"],
        difficulty: "Advanced",
        estimatedTime: "3-4 weeks"
      },
      {
        title: "Social Media App",
        description: "Develop a social networking platform with posts, comments, and user profiles",
        skills: ["React", "Node.js", "MongoDB", "Socket.io", "JavaScript", "Web Development", "Full Stack"],
        difficulty: "Intermediate",
        estimatedTime: "5-7 weeks"
      },
      {
        title: "Portfolio Website",
        description: "Create a responsive portfolio website to showcase your projects and skills",
        skills: ["HTML", "CSS", "JavaScript", "React", "Web Development", "Frontend", "Design"],
        difficulty: "Beginner",
        estimatedTime: "1-2 weeks"
      },
      {
        title: "Weather App",
        description: "Build a weather application with location-based forecasts and maps",
        skills: ["JavaScript", "React", "API Integration", "CSS", "Web Development", "Frontend"],
        difficulty: "Beginner",
        estimatedTime: "1-2 weeks"
      },
      {
        title: "Calculator App",
        description: "Create a scientific calculator with advanced mathematical functions",
        skills: ["JavaScript", "HTML", "CSS", "Math", "Programming", "Basic"],
        difficulty: "Beginner",
        estimatedTime: "1 week"
      },
      {
        title: "Todo List Application",
        description: "Build a feature-rich todo list with categories, priorities, and due dates",
        skills: ["Programming", "JavaScript", "Web Development", "Basic", "Frontend"],
        difficulty: "Beginner",
        estimatedTime: "1-2 weeks"
      }
    ];

    const userSkillNames = userSkills.map(skill => skill.name.toLowerCase());
    console.log('User skill names for matching:', userSkillNames);
    
    let matchedProjects = projectDatabase.filter(project => 
      project.skills.some(skill => 
        userSkillNames.some(userSkill => 
          skill.toLowerCase().includes(userSkill) || userSkill.includes(skill.toLowerCase())
        )
      )
    );

    console.log('Matched projects before fallback:', matchedProjects);

    // If no matches found, provide general programming projects
    if (matchedProjects.length === 0) {
      console.log('No skill matches found, providing general projects');
      matchedProjects = projectDatabase.slice(4, 8); // Portfolio, Weather, Calculator, Todo
    }

    return matchedProjects.slice(0, 6);
  };

  const generateCompanyRecommendations = (userSkills: Skill[]) => {
    const companyDatabase = [
      {
        name: "Google",
        description: "Search, Cloud, AI, and Software solutions",
        requiredSkills: ["JavaScript", "Python", "Java", "React", "Machine Learning", "Programming", "Web Development"],
        type: "Tech Giant",
        hiring: true
      },
      {
        name: "Microsoft",
        description: "Cloud computing, productivity software, and enterprise solutions",
        requiredSkills: ["C#", "Azure", "JavaScript", "React", "Python", "Programming", "Web Development"],
        type: "Tech Giant",
        hiring: true
      },
      {
        name: "Amazon",
        description: "E-commerce, cloud services, and technology infrastructure",
        requiredSkills: ["Java", "Python", "AWS", "JavaScript", "Node.js", "Programming", "Web Development"],
        type: "Tech Giant",
        hiring: true
      },
      {
        name: "Netflix",
        description: "Streaming platform and content technology",
        requiredSkills: ["React", "Node.js", "Python", "Java", "Microservices", "Web Development", "Programming"],
        type: "Entertainment Tech",
        hiring: true
      },
      {
        name: "Spotify",
        description: "Music streaming and audio technology",
        requiredSkills: ["React", "Python", "Java", "Machine Learning", "Backend", "Programming", "Web Development"],
        type: "Entertainment Tech",
        hiring: true
      },
      {
        name: "Airbnb",
        description: "Travel and hospitality technology platform",
        requiredSkills: ["React", "Ruby", "JavaScript", "iOS", "Android", "Web Development", "Programming"],
        type: "Platform",
        hiring: true
      },
      {
        name: "Accenture",
        description: "Global consulting and technology services",
        requiredSkills: ["Programming", "Web Development", "Basic", "JavaScript", "Java", "Consulting"],
        type: "Consulting",
        hiring: true
      },
      {
        name: "TCS",
        description: "IT services and consulting company",
        requiredSkills: ["Programming", "Web Development", "Java", "JavaScript", "Basic", "IT Services"],
        type: "IT Services",
        hiring: true
      }
    ];

    const userSkillNames = userSkills.map(skill => skill.name.toLowerCase());
    
    let matchedCompanies = companyDatabase.filter(company => 
      company.requiredSkills.some(skill => 
        userSkillNames.some(userSkill => 
          skill.toLowerCase().includes(userSkill) || userSkill.includes(skill.toLowerCase())
        )
      )
    );

    // If no matches found, provide entry-level friendly companies
    if (matchedCompanies.length === 0) {
      console.log('No company matches found, providing entry-level companies');
      matchedCompanies = companyDatabase.slice(5, 8); // Airbnb, Accenture, TCS
    }

    return matchedCompanies.slice(0, 8);
  };

  const generateLeetCodeProblems = (userSkills: Skill[]) => {
    const problemDatabase = [
      {
        title: "Two Sum",
        difficulty: "Easy",
        description: "Find two numbers in an array that add up to a target sum",
        skills: ["Arrays", "Hash Table", "JavaScript", "Python", "Programming", "Basic", "Data Structures"],
        link: "https://leetcode.com/problems/two-sum/",
        topics: ["Array", "Hash Table"]
      },
      {
        title: "Valid Parentheses",
        difficulty: "Easy",
        description: "Determine if input string has valid parentheses",
        skills: ["Stack", "String", "JavaScript", "Python", "Programming", "Basic", "Data Structures"],
        link: "https://leetcode.com/problems/valid-parentheses/",
        topics: ["Stack", "String"]
      },
      {
        title: "Binary Tree Inorder Traversal",
        difficulty: "Easy",
        description: "Return inorder traversal of binary tree",
        skills: ["Tree", "Recursion", "JavaScript", "Python", "Programming", "Data Structures"],
        link: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
        topics: ["Tree", "Recursion"]
      },
      {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        description: "Find length of longest substring without repeating characters",
        skills: ["String", "Sliding Window", "JavaScript", "Python", "Programming", "Algorithms"],
        link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        topics: ["String", "Sliding Window"]
      },
      {
        title: "Add Two Numbers",
        difficulty: "Medium",
        description: "Add two numbers represented as linked lists",
        skills: ["Linked List", "Math", "JavaScript", "Python", "Programming", "Data Structures"],
        link: "https://leetcode.com/problems/add-two-numbers/",
        topics: ["Linked List", "Math"]
      },
      {
        title: "Container With Most Water",
        difficulty: "Medium",
        description: "Find container that can hold the most water",
        skills: ["Array", "Two Pointers", "JavaScript", "Python", "Programming", "Algorithms"],
        link: "https://leetcode.com/problems/container-with-most-water/",
        topics: ["Array", "Two Pointers"]
      },
      {
        title: "Palindrome Number",
        difficulty: "Easy",
        description: "Determine whether an integer is a palindrome",
        skills: ["Math", "Programming", "Basic", "JavaScript", "Python"],
        link: "https://leetcode.com/problems/palindrome-number/",
        topics: ["Math"]
      },
      {
        title: "Reverse Integer",
        difficulty: "Medium",
        description: "Reverse digits of a 32-bit signed integer",
        skills: ["Math", "Programming", "Basic", "JavaScript", "Python"],
        link: "https://leetcode.com/problems/reverse-integer/",
        topics: ["Math"]
      }
    ];

    const userSkillNames = userSkills.map(skill => skill.name.toLowerCase());
    
    let matchedProblems = problemDatabase.filter(problem => 
      problem.skills.some(skill => 
        userSkillNames.some(userSkill => 
          skill.toLowerCase().includes(userSkill) || userSkill.includes(skill.toLowerCase())
        )
      )
    );

    // If no matches found or user has general programming skills, provide basic problems
    if (matchedProblems.length === 0) {
      console.log('No LeetCode matches found, providing basic problems');
      matchedProblems = problemDatabase.slice(0, 4); // Two Sum, Valid Parentheses, etc.
    }

    return matchedProblems.slice(0, 6);
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
                  <Card key={index} className="h-full">
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
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Code className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No project recommendations available. Add some skills to your profile!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="companies">
            {companies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company, index) => (
                  <Card key={index} className="h-full">
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
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No company recommendations available. Add some skills to your profile!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="leetcode">
            {leetcodeProblems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {leetcodeProblems.map((problem, index) => (
                  <Card key={index} className="h-full">
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
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No LeetCode problems available. Add some programming skills to your profile!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Recommendations;
