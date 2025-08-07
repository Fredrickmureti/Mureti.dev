
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import GoogleMap from "@/components/GoogleMap";

const AdminLocation = () => {
  const [locationData, setLocationData] = useState({
    address: "Kampala, Uganda",
    latitude: "0.3476",
    longitude: "32.5825",
    zoom_level: "15",
    marker_title: "Our Office",
    contact_info: {
      phone: "+256 700 123 456",
      email: "info@devfredrick.com",
      hours: "Monday - Friday: 8:00 AM - 6:00 PM"
    }
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setSaving(true);
    try {
      // Mock save - in a real app this would save to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Location updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

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
