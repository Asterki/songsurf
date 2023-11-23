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

                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                    type="image/x-icon"
                />
                <link rel="shortcut icon" href="/favicon.ico" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content="https://songsurf.com" />
                <meta name="twitter:title" content="songsurf" />
                <meta
                    name="twitter:description"
                    content="SongSurf is a music recommendation app designed to ride the waves of your musical preferences. Dive into a sea of personalized playlists and discover a harmonious journey through your favorite genres and artists."
                />
                <meta
                    name="twitter:image"
                    content="https://songsurf.com/logos/android/android-launchericon-192-192.png"
                />
                <meta name="twitter:creator" content="@AsterkiDev" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="songsurf" />
                <meta
                    property="og:description"
                    content="SongSurf is a music recommendation app designed to ride the waves of your musical preferences. Dive into a sea of personalized playlists and discover a harmonious journey through your favorite genres and artists."
                />
                <meta property="og:site_name" content="songsurf" />
                <meta property="og:url" content="https://songsurf.com" />
                <meta
                    property="og:image"
                    content="https://songsurf.com/logos/ios/512.png"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
