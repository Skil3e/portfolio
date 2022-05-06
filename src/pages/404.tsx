import React, { FC } from "react"
import { PageProps } from "gatsby";
import { BaseLayout } from "@layouts";

type NotFoundData = {}
type NotFoundContext = {
    locale: string
}

const NotFound: FC<React.PropsWithChildren<PageProps<NotFoundData, NotFoundContext>>> = ( {} ) => {
    return (
        <BaseLayout>
            <h1>Not Found</h1>
        </BaseLayout>
    )
}

export default NotFound
