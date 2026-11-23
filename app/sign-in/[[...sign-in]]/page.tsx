import { SignIn } from "@clerk/nextjs";

export const instant = false;

export default function SignInPage() {
  return <main className="auth-page"><SignIn routing="path" path="/sign-in" /></main>;
}
