"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { asideLinks } from "@/lib/constants/aside-links";

const AsideNavigation = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return href === pathname;
    }

    return pathname.startsWith(href) && pathname !== "/dashboard";
  };

  return (
    <nav className="my-auto w-full">
      <ul className="flex flex-col space-y-4 mt-4">
        {asideLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <li key={`aside-link-${index}`}>
              <Link
                className={cn(
                  "text-white flex items-center gap-x-2 px-1 py-1 rounded-md",
                  isActive(link.href) ? "bg-slate-300 text-black" : ""
                )}
                href={link.href}
              >
                <Icon size={24} className="size-4" />
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AsideNavigation;
