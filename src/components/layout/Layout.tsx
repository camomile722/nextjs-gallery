import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { LayoutProps } from "src/types";
import { Wrapper } from "../wrapper/Wrapper";
import { Footer } from "./Footer";
import { Header } from "./Header";

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
                <Wrapper>
                    <Header />
                </Wrapper>
                <Box as="main">{children}</Box>
                <Box>
                    <Footer />
                </Box>
            </Box>
        </>
    );
};
