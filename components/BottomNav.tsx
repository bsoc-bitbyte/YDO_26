"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: "/icons/home.svg", activeIcon: "/icons/home-active.svg", size: 24 },
  { href: "/search", label: "Search", icon: "/icons/search.svg", activeIcon: "/icons/search-active.svg", size: 24 },
  { href: "/countdown", label: "Countdown", icon: "/icons/countdown.svg", activeIcon: "/icons/countdown-active.svg", size: 22},
  { href: "/account", label: "Account", icon: "/icons/account.svg", activeIcon: "/icons/account-active.svg", size: 22 },
] as const;


export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-center pb-4 px-6">
      <ul
        className="flex w-full items-center justify-evenly rounded-xl border border-black px-4"
        style={{ backgroundColor: "var(--color-secondary)", paddingBottom: "5px", paddingTop: "5px", marginBottom: "20px", width: "350px" }}
      >
        {NAV_ITEMS.map(({ href, label, icon, activeIcon, size }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link href={href} aria-current={active ? "page" : undefined}>
                <span className="flex items-center justify-center" style={{ width: "43px", height: "43px" }}>
                  {active ? (
                    <div style={{ position: "relative", width: "43px", height: "43px" }}>
                      <Image src="/icons/ellipse.svg" alt="" width={43} height={43} style={{ position: "absolute", top: 0, left: 0 }} />
                      <Image src={activeIcon} alt={label} width={size} height={size} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                    </div>
                  ) : (
                    <Image src={icon} alt={label} width={size} height={size} />
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}