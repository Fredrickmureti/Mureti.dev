
-- Add screenshots and preview_image columns to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS preview_image TEXT,
ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}';

-- Update existing screenshots column to ensure it's properly configured
ALTER TABLE public.projects 
ALTER COLUMN screenshots SET DEFAULT '{}';

-- Create a storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for the project-images bucket
CREATE POLICY "Authenticated users can upload project images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'project-images' AND
  auth.uid() IS NOT NULL
);

CREATE POLICY "Anyone can view project images" ON storage.objects
FOR SELECT USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can update project images" ON storage.objects
FOR UPDATE WITH CHECK (
  bucket_id = 'project-images' AND
  auth.uid() IS NOT NULL
);

CREATE POLICY "Authenticated users can delete project images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'project-images' AND
  auth.uid() IS NOT NULL
);
