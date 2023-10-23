import type { NextPage } from "next";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import { namespaces } from "../utils/i18nextNS";
import { useEffect, useState } from "react";
import { Gallery } from "src/components/gallery/Gallery";
import { useRouter } from "next/router";
import { ImageDataProps } from "src/types";
import { Layout } from "src/components/layout/Layout";

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
    const [images, setImages] = useState<ImageDataProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Layout
            metaTitle="Image Gallery | Camomile"
            metaDescription="Image Gallery with NextJS, Chakra UI"
        >
            <Gallery
                images={images}
                setImages={setImages}
                onOpen={onOpen}
                onClose={onClose}
                isOpen={isOpen}
                isLoading={isLoading}
            />
        </Layout>
    );
};

export default Home;
