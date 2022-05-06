import React, { FC } from "react";

interface IFooter {

}

const Footer: FC<React.PropsWithChildren<IFooter>> = () => {
    return (
        <footer className={ "footer" }>
            <div className={ "footer__copyright" }>© { new Date().getFullYear() } ManosM</div>
        </footer>
    )
}

export default Footer
