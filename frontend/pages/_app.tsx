import React, { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { THEME } from '../src/theme';
import { GlobalStyles } from '../src/styles';

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Fragment>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Lato:700|Raleway:400,700&display=swap&subset=latin-ext"
            rel="stylesheet"
          />
        </Head>

        <ThemeProvider theme={THEME}>
          <Fragment>
            <GlobalStyles />

            <Component {...pageProps} />
          </Fragment>
        </ThemeProvider>
      </Fragment>
    );
  }
}

export default CustomApp;
