
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { X, Edit } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  semester: string;
}

const SubjectsManager = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState({ name: '', semester: '' });
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  useEffect(() => {
    const storedSubjects = localStorage.getItem('subjects');
    if (storedSubjects) {
      setSubjects(JSON.parse(storedSubjects));
    }
  }, []);

  const saveSubjects = (updatedSubjects: Subject[]) => {
    setSubjects(updatedSubjects);
    localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
  };

  const addSubject = () => {
    if (!newSubject.name || !newSubject.semester) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const subject: Subject = {
      id: Date.now().toString(),
      name: newSubject.name,
      semester: newSubject.semester
    };

    const updatedSubjects = [...subjects, subject];
    saveSubjects(updatedSubjects);
    setNewSubject({ name: '', semester: '' });
    
    toast({
      title: "Success",
      description: "Subject added successfully!"
    });
  };

  const updateSubject = () => {
    if (!editingSubject || !editingSubject.name || !editingSubject.semester) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const updatedSubjects = subjects.map(subject => 
      subject.id === editingSubject.id ? editingSubject : subject
    );
    
    saveSubjects(updatedSubjects);
    setEditingSubject(null);
    
    toast({
      title: "Success",
      description: "Subject updated successfully!"
    });
  };

  const deleteSubject = (id: string) => {
    const updatedSubjects = subjects.filter(subject => subject.id !== id);
    saveSubjects(updatedSubjects);
    
    toast({
      title: "Success",
      description: "Subject deleted successfully!"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subjects Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Subject */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Subject Name</Label>
            <Input
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
              placeholder="e.g., Data Structures"
            />
          </div>
          <div>
            <Label>Semester</Label>
            <Select value={newSubject.semester} onValueChange={(value) => setNewSubject({ ...newSubject, semester: value })}>
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
          <div className="flex items-end">
            <Button onClick={addSubject} className="w-full">
              Add Subject
            </Button>
          </div>
        </div>

        {/* Subjects List */}
        <div className="space-y-2">
          <h4 className="font-medium">Your Subjects ({subjects.length})</h4>
          {subjects.length === 0 ? (
            <p className="text-gray-500 text-sm">No subjects added yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {subjects.map(subject => (
                <div key={subject.id} className="flex items-center justify-between p-3 border rounded-lg">
                  {editingSubject?.id === subject.id ? (
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <Input
                        value={editingSubject.name}
                        onChange={(e) => setEditingSubject({ ...editingSubject, name: e.target.value })}
                        placeholder="Subject name"
                      />
                      <Select 
                        value={editingSubject.semester} 
                        onValueChange={(value) => setEditingSubject({ ...editingSubject, semester: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
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
                  ) : (
                    <div className="flex-1">
                      <p className="font-medium">{subject.name}</p>
                      <p className="text-sm text-gray-500">Semester {subject.semester}</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    {editingSubject?.id === subject.id ? (
                      <>
                        <Button size="sm" onClick={updateSubject}>Save</Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingSubject(null)}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => setEditingSubject(subject)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteSubject(subject.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectsManager;
