module.exports = {
  siteMetadata: {
    title: `Daytl`,
    siteUrl: 'https://www.daytl.com',
    description: `Online tools`,
    author: `Daytl`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `daytl`,
        short_name: `daytl`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`cs`, `en`],
        defaultLanguage: `cs`,
        redirect: true,
        redirectComponent: require.resolve(`./src/components/Redirect.js`),
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-N4R8B345EZ", // Google Analytics / GA
        ],
        gtagConfig: {
          'storage': 'none'
        }
      },
    },
  ],
}
