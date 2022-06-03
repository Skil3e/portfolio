import React from "react";
import { AnimatePresence } from "framer-motion";
import { Script, GatsbyBrowser } from "gatsby";

const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ( { element, props } ) => {
    // const locale = props.pageContext.locale as TypeLocale
    return (
        <>
            { process.env.GATSBY_GOOGLE_RECAPTCHA_SITE_KEY &&
                <Script key={ "recaptcha-script" } src={ `https://www.google.com/recaptcha/api.js?render=${ process.env.GATSBY_GOOGLE_RECAPTCHA_SITE_KEY }` }/>
            }
            <AnimatePresence exitBeforeEnter>
                <React.Fragment key={ props.location.pathname }>
                    { element }
                </React.Fragment>
            </AnimatePresence>
            <div id={ "portal__root" }/>
        </>
    )
}
export default wrapPageElement
