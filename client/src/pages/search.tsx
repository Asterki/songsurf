import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import axios from "axios";

import { Montserrat } from "next/font/google";

import NavbarComponent from "@/components/navbar";

const montserrat = Montserrat({ subsets: ["latin"] });

const SearchPage = () => {
    const sendRequest = async () => {
        const res = await axios.get("/api/search");
        console.log(res);
    };

    const [danceabilitySliderValue, setDanceabilitySliderValue] =
        React.useState(50);
    const [energySliderValue, setEnergySliderValue] = React.useState(50);
    const [happySliderValue, setHappySliderValue] = React.useState(50);

    const genreOptions = [];

    return (
        <div
            className={`${montserrat}  bg-gradient-to-br from-dark-tone-1 to-dark-tone-2 min-h-screen text-white`}
        >
            <NavbarComponent />

            <Head>
                <title>SongSurf | Search</title>
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 mt-12">
                <h1 className="text-5xl font-bold">Search</h1>

                <div className="w-1/2 mt-8">
                    <h1 className="text-2xl font-bold">Select a genre</h1>

                    <select className="mt-4 bg-dark-tone-3 text-white appearance-none outline-none w-full p-2 rounded-md">
                        <option value="" disabled selected>
                            Select a genre
                        </option>
                        <option value="genre1">Rock</option>
                        <option value="genre2">Genre 2</option>
                        <option value="genre3">Genre 3</option>
                    </select>
                </div>

                <div className="w-1/2 mt-8">
                    <h1 className="text-2xl font-bold">Select a subgenre</h1>

                    <select className="mt-4 bg-dark-tone-3 text-white appearance-none outline-none w-full p-2 rounded-md">
                        <option value="" disabled selected>
                            Select a subgenre
                        </option>
                        <option value="genre1">Heavy Rock</option>
                        <option value="genre2">Genre 2</option>
                        <option value="genre3">Genre 3</option>
                    </select>
                </div>

                <div className="w-1/2 mt-8">
                    <h1 className="text-2xl font-bold">
                        Song energy: {energySliderValue}%
                    </h1>

                    <input
                        type="range"
                        min="1"
                        max="100"
                        defaultValue={energySliderValue}
                        onChange={(event) => {
                            setEnergySliderValue(
                                parseInt(event.target.value, 10) || 0
                            );
                        }}
                        id="slider"
                        className="mt-4 appearance-none w-full h-2 rounded-md bg-dark-tone-3 outline-none"
                        style={{
                            backgroundImage: `linear-gradient(to right, #1DB954 0%, #1DB954 ${
                                (energySliderValue / 100) * 100
                            }%, #121212 ${
                                (energySliderValue / 100) * 100
                            }%, #121212 100%)`,
                        }}
                    />
                </div>

                <div className="w-1/2 mt-8">
                    <h1 className="text-2xl font-bold">
                        Song Danceability: {danceabilitySliderValue}%
                    </h1>

                    <input
                        type="range"
                        min="1"
                        max="100"
                        defaultValue={danceabilitySliderValue}
                        onChange={(event) => {
                            setDanceabilitySliderValue(
                                parseInt(event.target.value, 10) || 0
                            );
                        }}
                        id="slider"
                        className="mt-4 appearance-none w-full h-2 rounded-md bg-dark-tone-3 outline-none"
                        style={{
                            backgroundImage: `linear-gradient(to right, #1DB954 0%, #1DB954 ${
                                (danceabilitySliderValue / 100) * 100
                            }%, #121212 ${
                                (danceabilitySliderValue / 100) * 100
                            }%, #121212 100%)`,
                        }}
                    />
                </div>

                <div className="w-1/2 mt-8">
                    <h1 className="text-2xl font-bold">
                        Song Happiness: {happySliderValue}%
                    </h1>

                    <input
                        type="range"
                        min="1"
                        max="100"
                        defaultValue={danceabilitySliderValue}
                        onChange={(event) => {
                            setHappySliderValue(
                                parseInt(event.target.value, 10) || 0
                            );
                        }}
                        id="slider"
                        className="mt-4 appearance-none w-full h-2 rounded-md bg-dark-tone-3 outline-none"
                        style={{
                            backgroundImage: `linear-gradient(to right, #1DB954 0%, #1DB954 ${
                                (happySliderValue / 100) * 100
                            }%, #121212 ${
                                (happySliderValue / 100) * 100
                            }%, #121212 100%)`,
                        }}
                    />
                </div>

                <div className="w-1/2 mt-8">
                    <h1 className="text-2xl font-bold">Instrumental:</h1>

                    <select className="mt-4 bg-dark-tone-3 text-white appearance-none outline-none w-full p-2 rounded-md">
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
        </div>
    );
};

export default SearchPage;
