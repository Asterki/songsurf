import * as React from "react";

import Image from "next/image";
import Link from "next/link";

const NavbarComponent = () => {
    return (
        <div className="flex items-center justify-between px-6 md:px-24 py-6 bg-[#282828] drop-shadow-md sticky top-0">
            <div className="flex items-center space-x-8">
                <Image
                    src="/icons/logo.svg"
                    alt="SongSurf Logo"
                    width={40}
                    height={40}
                />
                <Link
                    href="/"
                    className="text-[20px] font-bold transition-all hover:text-[#1DB954] hidden md:block"
                >
                    SongSurf
                </Link>
            </div>
            <div className="flex items-center md:space-x-8 space-x-4">
                <Link
                    target="_blank"
                    referrerPolicy="no-referrer"
                    href="https://github.com/Asterki/songsurf"
                    className="transition-all hover:text-[#1DB954] hover:underline"
                >
                    Open Source
                </Link>
                <Link
                    target="_blank"
                    referrerPolicy="no-referrer"
                    href="https://www.asterki.com"
                    className="transition-all hover:text-[#1DB954] hover:underline"
                >
                    Created By Asterki
                </Link>
            </div>
        </div>
    );
};

export default NavbarComponent;
