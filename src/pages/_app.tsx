import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme/theme";
import { wrapper } from "../store/store";
import { appWithTranslation } from "next-i18next";

function Dashboard({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default appWithTranslation(wrapper.withRedux(Dashboard));
