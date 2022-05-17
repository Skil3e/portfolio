import React, { FC } from "react";
import { SEO } from "@components";
import { Footer, Header } from "@layouts";
import { motion } from "framer-motion";
import classNames from "classnames";

interface IBaseLayout {
    title?: string
    description?: string
    image?: string
    type?: "website",
    staggerChildren?: number
    removeHeaderPadding?: boolean
}

const BaseLayout: FC<React.PropsWithChildren<IBaseLayout>> = ( {
                                                                   children,
                                                                   title,
                                                                   description,
                                                                   image,
                                                                   type,
                                                                   staggerChildren = .2,
                                                                   removeHeaderPadding,
                                                               } ) => {
    const container = {
        hidden: {
            opacity: 0,
        },
        show  : {
            opacity   : 1,
            transition: {
                staggerChildren,
            },
        },
    };
    return (
        <>
            <SEO title={ title } description={ description } type={ type } image={ image }/>
            <Header/>
            <motion.main className={ classNames( "base-layout__main", removeHeaderPadding && "remove-padding" ) } variants={ container } initial={ "hidden" } animate={ "show" }
                         whileInView={ "inView" }
                         exit={ "hidden" }>
                { children }
            </motion.main>
            <Footer/>
        </>
    );
};

export default BaseLayout;
