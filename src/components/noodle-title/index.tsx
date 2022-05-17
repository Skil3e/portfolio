import React, { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";
import Noodle from "@icons/noodle.svg";
import { motion } from "framer-motion";
import classNames from "classnames";

type TypeNoodleTitle<T extends ElementType> = PropsWithChildren<{
    as?: T
}>

const NoodleTitle = <T extends ElementType = "h2">( { as, children, ...props }: TypeNoodleTitle<T> & ComponentPropsWithoutRef<T> ) => {
    const Component = as || "h2";
    const { className, ...rest } = props;
    const AnimatedTitle = motion( Component );
    return (
        <AnimatedTitle { ...rest }
                       className={ classNames( "noodle__title text--c-accent", className ) }
                       initial={ { opacity: 0, x: 30 } }
                       whileInView={ { opacity: 1, x: 0 } }
                       viewport={ { margin: "0px 0px -150px 0px", once: true } }
        >
            <Noodle className={ "noodle__noodle" } />
            { children }
        </AnimatedTitle>
    );
};

export default NoodleTitle;
