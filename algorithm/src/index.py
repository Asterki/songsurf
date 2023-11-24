from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd

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
            # Instrumentalness
            & (
                self.songs["instrumentalness"] > 0
                if instrumental
                else self.songs["instrumentalness"] == 0
            )
            # Genre
            & (self.songs["playlist_genre"] == genre)
            & (self.songs["playlist_subgenre"] == subgenre)
        ]

        return filtered_songs


song_filter = SongFilter(valence_range=0.1, danceability_range=0.1, energy_range=0.1, songs=songs)


@app.route("/api/search", methods=["POST"], strict_slashes=False, endpoint="search")
@cross_origin()
def search():
    # Check the request values
    data = request.get_json(force=True)
    if not data:
        return jsonify({"error": "Empty request"}), 400

    required_keys = ["valence", "danceability", "energy", "instrumental", "genre", "subgenre"]
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

    # Get the songs and return them
    filtered_songs = song_filter.filter(**filter_params)
    return jsonify(filtered_songs.to_dict(orient="records"))


if __name__ == "__main__":
    app.run(debug=True)