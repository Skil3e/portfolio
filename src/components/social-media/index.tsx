import React, { FC } from "react";
import Twitter from "@icons/twitter.svg";
import Github from "@icons/github.svg";
import LinkedIn from "@icons/linkedin.svg";
import { TypeProfile } from "@types";
import { IconWithText } from "../index";
import { graphql, useStaticQuery } from "gatsby";

type TypeSocialMedia = {}

const SocialMedia: FC<TypeSocialMedia> = () => {
    const { profile: { nodes } } = useStaticQuery<{ profile: { nodes: Pick<TypeProfile, "socialMedia">[] } }>( graphql`
        {
            profile: allContentfulProfile(filter: {contentful_id: {eq: "51HHmjEV7vNVTRqPgLZ0gN"}, node_locale: {eq: "en-US"}}) {
                nodes {
                    socialMedia {
                        id
                        key
                        value
                    }
                }
            }
        }
    ` )
    return (
        <ul className={ "social-media" } role={ "list" }>
            { nodes[0].socialMedia.map( ( sm ) => (
                <li>
                    <IconWithText
                        as={ "a" }
                        Icon={ getIcon( sm.key.toLowerCase() ) }
                        label={ sm.key }
                        href={ sm.value }
                        target="_blank"
                        rel="noopener noreferrer"
                        iconOnly
                    />
                </li>
            ) ) }
        </ul>
    )
}

export default SocialMedia

const getIcon = ( name: string ) => {
    switch (name) {
        case "twitter":
            return Twitter
        case "github":
            return Github
        case "linkedin":
            return LinkedIn
        default :
            return null
    }
}
