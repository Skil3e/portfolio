import withContext from "./src/app/WrapRootElement";
import WithAnimationAndCookies from "./src/app/WrapPageElement";
import smoothScroll from "smoothscroll-polyfill"
import "./src/styles/index.scss"

export const onClientEntry = () => {
    smoothScroll.polyfill();
}

export const wrapRootElement = withContext
export const wrapPageElement = WithAnimationAndCookies

