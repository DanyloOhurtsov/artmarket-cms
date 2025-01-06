import { Separator } from "@/components/ui/separator";
import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProtectedRouteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-full relative pl-44">
        <aside className="w-44 h-full bg-gray-800 text-white fixed top-0 bottom-0 left-0 flex flex-col items-center justify-between py-4 px-1">
          <p>ArtMarket admin</p>
          <Separator className="bg-white/20 rounded-2xl" />
          <nav className="my-auto w-full">
            <ul className="flex flex-col space-y-4 mt-4">
              <li>
                <Link className="text-white" href="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className="text-white" href="/dashboard/products">
                  Products
                </Link>
              </li>
            </ul>
          </nav>
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
