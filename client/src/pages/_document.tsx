import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="application-name" content="songsurf" />
                <meta
                    name="description"
                    content="SongSurf is a music recommendation app designed to ride the waves of your musical preferences. Dive into a sea of personalized playlists and discover a harmonious journey through your favorite genres and artists."
                />
                <meta name="format-detection" content="telephone=no" />
                <meta name="msapplication-TileColor" content="#27363B" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="theme-color" content="#000000" />

                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="shortcut icon" href="/favicon.ico" />

                <meta name="title" content="SongSurf" />
                <meta
                    name="description"
                    content="SongSurf is a music recommendation app designed to ride the waves of your musical preferences. Dive into a sea of personalized playlists and discover a harmonious journey through your favorite genres and artists."
                />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://songsurf.vercel.app/" />
                <meta property="og:title" content="SongSurf" />
                <meta
                    property="og:description"
                    content="SongSurf is a music recommendation app designed to ride the waves of your musical preferences. Dive into a sea of personalized playlists and discover a harmonious journey through your favorite genres and artists."
                />
                <meta property="og:image" content="https://i.imgur.com/TlubhwN.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://songsurf.vercel.app/" />
                <meta property="twitter:title" content="SongSurf" />
                <meta
                    property="twitter:description"
                    content="SongSurf is a music recommendation app designed to ride the waves of your musical preferences. Dive into a sea of personalized playlists and discover a harmonious journey through your favorite genres and artists."
                />
                <meta property="twitter:image" content="https://i.imgur.com/TlubhwN.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
