import React, { ComponentPropsWithoutRef, ElementType } from "react";
import { TypeProject } from "@types";
import { GatsbyImage } from "gatsby-plugin-image";
import classNames from "classnames";


interface IProjectSummary<H extends ElementType> {
    titleAs?: H
    project: TypeProject
}

const ProjectSummary = <H extends ElementType = "h3">( { titleAs, ...props }: IProjectSummary<H> & ComponentPropsWithoutRef<H> ) => {
    const Title = titleAs || "h3"
    const { className, project } = props

    return (
        <a className={ classNames( "project-summary__link", className ) } href={ project.websiteUrl } target={ "_blank" } rel={ "noopener noreferrer" }>
            <div className={ "project-summary__link-icon" }>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>
                </svg>
            </div>
            { project.introImage && <GatsbyImage className={ "project-summary__image" } objectFit={ "contain" } image={ project.introImage?.localFile.childImageSharp.gatsbyImageData } alt={ "Manos Menexis" }/> }
            <div className={ "project-summary__info" }>
                <Title className={ "project-summary__title" }>{ project.title.replace( " Website", "" ) }</Title>
            </div>
        </a>
    )
}

export default ProjectSummary
