import React, { HTMLAttributes } from "react";
import classNames from "classnames";

type TypeMenuToggle = HTMLAttributes<HTMLDivElement> & {
    label?: string
    isOpen: boolean;
}

const MenuToggle = React.forwardRef(
    ( props: TypeMenuToggle, ref?: React.Ref<HTMLDivElement> ) => {
        const { isOpen, label, ...rest } = props;
        const className = classNames( "menu-toggle", props.className, (isOpen ? " menu-toggle--open" : "") );
        return (
            <div { ...rest } ref={ ref } className={ className }>
                <div className={ `menu-toggle__dot bg--text` }/>
                <div className={ `menu-toggle__dot bg--text` }/>
                <div className={ `menu-toggle__dot bg--text` }/>
                <span className={ "sr-only" }>{ label }</span>
            </div>
        );
    } );

export default MenuToggle;
