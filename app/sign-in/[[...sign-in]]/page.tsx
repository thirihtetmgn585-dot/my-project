import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export const instant = false;

export default function SignInPage() {
  return <main className="auth-page"><Suspense fallback={null}><SignIn routing="path" path="/sign-in" /></Suspense></main>;
}
