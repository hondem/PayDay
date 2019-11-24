import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%
  }

  body {
    margin: 0
  }

  main {
    display: block
  }

  h1 {
    font-size: 1.6em;
    margin: .67em 0
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible
  }

  pre {
    font-family: monospace, monospace;
    font-size: 1em
  }

  a {
    background-color: transparent
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted
  }

  b,
  strong {
    font-weight: bolder
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em
  }

  small {
    font-size: 80%
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline
  }

  sub {
    bottom: -.25em
  }

  sup {
    top: -.5em
  }

  img {
    border-style: none
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    padding: 0;
    margin: 0
  }

  button,
  input {
    overflow: visible
  }

  button,
  select {
    text-transform: none
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0
  }

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText
  }

  fieldset {
    padding: .35em .75em .625em
  }

  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal
  }

  progress {
    vertical-align: baseline
  }

  textarea {
    overflow: auto
  }

  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box;
    padding: 0
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto
  }

  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px
  }

  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit
  }

  details {
    display: block
  }

  summary {
    display: list-item
  }

  template {
    display: none
  }

  [hidden] {
    display: none
  }

  /* Global styles
  ============================================================================= */
  body {
    padding: 0;
    margin: 0;
    font-family: 'Raleway', sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.grays[3]};
    background: ${({ theme }) => theme.colors.background};

    * {
      box-sizing: border-box;
    }
  }
`;
