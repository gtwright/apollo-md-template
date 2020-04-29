module.exports = {
  target: "serverless",
  env: {
    GRAPHQL_URI: "https://api.dev.commoncalendar.org/graphql",
    // GRAPHQL_URI: "http://localhost:4000/graphql",
    SITE_TAG: "[Opera Alliance] Boston Opera Calendar",
    SITE_URI: "http://localhost:3000",
    SITE_NAME: "Boston Opera Calendar",
    VISIBLE_TAGS: ["Online / Virtual"],
  },
};
