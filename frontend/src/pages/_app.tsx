import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "styled-components";

import Head from "../presentation/components/molecules/Head";
import theme from "../presentation/styles/theme";
import GlobalStyles from "../presentation/styles/global";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ChakraProvider>
        <Head title="Inventory Control" />
        <Component {...pageProps} />
      </ChakraProvider>
    </ThemeProvider>
  );
};

export default App;
