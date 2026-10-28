import { Link } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";
import { SITE_NAME } from "../utils";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-surface/60">
      <Container className="flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8" />
            <span className="font-display text-lg font-bold">{SITE_NAME}</span>
          </div>
          <p className="mt-3 text-sm text-muted">
            Stories about programming, web development and AI.
          </p>
        </div>

        <nav className="flex gap-6 text-sm text-muted" aria-label="Footer">
          <Link to="/" className="transition hover:text-ink">Home</Link>
          <Link to="/add" className="transition hover:text-ink">Add Blog</Link>
          <Link to="/manage" className="transition hover:text-ink">Manage</Link>
        </nav>

        <p className="font-mono text-xs text-muted">
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </p>
      </Container>
    </footer>
  );
}
