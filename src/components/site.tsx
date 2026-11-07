import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/admissions", label: "Admissions" },
  { to: "/facilities", label: "Facilities" },
  { to: "/faculty", label: "Faculty" },
  { to: "/achievements", label: "Achievements" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/notices", label: "Notices" },
  { to: "/contact", label: "Contact" },
] as const;

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/admissions", label: "Admissions" },
  { to: "/facilities", label: "Facilities" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur">
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="mx-auto flex max-w-7xl justify-between px-4 py-1.5">
          <span>📞 +91 98765 43210 · ✉ info@ympublicschool.in</span>
          <span className="hidden sm:inline">Affiliated to CBSE · Gorakhpur, Uttar Pradesh</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-primary font-display text-lg font-bold text-gold">YM</div>
          <div className="leading-tight">
            <div className="whitespace-nowrap font-display text-lg font-bold text-primary">YM Public School</div>
            <div className="whitespace-nowrap text-xs text-muted-foreground">Gorakhpur, U.P.</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="whitespace-nowrap text-sm font-medium text-foreground/80 hover:text-accent" activeProps={{ className: "text-accent" }} activeOptions={{ exact: true }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Link to="/student-login" className="whitespace-nowrap rounded-md border border-primary px-3 py-2 text-sm font-semibold text-primary hover:bg-secondary">Student Login</Link>
          <Link to="/staff-login" className="whitespace-nowrap rounded-md bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90">Staff Login</Link>
        </div>
        <button className="lg:hidden rounded-md border px-3 py-2 text-sm" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      </div>
      {open && (
        <div className="border-t px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm font-medium">{l.label}</Link>
            ))}
            <Link to="/student-login" onClick={() => setOpen(false)} className="rounded-md border border-primary px-3 py-2 text-center text-sm font-semibold text-primary">Student Login</Link>
            <Link to="/staff-login" onClick={() => setOpen(false)} className="rounded-md bg-accent px-3 py-2 text-center text-sm font-semibold text-accent-foreground">Teacher/Staff Login</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl font-bold text-gold">YM Public School</div>
          <p className="mt-3 max-w-md text-sm opacity-80">Shaping disciplined, confident and compassionate citizens since 2005. Knowledge · Character · Service.</p>
        </div>
        <div className="text-sm">
          <div className="mb-3 font-semibold text-gold">Quick Links</div>
          <div className="grid grid-cols-2 gap-2 opacity-90">
            {links.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
          </div>
        </div>
        <div className="text-sm opacity-90">
          <div className="mb-3 font-semibold text-gold">Contact</div>
          <p>Medical College Road, Gorakhpur, Uttar Pradesh – 273013</p>
          <p className="mt-2">+91 98765 43210</p>
          <p>info@ympublicschool.in</p>
          <p className="mt-2">Mon–Sat · 8:00 AM – 2:30 PM</p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-4 text-center text-xs opacity-70">© {new Date().getFullYear()} YM Public School, Gorakhpur. All rights reserved.</div>
    </footer>
  );
}

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">YM Public School</div>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl opacity-85">{subtitle}</p>}
      </div>
    </section>
  );
}

export function Section({ title, kicker, children }: { title?: string; kicker?: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-16">
      {kicker && <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{kicker}</div>}
      {title && <h2 className="mb-8 mt-1 text-3xl font-bold text-primary md:text-4xl">{title}</h2>}
      {children}
    </section>
  );
}

export function LoginCard({ role, idLabel, extra }: { role: string; idLabel: string; extra?: ReactNode }) {
  const [msg, setMsg] = useState("");
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border bg-card p-8 shadow-lg">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary font-display text-xl font-bold text-gold">YM</div>
        <h1 className="mt-4 text-center text-2xl font-bold text-primary">{role} Login</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">YM Public School, Gorakhpur</p>
        <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setMsg("Login system will be activated soon. (Demo only)"); }}>
          {extra}
          <label className="block text-sm font-medium">{idLabel}
            <input required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <label className="block text-sm font-medium">Password
            <input required type="password" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>
            <a href="#" className="text-accent hover:underline">Forgot password?</a>
          </div>
          <button
