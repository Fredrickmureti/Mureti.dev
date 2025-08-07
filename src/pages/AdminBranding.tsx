
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import FileUpload from "@/components/admin/FileUpload";

const AdminBranding = () => {
  const [brandData, setBrandData] = useState({
    company_name: "DevFredrick",
    logo_url: "",
    tagline: "Building the Future with Code",
    primary_color: "#3B82F6",
    secondary_color: "#1E40AF",
    description: "A passionate developer creating innovative solutions."
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
        description: "Branding updated successfully!",
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

  const handleLogoUpload = (url: string) => {
    setBrandData(prev => ({ ...prev, logo_url: url }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Branding Management</h1>

        <Card>
          <CardHeader>
            <CardTitle>Brand Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={brandData.company_name}
                onChange={(e) => setBrandData(prev => ({ ...prev, company_name: e.target.value }))}
              />
            </div>

            <div>
              <Label>Logo</Label>
              <div className="mt-2 space-y-2">
                <Input
                  placeholder="Logo URL"
                  value={brandData.logo_url}
                  onChange={(e) => setBrandData(prev => ({ ...prev, logo_url: e.target.value }))}
                />
                <FileUpload
                  onUpload={handleLogoUpload}
                  accept="image/*"
                  label="Upload Logo"
                />
              </div>
              {brandData.logo_url && (
                <div className="mt-4">
                  <img
                    src={brandData.logo_url}
                    alt="Logo preview"
                    className="h-16 w-auto object-contain"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={brandData.tagline}
                onChange={(e) => setBrandData(prev => ({ ...prev, tagline: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primary_color">Primary Color</Label>
                <Input
                  id="primary_color"
                  type="color"
                  value={brandData.primary_color}
                  onChange={(e) => setBrandData(prev => ({ ...prev, primary_color: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="secondary_color">Secondary Color</Label>
                <Input
                  id="secondary_color"
                  type="color"
                  value={brandData.secondary_color}
                  onChange={(e) => setBrandData(prev => ({ ...prev, secondary_color: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Company Description</Label>
              <Textarea
                id="description"
                rows={4}
                value={brandData.description}
                onChange={(e) => setBrandData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminBranding;
