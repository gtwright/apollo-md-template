import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const font1 = '"Noto Serif", serif';

const font2 = '"Noto Sans",sans-serif';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#42404d",
    },
    secondary: {
      main: "#a26c1a",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#f1f1f3",
    },
  },
  typography: {
    fontFamily: [font2].join(","),
    h1: { fontFamily: font1, fontSize: "3rem" },
    h2: { fontFamily: font1, fontSize: "2.5rem" },
    h3: { fontFamily: font1, fontSize: "2rem" },
    h4: { fontFamily: font1, fontSize: "2rem" },
    h5: { fontFamily: font1, fontSize: "1.8rem" },
    h6: { fontFamily: font1, fontSize: "1.5rem", lineHeight: "1.8rem" },
    body1: { fontFamily: font1, fontSize: "1rem", fontWeight: 500 },
    body2: { fontFamily: font2, fontSize: "1rem", fontWeight: 500 },
  },
});

export default theme;
