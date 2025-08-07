
-- Create a table for website content management
CREATE TABLE public.website_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) for admin access
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;

-- Create policy that allows authenticated users (admins) to view all content
CREATE POLICY "Admins can view all content" 
  ON public.website_content 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Create policy that allows authenticated users (admins) to manage all content
CREATE POLICY "Admins can manage all content" 
  ON public.website_content 
  FOR ALL
  USING (auth.uid() IS NOT NULL);

-- Create trigger to automatically update the updated_at column
CREATE TRIGGER update_website_content_updated_at 
  BEFORE UPDATE ON public.website_content 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial location data
INSERT INTO public.website_content (section, content) VALUES (
  'location',
  '{
    "address": "Kampala, Uganda",
    "latitude": "0.3476",
    "longitude": "32.5825",
    "zoom_level": "15",
    "marker_title": "Our Office",
    "contact_info": {
      "phone": "+256 700 123 456",
      "email": "info@devfredrick.com",
      "hours": "Monday - Friday: 8:00 AM - 6:00 PM"
    }
  }'::jsonb
);

-- Insert business info data
INSERT INTO public.website_content (section, content) VALUES (
  'business_info',
  '{
    "name": "DevFredrick",
    "email": "info@devfredrick.com",
    "phone": "+256 700 123 456"
  }'::jsonb
);

-- Insert hero section data
INSERT INTO public.website_content (section, content) VALUES (
  'hero',
  '{
    "title": "High-Speed Internet for Everyone",
    "subtitle": "Experience blazing-fast internet connectivity with our reliable fiber optic network.",
    "content": "Join thousands of satisfied customers enjoying seamless browsing, streaming, and working from home.",
    "button_text": "Get Started",
    "button_link": "/contact",
    "metadata": {
      "background_type": "image",
      "background_url": "",
      "fallback_image": ""
    }
  }'::jsonb
);
