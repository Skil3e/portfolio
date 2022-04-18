import { GatsbyNode } from "gatsby"

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({actions}) => {
    const {createTypes} = actions

    createTypes(`
    type SiteSiteMetadata {
      title: String
      description: String
      siteUrl: String
    }
  `)
}
