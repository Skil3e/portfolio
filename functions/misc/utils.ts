import { RecaptchaResponse } from "../../src/types";
import fetch from "node-fetch";

export async function getRecaptchaServer( recaptcha_response: string ): Promise<RecaptchaResponse> {
    const reCaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${ process.env.GOOGLE_RECAPTCHA_PRIVATE_KEY }&response=${ recaptcha_response }`;
    const result = await fetch( reCaptchaUrl, {
        method: 'POST',
    } )
    return await result.json() as Promise<RecaptchaResponse>
}
