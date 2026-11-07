import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site";

export const Route = createFileRoute("/notices")({
  head: () => ({ meta: [
    { title: "Notices & Events – YM Public School, Gorakhpur" },
    { name: "description", content: "Latest circulars, exam schedules, holidays and events at YM Public School." },
    { property: "og:title", content: "Notice Board – YM Public School" },
    { property: "og:description", content: "Latest circulars, exams and events." },
  ] }),
  component: Notices,
});

const notices = [
  ["10 Nov 2026", "Exam", "Half-yearly examination schedule released for Classes VI–XII"],
  ["14 Nov 2026", "Event", "Children's Day celebration – cultural programme in auditorium"],
  ["20 Nov 2026", "Meeting", "Parent–Teacher Meeting for all classes, 9:00 AM"],
  ["25 Nov 2026", "Holiday", "School closed on account of Guru Nanak Jayanti"],
  ["01 Dec 2026", "Admission", "Admissions open for session 2027–28"],
  ["15 Dec 2026", "Event", "Annual Sports Meet 2026 – registrations open"],
  ["25 Dec 2026", "Holiday", "Winter vacation from 25 Dec to 5 Jan"],
];

function Notices() {
  return (
    <>
      <PageHero title="Notice Board" subtitle="Stay updated with circulars, exams, holidays and events." />
      <Section>
        <div className="divide-y rounded-xl border bg-card">
          {notices.map(([d, c, t]) => (
            <div key={t} className="flex flex-col gap-2 p-5 md:flex-row md:items-center md:gap-6">
              <div className="w-32 text-sm font-semibold text-accent">{d}</div>
              <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">{c}</span>
              <div className="flex-1">{t}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
