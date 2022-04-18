import * as React from "react";
import { FC } from "react";
import { useLocation } from "@reach/router"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby";
import t from "@i18n";

interface IHeadMeta {
    title?: string
    description?: string
    image?: string
    type?: "website"
}

const HeadMeta: FC<IHeadMeta> = ( { title, description, image, type, children } ) => {
    const { ogImage, site: { siteMetadata } } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        siteUrl
                        title
                        description
                    }
                }
                ogImage: file(relativePath: {eq: "og-image.jpg"}) {
                    childImageSharp {
                        original {
                            src
                        }
                    }
                }
            }
        `
    )
    const domain = siteMetadata.siteUrl;
    const location = useLocation()
    const url = domain + location.pathname;
    const pageTitle = title ? `${ t( title ) } | ${ siteMetadata.title }` : siteMetadata.title
    const pageDescription = description ?? siteMetadata.description;
    const imageWithFallback = image ? domain + image : `${ domain }${ ogImage.childImageSharp.original.src }`

    return (
        <Helmet>
            <title>{ t( pageTitle ) }</title>
            <link rel="icon" href={ "/favicon.svg" } type="image/svg+xml" sizes="any"/>
            <meta name="title" content={ t( pageTitle ) }/>
            <meta name="description" content={ t( pageDescription ) }/>
            <meta property="og:type" content={ type ?? "website" }/>
            <meta property="og:url" content={ url }/>
            <meta property="og:title" content={ t( pageTitle ) }/>
            <meta property="og:description" content={ t( pageDescription ) }/>
            <meta property="og:image" content={ imageWithFallback }/>
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={ url }/>
            <meta property="twitter:title" content={ t( pageTitle ) }/>
            <meta property="twitter:description" content={ t( pageDescription ) }/>
            <meta property="twitter:image" content={ imageWithFallback }/>
            { children }
        </Helmet>
    )
}

export default HeadMeta
