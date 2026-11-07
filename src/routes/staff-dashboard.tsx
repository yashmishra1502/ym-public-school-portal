import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { logout as fbLogout, useRequireRole } from "@/lib/auth";
import { StudentManager } from "@/components/student-manager";

export const Route = createFileRoute("/staff-dashboard")({
  head: () => ({
    meta: [
      { title: "Staff Dashboard – YM Public School, Gorakhpur" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StaffDashboard,
});

// Demo data (schedule, students) – naam/subject Firebase se aata hai

const schedule = [
  ["8:00", "Class X – B", "Trigonometry"],
  ["8:45", "Class IX – A", "Linear Equations"],
  ["10:45", "Class XI – Sci", "Sets & Relations"],
  ["11:30", "Class X – A", "Revision"],
];

const studentList = [
  "Aarav Sharma", "Ananya Gupta", "Arjun Singh", "Diya Verma",
  "Kabir Yadav", "Meera Tiwari", "Rohan Gupta", "Sneha Yadav",
];

const notices = [
  ["10 Nov", "Half-yearly exam schedule released"],
  ["14 Nov", "Children's Day celebration in auditorium"],
  ["20 Nov", "Parent–Teacher Meeting, 9:00 AM"],
];

const classes = ["Class IX – A", "Class X – A", "Class X – B", "Class XI – Sci"];

function StaffDashboard() {
  const navigate = useNavigate();
  const profile = useRequireRole("Staff", "/staff-login");
  const [present, setPresent] = useState<Record<string, boolean>>(
    Object.fromEntries(studentList.map((s) => [s, true])),
  );
  const [saved, setSaved] = useState("");
  const [assigned, setAssigned] = useState<{ cls: string; task: string; due: string }[]>([]);
  const [form, setForm] = useState({ cls: classes[2], task: "", due: "" });

  const logout = async () => {
    await fbLogout();
    navigate({ to: "/staff-login" });
  };

  const addHomework = (e: FormEvent) => {
    e.preventDefault();
    if (!form.task.trim()) return;
    setAssigned((a) => [{ ...form }, ...a]);
    setForm({ ...form, task: "", due: "" });
  };

  if (!profile) {
    return <div className="grid min-h-[60vh] place-items-center text-muted-foreground">Loading…</div>;
  }

  const total = studentList.length;
  const presentCount = Object.values(present).filter(Boolean).length;

  const cards = [
    ["📚", "Classes Today", String(schedule.length), "Aaj ke periods"],
    ["👨‍🎓", "My Students", "142", "4 sections"],
    ["📝", "Papers to Check", "36", "Unit test – Class X"],
    ["🌴", "Leave Balance", "8", "Casual leaves"],
  ];

  return (
    <div className="pb-8">
      {/* Banner */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gold font-display text-2xl font-bold text-primary">
              {profile.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Staff Dashboard</div>
              <h1 className="mt-1 text-3xl font-bold md:text-4xl">Namaste, {profile.name} 👋</h1>
              <p className="mt-1 text-sm opacity-85">
                {(profile.subject ?? "")} · {(profile.dept ?? "")} · Emp. ID {profile.id}
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

        {/* Student accounts */}
        <StudentManager />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Attendance */}
            <div className="rounded-xl border bg-card p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-bold text-primary">Mark Attendance – Class X – B</h2>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  {presentCount} / {total} present
                </span>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {studentList.map((s) => (
                  <li key={s} className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm font-medium">{s}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSaved("");
                        setPresent((p) => ({ ...p, [s]: !p[s] }));
                      }}
                      className={
                        present[s]
                          ? "rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
                          : "rounded-md bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground"
                      }
                    >
                      {present[s] ? "Present" : "Absent"}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSaved(`Attendance save ho gayi: ${presentCount} present, ${total - presentCount} absent. (Demo)`)}
                  className="rounded-md bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
                >
                  Save Attendance
                </button>
                {saved && <span className="text-sm text-muted-foreground">{saved}</span>}
              </div>
            </div>

            {/* Homework */}
            <div className="rounded-xl border bg-card p-6">
              <h2 className="mb-4 text-xl font-bold text-primary">Assign Homework</h2>
              <form onSubmit={addHomework} className="grid gap-3 sm:grid-cols-2">
                <label className="block text-sm font-medium">Class
                  <select
                    value={form.cls}
                    onChange={(e) => setForm({ ...form, cls: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    {classes.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </label>
                <label className="block text-sm font-medium">Due date
                  <input
                    type="date"
                    value={form.due}
                    onChange={(e) => setForm({ ...form, due: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
                  />
                </label>
                <label className="block text-sm font-medium sm:col-span-2">Homework
                  <input
                    required
                    value={form.task}
                    onChange={(e) => setForm({ ...form, task: e.target.value })}
                    placeholder="Jaise: Exercise 8.2, Q1–Q10"
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>
                <button type="submit" className="w-fit rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
                  Assign
                </button>
              </form>
              {assigned.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {assigned.map((a, i) => (
                    <li key={i} className="rounded-lg border border-l-4 border-l-gold p-3 text-sm">
                      <div className="font-medium">{a.task}</div>
                      <div className="text-xs text-muted-foreground">{a.cls}{a.due ? ` · Due ${a.due}` : ""}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-6">
              <h2 className="mb-4 text-xl font-bold text-primary">Today's Schedule</h2>
              <ul className="divide-y">
                {schedule.map(([t, c, topic]) => (
                  <li key={t} className="flex items-center gap-3 py-3">
                    <div className="w-12 shrink-0 text-sm font-semibold text-accent">{t}</div>
                    <div>
                      <div className="text-sm font-medium">{c}</div>
                      <div className="text-xs text-muted-foreground">{topic}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

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
