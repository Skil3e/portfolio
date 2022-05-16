import React, { FC } from "react";
import { graphql, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { motion } from "framer-motion";
import { BaseLayout } from "@layouts";
import { Button, Container, ProjectSummary, ContactForm } from "@components";
import experience from "@data/experience.json";
import skills from "@data/skills.json";
import Arrows from "@icons/arrows.svg";
import Waves from "@icons/waves.svg";
import Noodle from "@icons/noodle.svg";
import { TypeImage, TypeProject } from "@types";

type IndexData = {
    profilePic: TypeImage
    allWebsiteProjects: {
        nodes: {
            projects: TypeProject[]
        }[]
    }
}
type IndexContext = {
    locale: string
}

const Index: FC<React.PropsWithChildren<PageProps<IndexData, IndexContext>>> = ( { data } ) => {
    console.log( data.allWebsiteProjects );
    return (
        <BaseLayout removeHeaderPadding>
            <Container as={ "section" } size={ "lg" } className={ "home-section section-spacing intro" } removePaddingY aria-label={ "About Manos Menexis" }>
                <div className={ "avatar" }>
                    <GatsbyImage className={ "avatar__image-wrapper" } image={ data.profilePic.childImageSharp.gatsbyImageData } alt={ "Manos Menexis" } />
                </div>

                <div className={ "flow" }>
                    <div className={ "intro__title" }>
                        <motion.div variants={ fadeRight }>
                            <Arrows className={ "intro__title__arrows" } />
                        </motion.div>
                        <motion.h1 variants={ fadeName } className={ "intro__title__label" }>Manos Menexis</motion.h1>
                    </div>

                    <motion.h2 className={ "intro__subtitle " } variants={ introSubTitleVariants }>
                        Creative <span className={ "text--outline" }>Developer</span>
                        <Waves className={ "intro__subtitle__waves" } />
                    </motion.h2>

                    <div className={ "intro__info" }>
                        <motion.div className={ "intro__about flow" } variants={ introAboutVariants }>
                            <p>I'm a 30 years old Creative Director & Frontend Developer from Athens (Greece). I love good design quality with functionality and i have an obsession for detail. I like
                                to combine my knowledge, on product / graphic design, web development, music and video to get a result as complete and great as possible.</p>
                            <p>I consider accessibility and best practices very important and I try to incorporate them as much as possible. Brand consistency is also something that I am really
                                passionate about because it elevates trust, recognition and memorability of the products and/or services provided.</p>
                            <p>I love what i do and I am committed to provide the best possible solution to creative problems while creating memorable user experiences.</p>
                            <Button look={ "primary" } scrollTo={ "contact" }>Contact</Button>
                        </motion.div>

                        <motion.div className={ "skills" } variants={ skillsVariants } viewport={ { margin: "0px 0px -50px 0px" } }>
                            <motion.h2 className={ "text--c-accent " }>Skills</motion.h2>
                            <div className={ "skill-tags" }>
                                { skills.map( skill =>
                                    <motion.span className={ "skill__tag" } key={ skill } variants={ skillBadgeVariants }>{ skill }</motion.span>,
                                ) }
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>

            <section className={ "section--bg-2" } aria-label={ "Experience" }>
                <Container size={ "lg" } className={ "home-section experience" } removePaddingY>
                    <motion.h2 className={ "noodle__title text--c-accent" } initial={ { opacity: 0, x: 30 } } whileInView={ { opacity: 1, x: 0 } }
                               viewport={ { margin: "0px 0px -150px 0px", once: true } }>
                        <Noodle className={ "noodle__noodle" } />
                        Experience
                    </motion.h2>

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
                </Container>
            </section>

            <Container as={ "section" } size={ "lg" } className={ "section-spacing projects" } removePaddingY aria-label={ "Projects" }>
                <motion.h2
                    className={ "noodle__title text--c-accent" }
                    initial={ { opacity: 0, x: 30 } }
                    whileInView={ { opacity: 1, x: 0 } }
                    viewport={ { margin: "0px 0px -150px 0px", once: true } }
                >
                    <Noodle className={ "noodle__noodle" } />
                    Projects
                </motion.h2>

                <ul className={ "project-summary-grid" } role={ "list" }>
                    { data.allWebsiteProjects.nodes[0].projects.map( project => (
                        <motion.li key={ project.id }
                                   initial={ { opacity: 0, y: 50 } }
                                   whileInView={ { opacity: 1, y: 0 } }
                                   viewport={ { margin: "0px 0px -250px 0px", once: true } }
                        >
                            <ProjectSummary key={ project.id } project={ project } />
                        </motion.li>
                    ) ) }
                </ul>
            </Container>

            <section className={ "section--bg-2" } id={ "contact" } aria-label={ "Contact" }>
                <Container size={ "lg" } removePaddingY>
                    <motion.h2
                        className={ "noodle__title text--c-accent" }
                        initial={ { opacity: 0, x: 30 } }
                        whileInView={ { opacity: 1, x: 0 } }
                        viewport={ { margin: "0px 0px -150px 0px", once: true } }
                    >
                        <Noodle className={ "noodle__noodle" } />
                        Get in touch
                    </motion.h2>

                    <ContactForm />
                </Container>
            </section>
        </BaseLayout>
    );
};

export default Index;

export const query = graphql`
    query HomepageQuery {
        profilePic: file(relativePath: {eq: "avatar-duotone.png"}) {
            relativePath
            childImageSharp {
                gatsbyImageData(width: 320)
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
