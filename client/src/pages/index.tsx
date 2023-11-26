import * as React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Link from "next/link";
import Head from "next/head";
import NavbarComponent from "@/components/navbar";

import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

import type { GetStaticProps, InferGetStaticPropsType } from "next";

interface PageProps {}

const Home = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { t } = useTranslation(["index", "components/navbar"]);

    return (
        <div className={`${montserrat} bg-gradient-to-br from-dark-tone-1 to-dark-tone-2 min-h-screen text-white`}>
            <NavbarComponent t={t} />

            <Head>
                <title>{t("index:pageTitle")}</title>
            </Head>

            <header className="text-center p-16">
                <h1 className="text-[60px] font-bold">{t("index:pageTitle")}</h1>
                <p>{t("index:pageDesc")}</p>
            </header>

            <main className="text-center">
                <div className="flex flex-col items-center w-full justify-center gap-2">
                    <Link
                        href={`/${router.locale}/by-features`}
                        className="w-1/2 py-4 px-8 rounded-2xl bg-primary transition-all text-white font-bold text-[20px]"
                    >
                        {t("index:byFeatures")}
                    </Link>

                    <Link
                        href={`/${router.locale}/by-song`}
                        className="w-1/2 py-4 px-8 rounded-2xl bg-primary transition-all text-white font-bold text-[20px]"
                    >
                        {t("index:bySong")}
                    </Link>
                </div>

                <section className="text-center p-16">
                    <h2 className="text-[40px] font-bold">{t("index:sections.howWorks.title")}</h2>
                    <p>{t("index:sections.howWorks.text1")}</p>
                    <p>{t("index:sections.howWorks.text2")}</p>
                    <p>{t("index:sections.howWorks.text3")}</p>
                </section>

                <section className="text-center p-16">
                    <h2 className="text-[40px] font-bold">{t("index:sections.howToUse.title")}</h2>
                    <p>{t("index:sections.howToUse.text1")}</p>
                    <p>{t("index:sections.howToUse.text2")}</p>
                    <p>{t("index:sections.howToUse.text3")}</p>
                </section>

                <section className="text-center p-16">
                    <h2 className="text-[40px] font-bold">{t("index:sections.privacy.title")}</h2>
                    <p>{t("index:sections.privacy.text1")}</p>
                    <p>{t("index:sections.privacy.text2")}</p>
                    <p>{t("index:sections.privacy.text3")}</p>
                </section>

                <section className="text-center p-16">
                    <h2 className="text-[40px] font-bold">{t("index:sections.openSource.title")}</h2>
                    <p>
                        {t("index:sections.openSource.text1")}{" "}
                        <a
                            target="_blank"
                            referrerPolicy="no-referrer"
                            href="https://github.com/Asterki/flashet"
                            className="text-primary hover:underline"
                        >
                            {t("index:sections.openSource.text2")}
                        </a>
                    </p>
                </section>
            </main>
        </div>
    );
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? "en", ["index", "components/navbar"])),
    },
});

export default Home;
