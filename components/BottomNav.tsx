"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, User } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/account", label: "Account" },
] as const;


export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-center pb-4 px-6">
      <ul
        className="flex w-full max-w-sm items-center justify-around rounded-xl border vorder-black px-4 py-3"
        style={{ backgroundColor: "var(--color-secondary)", paddingBottom: "5px" , paddingTop: "5px", marginBottom: "15px", width: "370px" }}
      >
        {NAV_ITEMS.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
         
          return (
            <li key={href}>
              <Link href={href} aria-current={active ? "page" : undefined}>
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={active ? { backgroundColor: "var(--color-primary)" } : {}}
                >
                
                  {label === "Home" && <Home size={24} strokeWidth={1.25} />}
                  {label === "Search" && <Search size={24} strokeWidth={1.25} />}
                  {label === "Account" && <User size={24} strokeWidth={1.25} />}

                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}




/*
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/account", label: "Account" },
] as const;

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={active ? 2.2 : 1.6}>
      <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={active ? 2.2 : 1.6}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function AccountIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const icons = { Home: HomeIcon, Search: SearchIcon, Account: AccountIcon };

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-center pb-4 px-6">
      <ul
        className="flex w-full max-w-sm items-center justify-around rounded-xl border vorder-black px-4 py-3"
        style={{ backgroundColor: "var(--color-secondary)", paddingBottom: "5px" , paddingTop: "5px", marginBottom: "15px", width: "370px" }}
      >
        {NAV_ITEMS.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          const Icon = icons[label];

          return (
            <li key={href}>
              <Link href={href} aria-current={active ? "page" : undefined}>
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={active ? { backgroundColor: "var(--color-primary)" } : {}}
                >
                  <Icon active={active} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
*/













