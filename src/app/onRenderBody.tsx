import React from "react";
import { GatsbySSR } from "gatsby";

const onRenderBody: GatsbySSR["onRenderBody"] = ( { setHeadComponents } ) => {
    const googleReCaptchaSiteKey = process.env.GATSBY_GOOGLE_RECAPTCHA_SITE_KEY
    if (googleReCaptchaSiteKey) {
        const src = `https://www.google.com/recaptcha/api.js?render=${ googleReCaptchaSiteKey }`;
        setHeadComponents( [ <script key={ "recaptcha-script" } src={ src }/> ] )
    }
}

export default onRenderBody
