import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  createStudentAccount,
  friendlyError,
  listStudents,
  setStudentActive,
  type StudentRow,
} from "@/lib/auth";

const CLASSES = [
  "Nursery", "LKG", "UKG",
  "Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI",
  "Class VII", "Class VIII", "Class IX", "Class X", "Class XI", "Class XII",
];
const SECTIONS = ["A", "B", "C", "D"];

function randomPassword() {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789"; // confusing letters (l, 1, o, 0, i) nahi
  const arr = new Uint32Array(8);
  crypto.getRandomValues(arr);
  return Array.from(arr, (n) => chars[n % chars.length]).join("");
}

const field =
  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

export function StudentManager() {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({ id: "", password: "", name: "", cls: "Class X", section: "A", roll: "", house: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState<{ id: string; password: string; name: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const load = async () => {
    setLoading(true);
    setListError("");
    try {
      setStudents(await listStudents());
    } catch (e) {
      setListError(friendlyError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) => `${s.name} ${s.loginId} ${s.cls}`.toLowerCase().includes(q));
  }, [students, search]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setCreated(null);
    setCopied(false);
    setBusy(true);
    try {
      await createStudentAccount({
        id: form.id,
        password: form.password,
        name: form.name,
        cls: `${form.cls} – ${form.section}`,
        roll: form.roll,
        house: form.house,
      });
      setCreated({ id: form.id.trim().toLowerCase(), password: form.password, name: form.name.trim() });
      setForm({ ...form, id: "", password: "", name: "", roll: "" });
      await load();
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  };

  const toggleActive = async (s: StudentRow) => {
    try {
      await setStudentActive(s.uid, !s.active);
      setStudents((list) => list.map((x) => (x.uid === s.uid ? { ...x, active: !x.active } : x)));
    } catch (e) {
      setListError(friendlyError(e));
    }
  };

  const copyCreds = async () => {
    if (!created) return;
    try {
      await navigator.clipboard.writeText(`YM Public School\nStudent ID: ${created.id}\nPassword: ${created.password}`);
      setCopied(true);
    } catch {}
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Create form */}
      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-1 text-xl font-bold text-primary">Naya Student Account</h2>
        <p className="mb-4 text-xs text-muted-foreground">Yahan ID aur password banao. Student isi se login karega.</p>
        <form onSubmit={submit} className="space-y-3">
          <label className="block text-sm font-medium">Student ID / Admission No.
            <input required value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} placeholder="jaise 1001" className={field} autoComplete="off" />
          </label>
          <label className="block text-sm font-medium">Password
            <div className="flex gap-2">
              <input required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="kam se kam 6 characters" className={field} autoComplete="off" />
              <button type="button" onClick={() => setForm({ ...form, password: randomPassword() })} className="mt-1 shrink-0 rounded-md border border-primary px-3 text-xs font-semibold text-primary hover:bg-secondary">
                Auto
              </button>
            </div>
          </label>
          <label className="block text-sm font-medium">Student ka naam
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium">Class
              <select value={form.cls} onChange={(e) => setForm({ ...form, cls: e.target.value })} className={field}>
                {CLASSES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium">Section
              <select value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} className={field}>
                {SECTIONS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium">Roll No.
              <input value={form.roll} onChange={(e) => setForm({ ...form, roll: e.target.value })} className={field} />
            </label>
            <label className="block text-sm font-medium">House
              <input value={form.house} onChange={(e) => setForm({ ...form, house: e.target.value })} placeholder="optional" className={field} />
            </label>
          </div>
          <button type="submit" disabled={busy} className="w-full rounded-md bg-accent py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60">
            {busy ? "Ban raha hai…" : "Account Banao"}
          </button>
          {error && <p className="rounded-md bg-secondary p-3 text-sm text-destructive">{error}</p>}
        </form>

        {created && (
          <div className="mt-4 rounded-lg border border-gold bg-secondary p-4 text-sm">
            <div className="font-semibold text-primary">✅ {created.name} ka account ban gaya</div>
            <div className="mt-2">ID: <b>{created.id}</b></div>
            <div>Password: <b>{created.password}</b></div>
            <p className="mt-2 text-xs text-muted-foreground">Password ab dobara nahi dikhega. Student ko abhi de do.</p>
            <button type="button" onClick={copyCreds} className="mt-2 rounded-md border border-primary px-3 py-1 text-xs font-semibold text-primary hover:bg-card">
              {copied ? "Copy ho gaya ✓" : "Copy karo"}
            </button>
          </div>
        )}
      </div>

      {/* Student list */}
      <div className="rounded-xl border bg-card p-6 lg:col-span-2">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-primary">Students ({students.length})</h2>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Naam / ID / Class dhundo" className="w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
        {listError && <p className="mb-3 rounded-md bg-secondary p-3 text-sm text-destructive">{listError}</p>}
        {loading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Abhi koi student nahi hai.</p>
        ) : (
          <div className="max-h-[520px] overflow-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="py-2">ID</th>
                  <th className="py-2">Naam</th>
                  <th className="py-2">Class</th>
                  <th className="py-2">Roll</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.uid} className="border-b last:border-0">
                    <td className="py-2.5 font-mono text-xs">{s.loginId}</td>
                    <td className="py-2.5 font-medium">{s.name}</td>
                    <td className="py-2.5">{s.cls}</td>
                    <td className="py-2.5">{s.roll || "-"}</td>
                    <td className="py-2.5">
                      <button
                        type="button"
                        onClick={() => toggleActive(s)}
                        className={s.active ? "rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary hover:opacity-80" : "rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground hover:opacity-80"}
                        title={s.active ? "Block karne ke liye click karo" : "Chalu karne ke liye click karo"}
                      >
                        {s.active ? "Active" : "Blocked"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
