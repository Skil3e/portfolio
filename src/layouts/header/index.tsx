import React, { FC, useEffect, useState } from "react";
import Degree from "@icons/degree.svg";
import Email from "@icons/email.svg";
import Pin from "@icons/pin.svg";
import { Button, IconWithText } from "@components";
import { useViewportScroll } from "framer-motion";
import classNames from "classnames";
import MenuToggle from "./MenuToggle";
import { useCloseSidebar, useIsMobile, useIsSidebarOpen, useToggleSidebar } from "@utilities";

interface IHeader {

}

const Header: FC<React.PropsWithChildren<IHeader>> = () => {
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

    return (
        <>
            <header className={ classNames( "header", scrolled && "header--scrolled" ) } data-infoopen={ isMobile && isSidebarOpen }>
                <Button to={ "/" } look={ "minimal" }><strong>Manos Menexis</strong></Button>
                <Button look={ "empty" } className={ "header__quick-info__toggle" } onClick={ toggleSidebar }>
                    <MenuToggle isOpen={ isSidebarOpen }/>
                </Button>
                <ul className={ "header__quick-info" } role={ "list" } data-infoopen={ isSidebarOpen }>
                    <IconWithText as={ "li" } Icon={ Degree } label={ "B.A., Product & Industrial Design" }/>
                    <li>
                        <IconWithText as={ "a" } href={ "mailto:manosm.design@gmail.com" } Icon={ Email } label={ "manosm.design@gmail.com" }/>
                    </li>
                    <IconWithText as={ "li" } Icon={ Pin } label={ "Athens, GR" }/>
                </ul>
            </header>
            { isMobile && <div onClick={ closeSidebar } data-infoopen={ isSidebarOpen } className={ "header__quick-info__overlay" }/> }
        </>
    );
};

export default Header;


