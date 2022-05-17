/** @type {import("gatsby").GatsbyConfig} */
require("dotenv").config()

const config = {
    flags: {
        GRAPHQL_TYPEGEN: true,
    },
    trailingSlash: "always",
    siteMetadata: {
        title: `Manos Menexis`,
        description: "A 32 years old Creative Director & Frontend Developer from Athens (Greece)",
        siteUrl: process.env.GATSBY_SITE_URL,
    },
    plugins: [
        "gatsby-plugin-netlify",
        "gatsby-plugin-tsconfig-paths",
        "gatsby-plugin-sass",
        "gatsby-plugin-image",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                accessToken: process.env.NODE_ENV === "development"
                    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                    : process.env.CONTENTFUL_ACCESS_TOKEN,
                host: process.env.NODE_ENV === "development"
                    ? `preview.contentful.com`
                    : undefined,
                downloadLocal: true,
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                "name": "images",
                "path": "./src/images/",
            },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /icons/,
                    omitKeys: ["width", "height", "id", "xmlnsDc", "xmlnsCc", "xmlnsRdf", "xmlnsSvg", "xmlnsSodipodi", "xmlnsInkscape"],
                },
            },
        },
        {
            resolve: `gatsby-theme-i18n`,
            options: {
                defaultLang: `en`,
                configPath: require.resolve(`./i18n/config.json`),
            },
        },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                "icon": "src/images/avatar-duotone.png",
            },
        },
    ],
};

export default config;
