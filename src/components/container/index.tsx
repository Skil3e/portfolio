import React, { HTMLAttributes } from "react";
import classNames from "classnames";

interface IContainer extends HTMLAttributes<HTMLDivElement> {
    removePaddingX?: true
    removePaddingY?: true
    size?: "lg"
}


const Container = React.forwardRef( ( props: IContainer, ref?: React.Ref<HTMLDivElement> ) => {
    const { children, className, removePaddingX, removePaddingY, size, ...rest } = props
    return (
        <div { ...rest } ref={ ref } className={ classNames( "container", size && `container--${ size }`, removePaddingX ? "" : "container--px", removePaddingY ? "" : "container--py", className ) }>
            { children }
        </div>
    )
} )


export default Container
