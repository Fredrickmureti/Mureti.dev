
import { useEffect, useRef } from 'react';

interface GoogleMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  markerTitle?: string;
}

const GoogleMap = ({ latitude, longitude, zoom = 15, markerTitle = "Location" }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && window.google) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: new window.google.maps.LatLng(latitude, longitude),
          zoom: zoom,
        });

        new window.google.maps.Marker({
          position: new window.google.maps.LatLng(latitude, longitude),
          map: map,
          title: markerTitle,
        });
      }
    };

    if (window.google) {
      initMap();
    } else {
      // Load Google Maps script if not already loaded
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initGoogleMap`;
      script.async = true;
      script.defer = true;
      (window as any).initGoogleMap = initMap;
      document.head.appendChild(script);
    }
  }, [latitude, longitude, zoom, markerTitle]);

  return <div ref={mapRef} className="w-full h-96 rounded-lg" />;
};

export default GoogleMap;
