export interface SongInfo {
    song_data: {
        name: string;
        album: {
            images: { url: string }[];
        };
        artists: { name: string }[];
        genres: string[];
    };
    audio_features: {
        danceability: number;
        energy: number;
        instrumentalness: number;
        valence: number;
    };
    similar: {
        id: string;
        name: string;
        album: {
            images: { url: string }[];
            id: string;
            name: string;
            release_date: string;
        };
        artists: { name: string }[];
        genres: string[];
    }[];
}
