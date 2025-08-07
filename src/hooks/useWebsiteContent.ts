
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useWebsiteContent = (section: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        console.log(`Fetching content for section: ${section}`);
        
        const { data: contentData, error } = await supabase
          .from('website_content')
          .select('content')
          .eq('section', section)
          .single();

        if (error) {
          console.error('Error fetching content:', error);
          // Fallback to mock data if database fetch fails
          setData(getMockData(section));
        } else {
          console.log(`Content fetched for ${section}:`, contentData);
          setData(contentData.content);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        setData(getMockData(section));
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [section]);

  return { data, loading };
};

// Fallback mock data in case database is not available
const getMockData = (section: string) => {
  if (section === 'hero') {
    return {
      title: "High-Speed Internet for Everyone",
      subtitle: "Experience blazing-fast internet connectivity with our reliable fiber optic network.",
      content: "Join thousands of satisfied customers enjoying seamless browsing, streaming, and working from home.",
      button_text: "Get Started",
      button_link: "/contact",
      metadata: {
        background_type: 'image',
        background_url: '',
        fallback_image: ''
      }
    };
  } else if (section === 'location') {
    return {
      address: "Kampala, Uganda",
      latitude: "0.3476",
      longitude: "32.5825",
      zoom_level: 15,
      marker_title: "Our Office"
    };
  } else if (section === 'business_info') {
    return {
      name: "DevFredrick",
      email: "info@devfredrick.com",
      phone: "+256 700 123 456"
    };
  }
  return null;
};
