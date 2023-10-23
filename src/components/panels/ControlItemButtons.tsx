import { Flex, IconButton, Link } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Delete, Download } from "src/theme/icons";
import { ControlItemButtonsProps } from "src/types";
import { CustomTooltip } from "../tooltip/CustomTooltip";

export const ControlItemButtons = ({
    deleteItem,
    item,
}: ControlItemButtonsProps) => {
    const { t } = useTranslation();
    return (
        <>
            <CustomTooltip label={t("common:actions.delete")}>
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
            <CustomTooltip label={t("common:actions.download")}>
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
        </>
    );
};
