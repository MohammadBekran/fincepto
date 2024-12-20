import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;

export const metadata: Metadata = {
  title: "Sign in",
  description: "sign in to the fincepto",
};
