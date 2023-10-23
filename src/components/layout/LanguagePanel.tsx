import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

function LanguagePanel() {
    const router = useRouter();
    return (
        <Flex gap={1} width="100%" justifyContent="flex-end">
            <Link href="/" locale="en">
                <Button
                    variant="outline"
                    colorScheme={router.locale === "en" ? "teal" : "gray"}
                    size="sm"
                >
                    EN
                </Button>
            </Link>
            <Link href="/" locale="de">
                <Button
                    variant="outline"
                    colorScheme={router.locale === "de" ? "teal" : "gray"}
                    size="sm"
                >
                    DE
                </Button>
            </Link>
        </Flex>
    );
}

export default LanguagePanel;
