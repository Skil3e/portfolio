import React, { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";
import Noodle from "@icons/noodle.svg";
import { motion, useReducedMotion } from "framer-motion";
import classNames from "classnames";
import { TypeReduceMotion } from "@types";

type TypeNoodleTitle<T extends ElementType> = PropsWithChildren<{
    as?: T
}>

const NoodleTitle = <T extends ElementType = "h2">( { as, children, ...props }: TypeNoodleTitle<T> & ComponentPropsWithoutRef<T> ) => {
    const Component = as || "h2";
    const { className, ...rest } = props;
    const reduceMotion = useReducedMotion()
    const AnimatedTitle = motion( Component );
    return (
        <AnimatedTitle { ...rest }
                       className={ classNames( "noodle__title text--c-accent", className ) }
                       variants={ noodleTitleVariants( reduceMotion ) }
                       initial={ "hidden" }
                       whileInView={ "show" }
                       viewport={ { margin: "0px 0px -150px 0px", once: true } }
        >
            <Noodle className={ "noodle__noodle" }/>
            { children }
        </AnimatedTitle>
    );
};

export default NoodleTitle;

const noodleTitleVariants = ( reduceMotion: TypeReduceMotion ) => ({
    hidden: {
        x      : reduceMotion ? 0 : 30,
        opacity: 0
    },
    show  : {
        x      : 0,
        opacity: 1
    }
})
