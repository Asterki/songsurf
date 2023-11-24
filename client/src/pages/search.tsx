import * as React from "react";
import axios from "axios";

import Head from "next/head";
import Link from "next/link";
import NavbarComponent from "@/components/navbar";

import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

const SearchPage = () => {
    const genreOptions = ["edm", "latin", "pop", "rock", "rap", "r&b"];
    const subGenreOptions = {
        edm: ["big room", "electro house", "progressive electro house", "pop edm"],
        latin: ["latin hip hop", "latin pop", "reggaeton", "tropical"],
        pop: ["dance pop", "electropop", "indie poptimism", "post-teen pop"],
        rock: ["album rock", "classic rock", "hard rock", "permanent wave"],
        rap: ["gangster rap", "hip hop", "southern hip hop", "trap"],
        "r&b": ["hip hop", "neo soul", "new jack swing", "urban contemporary"],
    };

    // Types for the forms
    type GenreOptions = "edm" | "latin" | "pop" | "rock" | "rap" | "r&b";
    type SubGenreOptions = string;

    // Values for the forms
    const [selectedGenre, setSelectedGenre] = React.useState<GenreOptions>("edm");
    const [selectedSubGenre, setSelectedSubGenre] = React.useState<SubGenreOptions>("electro house");
    const [danceabilitySliderValue, setDanceabilitySliderValue] = React.useState(50);
    const [energySliderValue, setEnergySliderValue] = React.useState(50);
    const [happySliderValue, setHappySliderValue] = React.useState(50);
    const [instrumental, setInstrumental] = React.useState(false);

    // Results
    const [songResults, setSongsResults] = React.useState([]);
    const [showingResults, setShowingResults] = React.useState(false);

    const sendRequest = async () => {
        try {
            const res = await axios({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_ALGORITHM_URL}/api/search`,

                data: {
                    genre: selectedGenre,
                    subgenre: selectedSubGenre,
                    danceability: danceabilitySliderValue,
                    energy: energySliderValue,
                    valence: happySliderValue,
                    instrumental: instrumental,
                },
            });

            setShowingResults(true);
            setSongsResults(res.data);
        } catch (err) {
            alert("An error occurred while searching for songs");
            console.log(err);
        }
    };

    return (
        <div className={`${montserrat}  bg-gradient-to-br from-dark-tone-1 to-dark-tone-2 min-h-screen text-white`}>
            <NavbarComponent />

            <Head>
                <title>SongSurf | Search</title>
            </Head>

            {showingResults && (
                <main className="flex flex-col items-center justify-center w-full mt-12">
                    <h1 className="text-5xl font-bold">Results</h1>

                    {songResults.length === 0 && (
                        <div className="bg-dark-tone-3 p-8 rounded-xl my-8 w-5/12 flex flex-col items-center justify-between">
                            <h1 className="text-lg font-bold">No results found</h1>
                        </div>
                    )}

                    <button
                        className="my-16 bg-primary text-white appearance-none outline-none w-1/2 p-2 rounded-2xl"
                        onClick={() => {
                            setShowingResults(false);
                        }}
                    >
                        Search Again
                    </button>

                    <div className="flex items-center justify-around w-full flex-wrap">
                        {songResults.length > 0 &&
                            songResults.map((song: any) => {
                                return (
                                    <div
                                        key={song.track_id}
                                        className="bg-dark-tone-3 p-8 rounded-xl my-8 w-5/12 flex flex-col items-center justify-between"
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex flex-col items-center justify-center p-2 w-1/2 flex-1">
                                                <h1 className="text-lg font-bold">{song.track_name}</h1>
                                                <h2 className="text-lg text-gray-400">{song.track_artist}</h2>

                                                <Link
                                                    className="text-primary hover:underline"
                                                    href={`https://open.spotify.com/track/${song.track_id}`}
                                                    referrerPolicy="no-referrer"
                                                    target="_blank"
                                                >
                                                    Open Track
                                                </Link>
                                            </div>

                                            <div className="flex flex-col items-center justify-center p-2 w-1/2 flex-1">
                                                <h1 className="text-lg">Album: {song.track_album_name}</h1>
                                                <h2 className="text-lg text-gray-400">
                                                    Released: {song.track_album_release_date}
                                                </h2>

                                                <Link
                                                    className="text-primary hover:underline"
                                                    href={`https://open.spotify.com/album/${song.track_album_id}`}
                                                    referrerPolicy="no-referrer"
                                                    target="_blank"
                                                >
                                                    Open Albumn
                                                </Link>
                                            </div>
                                        </div>

                                        <p className="mt-4 text-gray-400">
                                            This song is categorized as {song.playlist_subgenre}, subgenre of{" "}
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

            {!showingResults && (
                <main className="flex flex-col items-center justify-center w-full flex-1 mt-12">
                    <h1 className="text-5xl font-bold">Search</h1>

                    <div className="w-1/2 mt-8">
                        <h1 className="text-2xl">Select a genre</h1>

                        <select
                            onChange={(event) => {
                                setSelectedGenre(event.target.value as GenreOptions);
                            }}
                            className="mt-4 bg-dark-tone-3 text-white appearance-none outline-none w-full p-2 rounded-md"
                        >
                            <option value="" disabled selected>
                                Select a genre
                            </option>
                            {genreOptions.map((genre) => (
                                <option value={genre} key={genre}>
                                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-1/2 mt-8">
                        <h1 className="text-2xl">Select a subgenre</h1>

                        <select
                            onChange={(event) => {
                                setSelectedSubGenre(event.target.value);
                            }}
                            className="mt-4 bg-dark-tone-3 text-white appearance-none outline-none w-full p-2 rounded-md"
                        >
                            <option value="" disabled selected>
                                Select a subgenre
                            </option>
                            {subGenreOptions[selectedGenre].map((subgenre) => (
                                <option value={subgenre} key={subgenre}>
                                    {subgenre.charAt(0).toUpperCase() + subgenre.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-1/2 mt-8">
                        <h1 className="text-2xl">Song energy: {energySliderValue}%</h1>

                        <input
                            type="range"
                            min="1"
                            max="100"
                            defaultValue={energySliderValue}
                            onChange={(event) => {
                                setEnergySliderValue(parseInt(event.target.value, 10) || 0);
                            }}
                            id="slider"
                            className="mt-4 appearance-none w-full h-2 rounded-md bg-dark-tone-3 outline-none"
                            style={{
                                backgroundImage: `linear-gradient(to right, #1DB954 0%, #1DB954 ${
                                    (energySliderValue / 100) * 100
                                }%, #121212 ${(energySliderValue / 100) * 100}%, #121212 100%)`,
                            }}
                        />
                    </div>

                    <div className="w-1/2 mt-8">
                        <h1 className="text-2xl">Song Danceability: {danceabilitySliderValue}%</h1>

                        <input
                            type="range"
                            min="1"
                            max="100"
                            defaultValue={danceabilitySliderValue}
                            onChange={(event) => {
                                setDanceabilitySliderValue(parseInt(event.target.value, 10) || 0);
                            }}
                            id="slider"
                            className="mt-4 appearance-none w-full h-2 rounded-md bg-dark-tone-3 outline-none"
                            style={{
                                backgroundImage: `linear-gradient(to right, #1DB954 0%, #1DB954 ${
                                    (danceabilitySliderValue / 100) * 100
                                }%, #121212 ${(danceabilitySliderValue / 100) * 100}%, #121212 100%)`,
                            }}
                        />
                    </div>

                    <div className="w-1/2 mt-8">
                        <h1 className="text-2xl">Song Happiness: {happySliderValue}%</h1>

                        <input
                            type="range"
                            min="1"
                            max="100"
                            defaultValue={happySliderValue}
                            onChange={(event) => {
                                setHappySliderValue(parseInt(event.target.value, 10) || 0);
                            }}
                            id="slider"
                            className="mt-4 appearance-none w-full h-2 rounded-md bg-dark-tone-3 outline-none"
                            style={{
                                backgroundImage: `linear-gradient(to right, #1DB954 0%, #1DB954 ${
                                    (happySliderValue / 100) * 100
                                }%, #121212 ${(happySliderValue / 100) * 100}%, #121212 100%)`,
                            }}
                        />
                    </div>

                    <div className="w-1/2 mt-8">
                        <h1 className="text-2xl">Instrumental:</h1>

                        <select
                            onChange={(event) => {
                                setInstrumental(event.target.value === "Yes");
                            }}
                            className="mt-4 bg-dark-tone-3 text-white appearance-none outline-none w-full p-2 rounded-md"
                        >
                            <option value="" disabled selected>
                                Select an option
                            </option>
                            <option value="genre1">Yes</option>
                            <option value="genre2">No</option>
                        </select>
                    </div>

                    <button
                        className="my-16 bg-primary text-white appearance-none outline-none w-1/2 p-2 rounded-2xl"
                        onClick={sendRequest}
                    >
                        Search
                    </button>
                </main>
            )}
        </div>
    );
};

export default SearchPage;
