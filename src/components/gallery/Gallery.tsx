import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    IconButton,
    Spinner,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CustomTooltip } from "../tooltip/CustomTooltip";
import { ImageItem } from "./ImageItem";
import { UploadForm } from "../form/UploadForm";
import { useTranslation } from "react-i18next";
import { GalleryProps, ImageDataProps } from "src/types";
import { ImageModal } from "../modals/ImageModal";
import Categories from "../filter/Categories";
import CustomInput from "../form/CustomInput";
import { Wrapper } from "../wrapper/Wrapper";

export const Gallery = ({
    images,
    setImages,
    onClose,
    onOpen,
    isOpen,
    isLoading,
    filterCategory,
    isFiltered,
    activeCategory,
    filteredImages,
    setFilteredImages,
    searchQuery,
    setSearchQuery,
    resetFilter,
    isSearched,
}: GalleryProps) => {
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState<ImageDataProps>();

    const {
        isOpen: isModalOpen,
        onOpen: onModalOpen,
        onClose: onCloseModal,
    } = useDisclosure();
    const deleteItem = (id: string) => {
        const updatedImages = images.filter((item) => item.id !== id);
        setImages(updatedImages);

        // If a filter is active, update filteredImages and filter them based on the active category
        if (isFiltered) {
            const updatedFilteredImages = updatedImages.filter(
                (item) => item.category === activeCategory
            );
            setFilteredImages(updatedFilteredImages);
        }
    };

    return (
        <Wrapper>
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
                        {(isFiltered || isSearched
                            ? filteredImages
                            : images
                        )?.map((item: ImageDataProps) => (
                            <ImageItem
                                key={item.id}
                                onModalOpen={onModalOpen}
                                item={item}
                                setSelectedImage={setSelectedImage}
                                deleteItem={() => deleteItem(item.id)}
                            />
                        ))}
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
            <Box width="100%">
                <UploadForm
                    images={images}
                    setImages={setImages}
                    onClose={onClose}
                    isOpen={isOpen}
                    isFiltered={isFiltered}
                    activeCategory={activeCategory}
                    filteredImages={filteredImages}
                    setFilteredImages={setFilteredImages}
                />
            </Box>
        </Wrapper>
    );
};
