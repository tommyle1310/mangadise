import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Mainsidebar from "@/components/customComponents/MainSidebar/MainSidebar";
import NavBar from "@/components/customComponents/NavBar/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <div className="flex">
          <div className=" min-h-screen flex-1 p-4 tw-cc ">
            <Mainsidebar />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
