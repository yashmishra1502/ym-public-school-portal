import { useNavigate } from "@tanstack/react-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getDb, getFirebaseAuth, getSecondaryAuth } from "./firebase";

export type Role = "Student" | "Staff";

export type Profile = {
  uid: string;
  id: string;
  role: Role;
  name: string;
  cls?: string;
  roll?: string;
  house?: string;
  subject?: string;
  dept?: string;
};

// Login ID ko email me badalta hai: 1001 -> 1001@student.ympublicschool.in
export const idToEmail = (role: Role, id: string) =>
  `${id.trim().toLowerCase()}@${role === "Student" ? "student" : "staff"}.ympublicschool.in`;

export async function loginWithId(role: Role, id: string, password: string) {
  const auth = getFirebaseAuth();
  const cred = await signInWithEmailAndPassword(auth, idToEmail(role, id), password);
  const snap = await getDoc(doc(getDb(), "users", cred.user.uid));
  if (!snap.exists() || snap.data().role !== role) {
    await signOut(auth);
    throw new Error("ROLE_MISMATCH");
  }
  if (snap.data().active === false) {
    await signOut(auth);
    throw new Error("ACCOUNT_BLOCKED");
  }
}

export function friendlyError(e: unknown): string {
  const code = (e as { code?: string })?.code ?? (e as Error)?.message ?? "";
  if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found"))
    return "ID ya password galat hai.";
  if (code.includes("too-many-requests")) return "Bahut zyada koshish ho gayi. Thodi der baad try karo.";
  if (code === "BAD_ID") return "ID me sirf letters, numbers, - ya _ rakho (3 se 20 characters).";
  if (code.includes("network")) return "Internet connection check karo.";
  if (code.includes("email-already-in-use")) return "Ye ID pehle se bani hui hai.";
  if (code.includes("weak-password")) return "Password kam se kam 6 characters ka rakho.";
  if (code === "ACCOUNT_BLOCKED") return "Ye account band hai. School office se sampark karein.";
  if (code === "ROLE_MISMATCH") return "Ye ID is login ke liye nahi hai.";
  if (code.includes("permission-denied")) return "Profile padhne ki permission nahi mili (Firestore rules check karo).";
  return "Login nahi ho paya. Dobara try karo.";
}

export const logout = () => signOut(getFirebaseAuth());

// Dashboard guard: login nahi hai ya role galat hai to login page par bhej deta hai
export function useRequireRole(role: Role, loginPath: string) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(getFirebaseAuth(), async (user) => {
      if (!user) {
        navigate({ to: loginPath as "/" });
        return;
      }
      try {
        const snap = await getDoc(doc(getDb(), "users", user.uid));
        const data = snap.data();
        if (!data || data.role !== role || data.active === false) {
          if (data?.active === false) await signOut(getFirebaseAuth());
          navigate({ to: loginPath as "/" });
          return;
        }
        setProfile({
          ...(data as Omit<Profile, "uid" | "id">),
          uid: user.uid,
          id: user.email?.split("@")[0] ?? "",
        });
      } catch {
        navigate({ to: loginPath as "/" });
      }
    });
    return unsub;
  }, [role, loginPath, navigate]);

  return profile;
}

// ---------- Teacher: student accounts ----------

export type StudentRow = {
  uid: string;
  loginId: string;
  name: string;
  cls: string;
  roll: string;
  house: string;
  active: boolean;
};

export type NewStudent = { id: string; password: string; name: string; cls: string; roll: string; house: string };

export async function createStudentAccount(input: NewStudent) {
  const loginId = input.id.trim().toLowerCase();
  if (!/^[a-z0-9_-]{3,20}$/.test(loginId)) throw new Error("BAD_ID");
  if (input.password.length < 6) throw new Error("weak-password");

  // Secondary app se banate hain, taki teacher ka login na toote
  const secondary = getSecondaryAuth();
  const cred = await createUserWithEmailAndPassword(secondary, idToEmail("Student", loginId), input.password);
  try {
    await setDoc(doc(getDb(), "users", cred.user.uid), {
      role: "Student",
      loginId,
      name: input.name.trim(),
      cls: input.cls,
      roll: input.roll.trim(),
      house: input.house.trim(),
      active: true,
      createdAt: serverTimestamp(),
    });
  } catch (e) {
    await cred.user.delete().catch(() => {});
    throw e;
  } finally {
    await signOut(secondary);
  }
}

export async function listStudents(): Promise<StudentRow[]> {
  const snap = await getDocs(query(collection(getDb(), "users"), where("role", "==", "Student")));
  return snap.docs
    .map((d) => {
      const x = d.data();
      return {
        uid: d.id,
        loginId: x.loginId ?? "",
        name: x.name ?? "",
        cls: x.cls ?? "",
        roll: x.roll ?? "",
        house: x.house ?? "",
        active: x.active !== false,
      };
    })
    .sort((a, b) => a.cls.localeCompare(b.cls) || a.name.localeCompare(b.name));
}

export const setStudentActive = (uid: string, active: boolean) =>
  updateDoc(doc(getDb(), "users", uid), { active });
