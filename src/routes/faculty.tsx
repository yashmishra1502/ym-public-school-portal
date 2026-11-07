import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site";

export const Route = createFileRoute("/faculty")({
  head: () => ({ meta: [
    { title: "Our Faculty – YM Public School, Gorakhpur" },
    { name: "description", content: "Meet the qualified and experienced teachers of YM Public School, Gorakhpur." },
    { property: "og:title", content: "Faculty – YM Public School" },
    { property: "og:description", content: "Our experienced teaching staff." },
  ] }),
  component: Faculty,
});

const staff = [
  ["Mrs. Neha Srivastava", "PGT Physics", "M.Sc, B.Ed · 15 yrs"],
  ["Mr. Rajesh Pandey", "PGT Mathematics", "M.Sc, B.Ed · 18 yrs"],
  ["Dr. Kavita Yadav", "PGT Chemistry", "Ph.D · 12 yrs"],
  ["Mr. Amit Shukla", "PGT Biology", "M.Sc, B.Ed · 10 yrs"],
  ["Mrs. Pooja Gupta", "PGT English", "M.A, B.Ed · 14 yrs"],
  ["Mr. Sanjay Tiwari", "PGT Commerce", "M.Com, B.Ed · 11 yrs"],
  ["Mrs. Rekha Dubey", "TGT Hindi", "M.A, B.Ed · 16 yrs"],
  ["Mr. Vivek Singh", "Computer Science", "MCA · 9 yrs"],
  ["Mrs. Anjali Verma", "Primary Coordinator", "M.A, B.Ed · 13 yrs"],
  ["Mr. Ravi Prakash", "Sports Teacher", "M.P.Ed · 8 yrs"],
  ["Mrs. Shalini Rai", "Music & Dance", "Sangeet Visharad · 7 yrs"],
  ["Ms. Priya Mishra", "Art & Craft", "BFA · 6 yrs"],
];

function Faculty() {
  return (
    <>
      <PageHero title="Our Faculty" subtitle="120+ dedicated teachers guiding every child to excel." />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {staff.map(([n, r, q]) => (
            <div key={n} className="rounded-xl border bg-card p-6 text-center transition hover:shadow-lg">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary font-display text-xl font-bold text-gold">{n?.split(" ").at(-1)?.charAt(0)}</div>
              <div className="mt-3 font-semibold">{n}</div>
              <div className="text-sm font-medium text-accent">{r}</div>
              <div className="mt-1 text-xs text-muted-foreground">{q}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
