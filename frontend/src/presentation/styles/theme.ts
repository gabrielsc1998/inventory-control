import { DefaultTheme } from "styled-components";

export interface IBreakPoints {
  [key: string]: string;
  mobile_S: string;
  mobile_M: string;
  mobile_L: string;
  tablet: string;
  laptop: string;
  laptop_L: string;
}

const theme: DefaultTheme = {
  font: {
    family:
      "Roboto, Oxygen, Montserrat, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    light: 300,
    normal: 400,
    bold: 600,
    sizes: {
      xxsmall: "0.8rem",
      xsmall: "1.2rem",
      small: "1.4rem",
      medium: "1.6rem",
      large: "1.8rem",
      xlarge: "2.0rem",
      xxlarge: "2.8rem",
      xxxlarge: "3.6rem",
      huge: "5.2rem",
    },
  },
  colors: {
    ui: {
      primary: "#8ab3f0",
    },
    general: {
      blue: "#3498DB",
      darkBlue: "#002C62",
      lightBlue: "#87BDFF",
      green: "#00C119",
      darkGreen: "#006B0C",
      lightGreen: "#8DFC8D",
      red: "#E74C3C",
      darkRed: "#690000",
      lightRed: "#EDA698",
      yellow: "#FFEA00",
      darkYellow: "#EDD900",
      lightYellow: "#FFF049",
    },
    neutral: {
      white: "#FDFDFF",
      black: "#030517",
      lightGray: "#F1F1F1",
      mediumGray: "#CCC",
      gray: "#868686",
      darkGray: "#232323",
    },
    status: {
      info: "#006CE0",
      error: "#FF6347",
      success: "#45AA2A",
      warning: "#E6A23C",
    },
  },
  spacings: {
    xxsmall: "0.8rem",
    xsmall: "1.6rem",
    small: "2.4rem",
    medium: "3.2rem",
    large: "4.0rem",
    xlarge: "4.8rem",
    xxlarge: "5.6rem",
  },
  breakPoints: {
    mobile_S: "320px",
    mobile_M: "375px",
    mobile_L: "425px",
    tablet: "768px",
    laptop: "1024px",
    laptop_L: "1440px",
  },
};

export default theme;
