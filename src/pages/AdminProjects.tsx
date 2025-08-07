
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type ProjectRow = Database['public']['Tables']['projects']['Row'];

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  tech_stack: string[];
  github_url: string;
  live_url: string;
  demo_video_url: string;
  screenshots: string[];
  status: "published" | "draft";
  featured: boolean;
  created_at: string;
  updated_at: string;
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    tech_stack: [] as string[],
    github_url: "",
    live_url: "",
    demo_video_url: "",
    screenshots: [] as string[],
    status: "published" as "published" | "draft",
    featured: false
  });
  const [techInput, setTechInput] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our Project interface
      const transformedData: Project[] = (data || []).map((project: ProjectRow) => ({
        ...project,
        status: (project.status === 'draft' ? 'draft' : 'published') as "published" | "draft",
        description: project.description || '',
        content: project.content || '',
        tech_stack: project.tech_stack || [],
        github_url: project.github_url || '',
        live_url: project.live_url || '',
        demo_video_url: project.demo_video_url || '',
        screenshots: project.screenshots || []
      }));
      
      setProjects(transformedData);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', editingProject.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Project updated successfully!" });
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([formData]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Project created successfully!" });
      }
      
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description || "",
      content: project.content || "",
      tech_stack: project.tech_stack || [],
      github_url: project.github_url || "",
      live_url: project.live_url || "",
      demo_video_url: project.demo_video_url || "",
      screenshots: project.screenshots || [],
      status: project.status as "published" | "draft",
      featured: project.featured
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({ title: "Success", description: "Project deleted successfully!" });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      content: "",
      tech_stack: [],
      github_url: "",
      live_url: "",
      demo_video_url: "",
      screenshots: [],
      status: "published",
      featured: false
    });
    setTechInput("");
    setEditingProject(null);
    setShowForm(false);
  };

  const addTech = () => {
    if (techInput.trim() && !formData.tech_stack.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tech_stack: [...prev.tech_stack, techInput.trim()]
      }));
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      tech_stack: prev.tech_stack.filter(t => t !== tech)
    }));
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Projects Management</h1>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>

        {showForm ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
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
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={6}
                  />
                </div>

                <div>
                  <Label>Tech Stack</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      placeholder="Add technology"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                    />
                    <Button type="button" onClick={addTech}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tech_stack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="cursor-pointer" onClick={() => removeTech(tech)}>
                        {tech} ×
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="github_url">GitHub URL</Label>
                    <Input
                      id="github_url"
                      type="url"
                      value={formData.github_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="live_url">Live URL</Label>
                    <Input
                      id="live_url"
                      type="url"
                      value={formData.live_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, live_url: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="published"
                      name="status"
                      value="published"
                      checked={formData.status === "published"}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as "published" }))}
                    />
                    <Label htmlFor="published">Published</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="draft"
                      name="status"
                      value="draft"
                      checked={formData.status === "draft"}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as "draft" }))}
                    />
                    <Label htmlFor="draft">Draft</Label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        {project.featured && <Badge>Featured</Badge>}
                        <Badge variant={project.status === "published" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      {project.tech_stack && project.tech_stack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech_stack.map((tech) => (
                            <Badge key={tech} variant="outline">{tech}</Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        {project.github_url && <span>GitHub: ✓</span>}
                        {project.live_url && <span>Live URL: ✓</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {projects.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No projects found. Create your first project!</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
