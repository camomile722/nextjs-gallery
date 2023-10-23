import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    IconButton,
    Spinner,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CustomTooltip } from "../tooltip/CustomTooltip";
import { ImageItem } from "./ImageItem";
import { UploadForm } from "../form/UploadForm";
import { useTranslation } from "react-i18next";
import { GalleryProps, ImageDataProps } from "src/types";
import { ImageModal } from "../modals/ImageModal";
import Categories from "../filter/Categories";
import CustomInput from "../form/CustomInput";

export const Gallery = ({
    images,
    setImages,
    onClose,
    onOpen,
    isOpen,
    isLoading,
}: GalleryProps) => {
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState<ImageDataProps>();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredImages, setFilteredImages] = useState<ImageDataProps[]>([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [activeCategory, setActiveCategory] = useState("");

    const {
        isOpen: isModalOpen,
        onOpen: onModalOpen,
        onClose: onCloseModal,
    } = useDisclosure();

    const deleteItem = (id: string) => {
        const filteredImages = images.filter((item) => item.id !== id);
        setImages(filteredImages);
    };
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
        if (searchQuery) {
            setIsFiltered(true);
            setFilteredImages(
                images.filter((item) =>
                    item.tags?.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setIsFiltered(false);
        }
    }, [searchQuery]);

    return (
        <Box maxW="1220px" margin="0 auto">
            <Flex flexDir="column">
                <Text
                    as="h1"
                    py={{ base: "10", md: "10" }}
                    fontSize={{ base: "3xl", md: "5xl" }}
                    fontWeight="500"
                    textAlign="center"
                >
                    Inspiration Gallery
                </Text>

                <Box width="100%">
                    <UploadForm
                        images={images}
                        setImages={setImages}
                        onClose={onClose}
                        isOpen={isOpen}
                    />
                </Box>
                <Box as="nav" overflowX="auto" scrollBehavior="smooth">
                    <Categories
                        filterCategory={filterCategory}
                        resetFilter={resetFilter}
                        activeCategory={activeCategory}
                    />
                </Box>
                <Flex
                    justifyContent="flex-start"
                    width="100%"
                    gap={2}
                    mt={{ base: "6", md: "8" }}
                >
                    {/* Add image button */}
                    <CustomTooltip label={t("common:actions.add")}>
                        <IconButton
                            colorScheme={"gray"}
                            icon={<AddIcon boxSize={4} />}
                            aria-label="Add new image"
                            onClick={onOpen}
                        />
                    </CustomTooltip>
                    {/* Search input field */}
                    <CustomInput
                        placeholder={t("common:search")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Flex>

                {/* Spinner */}

                {isLoading ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        my={6}
                    >
                        <Spinner size="xl" />
                    </Box>
                ) : images?.length === 0 && !isLoading ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100vh"
                    >
                        <Text>No images found</Text>
                    </Box>
                ) : (
                    <Flex
                        justifyContent={{ base: "center", md: "space-betwwen" }}
                        flexWrap="wrap"
                        gap={3}
                        mt={{ base: "4", md: "8" }}
                    >
                        {(isFiltered ? filteredImages : images)?.map(
                            (item: ImageDataProps) => (
                                <ImageItem
                                    key={item.id}
                                    onModalOpen={onModalOpen}
                                    item={item}
                                    setSelectedImage={setSelectedImage}
                                    deleteItem={() => deleteItem(item.id)}
                                />
                            )
                        )}
                    </Flex>
                )}
            </Flex>
            <ImageModal
                isOpen={isModalOpen}
                onClose={onCloseModal}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                isFiltered={isFiltered}
                images={images}
                filteredImages={filteredImages}
            />
        </Box>
    );
};
