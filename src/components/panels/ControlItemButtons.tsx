import { Box, IconButton, Link } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Delete, Download, Like, Liked } from "src/theme/icons";
import { ControlItemButtonsProps } from "src/types";
import { CustomTooltip } from "../tooltip/CustomTooltip";

export const ControlItemButtons = ({
    deleteItem,
    item,
    isLiked,
    handleLikeToggle,
}: ControlItemButtonsProps) => {
    const { t } = useTranslation();
    return (
        <>
            <CustomTooltip label={t("common:actions.delete")}>
                <Box top="1" right="1" position="absolute" zIndex="100">
                    <IconButton
                        aria-label="delete image"
                        icon={<Delete />}
                        onClick={deleteItem}
                        opacity="0.7"
                        _hover={{ opacity: "1" }}
                    />
                </Box>
            </CustomTooltip>
            <CustomTooltip label={t("common:actions.download")}>
                <Box top="1" right="50" position="absolute" zIndex="100">
                    <Link download href={item.image.url}>
                        <IconButton
                            aria-label="Download Image"
                            icon={<Download />}
                            opacity="0.7"
                            _hover={{ opacity: "1" }}
                        />
                    </Link>
                </Box>
            </CustomTooltip>

            <Box top="1" right="98" position="absolute" zIndex="100">
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
            </Box>
        </>
    );
};
