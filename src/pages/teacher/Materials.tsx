
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Plus, Download, Upload, FileText, ExternalLink, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Materials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock materials data
  const [materials, setMaterials] = useState([
    { 
      id: 1, 
      title: 'Visual Schedule Templates', 
      description: 'Customizable visual schedule templates for daily classroom routines.',
      category: 'Visual Supports',
      fileType: 'PDF, DOCX',
      fileSize: '2.5 MB',
      tags: ['Visual', 'Organization', 'Routine']
    },
    { 
      id: 2, 
      title: 'Sensory Break Activity Cards', 
      description: 'Printable cards with sensory break activities for classroom use.',
      category: 'Sensory',
      fileType: 'PDF',
      fileSize: '1.8 MB',
      tags: ['Sensory', 'Movement', 'Regulation']
    },
    { 
      id: 3, 
      title: 'Social Story Templates', 
      description: 'Editable social story templates for various classroom situations.',
      category: 'Social Emotional',
      fileType: 'DOCX, PPT',
      fileSize: '3.2 MB',
      tags: ['Social', 'Communication', 'Behavior']
    },
    { 
      id: 4, 
      title: 'Modified Math Worksheets', 
      description: 'Math practice sheets with visual supports and scaffolded problems.',
      category: 'Academic',
      fileType: 'PDF',
      fileSize: '5.1 MB',
      tags: ['Math', 'Modification', 'Visual']
    },
    { 
      id: 5, 
      title: 'Executive Function Organizers', 
      description: 'Graphic organizers to support planning, organization, and time management.',
      category: 'Executive Function',
      fileType: 'PDF, DOCX',
      fileSize: '2.3 MB',
      tags: ['Organization', 'Planning', 'Time Management']
    },
    { 
      id: 6, 
      title: 'Calming Corner Resources', 
      description: 'Printable resources for setting up a classroom calming corner.',
      category: 'Sensory',
      fileType: 'PDF, JPG',
      fileSize: '4.7 MB',
      tags: ['Regulation', 'Sensory', 'Environment']
    },
  ]);

  // Filter materials based on search term and active tab
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = 
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'visual') return matchesSearch && material.category === 'Visual Supports';
    if (activeTab === 'sensory') return matchesSearch && material.category === 'Sensory';
    if (activeTab === 'social') return matchesSearch && material.category === 'Social Emotional';
    if (activeTab === 'academic') return matchesSearch && material.category === 'Academic';
    
    return matchesSearch;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Visual Supports': 'bg-amber-100 text-amber-800 border-amber-200',
      'Sensory': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Social Emotional': 'bg-pink-100 text-pink-800 border-pink-200',
      'Academic': 'bg-blue-100 text-blue-800 border-blue-200',
      'Executive Function': 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleUpload = () => {
    toast.success('Upload functionality coming soon!');
  };

  const handleDownload = (id) => {
    toast.success(`Downloading material ID: ${id}`);
  };

  const handlePreview = (id) => {
    toast.success(`Previewing material ID: ${id}`);
  };

  const handleOpenExternal = (id) => {
    toast.success(`Opening material ID: ${id} in new tab`);
  };

  const handleDelete = (id) => {
    setMaterials(materials.filter(material => material.id !== id));
    toast.success('Material deleted successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Educational Materials</h1>
        <p className="text-muted-foreground">
          Access and share inclusive educational resources and materials
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search materials..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="sm:w-auto" onClick={handleUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Materials</TabsTrigger>
          <TabsTrigger value="visual">Visual Supports</TabsTrigger>
          <TabsTrigger value="sensory">Sensory</TabsTrigger>
          <TabsTrigger value="social">Social Emotional</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {filteredMaterials.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center">
                <p>No materials match your search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.map(material => (
                <Card key={material.id} className="flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <div>
                      <Badge className={getCategoryColor(material.category)}>
                        {material.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{material.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {material.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-x-4">
                      <span>{material.fileType}</span>
                      <span>{material.fileSize}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex gap-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleDownload(material.id)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handlePreview(material.id)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-9 p-0" 
                      onClick={() => handleOpenExternal(material.id)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-9 p-0 text-destructive hover:text-destructive" 
                      onClick={() => handleDelete(material.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="visual" className="mt-4">
          {filteredMaterials.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center">
                <p>No visual support materials match your search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.map(material => (
                <Card key={material.id} className="flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <div>
                      <Badge className={getCategoryColor(material.category)}>
                        {material.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{material.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {material.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-x-4">
                      <span>{material.fileType}</span>
                      <span>{material.fileSize}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex gap-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleDownload(material.id)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handlePreview(material.id)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-9 p-0" 
                      onClick={() => handleOpenExternal(material.id)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-9 p-0 text-destructive hover:text-destructive" 
                      onClick={() => handleDelete(material.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="sensory" className="mt-4">
          {filteredMaterials.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center">
                <p>No sensory materials match your search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.map(material => (
                <Card key={material.id} className="flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <div>
                      <Badge className={getCategoryColor(material.category)}>
                        {material.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{material.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {material.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-x-4">
                      <span>{material.fileType}</span>
                      <span>{material.fileSize}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex gap-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleDownload(material.id)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handlePreview(material.id)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-9 p-0" 
                      onClick={() => handleOpenExternal(material.id)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-9 p-0 text-destructive hover:text-destructive" 
                      onClick={() => handleDelete(material.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="social" className="mt-4">
          {filteredMaterials.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center">
                <p>No social emotional materials match your search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.map(material => (
                <Card key={material.id} className="flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <div>
                      <Badge className={getCategoryColor(material.category)}>
                        {material.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{material.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {material.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-x-4">
                      <span>{material.fileType}</span>
                      <span>{material.fileSize}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex gap-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleDownload(material.id)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handlePreview(material.id)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-9 p-0" 
                      onClick={() => handleOpenExternal(material.id)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-9 p-0 text-destructive hover:text-destructive" 
                      onClick={() => handleDelete(material.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="academic" className="mt-4">
          {filteredMaterials.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center">
                <p>No academic materials match your search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.map(material => (
                <Card key={material.id} className="flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <div>
                      <Badge className={getCategoryColor(material.category)}>
                        {material.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{material.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {material.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-x-4">
                      <span>{material.fileType}</span>
                      <span>{material.fileSize}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex gap-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleDownload(material.id)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handlePreview(material.id)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-9 p-0" 
                      onClick={() => handleOpenExternal(material.id)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-9 p-0 text-destructive hover:text-destructive" 
                      onClick={() => handleDelete(material.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Materials;
