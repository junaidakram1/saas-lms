import Link from "next/link";
import Image from "next/image";
import NavItems from "./NavItems";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar mb-2 flex justify-between items-center px-1 sm:px-8 relative z-1000">
      <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={72}
          height={72}
          className="hidden sm:block scale-130"
        />
      </Link>

      <button
        className="sm:hidden ml-auto p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 8h16M4 16h16"
            />
          )}
        </svg>
      </button>

      <div className="flex-1 flex justify-center hidden sm:flex">
        <NavItems />
      </div>

      <div className="flex items-center gap-6 sm:gap-8 hidden sm:flex">
        <SignedOut>
          <SignInButton>
            <button className="btn-signin">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-2147483647 sm:hidden">
          <div className="p-4 flex flex-col gap-4 items-center">
            <NavItems />
            <SignedOut>
              <SignInButton>
                <button className="btn-signin w-full mt-20">Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
