"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides" },
  { label: "My Journey", href: "/my-journey" },
  { label: "Take A Break", href: "/break" },
];

const NavItems = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-10 cursor-pointer">
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          className={cn(
            "relative font-semibold text-black transition-all duration-300 after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:h-[2px] after:w-0 after:rounded-md after:bg-[#3F2B96] after:transition-all after:duration-300 hover:text-[#3F2B96] hover:after:w-3/5",
            pathname === href && "text-[#3F2B96] after:w-3/5"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
