import Image from "next/image";
import Link from "next/link";

import { Montserrat } from "next/font/google";

import NavbarComponent from "@/components/navbar";

const montserrat = Montserrat({ subsets: ["latin"] });

const Home = () => {
    return (
        <div
            className={`${montserrat}  bg-gradient-to-br from-[#1D1D1D] to-[#121212] min-h-screen text-white`}
        >
            <NavbarComponent />

            <header className="text-center p-16">
                <h1 className="text-[60px] font-bold">SongSurf</h1>
                <p>Dive into a sea of personalized playlists and discover a harmonious journey through your favorite genres and artists.</p>
            </header>

            <main className="text-center">
                <Link
                    href="/search"
                    className="w-1/12 py-4 px-8 rounded-2xl bg-[#1DB954] transition-all text-white font-bold text-[20px]"
                >
                    Get Started
                </Link>

                <section className="text-center p-16">
                    <h2 className="text-[40px] font-bold">How it works</h2>
                    <p>
                        SongSurf is a web app that allows you to discover new
                        music a huge database of songs from Spotify.
                    </p>
                    <p>
                        You can add filters to your likings to find the perfect
                        song for you. You can filter by genre, year, and
                        popularity.
                    </p>
                    <p>
                        It uses artificial intelligence to find songs that
                        matches with the filters you have selected.
                    </p>
                </section>

                <section className="text-center p-16">
                    <h2 className="text-[40px] font-bold">How to use</h2>
                    <p>
                        To do this, you first have to head to the search page,
                        then add filters to your likings.
                    </p>
                    <p>
                        Once you have added filters, click on the search button
                        to search for songs.
                    </p>
                    <p>SongSurf will do the rest</p>
                </section>

                <section className="text-center p-16">
                    <h2 className="text-[40px] font-bold">Privacy</h2>
                    <p>
                        SongSurf does not store any of your data. It only uses
                        the data you provide to search for songs.
                    </p>
                    <p>
                        After it was used to search for songs, it is deleted
                        from our server.
                    </p>
                    <p>In fact, you can check the source code yourself.</p>
                </section>

                <section className="text-center p-16">
                    <h2 className="text-[40px] font-bold">Open Source</h2>
                    <p>
                        SongSurf is open source. You can view the source code{" "}
                        <a
                            target="_blank"
                            referrerPolicy="no-referrer"
                            href="https://github.com/Asterki/flashet"
                            className="text-[#1DB954] hover:underline"
                        >
                            here
                        </a>
                        .
                    </p>
                </section>
            </main>
        </div>
    );
};

export default Home;
