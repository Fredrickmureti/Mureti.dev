
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import FileUpload from "@/components/admin/FileUpload";

interface HeroMetadata {
  background_type?: string;
  background_url?: string;
  fallback_image?: string;
}

const AdminMedia = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [metadata, setMetadata] = useState<HeroMetadata>({
    background_type: 'image',
    background_url: '',
    fallback_image: ''
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section', 'hero')
        .single();

      if (error) throw error;

      setHeroData(data);
      if (data.metadata && typeof data.metadata === 'object') {
        const meta = data.metadata as HeroMetadata;
        setMetadata({
          background_type: meta.background_type || 'image',
          background_url: meta.background_url || '',
          fallback_image: meta.fallback_image || ''
        });
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
      toast({
        title: "Error",
        description: "Failed to load hero section data",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('website_content')
        .update({
          metadata: metadata
        })
        .eq('section', 'hero');

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hero section updated successfully!",
      });
    } catch (error) {
      console.error('Error saving hero data:', error);
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = (url: string, type: 'background' | 'fallback') => {
    if (type === 'background') {
      setMetadata(prev => ({ ...prev, background_url: url }));
    } else {
      setMetadata(prev => ({ ...prev, fallback_image: url }));
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Media Management</h1>

        <Card>
          <CardHeader>
            <CardTitle>Hero Section Background</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-4 block">Background Type</Label>
              <RadioGroup
                value={metadata.background_type}
                onValueChange={(value) => setMetadata(prev => ({ ...prev, background_type: value }))}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="image" id="image" />
                  <Label htmlFor="image">Image</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="video" id="video" />
                  <Label htmlFor="video">Video</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="background_url" className="text-base font-medium">
                {metadata.background_type === 'video' ? 'Video URL' : 'Image URL'}
              </Label>
              <div className="mt-2 space-y-2">
                <Input
                  id="background_url"
                  value={metadata.background_url}
                  onChange={(e) => setMetadata(prev => ({ ...prev, background_url: e.target.value }))}
                  placeholder={`Enter ${metadata.background_type} URL or upload below`}
                />
                <FileUpload
                  onUpload={(url) => handleFileUpload(url, 'background')}
                  accept={metadata.background_type === 'video' ? 'video/*' : 'image/*'}
                  label={`Upload ${metadata.background_type === 'video' ? 'Video' : 'Image'}`}
                />
              </div>
            </div>

            {metadata.background_type === 'video' && (
              <div>
                <Label htmlFor="fallback_image" className="text-base font-medium">
                  Fallback Image (shown while video loads)
                </Label>
                <div className="mt-2 space-y-2">
                  <Input
                    id="fallback_image"
                    value={metadata.fallback_image}
                    onChange={(e) => setMetadata(prev => ({ ...prev, fallback_image: e.target.value }))}
                    placeholder="Enter fallback image URL or upload below"
                  />
                  <FileUpload
                    onUpload={(url) => handleFileUpload(url, 'fallback')}
                    accept="image/*"
                    label="Upload Fallback Image"
                  />
                </div>
              </div>
            )}

            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMedia;
