
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Search, Sparkles, ArrowRight, ThumbsUp, ThumbsDown, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { TherapyToolTypes } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

interface AIGeneratedTool {
  id: string;
  title: string;
  description: string;
  category: TherapyToolTypes;
  ageRange: string;
  prompt: string;
  content: string;
  feedback?: 'positive' | 'negative';
}

export const AIToolsLibrary: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState<TherapyToolTypes>('assessment');
  const [ageRange, setAgeRange] = useState('3-12');
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedTools, setSavedTools] = useState<AIGeneratedTool[]>([]);
  const [generatedTools, setGeneratedTools] = useState<AIGeneratedTool[]>([]);
  const [promptHistory, setPromptHistory] = useState<string[]>([
    'Create a visual schedule for morning routine',
    'Design a sensory activity for children with tactile sensitivity',
    'Develop a communication board for non-verbal children',
    'Create a behavioral intervention plan for attention-seeking behavior'
  ]);
  
  const exampleTools: AIGeneratedTool[] = [
    {
      id: 'ai-tool-1',
      title: 'Daily Emotional Check-In Visual Support',
      description: 'A visual aid to help children identify and express their emotions throughout the day.',
      category: 'visual',
      ageRange: '4-10',
      prompt: 'Create a visual emotional check-in tool for young children',
      content: 'Comprehensive visual chart with emoji faces representing different emotions and simple strategies for regulation',
    },
    {
      id: 'ai-tool-2',
      title: 'Sensory Processing Assessment Questionnaire',
      description: 'A detailed assessment tool to identify sensory processing challenges across multiple domains.',
      category: 'assessment',
      ageRange: '3-18',
      prompt: 'Generate a comprehensive sensory processing assessment',
      content: 'Multi-page assessment covering tactile, auditory, visual, vestibular and proprioceptive processing',
    },
    {
      id: 'ai-tool-3',
      title: 'Social Skills Story Creator',
      description: 'Generate customized social stories to address specific behavioral challenges.',
      category: 'social',
      ageRange: '5-12',
      prompt: 'Create a social story template for playground interactions',
      content: 'Editable social story template with placeholders for personalization',
    }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt describing the tool you need');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulating AI generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would call an API endpoint
      const newTool: AIGeneratedTool = {
        id: `ai-tool-${Date.now()}`,
        title: `AI Generated: ${prompt.slice(0, 30)}...`,
        description: `This is an AI-generated therapy tool based on your specific requirements. It has been tailored for the ${category} category and age range ${ageRange}.`,
        category,
        ageRange,
        prompt,
        content: `The AI has generated content for a therapy tool based on: "${prompt}". This would include customized activities, worksheets, visual supports, or assessment tools depending on the request.`,
      };
      
      // Add to generated tools
      setGeneratedTools(prev => [newTool, ...prev]);
      
      // Add to prompt history if not already there
      if (!promptHistory.includes(prompt)) {
        setPromptHistory(prev => [prompt, ...prev.slice(0, 9)]);
      }
      
      toast.success('Tool generated successfully!');
      setPrompt('');
    } catch (error) {
      console.error('Error generating tool:', error);
      toast.error('Failed to generate tool. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveTool = (tool: AIGeneratedTool) => {
    setSavedTools(prev => [tool, ...prev]);
    toast.success('Tool saved to your library');
  };

  const handleFeedback = (toolId: string, type: 'positive' | 'negative') => {
    setGeneratedTools(prev => 
      prev.map(tool => 
        tool.id === toolId ? { ...tool, feedback: type } : tool
      )
    );
    
    toast.success(`Thank you for your feedback! This helps improve future tools.`);
  };

  const handlePromptClick = (promptText: string) => {
    setPrompt(promptText);
  };

  const renderAIToolCard = (tool: AIGeneratedTool, showFeedback: boolean = true, showSave: boolean = true) => (
    <Card key={tool.id} className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={getCategoryBadgeColor(tool.category)}>
            {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}
          </Badge>
          <Sparkles className="h-5 w-5 text-purple-500" />
        </div>
        <CardTitle className="text-lg mt-2">{tool.title}</CardTitle>
        <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="text-sm text-muted-foreground mb-2">
          <span>Ages: {tool.ageRange}</span>
        </div>
        <div className="bg-muted p-3 rounded-md text-sm h-24 overflow-y-auto">
          <p className="font-semibold mb-1">Generated from prompt:</p>
          <p className="italic">"{tool.prompt}"</p>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex gap-2">
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1"
          onClick={() => toast.success("Tool preview opened in a new tab")}
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => toast.success("Tool downloaded")}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        {showSave && (
          <Button 
            variant="secondary" 
            size="sm" 
            className="flex-1"
            onClick={() => handleSaveTool(tool)}
          >
            <Brain className="mr-2 h-4 w-4" />
            Save
          </Button>
        )}
        {showFeedback && (
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon"
              className={`h-8 w-8 ${tool.feedback === 'positive' ? 'bg-green-100' : ''}`}
              onClick={() => handleFeedback(tool.id, 'positive')}
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className={`h-8 w-8 ${tool.feedback === 'negative' ? 'bg-red-100' : ''}`}
              onClick={() => handleFeedback(tool.id, 'negative')}
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="bg-muted/40 rounded-lg p-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold">AI Therapy Tools Generator</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Describe the therapy tool you need, and our AI will generate it for you in seconds
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2 col-span-2">
            <label htmlFor="prompt" className="text-sm font-medium">What kind of therapy tool do you need?</label>
            <Textarea 
              id="prompt"
              placeholder="E.g., Create a visual schedule for morning routine activities for a 6-year-old with ADHD"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <select 
                id="category"
                className="w-full p-2 border rounded-md" 
                value={category}
                onChange={(e) => setCategory(e.target.value as TherapyToolTypes)}
              >
                <option value="assessment">Assessment</option>
                <option value="visual">Visual Supports</option>
                <option value="motor">Motor Skills</option>
                <option value="communication">Communication</option>
                <option value="behavioral">Behavioral</option>
                <option value="social">Social Skills</option>
                <option value="sensory">Sensory Processing</option>
                <option value="cognitive">Cognitive Skills</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="age-range" className="text-sm font-medium">Age Range</label>
              <Input 
                id="age-range"
                placeholder="E.g., 3-8, 9-12, 13-18" 
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !prompt.trim()}
            className="px-8"
          >
            {isGenerating ? 'Generating...' : 'Generate Tool'}
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Recent prompts</p>
          <div className="flex flex-wrap gap-2">
            {promptHistory.slice(0, 5).map((text, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="cursor-pointer hover:bg-muted"
                onClick={() => handlePromptClick(text)}
              >
                {text.length > 30 ? `${text.substring(0, 30)}...` : text}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="generated" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-3">
          <TabsTrigger value="generated">Recently Generated</TabsTrigger>
          <TabsTrigger value="saved">My Saved Tools</TabsTrigger>
          <TabsTrigger value="examples">Example Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generated" className="mt-4">
          {isGenerating && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <Card key={i} className="h-full">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardHeader>
                  <CardContent className="pb-2">
                    <Skeleton className="h-3 w-24 mb-2" />
                    <Skeleton className="h-24 w-full rounded-md" />
                  </CardContent>
                  <CardFooter className="pt-2 flex gap-2">
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          {!isGenerating && generatedTools.length === 0 ? (
            <div className="text-center py-8">
              <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No tools generated yet</h3>
              <p className="text-muted-foreground">
                Use the generator above to create your first AI therapy tool
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedTools.map(tool => renderAIToolCard(tool))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="saved" className="mt-4">
          {savedTools.length === 0 ? (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No saved tools yet</h3>
              <p className="text-muted-foreground">
                Save generated tools to access them here
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedTools.map(tool => renderAIToolCard(tool, false, false))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="examples" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exampleTools.map(tool => renderAIToolCard(tool, false))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function to get badge color based on category
const getCategoryBadgeColor = (category: TherapyToolTypes): string => {
  const colors = {
    'assessment': 'bg-blue-100 text-blue-800 border-blue-200',
    'visual': 'bg-amber-100 text-amber-800 border-amber-200',
    'motor': 'bg-green-100 text-green-800 border-green-200',
    'communication': 'bg-purple-100 text-purple-800 border-purple-200',
    'behavioral': 'bg-red-100 text-red-800 border-red-200',
    'social': 'bg-pink-100 text-pink-800 border-pink-200',
    'sensory': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'cognitive': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  };
  return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
};
