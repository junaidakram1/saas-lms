import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import NavbarWrapper from "@/components/NavbarWrapper";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JunovaX",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#3F2B96",
              colorBackground: "#F9FAFB",
            },
          }}
        >
          <NavbarWrapper />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
