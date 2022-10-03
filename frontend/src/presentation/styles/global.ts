import {
  css,
  DefaultTheme,
  createGlobalStyle,
  GlobalStyleComponent,
} from "styled-components";

type GlobalStylesProps = { theme: DefaultTheme };

const GlobalStyles: GlobalStyleComponent<
  GlobalStylesProps,
  DefaultTheme
> = createGlobalStyle`
    /* Normal */
    @font-face {
        font-family: "Roboto";
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: local('Roboto Regular'), local('Roboto-Regular'), url("/fonts/Roboto-Regular.ttf") format('truetype');
    }

    @font-face {
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: local('Montserrat Regular'), local('Montserrat-Regular'), url("/fonts/Montserrat-Regular.ttf") format('truetype');
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      &::before,
      &::after {
        box-sizing: inherit;
      }
      button {
        cursor: pointer;
        outline: none;
      }
    }
    ${({ theme }) => css`
      html {
        font-size: 62.5%;
      }
      body {
        width: 100%;
        height: 100%;
        min-width: 100%;
        min-height: 100vh;
        font-family: ${theme.font.family};
        font-size: ${theme.font.sizes.medium};
        background-color: ${theme.colors.neutral.white};
      }
    `}
  `;

export default GlobalStyles;
