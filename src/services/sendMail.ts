import { getRecaptchaClient } from "@services";

type SendMail<T> = {
    url: string
    data: T
    onSuccess?: ( res: { message: string } ) => void
    recaptchaErrorCallback: ( e: Error ) => void
    fetchErrorCallback: ( e: Error ) => void
}

export async function sendMail<T>( { url, data, onSuccess, recaptchaErrorCallback, fetchErrorCallback }: SendMail<T> ) {
    const recaptcha_response = await getRecaptchaClient( recaptchaErrorCallback )
    const final = { ...data, recaptcha_response };

    if (process.env.NODE_ENV === "development") {
        console.log( final )
    }

    await fetch( url, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify( final )
    } ).then( async ( res ) => {
        const response = await res.json()
        onSuccess && onSuccess( response )
    } ).catch( e => {
        fetchErrorCallback( e )
    } )

}
