import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "styled-components";

import theme from "presentation/styles/theme";
import GlobalStyles from "presentation/styles/global";
import Head from "presentation/components/molecules/Head";
import LoadingProvider from "presentation/providers/loading";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ChakraProvider>
        <Head title="Inventory Control" />
        <LoadingProvider>
          <Component {...pageProps} />
        </LoadingProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
};

export default App;
