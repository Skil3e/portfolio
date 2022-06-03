import React from "react";
import { GatsbySSR } from "gatsby";

const onRenderBody: GatsbySSR["onRenderBody"] = ( { setHeadComponents } ) => {
    setHeadComponents( [
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

export default onRenderBody
