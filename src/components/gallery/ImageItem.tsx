import { AbsoluteCenter, Box, Divider, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Like } from "src/theme/icons";
import { ImageItemProps } from "src/types";
import { ControlItemButtons } from "../panels/ControlItemButtons";

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
                {/* Control buttons: like, download, delete */}
                <ControlItemButtons
                    deleteItem={deleteItem}
                    item={item}
                    isLiked={isLiked}
                    handleLikeToggle={handleLikeToggle}
                />

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
