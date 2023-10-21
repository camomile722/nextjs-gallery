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
    const [images, setImages] = useState<ImageDataProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        const getAllImages = () => {
            setIsLoading(true);
            setImages(imageData);
            setIsLoading(false);
        };
        getAllImages();
    }, []);

    return (
        <>
            <Head>
                <title>Image Gallery | Camomile </title>
                <meta name="description" content="Next template" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>
            <Box p={{ base: "1rem 2rem", md: "3rem 6rem" }}>
                <Flex as="header" maxW="1220px" m="0 auto">
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
