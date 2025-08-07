
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const Admin = () => {
  useDocumentTitle("Admin Dashboard - Fredrick Mureti");
  
  const { user, signIn, signOut, loading } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);

    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Signed in successfully!",
      });
    }
    
    setSigningIn(false);
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    
    if (error) {
      toast({
        title: "Error", 
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Signed out successfully!",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-soft">
          <CardHeader className="text-center">
            <CardTitle className="text-xl sm:text-2xl">Admin Login</CardTitle>
            <p className="text-muted-foreground text-sm sm:text-base">
              Sign in to manage your portfolio content
            </p>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={signingIn}
              >
                {signingIn ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header - Responsive */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Manage your portfolio content
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="w-full sm:w-auto">
              Sign Out
            </Button>
          </div>

          {/* Quick Stats - Responsive Grid */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-8">
            <Card className="shadow-soft">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium mb-2">Projects</h3>
                <p className="text-2xl sm:text-3xl font-bold text-primary">0</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Published projects</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium mb-2">Blog Posts</h3>
                <p className="text-2xl sm:text-3xl font-bold text-primary">0</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Published articles</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium mb-2">Categories</h3>
                <p className="text-2xl sm:text-3xl font-bold text-primary">6</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Blog categories</p>
              </CardContent>
            </Card>
          </div>

          {/* Management Options - Responsive Grid */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="shadow-soft transition-smooth hover:shadow-elegant">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2">Manage Projects</h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  Add, edit, and organize your project portfolio
                </p>
                <Button className="w-full" asChild>
                  <Link to="/admin/projects">Manage Projects</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft transition-smooth hover:shadow-elegant">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2">Write Blog Post</h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  Create and publish new technical blog posts
                </p>
                <Button className="w-full" asChild>
                  <Link to="/admin/blogs">Manage Blog Posts</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft transition-smooth hover:shadow-elegant">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2">Brand Management</h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  Manage logos, colors, and brand assets
                </p>
                <Button className="w-full" asChild>
                  <Link to="/admin/branding">Brand Settings</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft transition-smooth hover:shadow-elegant">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-2">Location & Maps</h3>
                <p className="text-muted-foreground mb-4">
                  Configure business location and Google Maps
                </p>
                <Button className="w-full" asChild>
                  <Link to="/admin/location">Location Settings</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft transition-smooth hover:shadow-elegant">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Media Management</h3>
                <p className="text-muted-foreground mb-4">
                  Upload and manage hero videos and images
                </p>
                <Button className="w-full" asChild>
                  <Link to="/admin/media">Media Settings</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft transition-smooth hover:shadow-elegant">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Categories</h3>
                <p className="text-muted-foreground mb-4">
                  Organize blog posts with categories and tags
                </p>
                <Button className="w-full" asChild>
                  <Link to="/admin/categories">Manage Categories</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="shadow-soft mt-8">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No recent activity. Start by creating your first project or blog post!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Admin;
