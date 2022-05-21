import React, { ComponentPropsWithoutRef, ElementType } from "react";
import { TypeProject, TypeReduceMotion } from "@types";
import { GatsbyImage } from "gatsby-plugin-image";
import classNames from "classnames";
import { motion, useReducedMotion } from "framer-motion";


interface IProjectSummary<T extends ElementType, H extends ElementType> {
    as?: T
    titleAs?: H
    titleClassName?: string
    project: TypeProject
}

const ProjectSummary = <T extends ElementType = "li", H extends ElementType = "h3">( { as, titleAs, ...props }: IProjectSummary<T, H> & ComponentPropsWithoutRef<T> ) => {
    const Component = as || "li";
    const Title = titleAs || "h3"
    const { titleClassName, project, ...rest } = props
    const reduceMotion = useReducedMotion()
    const AnimatedWrapper = motion( Component );
    return (
        <AnimatedWrapper { ...rest }
                         variants={ projectSummaryItemVariants( reduceMotion ) }
                         initial={ "hidden" }
                         whileInView={ "show" }
                         viewport={ { margin: "0px 0px -250px 0px", once: true } }
        >
            <a className={ classNames( "project-summary__link", titleClassName ) } href={ project.websiteUrl } target={ "_blank" } rel={ "noopener noreferrer" }>
                <div className={ "project-summary__link-icon" }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>
                    </svg>
                </div>
                { project.introImage &&
                    <GatsbyImage className={ "project-summary__image" } objectFit={ "contain" } image={ project.introImage?.localFile.childImageSharp.gatsbyImageData } alt={ "Manos Menexis" }/>
                }
                <div className={ "project-summary__info" }>
                    <Title className={ "project-summary__title" }>{ project.title.replace( " Website", "" ) }</Title>
                </div>
            </a>
        </AnimatedWrapper>
    )
}

export default ProjectSummary

const projectSummaryItemVariants = ( reduceMotion: TypeReduceMotion ) => ({
    hidden: {
        y      : reduceMotion ? 0 : 50,
        opacity: 0,
    },
    show  : {
        y      : 0,
        opacity: 1
    },
});
