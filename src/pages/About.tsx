import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const skills = [
    "AWS", "Azure", "Docker", "Kubernetes", "Terraform", "Jenkins",
    "Python", "JavaScript", "React", "Node.js", "Linux", "Git",
    "CI/CD", "Monitoring", "Security", "Networking"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              About Me
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate Cloud Engineer with expertise in building scalable, 
              secure, and efficient cloud infrastructure.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid gap-12 md:gap-16">
            {/* Story Section */}
            <Card className="shadow-soft">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">My Story</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    I'm a dedicated Cloud Engineer with a passion for designing and implementing 
                    robust cloud solutions. My journey in technology began with a fascination for 
                    how systems work at scale, and has evolved into a comprehensive expertise in 
                    cloud infrastructure, DevOps practices, and security.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    Over the years, I've worked with various cloud platforms including AWS, Azure, 
                    and Google Cloud, helping organizations migrate to the cloud, optimize their 
                    infrastructure costs, and implement best practices for security and scalability.
                  </p>
                  <p className="text-lg leading-relaxed">
                    When I'm not architecting cloud solutions, you'll find me contributing to 
                    open-source projects, writing technical blogs, or exploring the latest 
                    developments in containerization and orchestration technologies.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="shadow-soft">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Skills & Technologies</h2>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="px-3 py-1 text-sm transition-smooth hover:scale-105"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience Section */}
            <Card className="shadow-soft">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Experience</h2>
                <div className="space-y-8">
                  <div className="border-l-2 border-primary pl-6">
                    <h3 className="text-xl font-medium">Senior Cloud Engineer</h3>
                    <p className="text-muted-foreground mb-2">TechCorp • 2022 - Present</p>
                    <p className="text-muted-foreground">
                      Leading cloud infrastructure projects, implementing CI/CD pipelines, 
                      and mentoring junior engineers in cloud best practices.
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-muted pl-6">
                    <h3 className="text-xl font-medium">Cloud Engineer</h3>
                    <p className="text-muted-foreground mb-2">CloudTech Solutions • 2020 - 2022</p>
                    <p className="text-muted-foreground">
                      Designed and deployed scalable cloud infrastructure for enterprise clients, 
                      reducing operational costs by 40% on average.
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-muted pl-6">
                    <h3 className="text-xl font-medium">DevOps Engineer</h3>
                    <p className="text-muted-foreground mb-2">StartupXYZ • 2019 - 2020</p>
                    <p className="text-muted-foreground">
                      Built and maintained CI/CD pipelines, automated deployment processes, 
                      and improved system reliability.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;