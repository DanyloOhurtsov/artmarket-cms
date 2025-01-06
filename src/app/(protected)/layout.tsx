import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";

const ProtectedRouteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default ProtectedRouteLayout;
