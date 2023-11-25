/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Head from "next/head";
import Link from "next/link";
import NavbarComponent from "@/components/navbar";

import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

import type { GetStaticProps, InferGetStaticPropsType } from "next";

interface PageProps {}

const GetInfo = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { t } = useTranslation(["search", "components/navbar"]);

    const [songResult, setSongResult] = React.useState<any>();
    const [relatedSongResults, setRelatedSongsResults] = React.useState([]);
    const [showingRelatedResults, setShowingRelatedResults] = React.useState(false);

    const [songUrl, setSongUrl] = React.useState<string>("");

    const findSong = async () => {
        try {
            const res = await axios({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_ALGORITHM_URL}/api/get-song-info`,

                data: {
                    song_name: songUrl,
                },
            });

            setSongResult(res.data);
            getRelated(res.data);
        } catch (err) {
            alert("An error occurred while searching for songs");
            console.log(err);
        }
    };

    const getRelated = async (providedSongResult: any) => {
        try {
            const res = await axios({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_ALGORITHM_URL}/api/search`,

                data: {
                    genre: providedSongResult.genre,
                    subgenre: "other",
                    instrumental: providedSongResult.audio_features.instrumentalness != 0 ? true : false,
                    energy: providedSongResult.audio_features.energy * 100,
                    danceability: providedSongResult.audio_features.danceability * 100,
                    valence: providedSongResult.audio_features.valence * 100,
                },
            });

            setShowingRelatedResults(true);
            setRelatedSongsResults(res.data);
        } catch (err) {
            alert("An error occurred while searching for songs");
            console.log(err);
        }
    };

    return (
        <div className={`${montserrat}  bg-gradient-to-br from-dark-tone-1 to-dark-tone-2 min-h-screen text-white`}>
            <NavbarComponent t={t} />

            <Head>
                <title>{t("search:pageTitle")}</title>
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 mt-12">
                <h1 className="text-5xl font-bold">{t("search:search.title")}</h1>

                <input
                    type="text"
                    className="my-4 bg-dark-tone-3 text-white appearance-none outline-none w-11/12 md:w-1/2 p-2 rounded-2xl"
                    placeholder="Song URL"
                    onChange={(e) => setSongUrl(e.target.value)}
                    value={songUrl}
                />

                <button
                    className="bg-primary text-white appearance-none outline-none w-1/2 p-2 rounded-2xl"
                    onClick={findSong}
                >
                    {t("search:search.search")}
                </button>

                {songResult && (
                    <div className="flex flex-col justify-center w-full mt-6 p-12 text-center">
                        <div className="flex flex-col items-center justify-center w-full">
                            <img
                                src={songResult.song_data.album.images[0].url}
                                alt="data"
                                className="w-1/2 h-1/2 rounded-md m-2"
                            />
                            <h1 className="text-4xl font-bold">{songResult.song_data.name}</h1>
                            <h1 className="text-2xl font-bold text-gray-400">{songResult.song_data.artists[0].name}</h1>
                        </div>

                        <div className="my-4">
                            Género: {songResult.genre} <br />
                            Danceabilidad: {Math.round(songResult.audio_features.danceability * 100)}% <br />
                            Energía: {Math.round(songResult.audio_features.energy * 100)}% <br />
                            Felicidad: {Math.round(songResult.audio_features.valence * 100)}% <br />
                            Instrumental: {songResult.audio_features.instrumentalness != 0 ? "Sí" : "No"} <br />
                        </div>

                        {showingRelatedResults && (
                            <main className="flex flex-col items-center justify-center w-full mt-12">
                                <h1 className="text-5xl font-bold">Similar</h1>

                                {relatedSongResults.length === 0 && (
                                    <div className="bg-dark-tone-3 p-8 rounded-xl my-8 w-5/12 flex flex-col items-center justify-between">
                                        <h1 className="text-lg font-bold">{t("search:results.noResults")}</h1>
                                    </div>
                                )}

                                <div className="flex items-center justify-around w-full flex-wrap">
                                    {relatedSongResults.length > 0 &&
                                        relatedSongResults.map((song: any) => {
                                            return (
                                                <div
                                                    key={song.track_id}
                                                    className="bg-dark-tone-3 p-8 rounded-xl my-8 md:w-5/12 w-11/12 flex flex-col items-center justify-between"
                                                >
                                                    <div className="flex items-center justify-between w-full">
                                                        <div className="flex flex-col items-center justify-center p-2 w-1/2 flex-1 text-center">
                                                            <h1 className="text-lg font-bold">{song.track_name}</h1>
                                                            <h2 className="text-lg text-gray-400">
                                                                {song.track_artist}
                                                            </h2>

                                                            <Link
                                                                className="text-primary hover:underline"
                                                                href={`https://open.spotify.com/track/${song.track_id}`}
                                                                referrerPolicy="no-referrer"
                                                                target="_blank"
                                                            >
                                                                {t("search:results.openTrack")}
                                                            </Link>
                                                        </div>

                                                        <div className="flex flex-col items-center justify-center p-2 w-1/2 flex-1 text-center">
                                                            <h1 className="text-lg">Album: {song.track_album_name}</h1>
                                                            <h2 className="text-lg text-gray-400">
                                                                {t("search:results.released")}:{" "}
                                                                {song.track_album_release_date}
                                                            </h2>

                                                            <Link
                                                                className="text-primary hover:underline"
                                                                href={`https://open.spotify.com/album/${song.track_album_id}`}
                                                                referrerPolicy="no-referrer"
                                                                target="_blank"
                                                            >
                                                                {t("search:results.openAlbum")}
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    <p className="mt-4 text-gray-400">
                                                        {t("search:results.cat.text1")} {song.playlist_subgenre},{" "}
                                                        {t("search:results.cat.text2")}{" "}
                                                        <Link
                                                            className="text-primary hover:underline"
                                                            href={`/genre/${song.playlist_genre}`}
                                                            referrerPolicy="no-referrer"
                                                            target="_blank"
                                                        >
                                                            {song.playlist_genre}
                                                        </Link>
                                                    </p>
                                                </div>
                                            );
                                        })}
                                </div>
                            </main>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? "en", ["search", "components/navbar"])),
    },
});

export default GetInfo;
