import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBlog, getBlog, updateBlog } from "../api";
import Container from "../components/Container";
import BlogImage from "../components/BlogImage";
import Alert from "../components/Alert";

const empty = {
  title: "",
  description: "",
  content: "",
  author: "",
  image: "",
};

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30";

const labelClass =
  "mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted";

export default function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setMessage({ type: "", text: "" });
    if (!id) {
      setForm(empty);
      return;
    }
    getBlog(id)
      .then((b) =>
        setForm({
          title: b.title,
          description: b.description,
          content: b.content,
          author: b.author,
          image: b.image || "",
        }),
      )
      .catch((e) => setMessage({ type: "error", text: e.message }));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (id) await updateBlog(id, form);
      else await createBlog(form);

      setMessage({
        type: "success",
        text: id ? "Blog updated successfully!" : "Blog created successfully!",
      });
      setTimeout(() => navigate("/manage"), 1000);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
      setSaving(false);
    }
  };

  return (
    <Container size="form" className="py-10 sm:py-14">
      <form
        onSubmit={handleSubmit}
        className="grid gap-5 rounded-2xl border border-line bg-panel p-6 shadow-xl shadow-black/20 sm:p-8"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-glow">
            {id ? "// edit" : "// new"}
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            {id ? "Edit Blog" : "Add New Blog"}
          </h1>
        </div>

        {message.text && <Alert type={message.type}>{message.text}</Alert>}

        <div>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            className={inputClass}
            name="title"
            placeholder="How neural networks learn"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="author" className={labelClass}>
            Author
          </label>
          <input
            id="author"
            className={inputClass}
            name="author"
            placeholder="Your name"
            value={form.author}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="image" className={labelClass}>
            Image URL
          </label>
          <input
            id="image"
            className={inputClass}
            name="image"
            placeholder="https://..."
            value={form.image}
            onChange={handleChange}
          />
          {form.image.trim() && (
            <BlogImage
              blog={{ ...form, _id: "preview" }}
              label="preview"
              className="mt-3 aspect-[16/9] rounded-xl border border-line"
            />
          )}
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Short description
          </label>
          <input
            id="description"
            className={inputClass}
            name="description"
            placeholder="One or two sentences"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="content" className={labelClass}>
            Content
          </label>
          <textarea
            id="content"
            className={`${inputClass} resize-y`}
            name="content"
            placeholder="Write the full article here..."
            rows={9}
            value={form.content}
            onChange={handleChange}
          />
          <p className="mt-1.5 text-xs text-muted">
            Tip: wrap code in triple backticks to show it as a code block.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-linear-to-r from-brand to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:shadow-brand/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : id ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </Container>
  );
}
