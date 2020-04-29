import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { gql } from "@apollo/client";
import { useQuery, NetworkStatus } from "@apollo/client";
import { withApollo } from "../utils/apollo";
import Layout from "../components/Layout";
import Loading from "../components/Loading";

const EVENT_QUERY = gql`
  query($first: Int, $offset: Int) {
    Event(
      first: $first
      offset: $offset
      filter: { image_url_not_contains: "generic" }
    ) {
      _id
      title
      image_url
    }
  }
`;

const queryVars = {
  first: 1,
  offset: Math.floor(Math.random() * 100),
};

function Index() {
  const { data, loading, error } = useQuery(EVENT_QUERY, {
    variables: queryVars,
  });
  return (
    <Layout>
      <Container
        style={{
          minHeight: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box my={2} suppressHydrationWarning={true}>
          {loading && <Loading />}

          {data &&
            data?.Event.map((event) => (
              <img
                key={event._id}
                src={event.image_url}
                style={{ width: "100%" }}
              />
            ))}
        </Box>
      </Container>
    </Layout>
  );
}

export default withApollo({ ssr: true })(Index);
