import type { NextPage } from "next";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import { namespaces } from "../utils/i18nextNS";
import { useEffect, useState } from "react";
import { Gallery } from "src/components/gallery/Gallery";
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
    const [filteredImages, setFilteredImages] = useState<ImageDataProps[]>([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const [activeCategory, setActiveCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const filterCategory = (category: string) => () => {
        setIsFiltered(true);
        setFilteredImages(images.filter((item) => item.category === category));
        setActiveCategory(category);
    };
    const resetFilter = () => {
        setIsFiltered(false);
        setFilteredImages([]);
        setActiveCategory("");
    };

    useEffect(() => {
        setIsLoading(true);
        const getAllImages = () => {
            setIsLoading(true);
            setImages(imageData);
            setIsLoading(false);
        };
        getAllImages();
    }, [setImages, imageData]);

    useEffect(() => {
        let filtered = images;
        if (isFiltered) {
            if (activeCategory) {
                filtered = images.filter(
                    (item) => item.category === activeCategory
                );
            }
        }
        if (searchQuery) {
            setIsSearched(true);
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((item) =>
                item.tags?.toLowerCase().includes(query)
            );
        } else {
            setIsSearched(false);
        }
        setFilteredImages(filtered);
    }, [searchQuery, isFiltered, activeCategory, images]);

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
                isFiltered={isFiltered}
                filterCategory={filterCategory}
                activeCategory={activeCategory}
                filteredImages={filteredImages}
                setFilteredImages={setFilteredImages}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                resetFilter={resetFilter}
                isSearched={isSearched}
            />
        </Layout>
    );
};

export default Home;
