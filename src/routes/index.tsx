import { createFileRoute, Link } from "@tanstack/react-router";
import campus from "@/assets/campus.jpg";
import lab from "@/assets/lab.jpg";
import sports from "@/assets/sports.jpg";
import culture from "@/assets/culture.jpg";
import library from "@/assets/library.jpg";
import { Section } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YM Public School, Gorakhpur UP – Official Website" },
      { name: "description", content: "YM Public School, Gorakhpur – CBSE school offering Nursery to Class XII with modern labs, sports and smart classes." },
      { property: "og:title", content: "YM Public School, Gorakhpur UP" },
      { property: "og:description", content: "CBSE school in Gorakhpur – admissions open, academics, facilities and notices." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stats = [["2500+", "Students"], ["120+", "Teachers"], ["20", "Years of Excellence"], ["100%", "Board Results"]];
const quick = [
  ["🎓", "Admissions", "/admissions"], ["📢", "Notices", "/notices"], ["📅", "Events", "/events"],
  ["🏆", "Results", "/achievements"], ["👩‍🏫", "Faculty", "/faculty"], ["📷", "Gallery", "/gallery"],
] as const;
const features = [
  ["📚", "CBSE Curriculum", "Nursery to Class XII with Science, Commerce & Humanities streams."],
  ["🔬", "Modern Labs", "Physics, Chemistry, Biology, Computer & Robotics labs."],
  ["🏏", "Sports & Games", "Cricket ground, basketball, kabaddi, yoga and athletics."],
  ["🚌", "Safe Transport", "GPS-enabled buses covering all major areas of Gorakhpur."],
  ["💻", "Smart Classes", "Digital boards and e-learning in every classroom."],
  ["🎭", "Co-Curricular", "Music, dance, art, NCC, scouts and annual cultural fest."],
];
const notices = [
  ["10 Nov", "Half-yearly exam schedule released for Classes VI–XII"],
  ["14 Nov", "Children's Day celebration in auditorium"],
  ["20 Nov", "Parent–Teacher Meeting, 9:00 AM"],
  ["01 Dec", "Admissions open for session 2027–28"],
];
const events = [["14", "NOV", "Children's Day"], ["28", "NOV", "Science Exhibition"], ["15", "DEC", "Annual Sports Meet"]];
const toppers = [["Sneha Yadav", "Class X", "99.2%"], ["Aditi Sharma", "XII Science", "98.6%"], ["Rohan Gupta", "XII Commerce", "97.8%"], ["Arjun Singh", "Class X", "98.4%"]];
const testimonials = [
  ["My daughter has grown so confident here. Teachers give personal attention to every child.", "Mrs. Rina Agarwal", "Parent, Class VII"],
  ["Best school in Gorakhpur for academics and sports. Transport and safety are excellent.", "Mr. Manoj Kumar", "Parent, Class X"],
  ["YM gave me the foundation to crack JEE. Forever grateful to my teachers.", "Ankit Verma", "Alumnus, IIT Kanpur"],
];

function Index() {
  return (
    <>
      <div className="overflow-hidden bg-gold py-2 text-sm font-semibold text-primary">
        <div className="animate-marquee whitespace-nowrap">📢 Admissions open for 2027–28 · Half-yearly exams from 10 Nov · Annual Sports Meet on 15 Dec · CBSE Class X result: 100% pass</div>
      </div>

      <section className="relative">
        <img src={campus} alt="YM Public School campus, Gorakhpur" width={1600} height={912} className="h-[640px] w-full object-cover" />
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-4 text-primary-foreground">
          <div className="w-fit rounded-full border border-gold/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Affiliated to CBSE · Est. 2005</div>
          <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-tight md:text-7xl">YM Public School<br /><span className="text-gold">Gorakhpur, U.P.</span></h1>
          <p className="mt-4 max-w-xl text-lg opacity-90">विद्या ददाति विनयम् — Where knowledge meets character. Nurturing young minds for a brighter tomorrow.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/admissions" className="rounded-md bg-gold px-6 py-3 font-semibold text-primary shadow-lg hover:opacity-90">Apply for Admission</Link>
            <Link to="/about" className="rounded-md border border-primary-foreground/60 px-6 py-3 font-semibold hover:bg-primary-foreground/10">Explore School</Link>
          </div>
        </div>
      </section>

      <div className="relative mx-auto -mt-14 grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border shadow-xl md:grid-cols-4">
        {stats.map(([n, l]) => (
          <div key={l} className="bg-card p-6 text-center">
            <div className="font-display text-4xl font-bold text-accent">{n}</div>
            <div className="text-sm text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>

      <Section>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {quick.map(([i, l, to]) => (
            <Link key={l} to={to} className="flex flex-col items-center gap-2 rounded-xl border bg-card p-5 text-sm font-semibold text-primary transition hover:-translate-y-1 hover:border-gold hover:shadow-md">
              <span className="text-3xl">{i}</span>{l}
            </Link>
          ))}
        </div>
      </Section>

      <Section kicker="Principal's Message" title="Welcome to YM Public School">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4 leading-relaxed text-foreground/85 md:col-span-2">
            <p>At YM Public School, we believe every child is unique. Our mission is to provide holistic education that blends academic excellence with values, discipline and creativity.</p>
            <p>Located in the heart of Gorakhpur, our campus offers a safe, inspiring environment where students learn, play and grow into responsible citizens of India.</p>
            <p className="font-display text-lg italic text-primary">— Dr. R. K. Mishra, Principal</p>
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <img src={lab} alt="Science lab" loading="lazy" className="h-48 w-full rounded-xl object-cover" />
              <img src={library} alt="Library" loading="lazy" className="h-48 w-full rounded-xl object-cover" />
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-primary">Latest Notices</h3>
              <Link to="/notices" className="text-sm text-accent">View all →</Link>
            </div>
            <ul className="space-y-4">
              {notices.map(([d, t]) => (
                <li key={t} className="border-l-2 border-gold pl-3">
                  <div className="text-xs font-semibold text-accent">{d} 2026</div>
                  <div className="text-sm">{t}</div>
                </li>
              ))}
            </ul>
            <h3 className="mb-4 mt-8 text-xl font-bold text-primary">Upcoming Events</h3>
            <div className="space-y-3">
              {events.map(([d, m, t]) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-content-center rounded-md bg-accent text-center text-accent-foreground"><div className="font-bold leading-none">{d}</div><div className="text-[10px] text-gold">{m}</div></div>
                  <div className="text-sm font-medium">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section kicker="Why Choose Us" title="Everything your child needs">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([i, t, d]) => (
            <div key={t} className="rounded-xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="text-3xl">{i}</div>
              <h3 className="mt-3 text-xl font-bold text-primary">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="mt-16 bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">CBSE Board 2026</div>
          <h2 className="mb-8 mt-1 text-3xl font-bold md:text-4xl">Our Shining Stars</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {toppers.map(([n, c, p]) => (
              <div key={n} className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold font-display text-xl font-bold text-primary">{n?.charAt(0)}</div>
                <div className="mt-3 font-display text-3xl font-bold text-gold">{p}</div>
                <div className="font-semibold">{n}</div>
                <div className="text-sm opacity-75">{c}</div>
              </div>
            ))}
          </div>
          <Link to="/achievements" className="mt-8 inline-block font-semibold text-gold">See all achievements →</Link>
        </div>
      </section>

      <Section kicker="Campus Life" title="Moments at YM">
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <img src={sports} alt="Sports day" loading="lazy" className="h-full min-h-64 w-full rounded-xl object-cover md:col-span-2 md:row-span-2" />
          <img src={culture} alt="Annual function" loading="lazy" className="h-64 w-full rounded-xl object-cover object-bottom" />
          <img src={lab} alt="Science lab" loading="lazy" className="h-64 w-full rounded-xl object-cover" />
        </div>
        <Link to="/gallery" className="mt-6 inline-block font-semibold text-accent">View full gallery →</Link>
      </Section>

      <Section kicker="Testimonials" title="What parents & alumni say">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map(([q, n, r]) => (
            <figure key={n} className="rounded-xl border bg-card p-6">
              <div className="font-display text-5xl leading-none text-gold">“</div>
              <blockquote className="mt-2 text-foreground/85">{q}</blockquote>
              <figcaption className="mt-4"><div className="font-semibold text-primary">{n}</div><div className="text-sm text-muted-foreground">{r}</div></figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-accent p-10 text-accent-foreground md:flex-row">
          <div>
            <h2 className="text-3xl font-bold">Admissions Open 2027–28</h2>
            <p className="mt-2 opacity-90">Nursery to Class IX & XI. Limited seats available.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/admissions" className="rounded-md bg-gold px-6 py-3 font-semibold text-primary">Apply Now</Link>
            <Link to="/contact" className="rounded-md border border-accent-foreground/60 px-6 py-3 font-semibold">Enquire</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
