"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { asideLinks } from "@/lib/constants/aside-links";
import { Separator } from "./ui/separator";

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
            <li
              key={`aside-link-${index}`}
              className={cn(
                "flex flex-col rounded-md",
                isActive(link.href) ? "bg-slate-300/10" : ""
              )}
            >
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
              {isActive(link.href) && link.subLinks && (
                <div className="flex flex-col pl-6 mt-1">
                  {link.subLinks.map((subLink, index) => (
                    <Link
                      key={`aside-sub-link-${index}`}
                      className={cn(
                        "px-1 py-1 rounded-md transition-colors duration-300",
                        isActive(subLink.href)
                          ? "text-white"
                          : "text-white/50"
                      )}
                      href={subLink.href}
                    >
                      {subLink.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AsideNavigation;
