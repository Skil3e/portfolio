import React, { FC, ReactNode } from "react";
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import { smoothScroll } from "./btnUtils";
import classNames from "classnames"

type IButton = {
    className?: string
    look?: 'primary' | 'secondary' | 'minimal' | 'empty' | 'navLink'
    icon?: ReactNode
    disabled?: boolean
    onClick?: ( e?: any ) => void
    title?: string
    tabIndex?: number
    type?: 'submit' | 'reset' | 'button'
} & (
    | { to: string; scrollTo?: false, isNavLink?: true, notInline?: false, partiallyCurrent?: true, activeCls?: string, inactiveCls?: string }
    | { to?: false; scrollTo: string, isNavLink?: false, notInline?: true, partiallyCurrent?: false, activeCls?: false, inactiveCls?: false }
    | { to?: false; scrollTo?: false, isNavLink?: false, notInline?: true, partiallyCurrent?: false, activeCls?: false, inactiveCls?: false }
    )


const Button: FC<React.PropsWithChildren<IButton>> = ( {
                                  className,
                                  to,
                                  onClick,
                                  children,
                                  look = "minimal",
                                  icon,
                                  disabled,
                                  title,
                                  tabIndex,
                                  scrollTo,
                                  isNavLink,
                                  partiallyCurrent,
                                  activeCls = "active",
                                  inactiveCls,
                                  notInline,
                                  type,
                                  ...rest
                              } ) => {

    const cls = classNames( "btn", notInline && "btn--block", look, className )

    const navLinkProps = ( { isCurrent, isPartiallyCurrent }: { isCurrent: boolean, isPartiallyCurrent: boolean } ) => {
        if (!isNavLink) return
        return {
            className: classNames( `nav-link`, className, (partiallyCurrent ? isPartiallyCurrent ? activeCls : inactiveCls : isCurrent ? activeCls : inactiveCls) )
        }
    }

    if (to) {
        return (
            <Link to={ to } onClick={ onClick } className={ cls } disabled={ disabled } title={ title } tabIndex={ tabIndex }
                  getProps={ navLinkProps }>
                { icon }
                { children }
            </Link>
        )
    }

    if (scrollTo) {
        return (
            <button onClick={ async ( e ) => {
                smoothScroll( scrollTo )
                onClick && onClick( e )
            } } className={ cls } disabled={ disabled } title={ title } tabIndex={ tabIndex }>
                { children }
            </button>
        )
    }

    return (
        <button onClick={ onClick } className={ cls } disabled={ disabled } title={ title } tabIndex={ tabIndex } type={ type } { ...rest }>
            { children }
        </button>
    )
}

export default Button
