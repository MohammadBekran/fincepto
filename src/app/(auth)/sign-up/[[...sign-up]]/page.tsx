import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;

export const metadata: Metadata = {
  title: "Sign up",
  description: "sign up to the fincepto",
};
