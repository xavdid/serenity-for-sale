module.exports = {
  siteMetadata: {
    title: `Serenity for Sale`,
    description: `We're selling our beloved converted camper van, Serenity. Come check it out!`,
    author: `@xavdid`
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
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // maxWidth: 800
              linkImagesToOriginal: false,
              showCaptions: true
              // markdownCaptions: true,
            }
          }
        ]
      }
    },
    `gatsby-plugin-catch-links`
  ]
};
