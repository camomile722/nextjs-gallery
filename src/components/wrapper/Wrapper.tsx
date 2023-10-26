import React from "react";
import { Box } from "@chakra-ui/react";
import { WrapperProps } from "src/types";

export const Wrapper = ({ children }: WrapperProps) => {
    return (
        <Box maxW="1220px" margin="0 auto">
            {children}
        </Box>
    );
};
