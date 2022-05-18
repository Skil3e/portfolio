import React, { FC } from "react";
import { graphql, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { motion } from "framer-motion";
import { BaseLayout } from "@layouts";
import { Button, Container, ProjectSummary, ContactForm, NoodleTitle, Experience, RichText } from "@components";
import experience from "@data/experience.json";
import Arrows from "@icons/arrows.svg";
import Waves from "@icons/waves.svg";
import { TypeImage, TypeProject, TypeProfile } from "@types";

type HomePageData = {
    profilePic: TypeImage
    allWebsiteProjects: {
        nodes: {
            projects: TypeProject[]
        }[]
    }
    profile: {
        nodes: TypeProfile[]
    }
}

type HomePageContext = {
    locale: string
}

const HomePage: FC<React.PropsWithChildren<PageProps<HomePageData, HomePageContext>>> = ( { data } ) => {
    const profile = data.profile.nodes[0];

    return (
        <BaseLayout removeHeaderPadding>
            <Container as={ "section" } size={ "lg" } className={ "home-section section-spacing intro" } removePaddingY aria-label={ "About Manos Menexis" }>
                <div className={ "avatar" }>
                    <GatsbyImage className={ "avatar__image-wrapper" } image={ data.profilePic.childImageSharp.gatsbyImageData } alt={ "Manos Menexis" }/>
                </div>

                <div className={ "flow" }>
                    <div className={ "intro__title" }>
                        <motion.div variants={ fadeRight }>
                            <Arrows className={ "intro__title__arrows" }/>
                        </motion.div>
                        <motion.h1 variants={ fadeName } className={ "intro__title__label" }>{ profile.firstname } { profile.lastname }</motion.h1>
                    </div>

                    <motion.h2 className={ "intro__subtitle " } variants={ introSubTitleVariants }>
                        <span>{ profile.title.split( " " )[0] }</span>
                        <br/>
                        <span className={ "text--outline" }>{ profile.title.split( " " )[1] } </span>
                        <Waves className={ "intro__subtitle__waves" }/>
                    </motion.h2>

                    <div className={ "intro__info" }>
                        <motion.div className={ "intro__about flow" } variants={ introAboutVariants }>
                            <RichText bodyRichText={ profile.about }/>
                            <Button look={ "primary" } scrollTo={ "contact" }>Contact</Button>
                        </motion.div>

                        <motion.div className={ "skills" } variants={ skillsVariants } viewport={ { margin: "0px 0px -50px 0px" } }>
                            <motion.h2 className={ "text--c-accent " }>Skills</motion.h2>
                            <div className={ "skill-tags" }>
                                { profile.skills?.map( skill =>
                                    <motion.span className={ "skill__tag" } key={ skill } variants={ skillBadgeVariants }>{ skill }</motion.span>,
                                ) }
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>

            <section className={ "section--bg-2" } aria-label={ "Experience" }>
                <Container className={ "home-section experience" } removePaddingY>
                    <NoodleTitle>Experience</NoodleTitle>
                    <Experience experience={ experience }/>
                </Container>
            </section>

            <Container as={ "section" } size={ "lg" } className={ "section-spacing projects" } removePaddingY aria-label={ "Projects" }>
                <NoodleTitle>Projects</NoodleTitle>
                <ul className={ "project-summary-grid" } role={ "list" }>
                    { data.allWebsiteProjects.nodes[0].projects.map( project => (
                        <motion.li key={ project.id }
                                   initial={ { opacity: 0, y: 50 } }
                                   whileInView={ { opacity: 1, y: 0 } }
                                   viewport={ { margin: "0px 0px -250px 0px", once: true } }
                        >
                            <ProjectSummary key={ project.id } project={ project }/>
                        </motion.li>
                    ) ) }
                </ul>
            </Container>

            <section className={ "section--bg-2" } id={ "contact" } aria-label={ "Contact" }>
                <Container removePaddingY>
                    <NoodleTitle>Get in touch</NoodleTitle>
                    <ContactForm/>
                </Container>
            </section>
        </BaseLayout>
    );
};

export default HomePage;

export const query = graphql`
    query HomepageQuery {
        profilePic: file(relativePath: {eq: "avatar-duotone.png"}) {
            relativePath
            childImageSharp {
                gatsbyImageData(width: 320)
            }
        }
        profile: allContentfulProfile(
            filter: {contentful_id: {eq: "51HHmjEV7vNVTRqPgLZ0gN"}, node_locale: {eq: "en-US"}}
        ) {
            nodes {
                firstname
                lastname
                title
                skills
                about {
                    raw
                }
            }
        }
        allWebsiteProjects: allContentfulProjectCategories(
            filter: {contentful_id: {eq: "2I4XBTdyqkBWQL1mVTqssQ"}, node_locale: {eq: "en-US"}}
        ) {
            nodes {
                projects {
                    id
                    title
                    websiteUrl
                    introImage {
                        localFile {
                            childImageSharp {
                                gatsbyImageData(layout: FULL_WIDTH)
                            }
                        }
                    }
                }
            }
        }
    }`;

const fadeRight = {
    hidden: { x: -60, opacity: 0 },
    show  : { x: 0, opacity: 1, transition: { type: "spring" } },
};

const fadeName = {
    hidden: { x: -60, y: -40, opacity: 0 },
    show  : { x: [ -60, 0, 0 ], y: [ -40, -40, 0 ], opacity: [ 0, 1, 1 ], transition: { ease: "easeInOut" } },
};

const introSubTitleVariants = {
    hidden: { letterSpacing: "20px", scale: 1.1, opacity: 0 },
    show  : { letterSpacing: [ "20px", "0px", "0px" ], scale: [ 1.1, 1.1, 1 ], opacity: [ 0, 1, 1 ], transition: { ease: "easeInOut" } },
};

const introAboutVariants = {
    hidden: {
        y      : 40,
        opacity: 0,
    },
    show  : {
        y         : [ 40, 40, 40, 0 ],
        opacity   : [ 0, 0, 0, 1 ],
        transition: {
            ease: "easeInOut",
        },
    },
};

const skillsVariants = {
    hidden: {
        x      : 40,
        opacity: 0,
    },
    show  : {
        x         : [ 40, 40, 40, 0 ],
        opacity   : [ 0, 0, 0, 1 ],
        transition: {
            ease           : "easeInOut",
            staggerChildren: .05,
        },
    },
};

const skillBadgeVariants = {
    hidden: {
        scale  : 0,
        opacity: 0,
    },
    show  : {
        scale     : [ 0, 0, 0, 1 ],
        opacity   : [ 0, 0, 0, 1 ],
        transition: {
            ease: "easeInOut",
        },
    },
};
