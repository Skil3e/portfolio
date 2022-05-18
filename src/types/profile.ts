import { RenderRichTextData } from "gatsby-source-contentful/rich-text";

export type TypeProfile = {
    firstname: string
    lastname: string
    title: string
    degree: string
    location: string
    email: string
    skills: string[]
    about: RenderRichTextData<any>
}
