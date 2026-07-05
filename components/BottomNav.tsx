"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const isHomeActive = (pathname === "/dashboard");
  const isSearchActive = (pathname === "/search");
  const isAccountActive = (pathname === "/account");

  const activeButtonClass =
  "border border-stroke bg-primary";
  const normalButtonClass =
    "border border-transparent bg-transparent";

  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[350px] -translate-x-1/2 rounded-xl border border-stroke bg-secondary  px-8 py-2"
    >
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          aria-label="Home"
          title="Home"
          aria-current={isHomeActive ? "page" : undefined}
          className={`flex h-11 w-11 items-center justify-center rounded-full ${
            isHomeActive ? activeButtonClass : normalButtonClass
          }`}
        >
          <Image
            src= {isHomeActive? "/assets/Vector.svg" : "/assets/Vector1.svg"}
            alt=""
            width={25}
            height={23}
            aria-hidden="true"
          />
        </Link>

        <Link
          href="/search"
          aria-label="Search"
          title="Search"
          aria-current={isSearchActive ? "page" : undefined}
          className={`flex h-11 w-11 items-center justify-center rounded-full ${
            isSearchActive ? activeButtonClass : normalButtonClass
          }`}
        >
          <Image
            src= {isSearchActive? "/assets/search1.svg" : "/assets/search.svg"}
            alt=""
            width={25}
            height={23}
            aria-hidden="true"
          />
        </Link>

        <Link
          href="/account"
          aria-label="Account Centre"
          
          title="Account Centre"
          
          className={`flex h-11 w-11 items-center justify-center rounded-full opacity-80 ${
            isAccountActive ? activeButtonClass : normalButtonClass
          }`}
        >
          <Image
            src={isAccountActive? "/assets/Profile1.svg" : "/assets/Profile.svg"}
            alt=""
            width={25}
            height={23}
            aria-hidden="true"
          />
        </Link>
      </div>
    </nav>
  );
}