import Link from "next/link";

export default function Footer() {
  return (
    <div className="mt-auto w-full">
      <div className="text-center gap-2 text-gray-600 text-xs py-3">
        <Link href="/">Terms of Service</Link>
        <span> | </span>
        <Link href="/">Privacy Policy</Link>
      </div>
    </div>
  );
}
