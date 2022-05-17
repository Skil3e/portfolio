import withContext from "./src/app/WrapRootElement";
import WithAnimationAndCookies from "./src/app/WrapPageElement";
import { polyfill as smoothScrollPolyfill } from "smoothscroll-polyfill"
import "./src/styles/index.scss"

export const onClientEntry = () => {
    smoothScrollPolyfill();
}

export const wrapRootElement = withContext
export const wrapPageElement = WithAnimationAndCookies

