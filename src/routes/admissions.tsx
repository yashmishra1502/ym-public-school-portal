import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "@/components/site";

export const Route = createFileRoute("/admissions")({
  head: () => ({ meta: [
    { title: "Admissions 2027–28 – YM Public School, Gorakhpur" },
    { name: "description", content: "Admission process, documents required, fee structure and online enquiry form." },
    { property: "og:title", content: "Admissions Open – YM Public School" },
    { property: "og:description", content: "Apply for Nursery to Class XI at YM Public School, Gorakhpur." },
  ] }),
  component: Admissions,
});

const steps = ["Fill the enquiry / registration form", "Interaction / entrance test", "Document verification", "Fee submission & confirmation"];
const docs = ["Birth certificate", "Transfer certificate (TC)", "Previous year report card", "Aadhaar card of student & parents", "4 passport-size photographs", "Caste / residence certificate (if applicable)"];
const fees = [["Nursery – UKG", "₹2,000", "₹1,800"], ["I – V", "₹2,500", "₹2,200"], ["VI – VIII", "₹2,500", "₹2,600"], ["IX – X", "₹3,000", "₹3,000"], ["XI – XII", "₹3,500", "₹3,500"]];

function Admissions() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero title="Admissions 2027–28" subtitle="Admissions open for Nursery to Class IX and XI." />
      <Section kicker="Process" title="How to Apply">
        <div className="grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s} className="rounded-xl border bg-card p-6"><div className="font-display text-4xl font-bold text-gold">0{i + 1}</div><p className="mt-2 font-medium">{s}</p></div>
          ))}
        </div>
      </Section>
      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-primary">Documents Required</h2>
            <ul className="space-y-2">{docs.map((d) => <li key={d} className="flex gap-2"><span className="text-accent">✔</span>{d}</li>)}</ul>
            <h2 className="mb-4 mt-10 text-2xl font-bold text-primary">Fee Structure</h2>
            <div className="overflow-hidden rounded-xl border bg-card">
              <table className="w-full text-sm">
                <thead className="bg-primary text-primary-foreground"><tr><th className="p-3 text-left">Class</th><th className="p-3 text-left">Admission</th><th className="p-3 text-left">Monthly</th></tr></thead>
                <tbody>{fees.map(([c, a, m]) => <tr key={c} className="border-t"><td className="p-3">{c}</td><td className="p-3">{a}</td><td className="p-3">{m}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
          <form className="space-y-4 rounded-xl border bg-card p-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <h2 className="text-2xl font-bold text-primary">Admission Enquiry</h2>
            {["Student Name", "Parent Name", "Mobile Number", "Email"].map((f) => (
              <label key={f} className="block text-sm font-medium">{f}<input required={f !== "Email"} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2" /></label>
            ))}
            <label className="block text-sm font-medium">Class Applying For
              <select className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2">{["Nursery", "LKG", "UKG", ...Array.from({ length: 11 }, (_, i) => `Class ${i + 1}`)].map((c) => <option key={c}>{c}</option>)}</select>
            </label>
            <button className="w-full rounded-md bg-accent py-2.5 font-semibold text-accent-foreground">Submit Enquiry</button>
            {sent && <p className="rounded-md bg-secondary p-3 text-center text-sm">Thank you! Our admission office will contact you soon.</p>}
          </form>
        </div>
      </Section>
    </>
  );
}
