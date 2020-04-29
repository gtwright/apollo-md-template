import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Link from "../../components/Link";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";
import { withApollo } from "../../utils/apollo";
import { useQuery, gql } from "@apollo/client";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import MuiAlert from "@material-ui/lab/Alert";
import TagChip from "../../components/TagChip";

const visibleTags = process.env.VISIBLE_TAGS || [];

const useStyles = makeStyles((theme) => ({
  // card: {
  //   backgroundColor: "#fff",
  //   height: "100%",
  // },
  // cardContent: { height: "100%" },
  // img: { width: "100%", height: "100%" },
  topRow: {
    [theme.breakpoints.down("sm")]: { flexDirection: "column-reverse" },
  },
  link: {
    color: theme.palette.secondary.main,
  },
}));

const VenueList = ({ venue }) => <div>{venue.name}</div>;

const EventPhoto = ({ imageUrl, title, theme }) => (
  <picture style={{ width: "100%" }}>
    <source
      media={`(min-width: ${theme.breakpoints.values.lg}px)`}
      sizes="100vw"
      srcSet={`https://res.cloudinary.com/opusaffair/image/fetch/c_fill,dpr_auto,f_auto,g_auto,ar_1.7,w_680,z_0.3/${imageUrl}`}
    />
    <source
      media={`(min-width: ${theme.breakpoints.values.md}px)`}
      sizes="100vw"
      srcSet={`https://res.cloudinary.com/opusaffair/image/fetch/c_fill,dpr_auto,f_auto,g_auto,ar_1.7,w_680,z_0.3/${imageUrl}`}
    />
    <source
      media={`(min-width: ${theme.breakpoints.values.sm}px)`}
      sizes="100vw"
      srcSet={`https://res.cloudinary.com/opusaffair/image/fetch/c_fill,dpr_auto,f_auto,g_auto,ar_1.7,w_858,z_0.3/${imageUrl}`}
    />
    <img
      src={`https://res.cloudinary.com/opusaffair/image/fetch/c_fill,dpr_auto,f_auto,g_auto,ar_1.7,w_858,z_0.3/${imageUrl}`}
      style={{ width: "100%", height: "100%" }}
      alt={title}
    />
  </picture>
);

function Event({ theme }) {
  const classes = useStyles();
  const router = useRouter();
  const EVENT_DETAIL_QUERY = gql`
    query($slug: String) {
      event: eventDetail(slug: $slug) {
        _id
        opus_id
        title
        supertitle_creative
        alert
        slug
        image_url
        photo_cred
        displayInstanceDaterange(withYear: true)
        organizerNames
        organizer_desc
        ticket_link
        Tag {
          _id
          name
        }
        Venue {
          _id
          name
          address
          city
          state
          zip_code
          location {
            latitude
            longitude
          }
        }
      }
    }
  `;
  // const { slug } = router.query;
  // const slug =
  // "boston-opera-collaborative-longy-school-of-music-of-bard-college-opera-bites";
  const { loading, data, error } = useQuery(EVENT_DETAIL_QUERY, {
    variables: { slug: router.query?.slug },
  });
  const event = data && data.event;
  if (error) console.log(error);
  return (
    <Layout>
      <Container
        style={{ backgroundColor: "white", width: "100%", padding: 15 }}
        maxWidth={false}
      >
        <Container>
          {error && (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 250,
              }}
            >
              Error
            </Box>
          )}
          {loading && (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 250,
              }}
            >
              <Loading />
            </Box>
          )}
          {!loading && event && (
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
              <Grid container spacing={3} className={classes.topRow}>
                <Grid item sm={12} md={5}>
                  <Box
                    py={3}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <div>
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
                      <Typography variant="h4" component="h1" gutterBottom>
                        {event.title}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" component="h2">
                        {event.displayInstanceDaterange}
                      </Typography>
                      <Typography variant="body2" component="h2">
                        Presented by: {event.organizerNames}
                      </Typography>
                      {event.Venue && event.Venue.length > 0 && (
                        <div style={{ display: "flex", flexGrow: 0 }}>
                          {event.Venue.map((venue) => (
                            <a
                              href={`https://maps.google.com/?q=${venue.address}+${venue.city}+${venue.state}`}
                              key={venue._id}
                              target="_blank"
                              className={classes.link}
                            >
                              <VenueList venue={venue} />
                            </a>
                          ))}
                        </div>
                      )}
                      <Button
                        variant="contained"
                        color="secondary"
                        disableElevation
                        href={event.ticket_link}
                        target="_blank"
                        rel="noreferrer"
                        style={{ marginTop: 15, borderRadius: 0 }}
                      >
                        Official Site
                      </Button>
                    </div>
                  </Box>
                </Grid>
                <Grid item sm={12} md={7}>
                  <Card
                    elevation={0}
                    style={{
                      display: "flex",
                      border: "none",
                    }}
                  >
                    <EventPhoto
                      imageUrl={event.image_url}
                      theme={theme}
                      title={event.title}
                    />
                  </Card>
                  {event.photo_cred && (
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingBottom: 0,
                      }}
                    >
                      Photo credit: {event.photo_cred}
                    </span>
                  )}
                </Grid>
              </Grid>
            </div>
          )}
        </Container>
      </Container>
      {!loading && event && (
        <Container maxWidth="sm" style={{ paddingTop: 15 }}>
          <div>
            <Typography
              component="div"
              variant="body1"
              style={{ fontWeight: 500, marginBottom: 15 }}
              dangerouslySetInnerHTML={{ __html: event.organizer_desc }}
            ></Typography>
            {event.Tag.filter((tag) => visibleTags.indexOf(tag.name) != -1).map(
              (tag) => (
                <TagChip tag={tag} key={tag._id} />
              )
            )}
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              marginTop: 70,
            }}
          >
            <a
              href={`https://www.opusaffair.com/events/${event.slug}`}
              target="_blank"
              className={classes.link}
            >
              Opus Affair event listing
            </a>
          </div>
        </Container>
      )}
    </Layout>
  );
}

export default withApollo({ ssr: true })(withTheme(Event));
