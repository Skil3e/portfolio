import React, { FC } from "react";
import classNames from "classnames";

type TypeLoadingState = {
    className?: string
}

const LoadingState: FC<TypeLoadingState> = ( { className } ) => {
    const duration = "600ms";
    return (
        <div className={ classNames( "loading-state", className ) } style={ { display: "inline-flex" } }>
            <svg className={ "loader" } xmlns="http://www.w3.org/2000/svg" viewBox={ "0 0 40 10" } width={ 40 } fill={ "currentColor" }>
                <circle cx="5" cy="5" r="5">
                    <animate attributeType={ "XML" } attributeName="r" values={ "0;5;" } dur={ duration } repeatCount={ "indefinite" }/>
                </circle>
                <circle cx="5" cy="5" r="5">
                    <animate attributeType={ "XML" } attributeName="cx" values={ "5;20;" } dur={ duration } repeatCount={ "indefinite" }/>
                </circle>
                <circle cx="20" cy="5" r="5">
                    <animate attributeType={ "XML" } attributeName={ "cx" } values={ "20;35;" } dur={ duration } repeatCount={ "indefinite" }/>
                </circle>
                <circle cx="35" cy="5" r="5">
                    <animate attributeType={ "XML" } attributeName="r" values={ "5;0;" } dur={ duration } repeatCount={ "indefinite" }/>
                </circle>
            </svg>
        </div>
    )
}

export default LoadingState
