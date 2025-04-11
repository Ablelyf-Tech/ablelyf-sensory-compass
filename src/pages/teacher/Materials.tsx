
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { MaterialsSearchBar } from '@/components/teacher/materials/MaterialsSearchBar';
import { MaterialsList } from '@/components/teacher/materials/MaterialsList';
import { 
  getCategoryColorScheme, 
  MATERIAL_CATEGORIES, 
  mockMaterials, 
  MaterialItem 
} from '@/components/teacher/materials/MaterialsUtils';

const Materials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [materials, setMaterials] = useState<MaterialItem[]>(mockMaterials);
  
  // Filter materials based on search term and active tab
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = 
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === 'all') return matchesSearch;
    
    const activeCategory = MATERIAL_CATEGORIES.find(cat => cat.id === activeTab)?.category;
    return matchesSearch && material.category === activeCategory;
  });

  const handleUpload = () => {
    toast.success('Upload functionality coming soon!');
  };

  const handleDownload = (id: number) => {
    toast.success(`Downloading material ID: ${id}`);
  };

  const handlePreview = (id: number) => {
    toast.success(`Previewing material ID: ${id}`);
  };

  const handleOpenExternal = (id: number) => {
    toast.success(`Opening material ID: ${id} in new tab`);
  };

  const handleDelete = (id: number) => {
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

      <MaterialsSearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onUpload={handleUpload}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {MATERIAL_CATEGORIES.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {MATERIAL_CATEGORIES.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-4">
            <MaterialsList
              materials={filteredMaterials}
              getCategoryColor={getCategoryColorScheme}
              onDownload={handleDownload}
              onPreview={handlePreview}
              onOpenExternal={handleOpenExternal}
              onDelete={handleDelete}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Materials;
