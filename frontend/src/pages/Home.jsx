import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../api";
import Container from "../components/Container";
import HeroArt from "../components/HeroArt";
import BlogCard from "../components/BlogCard";
import CardSkeleton from "../components/CardSkeleton";
import Alert from "../components/Alert";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getBlogs(search)
      .then((data) => {
        if (cancelled) return;
        setBlogs(data);
        setError("");
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [search]);

  const scrollToStories = () =>
    document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" });

  const showSkeleton = loading && blogs.length === 0;
  const hasSearch = search.trim() !== "";

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-glow/10 blur-3xl" />

        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 font-mono text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-glow" />
              AI · Programming · Web Development
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              Ideas for a{" "}
              <span className="text-gradient">More Intelligent</span> World.
            </h1>

            <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
              Practical stories on technology, programming, web development and
              artificial intelligence, written for people who like to build
              things and understand how they work.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={scrollToStories}
                className="rounded-xl bg-linear-to-r from-brand to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:shadow-brand/50"
              >
                Explore Articles
              </button>
              <Link
                to="/add"
                className="rounded-xl border border-line bg-surface/60 px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-glow hover:text-glow"
              >
                Write a Story
              </Link>
            </div>
          </div>

          <HeroArt />
        </Container>
      </section>

      {/* ---------- Featured stories ---------- */}
      <section id="stories" className="scroll-mt-20">
        <Container className="py-14">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-glow">
                // latest
              </p>
              <h2 className="mt-2 text-3xl font-bold">Featured Stories</h2>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search blogs by title
              </label>
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                id="search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title..."
                className="w-full rounded-xl border border-line bg-surface py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-muted outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
              />
            </div>
          </div>

          {error && <Alert type="error">{error}</Alert>}

          {showSkeleton && !error && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="rounded-2xl border border-dashed border-line bg-panel/50 px-6 py-16 text-center">
              <p className="font-display text-xl font-semibold">
                {hasSearch ? `No results for “${search}”` : "No stories yet"}
              </p>
              <p className="mt-2 text-sm text-muted">
                {hasSearch
                  ? "Try a different title or clear the search."
                  : "Be the first to publish something."}
              </p>
              {!hasSearch && (
                <Link
                  to="/add"
                  className="mt-6 inline-block rounded-xl bg-linear-to-r from-brand to-blue-500 px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Write a Story
                </Link>
              )}
            </div>
          )}

          {!error && blogs.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((b, i) => (
                <BlogCard
                  key={b._id}
                  blog={b}
                  featured={i === 0 && !hasSearch}
                />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
