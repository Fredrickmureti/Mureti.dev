
import { Routes, Route } from "react-router-dom";
import Admin from "@/pages/Admin";
import AdminProjects from "@/pages/AdminProjects";
import AdminBlogs from "@/pages/AdminBlogs";
import AdminBranding from "@/pages/AdminBranding";
import AdminLocation from "@/pages/AdminLocation";
import AdminMedia from "@/pages/AdminMedia";

console.log('AdminRoutes loaded');

const AdminRoutes = () => {
  console.log('AdminRoutes component rendering');
  
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/projects" element={<AdminProjects />} />
      <Route path="/blogs" element={<AdminBlogs />} />
      <Route path="/branding" element={<AdminBranding />} />
      <Route path="/location" element={<AdminLocation />} />
      <Route path="/media" element={<AdminMedia />} />
    </Routes>
  );
};

export default AdminRoutes;
