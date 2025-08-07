import { Github, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/fredrickmureti",
    icon: Github,
    label: "View Fredrick's GitHub profile"
  },
  {
    name: "LinkedIn", 
    href: "https://linkedin.com/in/fredrickmureti",
    icon: Linkedin,
    label: "Connect with Fredrick on LinkedIn"
  },
  {
    name: "Twitter",
    href: "https://twitter.com/fredrickmureti", 
    icon: Twitter,
    label: "Follow Fredrick on Twitter"
  },
  {
    name: "Email",
    href: "mailto:fredrick@mureti.dev",
    icon: Mail,
    label: "Send email to Fredrick"
  }
];

interface SocialLinksProps {
  variant?: "default" | "footer";
  className?: string;
}

export const SocialLinks = ({ variant = "default", className = "" }: SocialLinksProps) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      {socialLinks.map((link) => {
        const Icon = link.icon;
        
        if (variant === "footer") {
          return (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("mailto:") ? "_self" : "_blank"}
              rel={link.href.startsWith("mailto:") ? "" : "noopener noreferrer"}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={link.label}
            >
              <Icon className="h-5 w-5" />
            </a>
          );
        }
        
        return (
          <Button
            key={link.name}
            variant="outline"
            size="sm"
            asChild
          >
            <a
              href={link.href}
              target={link.href.startsWith("mailto:") ? "_self" : "_blank"}
              rel={link.href.startsWith("mailto:") ? "" : "noopener noreferrer"}
              aria-label={link.label}
            >
              <Icon className="h-4 w-4 mr-2" />
              {link.name}
              {!link.href.startsWith("mailto:") && <ExternalLink className="h-3 w-3 ml-1" />}
            </a>
          </Button>
        );
      })}
    </div>
  );
};
