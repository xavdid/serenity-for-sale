module.exports = {
  siteMetadata: {
    title: `Serenity for Sale`,
    description: ``,
    author: `@xavdod`
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `faq`,
        path: `${__dirname}/src/faqs.md`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        footnotes: false,
        plugins: [`gatsby-remark-autolink-headers`]
      }
    },
    `gatsby-plugin-catch-links`
  ]
};
