import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/student-dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard – YM Public School, Gorakhpur" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StudentDashboard,
});

type Session = { role: string; id: string };

// Demo data – baad me database / API se connect kar sakte hain
const student = { name: "Aarav Sharma", cls: "Class X – B", roll: "23", house: "Ashoka House" };

const timetable = [
  ["8:00", "Mathematics", "Mrs. Sunita Rai"],
  ["8:45", "Science", "Mr. D. K. Pandey"],
  ["9:30", "English", "Ms. Neha Singh"],
  ["10:15", "Interval", ""],
  ["10:45", "Hindi", "Mr. R. P. Tiwari"],
  ["11:30", "Social Science", "Mrs. Anita Verma"],
  ["12:15", "Computer", "Mr. Amit Gupta"],
];

const initialHomework = [
  { id: 1, subject: "Mathematics", task: "Exercise 8.2, Q1–Q10 (Trigonometry)", due: "08 Nov", done: false },
  { id: 2, subject: "Science", task: "Draw & label human eye diagram", due: "09 Nov", done: false },
  { id: 3, subject: "English", task: "Write a letter to the Editor (150 words)", due: "10 Nov", done: true },
  { id: 4, subject: "Hindi", task: "पाठ 6 के प्रश्न-उत्तर लिखिए", due: "10 Nov", done: false },
];

const exams = [
  ["10 Nov", "Mathematics", "9:00 AM"],
  ["12 Nov", "Science", "9:00 AM"],
  ["14 Nov", "English", "9:00 AM"],
  ["17 Nov", "Social Science", "9:00 AM"],
];

const results = [
  ["Mathematics", "42 / 50", "88 / 100", "A1"],
  ["Science", "45 / 50", "91 / 100", "A1"],
  ["English", "40 / 50", "82 / 100", "A2"],
  ["Hindi", "41 / 50", "85 / 100", "A2"],
  ["Social Science", "39 / 50", "80 / 100", "A2"],
];

const notices = [
  ["10 Nov", "Half-yearly exam schedule released"],
  ["14 Nov", "Children's Day celebration in auditorium"],
  ["20 Nov", "Parent–Teacher Meeting, 9:00 AM"],
];

function StudentDashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [homework, setHomework] = useState(initialHomework);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ym_session");
      const s = raw ? (JSON.parse(raw) as Session) : null;
      if (s && s.role === "Student") setSession(s);
      else navigate({ to: "/student-login" });
    } catch {
      navigate({ to: "/student-login" });
    }
  }, [navigate]);

  const logout = () => {
    try {
      localStorage.removeItem("ym_session");
    } catch {}
    navigate({ to: "/student-login" });
  };

  const toggle = (id: number) =>
    setHomework((h) => h.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));

  if (!session) {
    return <div className="grid min-h-[60vh] place-items-center text-muted-foreground">Loading…</div>;
  }

  const pending = homework.filter((h) => !h.done).length;
  const attendance = 92;

  const cards = [
    ["📅", "Attendance", `${attendance}%`, "Is session me"],
    ["📝", "Pending Homework", String(pending), "Submit karna baaki"],
    ["🗓️", "Next Exam", "10 Nov", "Mathematics"],
    ["💰", "Fee Status", "Paid", "Q2 – Oct 2026"],
  ];

  return (
    <div className="pb-8">
      {/* Banner */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gold font-display text-2xl font-bold text-primary">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Student Dashboard</div>
              <h1 className="mt-1 text-3xl font-bold md:text-4xl">Namaste, {student.name} 👋</h1>
              <p className="mt-1 text-sm opacity-85">
                {student.cls} · Roll No. {student.roll} · Adm. No. {session.id} · {student.house}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-fit whitespace-nowrap rounded-md border border-primary-foreground/60 px-5 py-2 text-sm font-semibold hover:bg-primary-foreground/10"
          >
            Logout
          </button>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-8 px-4 pt-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {cards.map(([icon, label, value, sub]) => (
            <div key={label} className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="text-2xl">{icon}</div>
              <div className="mt-2 font-display text-3xl font-bold text-accent">{value}</div>
              <div className="text-sm font-semibold text-primary">{label}</div>
              <div className="text-xs text-muted-foreground">{sub}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Timetable */}
            <div className="rounded-xl border bg-card p-6">
              <h2 className="mb-4 text-xl font-bold text-primary">Today's Timetable</h2>
              <ul className="divide-y">
                {timetable.map(([time, subject, teacher]) => (
                  <li key={time} className="flex items-center gap-4 py-3">
                    <div className="w-14 shrink-0 text-sm font-semibold text-accent">{time}</div>
                    <div className="flex-1">
                      <div className={subject === "Interval" ? "text-sm italic text-muted-foreground" : "font-medium"}>{subject}</div>
                      {teacher && <div className="text-xs text-muted-foreground">{teacher}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Homework */}
            <div className="rounded-xl border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-primary">Homework</h2>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{pending} pending</span>
              </div>
              <ul className="space-y-3">
                {homework.map((h) => (
                  <li key={h.id} className="flex items-start gap-3 rounded-lg border p-3">
                    <input type="checkbox" checked={h.done} onChange={() => toggle(h.id)} className="mt-1 h-4 w-4 accent-[var(--accent)]" />
                    <div className="flex-1">
                      <div className={h.done ? "text-sm text-muted-foreground line-through" : "text-sm font-medium"}>{h.task}</div>
                      <div className="text-xs text-muted-foreground">{h.subject} · Due {h.due}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Results */}
            <div className="rounded-xl border bg-card p-6">
              <h2 className="mb-4 text-xl font-bold text-primary">Recent Results</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <thead>
                    <tr className="border-b text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="py-2">Subject</th>
                      <th className="py-2">Unit Test</th>
                      <th className="py-2">Half-Yearly</th>
                      <th className="py-2">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map(([s, u, h, g]) => (
                      <tr key={s} className="border-b last:border-0">
                        <td className="py-2.5 font-medium">{s}</td>
                        <td className="py-2.5">{u}</td>
                        <td className="py-2.5">{h}</td>
                        <td className="py-2.5 font-bold text-accent">{g}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Attendance */}
            <div className="rounded-xl border bg-card p-6">
              <h2 className="mb-3 text-xl font-bold text-primary">Attendance</h2>
              <div className="h-3 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-accent" style={{ width: `${attendance}%` }} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{attendance}% present · Minimum required 75%</p>
            </div>

            {/* Exams */}
            <div className="rounded-xl border bg-card p-6">
              <h2 className="mb-4 text-xl font-bold text-primary">Upcoming Exams</h2>
              <ul className="space-y-3">
                {exams.map(([d, s, t]) => (
                  <li key={s} className="flex items-center gap-3">
                    <div className="grid h-12 w-14 shrink-0 place-content-center rounded-md bg-accent text-center text-xs font-bold text-accent-foreground">{d}</div>
                    <div>
                      <div className="text-sm font-medium">{s}</div>
                      <div className="text-xs text-muted-foreground">{t}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Notices */}
            <div className="rounded-xl border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-primary">Notices</h2>
                <Link to="/notices" className="text-sm text-accent">View all →</Link>
              </div>
              <ul className="space-y-4">
                {notices.map(([d, t]) => (
                  <li key={t} className="border-l-2 border-gold pl-3">
                    <div className="text-xs font-semibold text-accent">{d} 2026</div>
                    <div className="text-sm">{t}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
