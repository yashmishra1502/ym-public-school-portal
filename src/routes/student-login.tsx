import { createFileRoute } from "@tanstack/react-router";
import { LoginCard } from "@/components/site";

export const Route = createFileRoute("/student-login")({
  head: () => ({ meta: [
    { title: "Student Login – YM Public School, Gorakhpur" },
    { name: "description", content: "Student portal login for YM Public School – results, attendance, homework and fees." },
    { property: "og:title", content: "Student Login – YM Public School" },
    { property: "og:description", content: "Access your student portal." },
  ] }),
  component: () => (
    <LoginCard
      role="Student"
      idLabel="Admission Number"
      extra={
        <label className="block text-sm font-medium">Class
          <select className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2">
            {["Nursery", "LKG", "UKG", ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)].map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
      }
    />
  ),
});
