import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export const instant = false;

export default function SignUpPage() {
  return <main className="auth-page"><Suspense fallback={null}><SignUp routing="path" path="/sign-up" /></Suspense></main>;
}
