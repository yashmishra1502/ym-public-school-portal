import { createFileRoute, Link } from "@tanstack/react-router";
import campus from "@/assets/campus.jpg";
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
const features = [
  ["📚", "CBSE Curriculum", "Nursery to Class XII with Science, Commerce & Humanities streams."],
  ["🔬", "Modern Labs", "Physics, Chemistry, Biology, Computer & Robotics labs."],
  ["🏏", "Sports & Games", "Cricket ground, basketball, kabaddi, yoga and athletics."],
  ["🚌", "Safe Transport", "GPS-enabled buses covering all major areas of Gorakhpur."],
  ["💻", "Smart Classes", "Digital boards and e-learning in every classroom."],
  ["🎭", "Co-Curricular", "Music, dance, art, NCC, scouts and annual cultural fest."],
];
const notices = [
  ["10 Nov 2026", "Half-yearly examination schedule released for Classes VI–XII"],
  ["14 Nov 2026", "Children's Day celebration – cultural programme in auditorium"],
  ["20 Nov 2026", "Parent–Teacher Meeting for all classes, 9:00 AM"],
  ["01 Dec 2026", "Admissions open for session 2027–28"],
];

function Index() {
  return (
    <>
      <section className="relative">
        <img src={campus} alt="YM Public School campus, Gorakhpur" width={1600} height={912} className="h-[620px] w-full object-cover" />
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-4 text-primary-foreground">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Affiliated to CBSE · Est. 2005</div>
          <h1 className="mt-3 max-w-2xl text-5xl font-bold leading-tight md:text-6xl">YM Public School<br /><span className="text-gold">Gorakhpur, U.P.</span></h1>
          <p className="mt-4 max-w-xl text-lg opacity-90">Where knowledge meets character. Nurturing young minds for a brighter tomorrow.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/admissions" className="rounded-md bg-gold px-6 py-3 font-semibold text-primary hover:opacity-90">Apply for Admission</Link>
            <Link to="/about" className="rounded-md border border-primary-foreground/60 px-6 py-3 font-semibold hover:bg-primary-foreground/10">Explore School</Link>
          </div>
        </div>
      </section>

      <div className="mx-auto -mt-12 grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border shadow-xl md:grid-cols-4 relative">
        {stats.map(([n, l]) => (
          <div key={l} className="bg-card p-6 text-center">
            <div className="font-display text-3xl font-bold text-accent">{n}</div>
            <div className="text-sm text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>

      <Section kicker="Principal's Message" title="Welcome to YM Public School">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4 text-foreground/85 leading-relaxed">
            <p>At YM Public School, we believe every child is unique. Our mission is to provide holistic education that blends academic excellence with values, discipline and creativity.</p>
            <p>Located in the heart of Gorakhpur, our campus offers a safe, inspiring environment where students learn, play and grow into responsible citizens of India.</p>
            <p className="font-display text-lg italic text-primary">— Dr. R. K. Mishra, Principal</p>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-primary">Latest Notices</h3>
              <Link to="/notices" className="text-sm text-accent">View all →</Link>
            </div>
            <ul className="space-y-4">
              {notices.map(([d, t]) => (
                <li key={t} className="border-l-2 border-gold pl-3">
                  <div className="text-xs font-semibold text-accent">{d}</div>
                  <div className="text-sm">{t}</div>
                </li>
              ))}
            </ul>
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

      <Section>
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-accent p-10 text-accent-foreground md:flex-row">
          <div>
            <h2 className="text-3xl font-bold">Admissions Open 2027–28</h2>
            <p className="mt-2 opacity-90">Nursery to Class IX & XI. Limited seats available.</p>
          </div>
          <Link to="/contact" className="rounded-md bg-gold px-6 py-3 font-semibold text-primary">Enquire Now</Link>
        </div>
      </Section>
    </>
  );
}
