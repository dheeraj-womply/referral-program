module.exports = {
  siteMetadata: {
    title: "Referral Program",
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-typescript`,
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
          stylesProvider: {
              injectFirst: true,
          },
      },
    },
  ],
};
