import React, { FC } from "react";
import { navigate } from "gatsby";
import { useLocalization } from "gatsby-theme-i18n";
import { useLocation } from "@reach/router";
import { Button, Flag } from "@components";

interface ILanguageToggle {
    onClick?: () => void
}

const LanguageToggle: FC<ILanguageToggle> = ( { onClick } ) => {
    const { locale } = useLocalization()
    const { pathname } = useLocation();

    const toggleLanguage = async ( l: "en" | "el" ) => {
        if (l === "en") {
            const path = pathname.replace( "/el", "" )
            await navigate( path )
        } else {
            !pathname.includes( "el/" ) && await navigate( "/el" + pathname )
        }
        onClick && onClick()
    }
    if (locale === "en") {
        return (
            <Button look={ "empty" } className={ "language-toggle" } notInline onClick={ () => toggleLanguage( "el" ) }>
                <Flag locale={ "el" } height={ 18 }/>
                <div><span className={ "sr-only" }>Αλλαγή γλώσσας στα </span>Ελληνικά</div>
            </Button>
        )
    }
    return (
        <Button look={ "empty" } className={ "language-toggle" } notInline onClick={ () => toggleLanguage( "en" ) }>
            <Flag locale={ "en-US" } height={ 18 }/>
            <div><span className={ "sr-only" }>Change language to </span>English</div>
        </Button>
    )
}

export default LanguageToggle
