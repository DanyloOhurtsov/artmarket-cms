import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

const ProtectedRouteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      {children}
    </>
  );
};

export default ProtectedRouteLayout;
