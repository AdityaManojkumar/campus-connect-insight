
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const GeminiChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI academic assistant. I can help you with your studies, career guidance, and academic questions. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    if (!apiKey && showApiKeyInput) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key first",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate AI response for now - replace with actual Gemini API call
      const response = await simulateGeminiResponse(inputMessage);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const simulateGeminiResponse = async (question: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get user's skills and subjects for context
    const skills = JSON.parse(localStorage.getItem('skills') || '[]');
    const subjects = JSON.parse(localStorage.getItem('subjects') || '[]');
    
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('career') || lowerQuestion.includes('job')) {
      return `Based on your skills (${skills.map((s: any) => s.name).join(', ')}), I recommend focusing on building projects that showcase these technologies. Consider applying for internships in companies that use these tech stacks. Would you like specific company recommendations?`;
    }
    
    if (lowerQuestion.includes('project') || lowerQuestion.includes('build')) {
      return `Great question! Given your skills in ${skills.slice(0, 3).map((s: any) => s.name).join(', ')}, I suggest building a full-stack application that combines these technologies. For example, a portfolio website, a task management app, or a social media platform. Would you like detailed project ideas?`;
    }
    
    if (lowerQuestion.includes('interview') || lowerQuestion.includes('preparation')) {
      return `For interview preparation, focus on data structures and algorithms, system design (for senior roles), and practical coding problems. Based on your skills, practice problems related to ${skills[0]?.name || 'your tech stack'}. I recommend solving 2-3 LeetCode problems daily. Need specific problem recommendations?`;
    }
    
    return `That's an interesting question about "${question}". Based on your academic background in ${subjects[0]?.name || 'your subjects'} and skills in ${skills[0]?.name || 'technology'}, I'd recommend focusing on practical applications and hands-on projects. Could you provide more specific details about what you'd like to learn?`;
  };

  const handleApiKeySubmit = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }
    
    setShowApiKeyInput(false);
    toast({
      title: "Success",
      description: "API key saved! You can now chat with the AI."
    });
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🤖 AI Academic Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        {showApiKeyInput && (
          <div className="p-4 border-b bg-yellow-50">
            <p className="text-sm text-yellow-800 mb-2">
              Enter your Gemini API key to enable AI chat:
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Enter Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleApiKeySubmit} size="sm">
                Save
              </Button>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              Get your API key from Google AI Studio
            </p>
          </div>
        )}
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">AI is thinking...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything about your studies..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              disabled={showApiKeyInput}
            />
            <Button 
              onClick={sendMessage} 
              disabled={isLoading || showApiKeyInput}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeminiChatbot;
