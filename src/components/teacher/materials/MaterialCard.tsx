
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, ExternalLink, Trash } from 'lucide-react';
import { MaterialItem } from '../../../types/materials';

interface MaterialCardProps {
  material: MaterialItem;
  getCategoryColor: (category: string) => string;
  onDownload: (id: number) => void;
  onPreview: (id: number) => void;
  onOpenExternal: (id: number) => void;
  onDelete: (id: number) => void;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({
  material,
  getCategoryColor,
  onDownload,
  onPreview,
  onOpenExternal,
  onDelete
}) => {
  return (
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
          onClick={() => onDownload(material.id)}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onPreview(material.id)}
        >
          <FileText className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-9 p-0" 
          onClick={() => onOpenExternal(material.id)}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-9 p-0 text-destructive hover:text-destructive" 
          onClick={() => onDelete(material.id)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
