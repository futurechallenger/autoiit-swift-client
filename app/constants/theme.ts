import { extendTheme } from "native-base";
import Colors from './Colors';

const theme = extendTheme({
  colors: {
    light: Colors.light,
    dark: Colors.dark
  }
});

export {theme};
