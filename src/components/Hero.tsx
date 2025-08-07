
import { Button } from "@/components/ui/button";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

const Hero = () => {
  const { data: heroContent, loading } = useWebsiteContent('hero');

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const content = heroContent || {
    title: "High-Speed Internet for Everyone",
    subtitle: "Experience blazing-fast internet connectivity with our reliable fiber optic network.",
    content: "Join thousands of satisfied customers enjoying seamless browsing, streaming, and working from home.",
    button_text: "Get Started",
    button_link: "/contact"
  };

  const metadata = heroContent?.metadata || {};
  const backgroundType = metadata?.background_type || 'image';
  const backgroundUrl = metadata?.background_url || '';
  const fallbackImage = metadata?.fallback_image || '';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      {backgroundType === 'video' && backgroundUrl && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          poster={fallbackImage}
        >
          <source src={backgroundUrl} type="video/mp4" />
        </video>
      )}
      
      {(backgroundType === 'image' || !backgroundUrl) && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ 
            backgroundImage: backgroundUrl 
              ? `url(${backgroundUrl})` 
              : 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-foreground)) 100%)'
          }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          {content.title}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          {content.subtitle}
        </p>
        <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
          {content.content}
        </p>
        <Button size="lg" className="text-lg px-8 py-3">
          {content.button_text}
        </Button>
      </div>
    </section>
  );
};

export default Hero;
