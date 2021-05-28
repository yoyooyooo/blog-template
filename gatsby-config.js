require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `a blog`,
    description: `a blog`,
    author: ``,
    siteUrl: ``,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-transformer-remark`,
    //   options: {
    //     plugins: [`gatsby-remark-images`],
    //   },
    // },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: 'Monokai',
            },
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `150`,
              maintainCase: true,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              backgroundColor: 'none',
              linkImagesToOriginal: false,
              wrapperStyle: `border-radius: 0.5em; overflow: hidden;`,
            },
          },
          {
            resolve: `gatsby-remark-external-links`,
            options: { rel: 'nofollow', target: '__blank' },
          },
          `gatsby-remark-lazy-load`,
        ],
        remarkPlugins: [require(`remark-math`), require(`remark-html-katex`)],
        // plugins: [`gatsby-remark-images`],
        // rehypePlugins: [require("rehype-katex")],
        extensions: [`.md`, `.mdx`],
      },
    },
    `gatsby-theme-material-ui`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    // {
    //   resolve: 'gatsby-plugin-page-creator',
    //   options: {
    //     path: `${__dirname}/content/posts`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `yoyo`,
        short_name: `yoyo`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/assets/images/icon.png`,
      },
    },
    `gatsby-plugin-less`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-nprogress`,
    // {
    //   resolve: `gatsby-remark-images`,
    //   options: {
    //     maxWidth: 860,
    //     backgroundColor: 'none',
    //   },
    // },
    // `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@': 'src',
        },
        extensions: ['js', 'ts', 'tsx'],
      },
    },
    ...(!!process.env.VERCEL_ENV ? [require('./gatsby/rssConfig')] : []),
  ],
};
