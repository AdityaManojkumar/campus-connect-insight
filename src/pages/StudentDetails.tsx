
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import SkillsManager from '@/components/SkillsManager';
import SubjectsManager from '@/components/SubjectsManager';
import GeminiChatbot from '@/components/GeminiChatbot';

interface StudentData {
  name: string;
  dob: string;
  semester: string;
  college: string;
  branch: string;
}

const StudentDetails = () => {
  const [studentData, setStudentData] = useState<StudentData>({
    name: '',
    dob: '',
    semester: '',
    college: '',
    branch: ''
  });
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserData = localStorage.getItem('userData');
    
    if (!isLoggedIn || !storedUserData) {
      navigate('/');
      return;
    }
    
    setUserData(JSON.parse(storedUserData));
    
    // Load existing student data if available
    const existingData = localStorage.getItem('studentDetails');
    if (existingData) {
      setStudentData(JSON.parse(existingData));
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentData.name || !studentData.dob || !studentData.semester || !studentData.college || !studentData.branch) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('studentDetails', JSON.stringify(studentData));
    
    toast({
      title: "Success",
      description: "Student details saved successfully!"
    });
  };

  const handleChange = (name: string, value: string) => {
    setStudentData({
      ...studentData,
      [name]: value
    });
  };

  const handleViewRecommendations = () => {
    const skills = JSON.parse(localStorage.getItem('skills') || '[]');
    const subjects = JSON.parse(localStorage.getItem('subjects') || '[]');
    
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

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    toast({
      title: "Logged Out",
      description: "Successfully logged out"
    });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
          <div className="flex gap-4">
            <Button onClick={handleViewRecommendations} variant="outline">
              View Recommendations
            </Button>
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <p className="text-sm text-gray-600">Welcome, {userData.username}!</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={studentData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={studentData.dob}
                        onChange={(e) => handleChange('dob', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="semester">Semester</Label>
                      <Select value={studentData.semester} onValueChange={(value) => handleChange('semester', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8].map(sem => (
                            <SelectItem key={sem} value={sem.toString()}>
                              Semester {sem}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="college">College Name</Label>
                      <Input
                        id="college"
                        value={studentData.college}
                        onChange={(e) => handleChange('college', e.target.value)}
                        placeholder="Enter your college name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="branch">Branch</Label>
                    <Select value={studentData.branch} onValueChange={(value) => handleChange('branch', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Information Technology">Information Technology</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Mechanical">Mechanical</SelectItem>
                        <SelectItem value="Civil">Civil</SelectItem>
                        <SelectItem value="Electrical">Electrical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Save Details
                  </Button>
                </form>
              </CardContent>
            </Card>

            <SkillsManager />
            <SubjectsManager />
          </div>

          <div className="lg:col-span-1">
            <GeminiChatbot />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
