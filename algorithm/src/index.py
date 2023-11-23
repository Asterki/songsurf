from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd

app = Flask(__name__)
cors = CORS(app)

app.config["CORS_HEADERS"] = "Content-Type"


# Range values for each criterion
valence_range = 0.05
danceability_range = 0.1
energy_range = 0.1


class Filter:
    def __init__(self):
        self.songs = pd.read_csv(
            "https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2020/2020-01-21/spotify_songs.csv"
        )

    def filter(self, valence, danceability, energy, instrumental, genre, subgenre):
        # Filter the DataFrame based on multiple criteria
        filtered_songs = self.songs[
            # Valence
            (self.songs["valence"] >= valence - valence_range)
            & (self.songs["valence"] <= valence + valence_range)
            # Danceability
            & (self.songs["danceability"] >= danceability - danceability_range)
            & (self.songs["danceability"] <= danceability + danceability_range)
            # Energy
            & (self.songs["energy"] >= energy - energy_range)
            & (self.songs["energy"] <= energy + energy_range)
            # Instrumentalness (Inline condition, if true, will set all above 0.5, if not, below 0.5)
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


filter = Filter()


@app.route("/api/search", methods=["POST"], strict_slashes=False, endpoint="search")
@cross_origin()
def search():
    data = request.get_json()

    filtered_songs = filter.filter(
        data["valence"] / 100,
        data["danceability"] / 100,
        data["energy"] / 100,
        data["instrumental"],
        data["genre"],
        data["subgenre"],
    )

    return jsonify(filtered_songs.to_dict(orient="records"))


if __name__ == "__main__":
    app.run(debug=True)
