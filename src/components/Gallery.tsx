import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    Icon,
    IconButton,
    Image,
    Input,
    ListItem,
    Modal,
    ModalContent,
    ModalOverlay,
    Spinner,
    Text,
    UnorderedList,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "src/theme/icons";
import { CustomTooltip } from "./CustomTooltip";
import { ImageItem } from "./ImageItem";

import { UploadForm } from "./UploadForm";
import { useTranslation } from "react-i18next";
export interface ImageDataProps {
    id: string;
    image: {
        name: string;
        url: string;
    };
    tags: string;
    category: string;
    likes: number;
}
export interface GalleryProps {
    images: ImageDataProps[];
    setImages: React.Dispatch<React.SetStateAction<ImageDataProps[]>>;
    onOpen: () => void;
    onClose: () => void;
    isOpen: boolean;
    isLoading: boolean;
}
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

    const {
        isOpen: isModalOpen,
        onOpen: onModalOpen,
        onClose: onCloseModal,
    } = useDisclosure();

    const nextImage = () => {
        if (selectedImage && images.length > 0 && isFiltered === false) {
            const currentIndex = images.indexOf(selectedImage);
            const nextIndex = currentIndex + 1;

            if (nextIndex >= images.length) {
                return setSelectedImage(images[0]);
            }

            setSelectedImage(images[nextIndex]);
        } else if (
            selectedImage &&
            filteredImages.length > 0 &&
            isFiltered === true
        ) {
            const currentIndex = filteredImages.indexOf(selectedImage);
            const nextIndex = currentIndex + 1;

            if (nextIndex >= filteredImages.length) {
                return setSelectedImage(filteredImages[0]);
            }

            setSelectedImage(filteredImages[nextIndex]);
        }
    };
    const prevImage = () => {
        if (selectedImage && images.length > 0 && isFiltered === false) {
            const currentIndex = images.indexOf(selectedImage);
            const prevIndex = currentIndex - 1;

            if (prevIndex < 0) {
                return setSelectedImage(images[images.length - 1]);
            }

            setSelectedImage(images[prevIndex]);
        } else if (
            selectedImage &&
            filteredImages.length > 0 &&
            isFiltered === true
        ) {
            const currentIndex = filteredImages.indexOf(selectedImage);
            const prevIndex = currentIndex - 1;

            if (prevIndex < 0) {
                return setSelectedImage(
                    filteredImages[filteredImages.length - 1]
                );
            }

            setSelectedImage(filteredImages[prevIndex]);
        }
    };

    const deleteItem = (id: string) => {
        const filteredImages = images.filter((item) => item.id !== id);
        setImages(filteredImages);
    };
    const filterCategory = (category: string) => () => {
        setIsFiltered(true);
        setFilteredImages(images.filter((item) => item.category === category));
    };
    const resetFilter = () => {
        setIsFiltered(false);
        setFilteredImages([]);
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
                        onOpen={onOpen}
                        isOpen={isOpen}
                    />
                </Box>
                <Box as="nav" overflowX="auto" scrollBehavior="smooth">
                    <UnorderedList
                        display="flex"
                        styleType="none"
                        gap={4}
                        color="gray.600"
                        flexWrap="nowrap"
                        minWidth="100%"
                        marginInlineStart="0"
                        mb={2}
                    >
                        <Button onClick={filterCategory("people")} minW="auto">
                            <ListItem>{t("common:categories.people")}</ListItem>
                        </Button>
                        <Button onClick={filterCategory("fruits")} minW="auto">
                            <ListItem>{t("common:categories.fruits")}</ListItem>
                        </Button>
                        <Button onClick={filterCategory("mug")} minW="auto">
                            <ListItem>{t("common:categories.mug")}</ListItem>
                        </Button>
                        <Button onClick={filterCategory("other")} minW="auto">
                            <ListItem>{t("common:categories.other")}</ListItem>
                        </Button>
                        <Button onClick={resetFilter} minW="auto">
                            <ListItem>
                                {t("common:categories.showAll")}
                            </ListItem>
                        </Button>
                    </UnorderedList>
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
                    <Input
                        type="text"
                        placeholder={t("common:search")}
                        width={{ base: "100%", md: "100%" }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        _focus={{
                            borderColor: "gray.300",
                            boxShadow: "sm",
                            borderWidth: "2px",
                        }}
                    />
                </Flex>

                {/* Spinner */}
                {images.length === 0 && (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100vh"
                    >
                        <Text>No images found</Text>
                    </Box>
                )}
                {isLoading ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Spinner size="xl" />
                    </Box>
                ) : (
                    <Flex
                        justifyContent={{ base: "center", md: "space-betwwen" }}
                        flexWrap="wrap"
                        gap={3}
                        mt={{ base: "4", md: "8" }}
                    >
                        {isFiltered
                            ? filteredImages.map((item: ImageDataProps) => (
                                  <ImageItem
                                      key={item.id}
                                      onModalOpen={onModalOpen}
                                      item={item}
                                      setSelectedImage={setSelectedImage}
                                      deleteItem={() => deleteItem(item.id)}
                                  />
                              ))
                            : images.map((item: ImageDataProps) => (
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
            <Modal isOpen={isModalOpen} onClose={onCloseModal} size="xl">
                <ModalOverlay />
                <ModalContent>
                    {selectedImage && (
                        <Box>
                            <Image
                                src={selectedImage?.image?.url}
                                alt={selectedImage?.image?.name}
                            />
                            <Box
                                bg="rgba(157, 155, 155, 0.6)"
                                position="absolute"
                                bottom="1%"
                                left="8px"
                                padding="10px 15px"
                            >
                                <Text color="white" fontSize="sm">
                                    {selectedImage?.tags}
                                </Text>
                            </Box>
                            <IconButton
                                position="absolute"
                                top="50%"
                                left="8px"
                                bg="white"
                                onClick={prevImage}
                                aria-label="Close modal"
                                icon={<Icon as={ArrowLeft} boxSize="10" />}
                            />
                            <IconButton
                                position="absolute"
                                top="50%"
                                right="8px"
                                bg="white"
                                onClick={nextImage}
                                aria-label="Close modal"
                                icon={<Icon as={ArrowRight} boxSize="10" />}
                            />
                        </Box>
                    )}
                </ModalContent>
            </Modal>
        </Box>
    );
};
