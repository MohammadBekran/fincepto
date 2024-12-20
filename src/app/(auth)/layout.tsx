import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="space-y-8 pt-16">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold text-[#2E2A47]">Welcome Back!</h2>
          <p className="text-base text-[#7E8CA0]">
            Log in or Create account to get back to your dashboard!
          </p>
        </div>
        <div className="flex justify-center items-center">{children}</div>
      </div>
      <div className="h-full hidden justify-center items-center bg-blue-600 lg:flex">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </div>
    </div>
  );
};

export default AuthLayout;
