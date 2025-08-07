
-- Add color column to categories table
ALTER TABLE public.categories 
ADD COLUMN color TEXT DEFAULT '#3b82f6';

-- Add a comment to describe the column
COMMENT ON COLUMN public.categories.color IS 'Hex color code for the category display';
