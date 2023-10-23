import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { LayoutProps } from "src/types";
import { Footer } from "./Footer";
import { Header } from "./Header";
import LanguagePanel from "./LanguagePanel";

export const Layout = ({
    children,
    metaTitle,
    metaDescription,
}: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{metaTitle} </title>
                <meta name="description" content={metaDescription} />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>
            <Box p={{ base: "1rem 2rem", md: "3rem 6rem" }}>
                <Flex as="header" maxW="1220px" m="0 auto">
                    <Header />
                    <LanguagePanel />
                </Flex>
                <Box as="main">{children}</Box>
                <Box mt={{ base: "4", md: "20" }}>
                    <Footer />
                </Box>
            </Box>
        </>
    );
};
