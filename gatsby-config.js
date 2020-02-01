//import dotenv from 'dotenv'
//dotenv.config({ silent: true })
require('dotenv').config()

const config = require('./config/site');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    ...config,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`,
      },
    },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'blog',
    //     path: `${__dirname}/content/posts/blog`,
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts/guides`,
        name: 'care',
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              quality: 90,
              linkImagesToOriginal: true,
            },
          },
          'gatsby-remark-prismjs',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        autoLabel: process.env.NODE_ENV !== 'production',
        // eslint-disable-next-line
        labelFormat: `[filename]--[local]`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'config/typography.js',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.title,
        short_name: config.shortName,
        description: config.description,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: config.favicon,
      },
    },
    'gatsby-plugin-offline',
    
    // {
    //   resolve: `gatsby-plugin-purgecss`,
    //   options: {
    //     printRejected: true, // Print removed selectors and processed file names
    //     // develop: true, // Enable while using `gatsby develop`
    //     // tailwind: true, // Enable tailwindcss support
    //     // whitelist: ['whitelist'], // Don't remove this selector
    //     // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
    //     // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
    //   },
    // },
    
    {
        resolve: `gatsby-plugin-netlify`,
        options: {
          allPageHeaders: [
            "Link: /static/care/dummy.pdf; rel=preload;",
            "Link: /static/dummy.pdf; rel=preload;",
          ],
        }     
    },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ["Sku", "Coupon"],
        secretKey: process.env.STRIPE_API_SECRET,
        downloadFiles: false,
        auth: false
      },
    },
    {
			resolve: `gatsby-plugin-pinterest-twitter-facebook`,
			options: {
				delayTimer: 100,
				pinterest: {
					enable: true,
					tall: true,
					round: false
				},
				// twitter: {
				// 	enable: true,
				// 	containerSelector: '.twitter-container',
				// 	handle: process.env.GATSBY_TWITTER_SOURCE,
				// 	showFollowButton: true,
				// 	showTimeline: true,
				// 	showFollowerCount: true,
				// 	timelineTweetCount: 1,
				// 	width: null,
				// 	height: null,
				// 	noHeader: true,
				// 	noFooter: true,
				// 	noBorders: true,
				// 	noScrollbar: true,
				// 	transparent: true
				// },
				// facebook: {
				// 	enable: true,
				// 	containerSelector: '.facebook-container',
				// 	profile: process.env.GATSBY_FACEBOOK_SOURCE,
				// 	// width: 340,
				// 	// height: 500,
				// 	tabs: 'timeline, events, messages',
				// 	hideCover: false,
				// 	showFacepile: true,
				// 	smallHeader: false,
				// 	adaptContainerWidth: true
				// }
			}
		},
  ],
};
