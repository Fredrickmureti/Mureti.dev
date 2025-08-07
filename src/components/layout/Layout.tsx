
import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

console.log('Layout component loaded');

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  console.log('Layout component rendering');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
