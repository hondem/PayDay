import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
  }
`;

export const THEME = {
  colors: {
    brand: '#455DEF',
    blues: ['#1C2B6F', '#182354'],
    accents: ['#62D4CD', '#FCD661'],
    grays: ['#DCDDE1', '#718093'],

    active: {
      brand: '#273FDB',
      blues: ['#000D51'],
      accents: ['#44B6AF', '#E8C24D'],
    },

    disabled: {
      brand: '#A5AFF0',
      blues: ['#7B85AF'],
      accents: ['#B6D4D2', '#FCEFC5'],
    },
  },

  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },

  space: [0, 5, 10, 20, 30, 50, 100],
};
