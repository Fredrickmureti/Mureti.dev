import { Link } from "react-router-dom";

const FooterOld = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">DevFredrick</h3>
            <p className="text-sm text-muted-foreground">
              Building innovative solutions with cutting-edge technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                Home
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                About
              </Link>
              <Link to="/projects" className="text-sm text-muted-foreground hover:text-primary">
                Projects
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <nav className="flex flex-col space-y-2">
              <span className="text-sm text-muted-foreground">Web Development</span>
              <span className="text-sm text-muted-foreground">Mobile Apps</span>
              <span className="text-sm text-muted-foreground">UI/UX Design</span>
              <span className="text-sm text-muted-foreground">Consulting</span>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Kampala, Uganda
              </p>
              <p className="text-sm text-muted-foreground">
                +256 700 123 456
              </p>
              <p className="text-sm text-muted-foreground">
                info@devfredrick.com
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 DevFredrick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterOld;
