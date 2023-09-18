import { extendTheme } from "@chakra-ui/react";
import { Box } from "./styledComponents";
import { colors } from "../theme/colors";
export const theme = extendTheme({
    ...colors,
    components: {
        Box,
    },
});
