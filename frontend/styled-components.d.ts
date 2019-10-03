import { THEME } from './src/Theme';

type ThemeInterface = typeof THEME;

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {}
}