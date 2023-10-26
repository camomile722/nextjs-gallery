import { Button, ListItem, UnorderedList } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { CategoriesProps } from "src/types";

const Categories = ({
    filterCategory,
    resetFilter,
    activeCategory,
}: CategoriesProps) => {
    const { t } = useTranslation();
    const categoryOptions = [
        { value: "people", label: t("common:categories.people") },
        { value: "fruits", label: t("common:categories.fruits") },
        { value: "mug", label: t("common:categories.mug") },
        { value: "other", label: t("common:categories.other") },
    ];

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
            {categoryOptions.map((category) => (
                <Button
                    onClick={filterCategory(category.value)}
                    minW="auto"
                    bg={
                        activeCategory === category.value
                            ? "gray.300"
                            : "gray.100"
                    }
                    key={category.value}
                >
                    <ListItem>{category.label}</ListItem>
                </Button>
            ))}

            <Button onClick={resetFilter} minW="auto">
                <ListItem>{t("common:categories.showAll")}</ListItem>
            </Button>
        </UnorderedList>
    );
};

export default Categories;
