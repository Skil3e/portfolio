import { Document } from "@contentful/rich-text-types";
import { TypeImage } from "./general";

export type TypeProject = {
    id: string
    featureImage?: {
        localFile: TypeImage
    }
    title: string;
    slug: string;
    isFeatured?: boolean | undefined;
    categories?: Queries.ContentfulProjectCategories[] | undefined;
    tags?: string[] | undefined;
    websiteUrl?: string | undefined;
    description?: Document | undefined;
    introImage?: {
        localFile: TypeImage
    };
    gallery?: {
        localFile: TypeImage[]
    };
}
