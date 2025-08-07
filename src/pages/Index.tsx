
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Cloud, Shield } from "lucide-react";

console.log('Index page loaded');

const Index = () => {
  console.log('Index component rendering');
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Profile Image - First on mobile */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="w-80 h-80 rounded-full bg-gradient-card shadow-elegant flex items-center justify-center">
                <div className="w-72 h-72 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-6xl font-bold text-muted-foreground">K</span>
                </div>
              </div>
            </div>

            {/* Text Content - Second on mobile */}
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Hi, I am{" "}
                <span className="text-primary">Karan</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium mb-6 text-muted-foreground">
                Cloud Engineer
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Passionate about building scalable cloud infrastructure, implementing 
                DevOps best practices, and creating secure, efficient solutions that 
                drive business growth.
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg">
                  <Link to="/about">
                    Read more about me
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:karan@example.com">
                    Contact me
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <Cloud className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cloud Architecture</h3>
                <p className="text-muted-foreground">
                  Designing scalable cloud solutions on AWS, Azure, and GCP
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">DevOps & Automation</h3>
                <p className="text-muted-foreground">
                  CI/CD pipelines, Infrastructure as Code, and automation
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Security & Compliance</h3>
                <p className="text-muted-foreground">
                  Implementing security best practices and compliance standards
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
