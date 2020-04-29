import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import MuiAlert from "@material-ui/lab/Alert";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Link from "./Link";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TagChip from "../components/TagChip";

const visibleTags = process.env.VISIBLE_TAGS || [];

const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: "#fff",
    wordBreak: "break-word",
    height: "100%",
    "&:hover, &:focus": {
      transform: "scale(1.05)",
      zIndex: 1,
      transitionDuration: "500ms",
      transitionProperty: "transform, box-shadow",
      transitionTimingFunction: "ease-out",
    },
    "& a:hover": {
      textDecoration: "none",
    },
  },
  cardContent: { height: "100%" },
  img: { width: "100%" },
}));

const EventGridCard = ({ event }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Card elevation={0} square className={classes.card}>
      <CardActionArea
        component={Link}
        href={`/event/[slug]`}
        as={`/event/${event.slug}`}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <picture>
          <source
            media={`(min-width: ${theme.breakpoints.values.lg}px)`}
            sizes="100vw"
            srcSet={`https://res.cloudinary.com/opusaffair/image/fetch/c_fill,dpr_auto,f_auto,g_auto,h_170,w_290,z_0.3/${event.image_url}`}
          />
          <source
            media={`(min-width: ${theme.breakpoints.values.md}px)`}
            sizes="100vw"
            srcSet={`https://res.cloudinary.com/opusaffair/image/fetch/c_fill,dpr_auto,f_auto,g_auto,h_221,w_377,z_0.3/${event.image_url}`}
          />
          <source
            media={`(min-width: ${theme.breakpoints.values.sm}px)`}
            sizes="100vw"
            srcSet={`https://res.cloudinary.com/opusaffair/image/fetch/c_fill,dpr_auto,f_auto,g_auto,h_248,w_433,z_0.3/${event.image_url}`}
          />
          <source
            media={`(min-width: ${theme.breakpoints.values.xs}px)`}
            sizes="100vw"
            srcSet={`https://res.cloudinary.com/opusaffair/image/fetch/c_fill,dpr_auto,f_auto,g_auto,h_315,w_547,z_0.3/${event.image_url}`}
          />
          <img
            srcSet={`https://res.cloudinary.com/opusaffair/image/fetch/c_fill,dpr_auto,f_auto,g_auto,h_315,w_547,z_0.3/${event.image_url}`}
            className={classes.img}
            alt={event.title}
          />
        </picture>
        <CardContent
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <div>
            {event.alert && event.alert != "none" && (
              <MuiAlert
                severity="error"
                style={{
                  textTransform: "uppercase",
                  marginBottom: 15,
                }}
              >
                {event.alert}
              </MuiAlert>
            )}
            {event.supertitle_creative && (
              <Typography
                variant="body2"
                component="h3"
                style={{
                  textTransform: "uppercase",
                  fontSize: "1rem",
                  fontWeight: 700,
                }}
                gutterBottom
              >
                {event.supertitle_creative}
              </Typography>
            )}
            <Typography gutterBottom variant="h6" component="h2">
              {event.title}
            </Typography>
          </div>
          <div style={{ paddingTop: 20 }}>
            <Typography variant="body2" color="textSecondary" component="p">
              {event.displayInstanceDaterange}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ paddingBottom: 15 }}
            >
              {event.organizerNames}
            </Typography>
            {event.Tag.filter((tag) => visibleTags.indexOf(tag.name) != -1).map(
              (tag) => (
                <TagChip tag={tag} key={tag._id} />
              )
            )}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventGridCard;
