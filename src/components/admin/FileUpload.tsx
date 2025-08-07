
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface FileUploadProps {
  onUpload: (url: string) => void;
  onRemove?: (url: string) => void;
  accept?: string;
  label: string;
  multiple?: boolean;
  existingUrls?: string[];
  bucket?: string;
}

const FileUpload = ({ 
  onUpload, 
  onRemove,
  accept = "image/*", 
  label, 
  multiple = false,
  existingUrls = [],
  bucket = "project-images"
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadToSupabase = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      if (multiple) {
        for (const file of Array.from(files)) {
          const url = await uploadToSupabase(file);
          onUpload(url);
        }
        toast({
          title: "Success",
          description: `${files.length} file(s) uploaded successfully!`,
        });
      } else {
        const url = await uploadToSupabase(files[0]);
        onUpload(url);
        toast({
          title: "Success",
          description: "File uploaded successfully!",
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset the input
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
          id={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById(`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`)?.click()}
          disabled={uploading}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? "Uploading..." : label}
        </Button>
      </div>

      {/* Display existing uploaded images */}
      {existingUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {existingUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border"
              />
              {onRemove && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                  onClick={() => onRemove(url)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
