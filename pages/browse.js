import { gql } from "@apollo/client";
import moment from "moment";
import { withApollo } from "../utils/apollo";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Layout from "../components/Layout";
import EventGridQuery from "../components/EventGridQuery";

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

      slug
      image_url
      displayInstanceDaterange(withYear: true)
      organizerNames
      alert
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
      <Container>
        <Box my={2}>
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
