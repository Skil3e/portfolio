import React, { FC, PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TypeExperienceItem, TypeReduceMotion } from "@types";

type TypeExperience = PropsWithChildren<{
    experience: TypeExperienceItem[]
}>

const Experience: FC<TypeExperience> = ( { experience } ) => {
    const reduceMotion = useReducedMotion()
    return (
        <motion.ul
            className={ "experience__timeline" } role={ "list" }
            variants={ listVariants( reduceMotion ) }
            initial={ "hidden" }
            whileInView={ "show" }
            viewport={ { margin: "0px 0px -250px 0px", once: true } }
        >
            { experience.map( xp => {
                return (
                    <motion.li key={ xp.id } className={ "experience__item flow" }
                               variants={ listItemVariants( reduceMotion ) }
                               initial={ "hidden" }
                               whileInView={ "show" }
                               viewport={ { margin: "0px 0px -250px 0px", once: true } }
                    >
                        <p className={ "experience__item__date" }>{ xp.from } - { xp.to }</p>
                        <h3 className={ "experience__item__company text--c-accent" }>{ xp.company }</h3>
                        <p className={ "experience__item__title" }>{ xp.title }</p>
                    </motion.li>
                );
            } ) }
        </motion.ul>
    );
};

export default Experience;

const listVariants = ( reduceMotion: TypeReduceMotion ) => ({
    hidden: {
        x      : reduceMotion ? 0 : -30,
        opacity: 0
    },
    show  : {
        x      : 0,
        opacity: 1
    }
})

const listItemVariants = ( reduceMotion: TypeReduceMotion ) => ({
    hidden: {
        y              : reduceMotion ? 0 : 50,
        scale          : reduceMotion ? 1 : .9,
        opacity        : 0,
        transformOrigin: "left"
    },
    show  : {
        y      : 0,
        scale  : 1,
        opacity: 1
    }
})
