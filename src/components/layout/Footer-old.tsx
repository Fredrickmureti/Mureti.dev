import { SocialLinks } from "@/components/SocialLinks";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Fredrick Mureti</h3>
            <p className="text-muted-foreground mb-4">
              Full Stack Software Engineer passionate about building scalable web applications 
              with modern technologies and delivering exceptional user experiences.
            </p>
            <SocialLinks variant="footer" />
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <a href="mailto:fredrick@fredrickmureti.com" className="hover:text-foreground transition-colors">
                  fredrick@fredrickmureti.com
                </a>
              </p>
              <p>Available for freelance projects</p>
              <p>Remote work worldwide</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Fredrick Mureti. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="/sitemap.xml" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Sitemap
            </a>
            <a href="/robots.txt" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Robots
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  ];

  return (
    <footer className="border-t bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="transition-smooth hover:scale-110 hover:text-primary"
                >
                  <a
                    href={social.href}
                    target={social.label !== "Email" ? "_blank" : undefined}
                    rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </Button>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Fredrick Mureti. </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;