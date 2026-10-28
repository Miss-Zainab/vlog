import { useEffect, useState } from "react";
import CoverArt from "./CoverArt";

/** Shows the blog's image; falls back to generated artwork if missing or broken */
export default function BlogImage({ blog, label, className = "" }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [blog.image]);

  const showImage = blog.image && !failed;

  return (
    <div className={`relative overflow-hidden bg-panel ${className}`}>
      {showImage ? (
        <img
          src={blog.image}
          alt={`Cover image for "${blog.title}"`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <CoverArt seed={blog._id || blog.title} label={label} />
      )}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-night/50 via-transparent to-transparent" />
    </div>
  );
}
