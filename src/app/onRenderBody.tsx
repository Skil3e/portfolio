import React from "react";
import { GatsbySSR } from "gatsby";

const onRenderBody: GatsbySSR["onRenderBody"] = ( { setHeadComponents } ) => {
    const googleReCaptchaSiteKey = process.env.GATSBY_GOOGLE_RECAPTCHA_SITE_KEY
    if (googleReCaptchaSiteKey) {
        const src = `https://www.google.com/recaptcha/api.js?render=${ googleReCaptchaSiteKey }`;
        setHeadComponents( [
            <script key={ "recaptcha-script" } src={ src }/>,
            <link
                key="agency"
                rel="preload"
                href="/fonts/AgencyFB-Bold.ttf"
                as="font"
                type="font/ttf"
                crossOrigin="anonymous"
            />,
            <link
                key="manrope"
                rel="preload"
                href="/fonts/Manrope-VariableFont_wght.ttf"
                as="font"
                type="font/ttf"
                crossOrigin="anonymous"
            />
        ] )
    }
}

export default onRenderBody
