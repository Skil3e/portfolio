import React from "react";
import { AnimatePresence } from "framer-motion";
import { GatsbyBrowser } from "gatsby";

const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ( { element, props } ) => {
    // const locale = props.pageContext.locale as TypeLocale
    return (
        <>
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
