import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site";

export const Route = createFileRoute("/events")({
  head: () => ({ meta: [
    { title: "Events & Calendar – YM Public School, Gorakhpur" },
    { name: "description", content: "Upcoming events, celebrations and academic calendar of YM Public School." },
    { property: "og:title", content: "Events – YM Public School" },
    { property: "og:description", content: "Upcoming school events and calendar." },
  ] }),
  component: Events,
});

const events = [
  ["14", "NOV", "Children's Day Celebration", "Cultural programme, games & fun fair for all classes."],
  ["28", "NOV", "Science Exhibition", "Students showcase models and projects. Parents invited."],
  ["15", "DEC", "Annual Sports Meet", "Track & field events, march past and prize distribution."],
  ["26", "JAN", "Republic Day", "Flag hoisting, parade and patriotic performances."],
  ["10", "FEB", "Annual Function – Utsav 2027", "Dance, drama and music showcase at the school auditorium."],
  ["01", "MAR", "Board Exams Begin", "CBSE Class X & XII board examinations."],
];

function Events() {
  return (
    <>
      <PageHero title="Events & Calendar" subtitle="Celebrations, competitions and important dates for session 2026–27." />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {events.map(([d, m, t, desc]) => (
            <div key={t} className="flex gap-5 rounded-xl border bg-card p-5">
              <div className="grid h-20 w-20 shrink-0 place-content-center rounded-lg bg-accent text-center text-accent-foreground">
                <div className="font-display text-3xl font-bold leading-none">{d}</div>
                <div className="text-xs font-semibold tracking-widest text-gold">{m}</div>
              </div>
              <div><h3 className="text-lg font-bold text-primary">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{desc}</p></div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
