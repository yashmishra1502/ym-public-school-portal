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
