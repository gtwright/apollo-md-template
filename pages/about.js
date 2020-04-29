import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "../components/Link";
import Layout from "../components/Layout";

function About() {
  return (
    <Layout>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            About {process.env.SITE_NAME}
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
}

export default About;
