import { createFileRoute } from "@tanstack/react-router";
import { LoginCard } from "@/components/site";

export const Route = createFileRoute("/student-login")({
  head: () => ({
    meta: [
      { title: "Student Login – YM Public School, Gorakhpur" },
      { name: "description", content: "Student login portal of YM Public School, Gorakhpur." },
    ],
  }),
  component: StudentLogin,
});

function StudentLogin() {
  return (
    <LoginCard
      role="Student"
      idLabel="Admission No. / Student ID"
      redirectTo="/student-dashboard"
    />
  );
}
