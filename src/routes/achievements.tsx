import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site";

export const Route = createFileRoute("/achievements")({
  head: () => ({ meta: [
    { title: "Results & Achievements – YM Public School, Gorakhpur" },
    { name: "description", content: "Board toppers, results and awards of YM Public School students." },
    { property: "og:title", content: "Achievements – YM Public School" },
    { property: "og:description", content: "Our toppers and awards." },
  ] }),
  component: Achievements,
});

const toppers = [
  ["Aditi Sharma", "Class XII Science", "98.6%"],
  ["Rohan Gupta", "Class XII Commerce", "97.8%"],
  ["Sneha Yadav", "Class X", "99.2%"],
  ["Arjun Singh", "Class X", "98.4%"],
];
const awards = [
  ["🏆", "Best CBSE School – Gorakhpur District 2025"],
  ["🥇", "State Level Science Olympiad – 3 Gold Medals"],
  ["🏏", "Inter-School Cricket Champions 2025"],
  ["🎨", "National Painting Competition – 1st Prize"],
  ["🤖", "Robotics Championship UP – Runner Up"],
  ["🌱", "Green School Award by District Administration"],
];

function Achievements() {
  return (
    <>
      <PageHero title="Results & Achievements" subtitle="Proud of our students who make us shine every year." />
      <Section kicker="CBSE Board 2026" title="Our Toppers">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {toppers.map(([n, c, p]) => (
            <div key={n} className="rounded-xl border-t-4 border-gold bg-card p-6 text-center shadow-sm">
              <div className="font-display text-4xl font-bold text-accent">{p}</div>
              <div className="mt-2 font-semibold">{n}</div>
              <div className="text-sm text-muted-foreground">{c}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section kicker="Results" title="Board Results at a Glance">
        <div className="grid gap-4 md:grid-cols-3">
          {[["100%", "Pass percentage"], ["68", "Students above 90%"], ["24.8", "Avg. Class XII score in Physics (of 30)"]].map(([n, l]) => (
            <div key={l} className="rounded-xl bg-primary p-8 text-primary-foreground"><div className="font-display text-4xl font-bold text-gold">{n}</div><div className="mt-1 opacity-85">{l}</div></div>
          ))}
        </div>
      </Section>
      <Section kicker="Awards" title="Honours & Awards">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map(([i, t]) => <div key={t} className="flex items-center gap-4 rounded-xl border bg-card p-5"><span className="text-3xl">{i}</span><span className="font-medium">{t}</span></div>)}
        </div>
      </Section>
    </>
  );
}
