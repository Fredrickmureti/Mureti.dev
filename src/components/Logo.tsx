
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

const Logo = () => {
  const { data: brandingData, loading } = useWebsiteContent('branding');

  if (loading) {
    return <div className="h-8 w-24 bg-muted animate-pulse rounded" />;
  }

  const logoUrl = brandingData?.logo_url;
  const companyName = brandingData?.company_name || "DevFredrick";

  return (
    <div className="flex items-center">
      {logoUrl ? (
        <img 
          src={logoUrl} 
          alt={companyName}
          className="h-8 w-auto"
        />
      ) : (
        <span className="text-xl font-bold text-primary">
          {companyName}
        </span>
      )}
    </div>
  );
};

export default Logo;
