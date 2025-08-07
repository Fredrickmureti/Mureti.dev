import Hero from "@/components/Hero";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const IndexOld = () => {
  useDocumentTitle("Home - Fredrick Mureti");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm a passionate developer who loves creating innovative solutions 
            and bringing ideas to life through technology.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'Git'].map((skill) => (
              <div key={skill} className="text-center">
                <div className="bg-background rounded-lg p-6 shadow-sm border">
                  <h3 className="font-semibold">{skill}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Let's discuss your project and bring your ideas to life.
          </p>
        </div>
      </section>
    </div>
  );
};

export default IndexOld;
