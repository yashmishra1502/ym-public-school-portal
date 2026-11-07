import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site";

export const Route = createFileRoute("/facilities")({
  head: () => ({ meta: [
    { title: "Facilities – YM Public School, Gorakhpur" },
    { name: "description", content: "Smart classes, labs, library, sports ground, transport and more at YM Public School." },
    { property: "og:title", content: "Campus Facilities – YM Public School" },
    { property: "og:description", content: "Explore our campus facilities in Gorakhpur." },
  ] }),
  component: Facilities,
});

const items = [
  ["🏫", "Smart Classrooms", "Spacious, ventilated rooms with interactive digital boards."],
  ["📖", "Library", "15,000+ books, magazines, newspapers and e-library access."],
  ["🔬", "Science Labs", "Fully equipped Physics, Chemistry and Biology labs."],
  ["💻", "Computer Lab", "80+ systems with high-speed internet and robotics kits."],
  ["⚽", "Sports Complex", "Cricket, football, basketball, badminton and indoor games."],
  ["🚌", "Transport", "GPS & CCTV enabled buses with female attendants."],
  ["🏥", "Medical Room", "Qualified nurse and regular health check-ups."],
  ["🎵", "Music & Dance", "Dedicated rooms for vocal, instrumental and dance."],
  ["📹", "CCTV Security", "24×7 surveillance across the campus."],
];

function Facilities() {
  return (
    <>
      <PageHero title="Campus Facilities" subtitle="A 5-acre campus designed for learning, safety and all-round growth." />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([i, t, d]) => (
            <div key={t} className="rounded-xl border bg-card p-6"><div className="text-3xl">{i}</div><h3 className="mt-3 text-xl font-bold text-primary">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </Section>
    </>
  );
}
