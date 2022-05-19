import { IGatsbyImageData } from "gatsby-plugin-image";

export type TypeReduceMotion = boolean | null;

export type TypeLocale = "en" | "el"

export type Translatable = {
    en: string,
    el?: string
}

export type TypeImage = {
    relativePath: string
    childImageSharp: {
        fluid: {
            src: string
            originalImg: string
        }
        original: {
            src: string
        }
        gatsbyImageData: IGatsbyImageData
    }
}

export type RecaptchaResponse = {
    success: true,
    challenge_ts: string,
    hostname: string,
    score: number,
    action: string
} | {
    success: false,
    'error-codes': string[]
}
