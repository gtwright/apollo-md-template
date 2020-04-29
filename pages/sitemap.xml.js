import React from "react";
import { useQuery, gql } from "@apollo/client";
import { withApollo } from "../utils/apollo";

export const ALL_EVENTS_QUERY = gql`
  query {
    events: Event(
      first: 1000
      offset: 0
      filter: {
        Tag_some: { AND: [{ name: "[Opera Alliance] Boston Opera Calendar" }] }
      }
      orderBy: [last_modified_desc]
    ) {
      slug
      last_modified
    }
  }
`;

const sitemapXML = (data) => {
  let latestPost = 0;
  let projectsXML = "";

  data.map((post) => {
    // console.log(post.last_modified);
    const postDate = new Date(post.last_modified * 1000).toJSON();
    if (!latestPost || postDate > latestPost) {
      latestPost = postDate;
    }

    const projectURL = `http://localhost:3000/event/${post.slug}/`;
    projectsXML += `
        <url>
          <loc>${projectURL}</loc>
          <lastmod>${postDate}</lastmod>
          <priority>0.50</priority>
        </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://domain.ltd/</loc>
          <lastmod>${latestPost}</lastmod>
          <priority>1.00</priority>
        </url>
        <url>
          <loc>https://domain.ltd/about/</loc>
          <priority>0.80</priority>
        </url>
        ${projectsXML}
      </urlset>`;
};

class Sitemap extends React.Component {
  static async getInitialProps({ res, apolloClient }) {
    // const { data } = useQuery(ALL_EVENTS_QUERY);
    const {
      data: { events },
    } = await apolloClient.query({ query: ALL_EVENTS_QUERY });
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapXML(events));
    res.end();
  }
}

export default withApollo({ ssr: true })(Sitemap);
