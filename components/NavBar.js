import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "./Link";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: 700,
    "& a": {
      color: "white",
    },
    "& a:hover": { textDecoration: "none" },
  },
}));

export default function Bar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="body2" className={classes.title}>
            <Link href="/" style={{ textTransform: "uppercase" }}>
              {process.env.SITE_NAME || MICROSITE}
            </Link>
          </Typography>
          <>
            <Button color="inherit" component={Link} href="/">
              Upcoming
            </Button>
            <Button color="inherit" component={Link} href="/past">
              Past
            </Button>
            <Button color="inherit" component={Link} href="/about">
              About
            </Button>
          </>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
