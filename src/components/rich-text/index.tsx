import React, { FC, PropsWithChildren } from "react";
import { Options } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS, } from "@contentful/rich-text-types"
import { renderRichText, ContentfulRichTextGatsbyReference, RenderRichTextData } from "gatsby-source-contentful/rich-text"

type TypeRichText<T extends ContentfulRichTextGatsbyReference> = {
    bodyRichText?: RenderRichTextData<T> | null
}

const RichText = <T extends ContentfulRichTextGatsbyReference>( { bodyRichText }: TypeRichText<T> ) => {
    return (
        <>{ bodyRichText && renderRichText( bodyRichText, options ) }</>
    )
}

export default RichText

const Text: FC<PropsWithChildren<{}>> = ( { children } ) => <p>{ children }</p>
const Bold: FC<PropsWithChildren<{}>> = ( { children } ) => <strong>{ children }</strong>

const options: Options = {
    renderMark: {
        [MARKS.BOLD]     : text => <Bold>{ text }</Bold>,
        [MARKS.CODE]     : text => <code>{ text }</code>,
        [MARKS.ITALIC]   : text => <em>{ text }</em>,
        [MARKS.UNDERLINE]: text => <span className={ "text--underline" }>{ text }</span>
    },
    renderNode: {
        [BLOCKS.HEADING_1]        : ( _, children ) => <h1>{ children }</h1>,
        [BLOCKS.HEADING_2]        : ( _, children ) => <h2>{ children }</h2>,
        [BLOCKS.HEADING_3]        : ( _, children ) => <h3>{ children }</h3>,
        [BLOCKS.HEADING_4]        : ( _, children ) => <h4>{ children }</h4>,
        [BLOCKS.HEADING_5]        : ( _, children ) => <h5>{ children }</h5>,
        [BLOCKS.HEADING_6]        : ( _, children ) => <h6>{ children }</h6>,
        [BLOCKS.PARAGRAPH]        : ( _, children ) => <Text>{ children }</Text>,
        [BLOCKS.UL_LIST]          : ( _, children ) => <ul>{ children }</ul>,
        [BLOCKS.OL_LIST]          : ( _, children ) => <ol>{ children }</ol>,
        [BLOCKS.LIST_ITEM]        : ( _, children ) => <li>{ children }</li>,
        [BLOCKS.QUOTE]            : ( _, children ) => <blockquote>{ children }</blockquote>,
        [BLOCKS.TABLE]            : ( _, children ) => <table>{ children }</table>,
        [BLOCKS.TABLE_HEADER_CELL]: ( _, children ) => <th>{ children }</th>,
        [BLOCKS.TABLE_ROW]        : ( _, children ) => <tr>{ children }</tr>,
        [BLOCKS.TABLE_CELL]       : ( _, children ) => <td>{ children }</td>,
        [BLOCKS.HR]               : () => <hr/>,
        [BLOCKS.EMBEDDED_ASSET]   : ( node ) => {
            return (
                <>
                    <h2>Embedded Asset</h2>
                    <pre><code>{ JSON.stringify( node, null, 2 ) }</code></pre>
                </>
            )
        },
    },
}
