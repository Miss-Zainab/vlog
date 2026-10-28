import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs, deleteBlog } from "../api";
import Container from "../components/Container";
import Alert from "../components/Alert";
import { formatDate, getCategory } from "../utils";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  const load = () =>
    getBlogs()
      .then(setBlogs)
      .catch((e) => setMessage({ type: "error", text: e.message }))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await deleteBlog(id);
      setMessage({ type: "success", text: "Blog deleted successfully!" });
      load();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <Container className="py-10 sm:py-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-glow">
            // dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold">Manage Blogs</h1>
        </div>
        <Link
          to="/add"
          className="rounded-xl bg-linear-to-r from-brand to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:shadow-brand/50"
        >
          + New Blog
        </Link>
      </div>

      {message.text && (
        <div className="mb-4">
          <Alert type={message.type}>{message.text}</Alert>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-line bg-panel">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="border-b border-line bg-surface font-mono text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Author</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr
                key={b._id}
                className="border-b border-line/60 last:border-0 transition hover:bg-white/[0.02]"
              >
                <td className="max-w-xs px-5 py-4 font-medium">
                  <Link
                    to={`/blogs/${b._id}`}
                    className="line-clamp-2 transition hover:text-glow"
                  >
                    {b.title}
                  </Link>
                </td>
                <td className="px-5 py-4 text-muted">{b.author}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full border border-glow/30 bg-glow/10 px-2.5 py-1 font-mono text-xs text-glow">
                    {getCategory(b)}
                  </span>
                </td>
                <td className="px-5 py-4 text-muted">
                  {formatDate(b.createdAt)}
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/edit/${b._id}`}
                      className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium transition hover:border-brand hover:text-brand"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(b._id)}
                      className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && blogs.length === 0 && (
              <tr>
                <td colSpan="5" className="px-5 py-12 text-center text-muted">
                  No blogs yet. Create your first one.
                </td>
              </tr>
            )}
            {loading && (
              <tr>
                <td colSpan="5" className="px-5 py-12 text-center text-muted">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
