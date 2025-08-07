
-- Add cover_image column to blog_posts table for preview images
ALTER TABLE public.blog_posts 
ADD COLUMN cover_image TEXT;

-- Add a comment to describe the column
COMMENT ON COLUMN public.blog_posts.cover_image IS 'URL to the cover/preview image for the blog post';
