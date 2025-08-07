import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { SEO } from "@/components/SEO";

const About = () => {
  const skillCategories = {
    "Frontend": [
      "React", "TypeScript", "JavaScript", "Next.js", "HTML", "CSS", "Tailwind CSS"
    ],
    "Backend": [
      "Node.js", "Express.js", "Python", "REST APIs", "GraphQL"
    ],
    "Databases": [
      "MongoDB", "PostgreSQL", "MySQL", "Redis"
    ],
    "Cloud & DevOps": [
      "AWS", "Docker", "CI/CD", "DevOps"
    ],
    "Tools & Testing": [
      "Git", "GitHub", "Testing", "Jest", "Vite"
    ],
    "Methodologies": [
      "Agile", "Scrum"
    ]
  };

  return (
    <>
      <SEO 
        title="About"
        description="Learn about Fredrick Mureti, a Full Stack Software Engineer with expertise in React, Node.js, TypeScript, and modern web technologies. Passionate about building scalable applications."
        keywords="About Fredrick Mureti, Full Stack Developer, Software Engineer, React Expert, Node.js Developer, TypeScript, JavaScript, Web Development"
        url="https://mureti.dev/about"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                About Me
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Passionate Full Stack Software Engineer with expertise in building scalable, 
                modern, and efficient web applications.
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
                    I'm a dedicated Full Stack Software Engineer with a passion for creating 
                    robust web applications that solve real-world problems. My journey in technology 
                    began with a fascination for how the web works, and has evolved into comprehensive 
                    expertise in modern web development technologies and best practices.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    Over the years, I've worked with various technologies across the full stack, 
                    from building responsive frontend applications with React and TypeScript to 
                    developing scalable backend APIs with Node.js and working with different 
                    databases and cloud services.
                  </p>
                  <p className="text-lg leading-relaxed">
                    When I'm not coding, you'll find me contributing to open-source projects, 
                    writing technical blogs about web development, or exploring the latest 
                    developments in JavaScript frameworks and developer tools.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="shadow-soft">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-8">Skills & Technologies</h2>
                <div className="space-y-8">
                  {Object.entries(skillCategories).map(([category, skills]) => (
                    <div key={category} className="space-y-4">
                      <h3 className="text-lg font-medium text-muted-foreground border-b border-border pb-2">
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {skills.map((skill) => (
                          <SkillBadge key={skill} skill={skill} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience Section */}
            {/* <Card className="shadow-soft">
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
            </Card> */}
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;