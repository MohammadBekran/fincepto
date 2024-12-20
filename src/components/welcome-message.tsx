"use client";

import { useUser } from "@clerk/nextjs";

const WelcomeMessage = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl font-medium text-white lg:text-4xl">
        Welcome Back{isLoaded ? ", " : " "}
        {user?.firstName ?? "No Name"} 👋
      </h2>
      <p className="text-sm text-[#89b6fd] lg:text-base">
        This is your Financial Overview Report
      </p>
    </div>
  );
};

export default WelcomeMessage;
