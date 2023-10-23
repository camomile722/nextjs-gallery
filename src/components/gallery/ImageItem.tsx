import {
    AbsoluteCenter,
    Box,
    Divider,
    Flex,
    IconButton,
    Image,
    Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Like, Liked } from "src/theme/icons";
import { ImageItemProps } from "src/types";
import { ControlItemButtons } from "../panels/ControlItemButtons";
import { CustomTooltip } from "../tooltip/CustomTooltip";

export const ImageItem = ({
    item,
    onModalOpen,
    setSelectedImage,
    deleteItem,
}: ImageItemProps) => {
    const { t } = useTranslation();
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
                <ControlItemButtons deleteItem={deleteItem} item={item} />

                <Flex top="1" right="98" position="absolute" zIndex="100">
                    <CustomTooltip
                        label={
                            isLiked
                                ? t("common:actions.dislike")
                                : t("common:actions.like")
                        }
                    >
                        <IconButton
                            aria-label={isLiked ? "Unlike Image" : "Like Image"}
                            icon={isLiked ? <Liked /> : <Like />}
                            opacity="0.7"
                            _hover={{ opacity: "1" }}
                            onClick={handleLikeToggle}
                        />
                    </CustomTooltip>
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
