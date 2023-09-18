import type { NextPage } from "next";
import axios from "axios";
import Head from "next/head";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSidePropsContext } from "next";
import { namespaces } from "../utils/i18nextNS";
import { Footer } from "src/components/Footer";
import { useEffect, useState } from "react";
import { Gallery, ImageDataProps } from "src/components/Gallery";
// import { imageData } from "src/data/imageData";
import { Header } from "src/components/Header";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            throw new Error("NEXT_PUBLIC_API_URL is not defined.");
        }
        const imageData = await axios.get(apiUrl).then((res) => res.data);

        return {
            props: {
                ...(await serverSideTranslations(
                    context.locale as string,
                    namespaces
                )),

                imageData: imageData.images,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        return {
            props: {
                ...(await serverSideTranslations(
                    context.locale as string,
                    namespaces
                )),
                imageData: [],
            },
        };
    }
}

const Home: NextPage<{ imageData: ImageDataProps[] }> = ({ imageData }) => {
    const { t } = useTranslation();
    console.log(imageData, "imageData");

    const [images, setImages] = useState<ImageDataProps[]>(imageData);
    const [isLoading, setIsLoading] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    console.log(router.locale, "router.locale");

    // useEffect(() => {
    //     setIsLoading(true);

    //     axios
    //         .get("http://localhost:3000/api/images")
    //         .then((res) => {
    //             const fetchedData = res.data.images;
    //             setImages(fetchedData);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching data:", error);
    //         })
    //         .finally(() => {
    //             setTimeout(() => {
    //                 setIsLoading(false);
    //             }, 1000);
    //         });
    // }, []);

    return (
        <>
            <Head>
                <title>Image Gallery | Camomile </title>
                <meta name="description" content="Next template" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>
            <Box p={{ base: "1rem 2rem", md: "3rem 6rem" }}>
                <Flex>
                    <Header />
                    <Flex gap={1} width="100%" justifyContent="flex-end">
                        <Link href="/" locale="en">
                            <Button
                                variant="outline"
                                colorScheme={
                                    router.locale === "en" ? "teal" : "gray"
                                }
                                size="sm"
                            >
                                EN
                            </Button>
                        </Link>
                        <Link href="/" locale="de">
                            <Button
                                variant="outline"
                                colorScheme={
                                    router.locale === "de" ? "teal" : "gray"
                                }
                                size="sm"
                            >
                                DE
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
                <Box as="main">
                    <Gallery
                        images={images}
                        setImages={setImages}
                        onOpen={onOpen}
                        onClose={onClose}
                        isOpen={isOpen}
                        isLoading={isLoading}
                    />
                </Box>
                <Box mt={{ base: "4", md: "20" }}>
                    <Footer />
                </Box>
            </Box>
        </>
    );
};

export default Home;
