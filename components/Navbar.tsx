import Link from "next/link";
import Image from "next/image";
import NavItems from "./NavItems";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="navbar mb-2 flex justify-between items-center px-1 sm:px-8">
      <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={72}
          height={72}
          className="hidden sm:block scale-130"
        />
      </Link>

      {/* Give NavItems a margin-right so it doesn't touch buttons */}
      <div className="flex-1 flex justify-center">
        <NavItems />
      </div>

      <div className="flex items-center gap-6 sm:gap-8">
        <SignedOut>
          <SignInButton>
            <button className="btn-signin">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
