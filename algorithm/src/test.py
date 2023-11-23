import pandas as pd

# Fetch the data from a remote source
songs = pd.read_csv(
    "https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2020/2020-01-21/spotify_songs.csv"
)

# User-specified values
user_valence = float(input("Valence: "))
user_danceability = float(input("Danceability: "))
user_energy = float(input("Energy: "))

# Range values for each criterion
valence_range = 0.05
danceability_range = 0.1
energy_range = 0.1

# Filter the DataFrame based on multiple criteria
filtered_songs = songs[
    (songs["valence"] >= user_valence - valence_range)
    & (songs["valence"] <= user_valence + valence_range)
    & (songs["danceability"] >= user_danceability - danceability_range)
    & (songs["danceability"] <= user_danceability + danceability_range)
    & (songs["energy"] >= user_energy - energy_range)
    & (songs["energy"] <= user_energy + energy_range)
    & (songs["playlist_genre"] == "rock")
    & (songs["playlist_subgenre"] == "hard rock")
]

print(filtered_songs)