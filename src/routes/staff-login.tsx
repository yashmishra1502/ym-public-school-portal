import { createFileRoute } from "@tanstack/react-router";
import { LoginCard } from "@/components/site";

export const Route = createFileRoute("/staff-login")({
  head: () => ({ meta: [
    { title: "Teacher / Staff Login – YM Public School, Gorakhpur" },
    { name: "description", content: "Teacher and staff portal login for YM Public School, Gorakhpur." },
    { property: "og:title", content: "Teacher / Staff Login – YM Public School" },
    { property: "og:description", content: "Access the staff portal." },
  ] }),
  component: () => (
    <LoginCard
      role="Teacher / Staff"
      idLabel="Employee ID"
      extra={
        <label className="block text-sm font-medium">Login As
          <select className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2">
            <option>Teacher</option><option>Admin</option><option>Accountant</option><option>Librarian</option><option>Other Staff</option>
          </select>
        </label>
      }
    />
  ),
});
