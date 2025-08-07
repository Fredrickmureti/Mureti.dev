import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ImageUploadProps {
  onImageUploaded?: (url: string) => void;
  onImagesUploaded?: (urls: string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  className?: string;
}

interface UploadedImage {
  id: string;
  file: File;
  url: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

export const ImageUpload = ({
  onImageUploaded,
  onImagesUploaded,
  multiple = false,
  maxFiles = 5,
  maxSizeMB = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  className = ''
}: ImageUploadProps) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported. Please use: ${acceptedTypes.join(', ')}`;
    }
    
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File size must be less than ${maxSizeMB}MB`;
    }
    
    return null;
  };

  const simulateUpload = async (file: File, imageId: string): Promise<string> => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadedImages(prev => 
        prev.map(img => 
          img.id === imageId 
            ? { ...img, progress }
            : img
        )
      );
    }

    // In a real implementation, you would upload to your backend/cloud storage
    // For now, we'll use the blob URL as a placeholder
    return URL.createObjectURL(file);
  };

  const handleFiles = async (files: FileList) => {
    const fileArray = Array.from(files);
    
    if (!multiple && fileArray.length > 1) {
      return;
    }
    
    if (multiple && uploadedImages.length + fileArray.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} files`);
      return;
    }

    const newImages: UploadedImage[] = fileArray.map(file => {
      const validation = validateFile(file);
      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        url: URL.createObjectURL(file),
        progress: 0,
        status: validation ? 'error' : 'uploading',
        error: validation || undefined
      };
    });

    setUploadedImages(prev => [...prev, ...newImages]);

    // Upload valid files
    for (const image of newImages) {
      if (image.status === 'uploading') {
        try {
          const uploadedUrl = await simulateUpload(image.file, image.id);
          
          setUploadedImages(prev => 
            prev.map(img => 
              img.id === image.id 
                ? { ...img, status: 'completed' as const, url: uploadedUrl }
                : img
            )
          );

          if (!multiple && onImageUploaded) {
            onImageUploaded(uploadedUrl);
          }
        } catch (error) {
          setUploadedImages(prev => 
            prev.map(img => 
              img.id === image.id 
                ? { ...img, status: 'error' as const, error: 'Upload failed' }
                : img
            )
          );
        }
      }
    }

    // Call onImagesUploaded for multiple uploads
    if (multiple && onImagesUploaded) {
      const completedUrls = uploadedImages
        .filter(img => img.status === 'completed')
        .map(img => img.url);
      onImagesUploaded(completedUrls);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (imageId: string) => {
    setUploadedImages(prev => {
      const updated = prev.filter(img => img.id !== imageId);
      
      if (multiple && onImagesUploaded) {
        const completedUrls = updated
          .filter(img => img.status === 'completed')
          .map(img => img.url);
        onImagesUploaded(completedUrls);
      }
      
      return updated;
    });
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <Card className={`border-2 border-dashed transition-colors ${
        dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
      }`}>
        <CardContent className="p-6">
          <div
            className="text-center cursor-pointer"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">
                Drop {multiple ? 'files' : 'file'} here or click to browse
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {acceptedTypes.map(type => type.split('/')[1]).join(', ').toUpperCase()} 
                {' '}up to {maxSizeMB}MB
                {multiple && ` (max ${maxFiles} files)`}
              </p>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(',')}
            multiple={multiple}
            onChange={handleFileSelect}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">
            {multiple ? 'Uploaded Images' : 'Uploaded Image'}
          </h4>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {uploadedImages.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="relative">
                    <div className="aspect-video relative bg-muted rounded overflow-hidden">
                      {image.status === 'error' ? (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ) : (
                        <img
                          src={image.url}
                          alt={image.file.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      
                      {image.status === 'uploading' && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Loader2 className="h-6 w-6 text-white animate-spin" />
                        </div>
                      )}
                    </div>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0"
                      onClick={() => removeImage(image.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-medium truncate" title={image.file.name}>
                      {image.file.name}
                    </p>
                    
                    {image.status === 'uploading' && (
                      <Progress value={image.progress} className="h-1" />
                    )}
                    
                    {image.status === 'error' && image.error && (
                      <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                        <AlertDescription className="text-xs text-red-800 dark:text-red-300">
                          {image.error}
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {image.status === 'completed' && (
                      <p className="text-xs text-green-600 dark:text-green-400">
                        ✓ Uploaded successfully
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
