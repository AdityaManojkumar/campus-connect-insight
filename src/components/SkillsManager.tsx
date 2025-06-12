
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { X, Edit } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
}

const SkillsManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({ name: '', category: '' });
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const categories = ['Programming', 'Web Development', 'Data Science', 'Mobile Development', 'Database', 'DevOps', 'Design', 'Other'];

  useEffect(() => {
    const storedSkills = localStorage.getItem('skills');
    if (storedSkills) {
      setSkills(JSON.parse(storedSkills));
    }
  }, []);

  const saveSkills = (updatedSkills: Skill[]) => {
    setSkills(updatedSkills);
    localStorage.setItem('skills', JSON.stringify(updatedSkills));
  };

  const addSkill = () => {
    if (!newSkill.name || !newSkill.category) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name,
      category: newSkill.category
    };

    const updatedSkills = [...skills, skill];
    saveSkills(updatedSkills);
    setNewSkill({ name: '', category: '' });
    
    toast({
      title: "Success",
      description: "Skill added successfully!"
    });
  };

  const updateSkill = () => {
    if (!editingSkill || !editingSkill.name || !editingSkill.category) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const updatedSkills = skills.map(skill => 
      skill.id === editingSkill.id ? editingSkill : skill
    );
    
    saveSkills(updatedSkills);
    setEditingSkill(null);
    
    toast({
      title: "Success",
      description: "Skill updated successfully!"
    });
  };

  const deleteSkill = (id: string) => {
    const updatedSkills = skills.filter(skill => skill.id !== id);
    saveSkills(updatedSkills);
    
    toast({
      title: "Success",
      description: "Skill deleted successfully!"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Skill */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Skill Name</Label>
            <Input
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="e.g., React.js"
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={newSkill.category} onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button onClick={addSkill} className="w-full">
              Add Skill
            </Button>
          </div>
        </div>

        {/* Skills List */}
        <div className="space-y-2">
          <h4 className="font-medium">Your Skills ({skills.length})</h4>
          {skills.length === 0 ? (
            <p className="text-gray-500 text-sm">No skills added yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {skills.map(skill => (
                <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg">
                  {editingSkill?.id === skill.id ? (
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <Input
                        value={editingSkill.name}
                        onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                        placeholder="Skill name"
                      />
                      <Select 
                        value={editingSkill.category} 
                        onValueChange={(value) => setEditingSkill({ ...editingSkill, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <p className="font-medium">{skill.name}</p>
                      <p className="text-sm text-gray-500">{skill.category}</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    {editingSkill?.id === skill.id ? (
                      <>
                        <Button size="sm" onClick={updateSkill}>Save</Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingSkill(null)}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => setEditingSkill(skill)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteSkill(skill.id)}>
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

export default SkillsManager;
