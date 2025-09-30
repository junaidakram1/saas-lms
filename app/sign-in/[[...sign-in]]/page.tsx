"use client";

import dynamic from "next/dynamic";

const SignIn = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignIn),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <SignIn />
    </main>
  );
}
