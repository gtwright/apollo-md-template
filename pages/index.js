import React from "react";
import { gql } from "@apollo/client";
import moment from "moment";
import { withApollo } from "../utils/apollo";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Layout from "../components/Layout";
import EventGridQuery from "../components/EventGridQuery";
import HeroBanner from "../components/HeroBanner";

export const ALL_EVENTS_QUERY = gql`
  query($first: Int, $offset: Int, $start: Float) {
    events: Event(
      first: $first
      offset: $offset
      filter: {
        Tag_some: { AND: [{ name: "[Opera Alliance] Boston Opera Calendar" }] }
        end_datetime_gte: $start
      }
      orderBy: [end_datetime_asc]
    ) {
      _id
      opus_id
      title
      supertitle_creative
      alert
      slug
      image_url
      displayInstanceDaterange(withYear: true)
      organizerNames
      Tag {
        _id
        name
      }
    }
  }
`;

let defaultStart = parseFloat(moment().format("X"));

export const allEventsQueryVars = {
  offset: 0,
  first: 8,
  start: defaultStart,
};

function Index() {
  return (
    <Layout>
      <HeroBanner tagline={"Boston is an opera town"} />
      <Container>
        <Box my={2}>
          <div
            style={{
              borderBottom: "solid 3px",
              marginBottom: 15,
              fontSize: "1.2rem",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Upcoming Performances
          </div>
          <EventGridQuery
            query={ALL_EVENTS_QUERY}
            variables={allEventsQueryVars}
          />
        </Box>
      </Container>
    </Layout>
  );
}

export default withApollo({ ssr: true })(Index);
