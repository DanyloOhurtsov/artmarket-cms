import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex items-center justify-center w-full min-h-screen">
      {children}
    </section>
  );
};

export default AuthLayout;
