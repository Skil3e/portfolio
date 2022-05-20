import React, { FC } from "react";
import { SocialMedia } from "@components";

interface IFooter {

}

const Footer: FC<React.PropsWithChildren<IFooter>> = () => {
    return (
        <footer className={ "footer" }>
            <div className={ "footer__copyright" }>
                <p>© { new Date().getFullYear() } Manos Menexis</p>
                <SocialMedia/>
            </div>

        </footer>
    )
}

export default Footer
