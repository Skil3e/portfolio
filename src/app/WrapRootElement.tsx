import React from "react";
import { GatsbyBrowser } from "gatsby";
import { LayoutContextProvider } from "@utilities";

const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ( { element } ) => {
    return (
        <LayoutContextProvider>
            { element }
        </LayoutContextProvider>
    )
}

export default wrapRootElement
