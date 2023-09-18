import {
    AbsoluteCenter,
    Box,
    Divider,
    Flex,
    IconButton,
    Image,
    Link,
    Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Delete, Download, Like, Liked } from "src/theme/icons";
import { CustomTooltip } from "./CustomTooltip";
import { ImageDataProps } from "./Gallery";

export interface ImageItemProps {
    item: ImageDataProps;
    onModalOpen: () => void;
    setSelectedImage: React.Dispatch<React.SetStateAction<any>>;
    deleteItem: () => void;
}

export const ImageItem = ({
    item,
    onModalOpen,
    setSelectedImage,
    deleteItem,
}: ImageItemProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(item.likes);
    const handleLikeToggle = () => {
        if (isLiked) {
            // If already liked, unlike the image
            setIsLiked(false);
            setLikes(likes - 1);
        } else {
            // If not liked, like the image
            setIsLiked(true);
            setLikes(likes + 1);
        }
    };

    return (
        <Box>
            <Box position="relative">
                <CustomTooltip label="Delete image">
                    <Flex top="1" right="1" position="absolute" zIndex="100">
                        <IconButton
                            aria-label="delete image"
                            icon={<Delete />}
                            onClick={deleteItem}
                            opacity="0.7"
                            _hover={{ opacity: "1" }}
                        />
                    </Flex>
                </CustomTooltip>
                <CustomTooltip label="Download Image">
                    <Flex top="1" right="50" position="absolute" zIndex="100">
                        <Link download href={item.image.url}>
                            <IconButton
                                aria-label="Download Image"
                                icon={<Download />}
                                opacity="0.7"
                                _hover={{ opacity: "1" }}
                            />
                        </Link>
                    </Flex>
                </CustomTooltip>

                <Flex top="1" right="98" position="absolute" zIndex="100">
                    {isLiked ? (
                        <CustomTooltip label="Unlike Image">
                            <IconButton
                                aria-label="Unlike Image"
                                icon={<Liked />}
                                opacity="0.7"
                                _hover={{ opacity: "1" }}
                                onClick={handleLikeToggle}
                            />
                        </CustomTooltip>
                    ) : (
                        <CustomTooltip label="Like Image">
                            <IconButton
                                aria-label="Like Image"
                                icon={<Like />}
                                opacity="0.7"
                                _hover={{ opacity: "1" }}
                                onClick={handleLikeToggle}
                            />
                        </CustomTooltip>
                    )}
                </Flex>

                <Box
                    position="relative"
                    width={{ base: "100%", md: "348px" }}
                    key={item.id}
                >
                    <Image
                        src={item?.image?.url}
                        alt={item.tags}
                        objectFit="cover"
                        onClick={() => {
                            onModalOpen();
                            setSelectedImage(item);
                        }}
                        width="100%"
                        height={{ base: "100%", md: "500px" }}
                        cursor="pointer"
                        _hover={{
                            filter: "brightness(90%)",
                            overflow: "hidden",
                        }}
                    />
                    <Box
                        bg="rgba(157, 155, 155, 0.6)"
                        position="absolute"
                        bottom="1%"
                        left="8px"
                        padding="10px 15px"
                    >
                        <Text
                            color="white"
                            fontSize="sm"
                            wordBreak="break-word"
                        >
                            {item.tags}
                        </Text>
                    </Box>
                </Box>
            </Box>

            <Box position="relative" padding="4">
                <Divider />
                <AbsoluteCenter bg="white" px="4">
                    <Like /> {likes}
                </AbsoluteCenter>
            </Box>
        </Box>
    );
};
