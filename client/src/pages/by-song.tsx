/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Head from "next/head";
import Link from "next/link";
import NavbarComponent from "@/components/navbar";

import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { SongInfo } from "@/types/models";

interface PageProps {}

const GetInfo = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { t } = useTranslation(["search", "components/navbar"]);

    const [songResult, setSongResult] = React.useState<SongInfo>();
    const [showingRelatedResults, setShowingRelatedResults] = React.useState(false);

    const [songUrl, setSongUrl] = React.useState<string>("");

    const findSong = async () => {
        try {
            if (!songUrl) return alert("Please enter a song name");

            const res: AxiosResponse<SongInfo> = await axios({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_ALGORITHM_URL}/api/get-song-info`,
                data: {
                    song_name: songUrl,
                },
            });

            console.log(res.data);

            setSongResult(res.data);
            setShowingRelatedResults(true);
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
                    placeholder="Song Name"
                    onChange={(e) => setSongUrl(e.target.value)}
                    defaultValue={songUrl}
                />

                <button
                    className="bg-primary text-white appearance-none outline-none w-1/2 p-2 rounded-2xl"
                    onClick={findSong}
                >
                    {t("search:search.search")}
                </button>

                {songResult && (
                    <div className="flex flex-col justify-center w-full mt-6 md:p-12 text-center">
                        <div className="flex flex-col items-center justify-center w-full">
                            <img
                                src={songResult.song_data.album.images[0].url}
                                alt="data"
                                className="md:w-1/4 w-1/2 rounded-md m-2"
                            />
                            <h1 className="text-4xl font-bold">{songResult.song_data.name}</h1>
                            <h1 className="text-2xl font-bold text-gray-400">
                                {songResult.song_data.artists.map((artist: { name: string }) => artist.name).join(", ")}
                            </h1>
                        </div>

                        <div className="my-4">
                            {t("genre")}: {songResult.song_data.genres.map((genre: string) => genre).join(", ")} <br />
                            {t("danceability")}: {Math.round(songResult.audio_features.danceability * 100)}% <br />
                            {t("energy")}: {Math.round(songResult.audio_features.energy * 100)}% <br />
                            {t("valence")}: {Math.round(songResult.audio_features.valence * 100)}% <br />
                            {t("instrumental")}: {songResult.audio_features.instrumentalness != 0 ? "No" : "Yes"} <br />
                        </div>

                        {showingRelatedResults && (
                            <main className="flex flex-col items-center justify-center w-full mt-12">
                                <h1 className="text-5xl font-bold">Similar</h1>

                                {songResult.similar.length === 0 && (
                                    <div className="bg-dark-tone-3 p-8 rounded-xl my-8 w-5/12 flex flex-col items-center justify-between">
                                        <h1 className="text-lg font-bold">{t("search:results.noResults")}</h1>
                                    </div>
                                )}

                                <div className="flex items-center justify-around w-full flex-wrap">
                                    {songResult.similar.length > 0 &&
                                        songResult.similar
                                            .sort((a: any, b: any) => {
                                                return b.track_popularity - a.track_popularity;
                                            })
                                            .map((song) => {
                                                return (
                                                    <div
                                                        key={song.id}
                                                        className="bg-dark-tone-3 p-8 rounded-xl my-8 md:w-5/12 w-11/12 flex flex-col items-center justify-between"
                                                    >
                                                        <div className="flex items-center justify-between w-full">
                                                            <div className="flex flex-col items-center justify-center p-2 w-1/2 flex-1 text-center">
                                                                <h1 className="text-lg font-bold">{song.name}</h1>
                                                                <h2 className="text-lg text-gray-400">
                                                                    {song.artists
                                                                        .map((artist: any) => artist.name)
                                                                        .join(", ")}
                                                                </h2>

                                                                <Link
                                                                    className="text-primary hover:underline"
                                                                    href={`https://open.spotify.com/track/${song.id}`}
                                                                    referrerPolicy="no-referrer"
                                                                    target="_blank"
                                                                >
                                                                    {t("search:results.openTrack")}
                                                                </Link>
                                                            </div>

                                                            <div className="flex flex-col items-center justify-center p-2 w-1/2 flex-1 text-center">
                                                                <h1 className="text-lg">
                                                                    Album: {song.album.name}
                                                                </h1>
                                                                <h2 className="text-lg text-gray-400">
                                                                    {t("search:results.released")}:{" "}
                                                                    {song.album.release_date}
                                                                </h2>

                                                                <Link
                                                                    className="text-primary hover:underline"
                                                                    href={`https://open.spotify.com/album/${song.album.id}?highlight=spotify:track:${song.id}`}
                                                                    referrerPolicy="no-referrer"
                                                                    target="_blank"
                                                                >
                                                                    {t("search:results.openAlbum")}
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <p className="mt-4 text-gray-400">
                                                            {t("search:results.cat.text1")} {song.genres.map((genre) => genre).join(", ")}
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
