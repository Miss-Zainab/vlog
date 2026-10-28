import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import BlogForm from "./pages/BlogForm";
import ManageBlogs from "./pages/ManageBlogs";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/add" element={<BlogForm />} />
          <Route path="/edit/:id" element={<BlogForm />} />
          <Route path="/manage" element={<ManageBlogs />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
