import React, { FC, PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { TypeExperienceItem } from "@types";

type TypeExperience = PropsWithChildren<{
    experience: TypeExperienceItem[]
}>

const Experience: FC<TypeExperience> = ( { experience } ) => {
    return (
        <motion.ul
            className={ "experience__timeline" } role={ "list" }
            initial={ { opacity: 0, x: -30 } }
            whileInView={ { opacity: 1, x: 0 } }
            viewport={ { margin: "0px 0px -250px 0px", once: true } }
        >
            { experience.map( xp => {
                return (
                    <motion.li key={ xp.id } className={ "experience__item flow" }
                               initial={ { opacity: 0, scale: .9, y: 50, transformOrigin: "left" } }
                               whileInView={ { opacity: 1, scale: 1, y: 0 } }
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
