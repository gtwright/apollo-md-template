import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavBar from "./NavBar";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    [theme.breakpoints.down("sm")]: { marginTop: theme.spacing(6) },
    marginBottom: theme.spacing(2),
    padding: 0,
  },
  footer: {
    fontSize: "0.8rem",
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    "& a": {
      color: theme.palette.secondary.light,
      "& :hover": {
        textDecoration: "underline",
      },
    },
  },
}));

export default function StickyFooter(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <Container component="main" className={classes.main} maxWidth={false}>
        {props.children}
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Footer />
        </Container>
      </footer>
    </div>
  );
}
