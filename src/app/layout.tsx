import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Mainsidebar from "@/components/customComponents/MainSidebar/MainSidebar";
import NavBar from "@/components/customComponents/NavBar/NavBar";
import StoreProvider from "./Provider";
import SessionWrapper from "@/components/SessionWrapper";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";


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
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <StoreProvider>
            <div className="tw-fc">
              <NavBar />
              <div className="relative flex">
                <div className="2xl:fixed hidden top-0 left-0 bg-subSecondary h-full py-4 tw-cc 2xl:border-r-2 border-primary 2xl:px-10">
                  <Mainsidebar />
                </div>
                <div className="2xl:ml-64  flex-1 mt-28 min-h-screen">
                  {children}
                </div>
              </div>
              <Separator></Separator>
              <div className="bg-black 2xl:ml-64 flex-1 p-4 lg:p-8 text-white tw-fc gap-3">
                <p>© 2024 Mangadise. All rights reserved. Dive into the world of manga with Mangadise, your premier destination for reading manga online. Whether you're a seasoned manga enthusiast or new to the genre, Mangadise offers a vast collection of titles to explore. Join our community to discover, read, and discuss your favorite manga series. Enjoy seamless reading experiences, personalized recommendations, and stay updated with the latest releases. At Mangadise, we bring your manga dreams to life.</p>
                <p>Huge thanks to the public API from: <Link className="text-primary font-bold" href='https://docs.otruyenapi.com/'>OTruyen API</Link></p>
              </div>
            </div>
          </StoreProvider>
        </body>
      </html>
    </SessionWrapper>

  );
}
