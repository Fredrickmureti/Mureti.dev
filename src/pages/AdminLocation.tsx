
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import GoogleMap from "@/components/GoogleMap";

interface LocationData {
  address: string;
  latitude: string;
  longitude: string;
  zoom_level: string;
  marker_title: string;
  contact_info: {
    phone: string;
    email: string;
    hours: string;
  };
}

const AdminLocation = () => {
  const [locationData, setLocationData] = useState<LocationData>({
    address: "",
    latitude: "",
    longitude: "",
    zoom_level: "15",
    marker_title: "",
    contact_info: {
      phone: "",
      email: "",
      hours: ""
    }
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('content')
          .eq('section', 'location')
          .single();

        if (error) {
          console.error('Error fetching location data:', error);
        } else if (data?.content) {
          const content = data.content as any;
          setLocationData({
            address: content.address || "",
            latitude: content.latitude || "",
            longitude: content.longitude || "",
            zoom_level: content.zoom_level?.toString() || "15",
            marker_title: content.marker_title || "",
            contact_info: {
              phone: content.contact_info?.phone || "",
              email: content.contact_info?.email || "",
              hours: content.contact_info?.hours || ""
            }
          });
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const contentData = {
        address: locationData.address,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        zoom_level: parseInt(locationData.zoom_level) || 15,
        marker_title: locationData.marker_title,
        contact_info: locationData.contact_info
      };

      const { error } = await supabase
        .from('website_content')
        .update({ content: contentData })
        .eq('section', 'location');

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Location updated successfully!",
      });
    } catch (error) {
      console.error('Error saving location:', error);
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Location Management</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Address & Map</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={locationData.address}
                  onChange={(e) => setLocationData(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    value={locationData.latitude}
                    onChange={(e) => setLocationData(prev => ({ ...prev, latitude: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    value={locationData.longitude}
                    onChange={(e) => setLocationData(prev => ({ ...prev, longitude: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zoom_level">Zoom Level</Label>
                  <Input
                    id="zoom_level"
                    type="number"
                    min="1"
                    max="20"
                    value={locationData.zoom_level}
                    onChange={(e) => setLocationData(prev => ({ ...prev, zoom_level: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="marker_title">Marker Title</Label>
                  <Input
                    id="marker_title"
                    value={locationData.marker_title}
                    onChange={(e) => setLocationData(prev => ({ ...prev, marker_title: e.target.value }))}
                  />
                </div>
              </div>

              {/* Map Preview */}
              {locationData.latitude && locationData.longitude && (
                <div>
                  <Label>Map Preview</Label>
                  <div className="mt-2 border rounded-lg overflow-hidden">
                    <GoogleMap
                      latitude={parseFloat(locationData.latitude)}
                      longitude={parseFloat(locationData.longitude)}
                      zoom={parseInt(locationData.zoom_level)}
                      markerTitle={locationData.marker_title}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={locationData.contact_info.phone}
                  onChange={(e) => setLocationData(prev => ({
                    ...prev,
                    contact_info: { ...prev.contact_info, phone: e.target.value }
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={locationData.contact_info.email}
                  onChange={(e) => setLocationData(prev => ({
                    ...prev,
                    contact_info: { ...prev.contact_info, email: e.target.value }
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="hours">Business Hours</Label>
                <Textarea
                  id="hours"
                  value={locationData.contact_info.hours}
                  onChange={(e) => setLocationData(prev => ({
                    ...prev,
                    contact_info: { ...prev.contact_info, hours: e.target.value }
                  }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLocation;
