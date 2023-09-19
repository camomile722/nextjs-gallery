import { Box, Flex, Link } from "@chakra-ui/react";

import { Facebook, Instagram, Twitter } from "src/theme/icons";

export const Header = () => {
    return (
        <Box>
            <Flex justifyContent="flex-start" alignItems="center" gap={8}>
                <Link href="/" cursor="pointer" isExternal>
                    <Twitter boxSize={6} />
                </Link>
                <Link href="/" cursor="pointer" isExternal>
                    <Instagram boxSize={6} />
                </Link>
                <Link href="/" cursor="pointer" isExternal>
                    <Facebook boxSize={6} />
                </Link>
            </Flex>
        </Box>
    );
};
