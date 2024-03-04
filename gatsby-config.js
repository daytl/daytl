const path = require('path')

module.exports = {
  trailingSlash: "always",
  siteMetadata: {
    title: `Daytl`,
    siteUrl: 'https://www.daytl.com',
    description: `Online tools`,
    author: `Daytl`
  },
  plugins: [
    "gatsby-plugin-netlify",
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    // `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // `gatsby-plugin-perf-budgets`,
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          'bn.js': path.resolve(__dirname, 'node_modules/bn.js/lib/bn.js'),
        },
        extensions: []
      }
    },
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
        languages: ['cs', 'en','sk'],
        defaultLanguage: `cs`,
        redirect: true,
        redirectComponent: require.resolve(`./src/components/Redirect.js`),
      },
    },
  ],
}
