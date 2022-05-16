export async function getRecaptchaClient( errorCallback?: ( e: Error ) => void ) {
    const reCaptchaKey = process.env.GATSBY_GOOGLE_RECAPTCHA_SITE_KEY;
    if (!reCaptchaKey) {
        errorCallback && errorCallback( new Error( "reCaptcha key is missing." ) )
        return
    }
    const recaptchaAction = window.grecaptcha.execute( reCaptchaKey, { action: "submit" } )
    return await recaptchaAction;
}
