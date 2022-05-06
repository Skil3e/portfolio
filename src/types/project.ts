import { Document } from "@contentful/rich-text-types";
import { IProjectCategories } from "./generated/contentful";
import { TypeImage } from "./general";

export type TypeProject = {
    id: string
    featureImage?: {
        localFile: TypeImage
    }
    title: string;
    slug: string;
    isFeatured?: boolean | undefined;
    categories?: IProjectCategories[] | undefined;
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
