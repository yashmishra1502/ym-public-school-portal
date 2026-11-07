import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Us – YM Public School, Gorakhpur" },
    { name: "description", content: "History, vision, mission and leadership of YM Public School, Gorakhpur." },
    { property: "og:title", content: "About YM Public School" },
    { property: "og:description", content: "Our history, vision, mission and leadership." },
  ] }),
  component: About,
});

const team = [["Shri Y. M. Mishra", "Founder & Chairman"], ["Dr. R. K. Mishra", "Principal"], ["Mrs. Sunita Singh", "Vice Principal"], ["Mr. Anil Tripathi", "Academic Coordinator"]];

function About() {
  return (
    <>
      <PageHero title="About Our School" subtitle="Two decades of excellence in education in Gorakhpur, Uttar Pradesh." />
      <Section kicker="Our Story" title="History">
        <p className="max-w-3xl leading-relaxed text-foreground/85">Founded in 2005 by Shri Y. M. Mishra, YM Public School began with 150 students and a dream to bring quality English-medium education to Gorakhpur. Today it is a leading CBSE school with over 2500 students, a sprawling 5-acre campus and consistently outstanding board results.</p>
      </Section>
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-primary p-8 text-primary-foreground"><h3 className="text-2xl font-bold text-gold">Vision</h3><p className="mt-3 opacity-90">To be a centre of excellence that nurtures globally competent learners rooted in Indian values.</p></div>
          <div className="rounded-xl bg-accent p-8 text-accent-foreground"><h3 className="text-2xl font-bold text-gold">Mission</h3><p className="mt-3 opacity-90">To provide holistic, child-centred education that develops intellect, character, creativity and social responsibility.</p></div>
        </div>
      </Section>
      <Section kicker="Leadership" title="Management Team">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map(([n, r]) => (
            <div key={n} className="rounded-xl border bg-card p-6 text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-secondary font-display text-2xl font-bold text-primary">{n.split(" ").at(-1)?.charAt(0)}</div>
              <div className="mt-4 font-semibold">{n}</div>
              <div className="text-sm text-muted-foreground">{r}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
