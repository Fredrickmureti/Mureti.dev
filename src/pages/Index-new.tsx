import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Database, Globe } from "lucide-react";
import { SEO } from "@/components/SEO";

console.log('Index page loaded');

const Index = () => {
  console.log('Index component rendering');
  
  return (
    <>
      <SEO 
        title="Home"
        description="Fredrick Mureti - Full Stack Software Engineer specializing in React, Node.js, TypeScript, and modern web technologies. Building scalable web applications with exceptional user experiences."
        keywords="Full Stack Developer, Software Engineer, React Developer, Node.js, TypeScript, JavaScript, Web Development, Portfolio"
        url="https://fredrickmureti.com/"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Profile Image - First on mobile */}
              <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                <div className="w-80 h-80 rounded-full bg-gradient-card shadow-elegant flex items-center justify-center">
                  <div className="w-72 h-72 rounded-full overflow-hidden">
                    <img 
                      src="/Profile-pic.jpg" 
                      alt="Fredrick Mureti - Full Stack Software Engineer" 
                      className="w-full h-full object-cover"
                      loading="eager"
                      width="288"
                      height="288"
                    />
                  </div>
                </div>
              </div>

              {/* Text Content - Second on mobile */}
              <div className="order-2 lg:order-1">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  Hi, I am{" "}
                  <span className="text-primary">Fredrick</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-medium mb-6 text-muted-foreground">
                  Full Stack Software Engineer
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Passionate about building end-to-end web applications, creating scalable 
                  architectures, and delivering exceptional user experiences through modern 
                  technologies and best practices.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 px-2 sm:px-0">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link to="/about">
                      Read more about me
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                    <a href="mailto:fredrick@fredrickmureti.com">
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
                  <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Frontend Development</h3>
                  <p className="text-muted-foreground">
                    Building responsive and interactive user interfaces with React, TypeScript, and modern CSS frameworks
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardContent className="p-6 text-center">
                  <Database className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Backend Development</h3>
                  <p className="text-muted-foreground">
                    Creating robust APIs and server-side applications with Node.js, databases, and cloud services
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Full Stack Solutions</h3>
                  <p className="text-muted-foreground">
                    End-to-end development from concept to deployment, ensuring scalable and maintainable solutions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start your next project?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's collaborate and bring your ideas to life with modern web technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:fredrick@fredrickmureti.com">
                  Get In Touch
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
