import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact Us – YM Public School, Gorakhpur" },
    { name: "description", content: "Address, phone, email and map of YM Public School, Gorakhpur, Uttar Pradesh." },
    { property: "og:title", content: "Contact YM Public School" },
    { property: "og:description", content: "Get in touch with YM Public School, Gorakhpur." },
  ] }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you." />
      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            {[["📍 Address", "YM Public School, Medical College Road, Gorakhpur, Uttar Pradesh – 273013"], ["📞 Phone", "+91 98765 43210"], ["✉ Email", "info@ympublicschool.in"], ["🕘 Office Hours", "Mon–Sat, 8:00 AM – 2:30 PM"]].map(([h, v]) => (
              <div key={h} className="rounded-xl border bg-card p-5"><div className="font-semibold text-primary">{h}</div><div className="mt-1 text-sm text-muted-foreground">{v}</div></div>
            ))}
            <iframe title="Map" className="h-64 w-full rounded-xl border" loading="lazy" src="https://www.google.com/maps?q=Gorakhpur,Uttar+Pradesh&output=embed" />
          </div>
          <form className="space-y-4 rounded-xl border bg-card p-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <h2 className="text-2xl font-bold text-primary">Send a Message</h2>
            {["Name", "Phone", "Email"].map((f) => <label key={f} className="block text-sm font-medium">{f}<input required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2" /></label>)}
            <label className="block text-sm font-medium">Message<textarea required rows={5} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2" /></label>
            <button className="w-full rounded-md bg-primary py-2.5 font-semibold text-primary-foreground">Send Message</button>
            {sent && <p className="rounded-md bg-secondary p-3 text-center text-sm">Thank you! We'll get back to you soon.</p>}
          </form>
        </div>
      </Section>
    </>
  );
}
