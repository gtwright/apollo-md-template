import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

export default function Footer() {
  return (
    <Grid container>
      <Grid
        item
        sm={12}
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <div>Footer Message</div>
      </Grid>
    </Grid>
  );
}
