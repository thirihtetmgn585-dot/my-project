import { SignUp } from "@clerk/nextjs";

export const instant = false;

export default function SignUpPage() {
  return <main className="auth-page"><SignUp routing="path" path="/sign-up" /></main>;
}
