import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site";

export const Route = createFileRoute("/academics")({
  head: () => ({ meta: [
    { title: "Academics – YM Public School, Gorakhpur" },
    { name: "description", content: "CBSE curriculum from Nursery to Class XII with Science, Commerce and Humanities streams." },
    { property: "og:title", content: "Academics at YM Public School" },
    { property: "og:description", content: "Classes, streams, subjects and school timings." },
  ] }),
  component: Academics,
});

const levels = [
  ["Pre-Primary", "Nursery – UKG", "Play-way method, phonics, motor skills and joyful learning."],
  ["Primary", "Class I – V", "English, Hindi, Maths, EVS, Computer, Art & GK."],
  ["Middle", "Class VI – VIII", "Science, Social Science, Sanskrit, Computer and activity-based learning."],
  ["Secondary", "Class IX – X", "CBSE board preparation with regular tests and remedial classes."],
  ["Senior Secondary", "Class XI – XII", "Science (PCM/PCB), Commerce and Humanities streams with career guidance."],
];

function Academics() {
  return (
    <>
      <PageHero title="Academics" subtitle="A structured CBSE curriculum that builds strong foundations and future-ready skills." />
      <Section kicker="Curriculum" title="Classes Offered">
        <div className="space-y-4">
          {levels.map(([l, c, d]) => (
            <div key={l} className="grid gap-2 rounded-xl border bg-card p-6 md:grid-cols-4">
              <div className="font-display text-xl font-bold text-primary">{l}</div>
              <div className="font-semibold text-accent">{c}</div>
              <div className="text-sm text-muted-foreground md:col-span-2">{d}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section kicker="Timings" title="School Hours">
        <div className="overflow-hidden rounded-xl border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-primary text-primary-foreground"><tr><th className="p-3 text-left">Session</th><th className="p-3 text-left">Summer (Apr–Sep)</th><th className="p-3 text-left">Winter (Oct–Mar)</th></tr></thead>
            <tbody>
              <tr className="border-t"><td className="p-3">Pre-Primary</td><td className="p-3">7:30 AM – 11:30 AM</td><td className="p-3">9:00 AM – 1:00 PM</td></tr>
              <tr className="border-t"><td className="p-3">Class I – XII</td><td className="p-3">7:30 AM – 1:30 PM</td><td className="p-3">8:30 AM – 2:30 PM</td></tr>
              <tr className="border-t"><td className="p-3">Office</td><td className="p-3">8:00 AM – 2:00 PM</td><td className="p-3">8:30 AM – 3:00 PM</td></tr>
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
