import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { TFunction } from "next-i18next";

interface ComponentProps {
    t: TFunction;
}

const NavbarComponent: React.FC<ComponentProps> = (props) => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between px-6 md:px-24 py-6 bg-dark-tone-3 drop-shadow-md sticky top-0">
            <div
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => {
                    router.push(`${router.locale}/`);
                }}
            >
                <Image src="/icons/logo.svg" alt="SongSurf Logo" width={40} height={40} />
                <a className="text-[20px] font-bold transition-all hover:text-primary hidden md:block">SongSurf</a>
            </div>
            <div className="flex items-center md:space-x-8 space-x-4">
                <Link
                    target="_blank"
                    referrerPolicy="no-referrer"
                    href="https://github.com/Asterki/songsurf"
                    className="transition-all hover:text-primary hover:underline"
                >
                    {props.t("components/navbar:openSource")}
                </Link>
                <Link
                    target="_blank"
                    referrerPolicy="no-referrer"
                    href="https://www.asterki.com"
                    className="transition-all hover:text-primary hover:underline"
                >
                    {props.t("components/navbar:createdBy")}
                </Link>
            </div>
        </div>
    );
};

export default NavbarComponent;
