import React, { ComponentPropsWithoutRef, ElementType } from "react";
import classNames from "classnames";
import { TypeProject } from "@types";
import { GatsbyImage } from "gatsby-plugin-image";


interface IProjectSummary<T extends ElementType, H extends ElementType> {
    as?: T
    titleAs?: H
    project: TypeProject
}

const ProjectSummary = <T extends ElementType = "li", H extends ElementType = "h3">( { as, titleAs, ...props }: IProjectSummary<T, H> & ComponentPropsWithoutRef<T> ) => {
    const Component = as || "div"
    const Title = titleAs || "h3"
    const { className, project, ...rest } = props
    return (
        <Component { ...rest } className={ classNames( "project-summary", className ) }>
            <a className={ "project-summary__link" } href={ project.websiteUrl }>
                { project.introImage && <GatsbyImage className={ "project-summary__image" } objectFit={ "contain" } image={ project.introImage?.localFile.childImageSharp.gatsbyImageData } alt={ "Manos Menexis" }/> }
                <div className={ "project-summary__info" }>
                    <Title className={ "project-summary__title" }>{ project.title.replace( " Website", "" ) }</Title>
                </div>
            </a>
        </Component>
    )
}

export default ProjectSummary
