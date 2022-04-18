import React, { FC, HTMLAttributes } from "react";
import { useToggleSidebar, useIsSidebarOpen } from "@utilities";
import { Button } from "@components";
import classNames from "classnames";
import LanguageToggle from "../language-toggle";

interface IHeader {

}

const Header: FC<IHeader> = () => {
    const isSidebarOpen = useIsSidebarOpen()
    const toggleSidebar = useToggleSidebar()
    return (
        <header className={ "main-header" }>
            <LanguageToggle/>
            <Button className={ "sidebar__toggle" } look={ "empty" } onClick={ toggleSidebar } data-state={ isSidebarOpen ? "open" : "closed" }>
                <span className={ "sr-only" }>Toggle Menu</span>
                <MenuToggle isOpen={ isSidebarOpen }/>
            </Button>
        </header>
    )
}

export default Header

export interface MenuToggleProps extends HTMLAttributes<HTMLDivElement> {
    isOpen: boolean
}

const MenuToggle = React.forwardRef(
    ( props: MenuToggleProps, ref?: React.Ref<HTMLDivElement> ) => {
        const { isOpen, ...rest } = props;
        const className = classNames( "menu-toggle", props.className, (isOpen ? " menu-toggle--open" : "") );
        return (
            <div { ...rest } ref={ ref } className={ className }>
                <div className={ `menu-toggle__dot bg--text` }/>
                <div className={ `menu-toggle__dot bg--text` }/>
                <div className={ `menu-toggle__dot bg--text` }/>
            </div>
        )
    } )
