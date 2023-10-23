import { Button, ListItem, UnorderedList } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { CategoriesProps } from "src/types";

const Categories = ({ filterCategory, resetFilter }: CategoriesProps) => {
    const { t } = useTranslation();
    return (
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
                <ListItem>{t("common:categories.showAll")}</ListItem>
            </Button>
        </UnorderedList>
    );
};

export default Categories;
