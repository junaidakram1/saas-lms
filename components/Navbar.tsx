import Link from "next/link";
import Image from "next/image";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={72}
          height={72}
          className="scale-130"
        />
      </Link>
      <NavItems />
    </div>
  );
};

export default Navbar;
