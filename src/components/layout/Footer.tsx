import { Github, Linkedin, Mail, Twitter, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/karanportfolio",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/karanportfolio",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/karanportfolio",
      label: "Twitter",
    },
    {
      icon: Mail,
      href: "mailto:karan@example.com",
      label: "Email",
    },
    {
      icon: FileText,
      href: "/resume.pdf",
      label: "Resume",
    },
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
            <p>© {new Date().getFullYear()} Karan. Built with React & Supabase.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;