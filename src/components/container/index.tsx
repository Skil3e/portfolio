import React, { ComponentPropsWithoutRef, ElementType } from "react";
import classNames from "classnames";

interface IContainer<T extends ElementType> {
    as?: T
    removePaddingX?: true
    removePaddingY?: true
    size?: "small" | "lg"
}

const Container = <T extends ElementType = "div">( { as, children, ...props }: IContainer<T> & ComponentPropsWithoutRef<T> ) => {
    const Component = as || "div"
    const { className, removePaddingX, removePaddingY, size, ...rest } = props
    return (
        <Component { ...rest } className={ classNames( "container", size && `container--${ size }`, removePaddingX ? "" : "container--px", removePaddingY ? "" : "container--py", className ) }>
            { children }
        </Component>
    )
}

export default Container
