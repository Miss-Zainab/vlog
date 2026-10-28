import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";
import { SITE_NAME } from "../utils";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/add", label: "Add Blog" },
  { to: "/manage", label: "Manage" },
];

const linkClass = ({ isActive }) =>
  `rounded-lg px-4 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-linear-to-r from-brand to-blue-500 text-white shadow-lg shadow-brand/25"
      : "text-muted hover:bg-white/5 hover:text-ink"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // close the mobile menu after navigating
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-night/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 rounded-lg">
          <Logo />
          <span className="font-display text-xl font-bold tracking-tight">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink transition hover:border-brand md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <nav className="border-t border-line bg-night md:hidden" aria-label="Mobile">
          <Container className="flex flex-col gap-1 py-3">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
