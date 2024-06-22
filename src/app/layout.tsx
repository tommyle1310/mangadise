import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Mainsidebar from "@/components/customComponents/MainSidebar/MainSidebar";
import NavBar from "@/components/customComponents/NavBar/NavBar";
import StoreProvider from "./Provider";


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
        <div className="">
          <StoreProvider>
            <NavBar />
            <div className="relative flex">
              <div className="2xl:fixed hidden top-0 left-0 bg-subSecondary h-full py-4 tw-cc 2xl:border-r-2 border-primary 2xl:px-10">
                <Mainsidebar />
              </div>
              <div className="2xl:ml-64  flex-1 mt-20">
                {children}
              </div>
            </div>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
