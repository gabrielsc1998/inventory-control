import "styled-components";

import { IBreakPoints } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    font: {
      family: string;
      light: number;
      normal: number;
      bold: number;
      sizes: {
        xxsmall: string;
        xsmall: string;
        small: string;
        medium: string;
        large: string;
        xlarge: string;
        xxlarge: string;
        xxxlarge: string;
        huge: string;
      };
    };
    colors: {
      ui: {
        primary: string;
      };
      general: {
        blue: string;
        darkBlue: string;
        lightBlue: string;
        green: string;
        darkGreen: string;
        lightGreen: string;
        red: string;
        darkRed: string;
        lightRed: string;
        yellow: string;
        darkYellow: string;
        lightYellow: string;
      };
      neutral: {
        white: string;
        black: string;
        gray: string;
        darkGray: string;
        mediumGray: string;
        lightGray: string;
      };
      status: {
        info: string;
        error: string;
        success: string;
        warning: string;
      };
    };
    spacings: {
      xxsmall: string;
      xsmall: string;
      small: string;
      medium: string;
      large: string;
      xlarge: string;
      xxlarge: string;
    };
    breakPoints: IBreakPoints;
  }
}
