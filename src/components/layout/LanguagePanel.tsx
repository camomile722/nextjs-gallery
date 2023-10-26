import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

function LanguagePanel() {
    const router = useRouter();
    const languages = [
        {
            locale: "en",
            label: "EN",
        },
        {
            locale: "de",
            label: "DE",
        },
    ];
    return (
        <Flex gap={1}>
            {languages.map((language) => (
                <Link href="/" locale={language.locale} key={language.label}>
                    <Button
                        variant="outline"
                        colorScheme={
                            router.locale === language.locale ? "teal" : "gray"
                        }
                        size="sm"
                    >
                        {language.label}
                    </Button>
                </Link>
            ))}
        </Flex>
    );
}

export default LanguagePanel;
