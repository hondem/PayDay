import React, { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';

import { THEME } from '../src/theme';
import { GlobalStyles } from '../src/styles';
import LOCALES from '../src/locales';

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Fragment>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Lato:700|Raleway:400&display=swap&subset=latin-ext"
            rel="stylesheet"
          />
        </Head>

        <ThemeProvider theme={THEME}>
          <IntlProvider locale="sk-SK" messages={LOCALES['sk-SK']}>
            <Fragment>
              <GlobalStyles />

              <Component {...pageProps} />
            </Fragment>
          </IntlProvider>
        </ThemeProvider>
      </Fragment>
    );
  }
}

export default CustomApp;
