import Image from "next/image";
import Link from "next/link";

import { Montserrat } from "next/font/google";

import NavbarComponent from "@/components/navbar";

const montserrat = Montserrat({ subsets: ["latin"] });

const SearchPage = () => {
    return (
        <div
            className={`${montserrat}  bg-gradient-to-br from-[#1D1D1D] to-[#121212] min-h-screen text-white`}
        >
            <NavbarComponent />
            
        </div>
    );
};

export default SearchPage;
