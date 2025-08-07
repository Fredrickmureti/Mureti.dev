
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useWebsiteContent = (section: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Since we don't have a website_content table, return mock data for now
    const fetchContent = async () => {
      setLoading(true);
      try {
        // Mock data based on section type
        let mockData = null;
        
        if (section === 'hero') {
          mockData = {
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
          mockData = {
            content: {
              address: "Kampala, Uganda",
              latitude: "0.3476",
              longitude: "32.5825",
              zoom_level: 15,
              marker_title: "Our Office"
            }
          };
        } else if (section === 'business_info') {
          mockData = {
            content: {
              name: "DevFredrick",
              email: "info@devfredrick.com",
              phone: "+256 700 123 456"
            }
          };
        }
        
        setData(mockData);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [section]);

  return { data, loading };
};
