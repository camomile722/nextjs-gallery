import { Flex, Link } from "@chakra-ui/react";
import { Facebook, Instagram, Twitter } from "src/theme/icons";
import LanguagePanel from "./LanguagePanel";

export const Header = () => {
    const socials = [
        {
            url: "https://twitter.com/",
            icon: <Twitter boxSize={6} />,
        },
        {
            url: "https://instagram.com/",
            icon: <Instagram boxSize={6} />,
        },
        {
            url: "https://facebook.com/",
            icon: <Facebook boxSize={6} />,
        },
    ];
    return (
        <Flex justifyContent="space-between" width="100%" as="header">
            <Flex gap={8}>
                {socials.map((social) => (
                    <Link href={social.url} isExternal key={social.url}>
                        {social.icon}
                    </Link>
                ))}
            </Flex>

            <LanguagePanel />
        </Flex>
    );
};
