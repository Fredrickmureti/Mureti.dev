-- Create categories table for blog posts
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content TEXT,
  tech_stack TEXT[],
  live_url TEXT,
  github_url TEXT,
  demo_video_url TEXT,
  screenshots TEXT[],
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  category_id UUID REFERENCES public.categories(id),
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  reading_time INTEGER,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (portfolio is public)
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view published projects" ON public.projects FOR SELECT USING (status = 'published');
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts FOR SELECT USING (published = true);

-- Create policies for admin write access (only authenticated admin)
CREATE POLICY "Admin can manage categories" ON public.categories FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin can manage projects" ON public.projects FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin can manage blog posts" ON public.blog_posts FOR ALL USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial categories
INSERT INTO public.categories (name, slug, description) VALUES
  ('Containers', 'containers', 'Docker, Kubernetes, and containerization technologies'),
  ('Cyber Security', 'cyber-security', 'Security practices, tools, and methodologies'),
  ('Computer Networking', 'computer-networking', 'Network protocols, infrastructure, and connectivity'),
  ('System Design', 'system-design', 'Architecture patterns and scalable system design'),
  ('Cloud Engineering', 'cloud-engineering', 'AWS, Azure, GCP, and cloud-native technologies'),
  ('DevOps', 'devops', 'CI/CD, automation, and infrastructure as code');