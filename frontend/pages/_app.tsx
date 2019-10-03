import React, { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { THEME, GlobalStyles } from '../src/Theme';

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Fragment>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
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
