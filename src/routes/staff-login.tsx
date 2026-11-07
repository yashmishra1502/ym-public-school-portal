import { createFileRoute } from "@tanstack/react-router";
import { LoginCard } from "@/components/site";

export const Route = createFileRoute("/staff-login")({
  head: () => ({
    meta: [
      { title: "Teacher / Staff Login – YM Public School, Gorakhpur" },
      { name: "description", content: "Teacher and staff login portal of YM Public School, Gorakhpur." },
    ],
  }),
  component: StaffLogin,
});

function StaffLogin() {
  return (
    <LoginCard
      role="Staff"
      idLabel="Employee ID"
      redirectTo="/staff-dashboard"
    />
  );
}
