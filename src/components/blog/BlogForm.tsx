
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import FileUpload from "@/components/admin/FileUpload";
import { ImageUpload } from "@/components/admin/ImageUpload";
import RichTextEditor from "./RichTextEditor";
import { CodeEditorGuide } from "./CodeEditorGuide";
import type { Database } from "@/integrations/supabase/types";

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface BlogFormProps {
  post?: BlogPost | null;
  onSave: () => void;
  onCancel: () => void;
}

const BlogForm = ({ post, onSave, onCancel }: BlogFormProps) => {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    tags: Array.isArray(post?.tags) ? post.tags.join(', ') : "",
    published: post?.published || false,
    cover_image: post?.cover_image || ""
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleCoverImageUpload = (url: string) => {
    setFormData(prev => ({ ...prev, cover_image: url }));
  };

  const handleCoverImageRemove = () => {
    setFormData(prev => ({ ...prev, cover_image: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        reading_time: Math.ceil(formData.content.replace(/<[^>]*>/g, '').replace(/```[\s\S]*?```/g, '').split(' ').length / 200) // Estimate reading time from content (excluding code blocks)
      };

      if (post) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', post.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Blog post updated successfully!",
        });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert(postData);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Blog post created successfully!",
        });
      }

      onSave();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="auto-generated if empty"
              />
            </div>
          </div>

          <div>
            <Label>Cover Image</Label>
            <ImageUpload
              onImageUploaded={handleCoverImageUpload}
              multiple={false}
              maxSizeMB={10}
              acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
              className="mt-2"
            />
            {formData.cover_image && (
              <div className="mt-3">
                <p className="text-sm text-muted-foreground mb-2">Current cover image:</p>
                <div className="relative inline-block">
                  <img 
                    src={formData.cover_image} 
                    alt="Cover" 
                    className="w-32 h-20 object-cover rounded border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0"
                    onClick={handleCoverImageRemove}
                  >
                    ×
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Input
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief summary of the blog post"
            />
          </div>

          <div>
            <Label>Content *</Label>
            <CodeEditorGuide />
            <RichTextEditor
              value={formData.content}
              onChange={(content) => setFormData(prev => ({ ...prev, content }))}
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="tech, web development, tutorials"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              className="rounded border-gray-300"
            />
            <Label htmlFor="published">Publish immediately</Label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogForm;
