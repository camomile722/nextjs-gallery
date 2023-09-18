import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

export const Footer = () => {
    return (
        <Flex
            justifyContent="center"
            py="8"
            alignItems="center"
            gap="4"
            flexDir={{ base: "column", md: "row" }}
        >
            <Image src="uploads/camomile-logo1.svg" maxW="150px" />{" "}
            <Text as="span">&copy; Copyright</Text>
        </Flex>
    );
};
