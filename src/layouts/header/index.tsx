import React, { FC, useEffect, useState } from "react";
import { Button, IconWithText } from "@components";
import { useViewportScroll } from "framer-motion";
import classNames from "classnames";
import MenuToggle from "./MenuToggle";
import { useCloseSidebar, useIsMobile, useIsSidebarOpen, useToggleSidebar } from "@utilities";
import { graphql, useStaticQuery } from "gatsby";
import { TypeProfile } from "@types";

import Degree from "@icons/degree.svg";
import Email from "@icons/email.svg";
import Pin from "@icons/pin.svg";
import LinkedIn from "@icons/linkedin.svg";


interface IHeader {

}

const Header: FC<React.PropsWithChildren<IHeader>> = () => {
    const { profile: { nodes } } = useStaticQuery<{ profile: { nodes: Pick<TypeProfile, "firstname" | "lastname" | "location" | "degree" | "email" | "socialMedia">[] } }>( graphql`
        {
            profile: allContentfulProfile(filter: {contentful_id: {eq: "51HHmjEV7vNVTRqPgLZ0gN"}, node_locale: {eq: "en-US"}}) {
                nodes {
                    firstname
                    lastname
                    location
                    degree
                    email
                    socialMedia {
                        id
                        key
                        value
                    }
                }
            }
        }
    ` )
    const profile = nodes[0];
    const isSidebarOpen = useIsSidebarOpen();
    const toggleSidebar = useToggleSidebar()
    const closeSidebar = useCloseSidebar()
    const isMobile = useIsMobile();
    const [ scrolled, setScrolled ] = useState( false );
    const { scrollY } = useViewportScroll();

    useEffect( () => {
        function isScrolled( v: number ) {
            if (v >= 100) {
                setScrolled( true );
            } else {
                setScrolled( false );
            }
        }

        isScrolled( scrollY.get() );
        const unsub = scrollY.onChange( isScrolled );
        return () => unsub();
    }, [] );
    const linkedIn = profile.socialMedia.find( (sm => sm.key === "LinkedIn") )
    return (
        <>
            <header className={ classNames( "header", scrolled && "header--scrolled" ) } data-infoopen={ isMobile && isSidebarOpen }>
                <Button to={ "/" } look={ "minimal" }><strong>{ profile.firstname } { profile.lastname }</strong></Button>
                <Button look={ "empty" } className={ "header__quick-info__toggle" } onClick={ toggleSidebar }>
                    <MenuToggle isOpen={ isSidebarOpen } label={ "Show more information" }/>
                </Button>
                <ul className={ "header__quick-info" } role={ "list" } data-infoopen={ isSidebarOpen }>
                    <IconWithText as={ "li" } Icon={ Degree } label={ profile.degree }/>
                    <li>
                        <IconWithText as={ "a" } href={ `mailto:${ profile.email }` } Icon={ Email } label={ profile.email }/>
                    </li>
                    <IconWithText as={ "li" } Icon={ Pin } label={ profile.location }/>
                    { linkedIn &&
                        <li>
                            <IconWithText
                                as={ "a" }
                                Icon={ LinkedIn }
                                label={ linkedIn.key }
                                href={ `${ linkedIn.value }` }
                                target="_blank"
                                rel="noopener noreferrer"
                                iconOnly
                            />
                        </li>
                    }
                </ul>
            </header>
            { isMobile && <div onClick={ closeSidebar } data-infoopen={ isSidebarOpen } className={ "header__quick-info__overlay" }/> }
        </>
    );
};

export default Header;


