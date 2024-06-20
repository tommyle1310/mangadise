import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ".././globals.css";
import Mainsidebar from "@/components/customComponents/MainSidebar/MainSidebar";
import NavBar from "@/components/customComponents/NavBar/NavBar";
import StoreProvider from ".././Provider";
import Discover from "@/components/customComponents/Discover/Discover";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Discover Manga",
    description: "Generated by create next app",
};

export default function DiscoverLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="tw-fc">
            {children}
            <Discover />
        </div>
    );
}