import "@/styles/globals.css";

import { appWithTranslation } from "next-i18next";

import Head from "next/head";

const App = ({ Component, pageProps: { session, ...pageProps } }: any) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
            </Head>

            <Component {...pageProps} />
        </>
    );
};

export default appWithTranslation(App);
