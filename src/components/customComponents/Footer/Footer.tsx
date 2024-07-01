import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div className="bg-black 2xl:ml-64 flex-1 p-4 lg:p-8 text-white tw-fc gap-3">
            <p>&#169; 2024 Mangadise. All rights reserved. Dive into the world of manga with Mangadise, your premier destination for reading manga online. Whether you&apos;re a seasoned manga enthusiast or new to the genre, Mangadise offers a vast collection of titles to explore. Join our community to discover, read, and discuss your favorite manga series. Enjoy seamless reading experiences, personalized recommendations, and stay updated with the latest releases. At Mangadise, we bring your manga dreams to life.</p>
            <p>Huge thanks to the public API from: <Link className="text-primary font-bold" href='https://docs.otruyenapi.com/'>OTruyen API</Link></p>
        </div>
    );
}

export default Footer;
