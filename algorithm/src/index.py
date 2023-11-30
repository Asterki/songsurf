from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd
import os
from pathlib import Path
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

env_path = Path(".", ".env")
load_dotenv(dotenv_path=env_path)

# Create the API endpoint
app = Flask(__name__)
cors = CORS(app)


# Load the song database
try:
    songs = pd.read_csv(
        "https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2020/2020-01-21/spotify_songs.csv"
    )
except Exception as e:
    print(f"Error loading data: {e}")
    songs = pd.DataFrame()


# Authentication - without user
client_credentials_manager = SpotifyClientCredentials(
    client_id=os.getenv("CLIENT_ID"), client_secret=os.getenv("CLIENT_SECRET")
)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


class SongFilter:
    def __init__(self, valence_range, danceability_range, energy_range, songs):
        self.songs = songs
        self.valence_range = valence_range
        self.danceability_range = danceability_range
        self.energy_range = energy_range

    def filter(self, valence, danceability, energy, instrumental, genre, subgenre):
        # Filter the DataFrame based on multiple criteria
        filtered_songs = self.songs[
            # Valence
            (self.songs["valence"] >= valence - self.valence_range)
            & (self.songs["valence"] <= valence + self.valence_range)
            # Danceability
            & (self.songs["danceability"] >= danceability - self.danceability_range)
            & (self.songs["danceability"] <= danceability + self.danceability_range)
            # Energy
            & (self.songs["energy"] >= energy - self.energy_range)
            & (self.songs["energy"] <= energy + self.energy_range)
            & (
                self.songs["instrumentalness"] == 0
                if instrumental
                else self.songs["instrumentalness"] > 0
            )
            & (self.songs["playlist_genre"] == genre if genre != "other" else True)
            & (
                self.songs["playlist_subgenre"] == subgenre
                if subgenre != "other"
                else True
            )
        ]

        return filtered_songs


song_filter = SongFilter(
    valence_range=0.1, danceability_range=0.1, energy_range=0.1, songs=songs
)


def get_song_info(song_name):
    try:
        result = sp.search(song_name, limit=1, type="track")["tracks"]["items"][0]
        if not result:
            return None

        result["genres"] = sp.artist(result["artists"][0]["id"])["genres"]
        audio_features = sp.audio_features(result["id"])[0]

        return result, audio_features
    except Exception as e:
        print(f"Error getting song info: {e}")
        return None


def get_similar_songs(song_id, artist_id):
    try:
        similar = []
        for track in sp.recommendations(seed_tracks=[song_id], limit=30)["tracks"]:
            if track["artists"][0]["id"] != artist_id:
                track["genre"] = sp.artist(track["artists"][0]["id"])["genres"]
                similar.append(track)

        return similar
    except Exception as e:
        print(f"Error getting similar songs: {e}")
        return []


# API Endpoints
@app.route("/api/search", methods=["POST"], strict_slashes=False, endpoint="search")
@cross_origin()
def search():
    # Check the request values
    data = request.get_json(force=True)
    if not data:
        return jsonify({"error": "Empty request"}), 400

    required_keys = [
        "valence",
        "danceability",
        "energy",
        "instrumental",
        "genre",
        "subgenre",
    ]
    if not all(key in data for key in required_keys):
        return jsonify({"error": "Missing required key(s) in request"}), 400

    filter_params = {
        "valence": data["valence"] / 100,
        "danceability": data["danceability"] / 100,
        "energy": data["energy"] / 100,
        "instrumental": data["instrumental"],
        "genre": data["genre"],
        "subgenre": data["subgenre"],
    }

    print(filter_params)

    # Get the songs and return them
    filtered_songs = song_filter.filter(**filter_params)
    filtered_songs = filtered_songs[:100]

    return jsonify(filtered_songs.to_dict(orient="records"))


@app.route(
    "/api/get-song-info", methods=["POST"], strict_slashes=False, endpoint="song_info"
)
@cross_origin()
def song_info():
    data = request.get_json(force=True)
    if not data:
        return False, jsonify({"error": "Empty request"}), 400

    required_keys = ["song_name"]
    if not all(key in data for key in required_keys):
        return False, jsonify({"error": "Missing required key(s) in request"}), 400

    song_name = data["song_name"]
    song_data, audio_features = get_song_info(song_name)
    if not song_data:
        return jsonify({})

    similar_songs = get_similar_songs(song_data["id"], song_data["artists"][0]["id"])
    for song in similar_songs:
        song["genres"] = sp.artist(song["artists"][0]["id"])["genres"]

    return jsonify(
        {
            "song_data": {
                "name": song_data.get("name", ""),
                "album": {
                    "images": [
                        {"url": img.get("url", "")}
                        for img in song_data.get("album", {}).get("images", [])
                    ]
                },
                "artists": [
                    {"name": artist.get("name", "")}
                    for artist in song_data.get("artists", [])
                ],
                "genres": song_data.get("genres", []),
            },
            "audio_features": {
                "danceability": audio_features.get("danceability", 0),
                "energy": audio_features.get("energy", 0),
                "valence": audio_features.get("valence", 0),
                "instrumentalness": audio_features.get("instrumentalness", 0),
            },
            "similar": [
                {
                    "id": song["id"],
                    "name": song["name"],
                    "album": {
                        "images": [
                            {"url": img.get("url", "")}
                            for img in song.get("album", {}).get("images", [])
                        ],
                        "id": song.get("album", {}).get("id", ""),
                        "name": song.get("album", {}).get("name", ""),
                        "release_date": song.get("album", {}).get("release_date", ""),
                    },
                    "artists": [
                        {"name": artist.get("name", "")}
                        for artist in song.get("artists", [])
                    ],
                    "genres": song.get("genres", []),
                    
                }
                for song in similar_songs
            ],
        }
    )


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)
