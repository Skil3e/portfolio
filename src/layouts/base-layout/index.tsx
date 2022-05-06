import React, { FC } from "react";
import { Footer, Header, SEO } from "@components";
import { motion } from "framer-motion";

interface IBaseLayout {
    title?: string
    description?: string
    image?: string
    type?: "website",
    staggerChildren?: number
}

const BaseLayout: FC<React.PropsWithChildren<IBaseLayout>> = ( { children, title, description, image, type, staggerChildren = .2 } ) => {
    const container = {
        hidden: {
            opacity: 0,
        },
        show  : {
            opacity   : 1,
            transition: {
                staggerChildren,
            }
        }
    }
    return (
        <>
            <SEO title={ title } description={ description } type={ type } image={ image }/>
            <Header/>
            <motion.main className={ "base-layout__main" } variants={ container } initial={ "hidden" } animate={ "show" } whileInView={ "inView" } exit={ "hidden" }>{ children }</motion.main>
            <Footer/>
        </>
    )
}

export default BaseLayout
