import {
    Box,
    Image,
    Modal,
    ModalContent,
    ModalOverlay,
    Text,
    IconButton,
    Icon,
} from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "src/theme/icons";
import { ImageModalProps } from "src/types";

export const ImageModal = ({
    isOpen,
    onClose,
    selectedImage,
    setSelectedImage,
    isFiltered,
    images,
    filteredImages,
}: ImageModalProps) => {
    const imagesData = isFiltered ? filteredImages : images;
    const currentIndex =
        selectedImage && imagesData.length > 0
            ? imagesData.indexOf(selectedImage)
            : 0;

    const nextImage = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= imagesData.length) {
            return setSelectedImage(imagesData[0]);
        }
        setSelectedImage(imagesData[nextIndex]);
    };

    const prevImage = () => {
        const prevIndex = currentIndex - 1;

        if (prevIndex < 0) {
            return setSelectedImage(imagesData[imagesData.length - 1]);
        }
        setSelectedImage(imagesData[prevIndex]);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
    );
};
