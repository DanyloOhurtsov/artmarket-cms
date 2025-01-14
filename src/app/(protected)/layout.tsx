import React from "react";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";

import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AsideNavigation from "@/components/aside-navigation";

const ProtectedRouteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-full relative pl-44">
        <aside className="w-44 h-full bg-gray-800 text-white fixed top-0 bottom-0 left-0 flex flex-col items-center justify-between py-4 px-1">
          <Link href={"/dashboard"}>ArtMarket admin</Link>
          <Separator className="bg-white/20 rounded-2xl" />
          <AsideNavigation />
          <Separator className="bg-white/20 rounded-2xl" />
          <SignOutButton redirectUrl="/">
            <Button variant={"ghost"} className="size-8">
              <LogOutIcon className="size-6" />
            </Button>
          </SignOutButton>
        </aside>
        <div className="w-full min-h-screen">{children}</div>
      </div>
    </>
  );
};

export default ProtectedRouteLayout;
