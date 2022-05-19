import nodemailer from "nodemailer";
import { Handler } from "@netlify/functions";
import { TContactDetails } from "@types";
import { getRecaptchaServer } from "../misc/utils";

const transporter = nodemailer.createTransport( {
    service: 'gmail',
    auth   : {
        user: process.env.NODEMAILER_GOOGLE_EMAIL,
        pass: process.env.NODEMAILER_GOOGLE_APP_PASSWORD
    }
} );


const handler: Handler = async ( event ) => {
    if (!event.body) {
        return {
            statusCode: 400,
            body      : JSON.stringify( { message: "Empty form." } )
        }
    }

    const data: TContactDetails = JSON.parse( event.body )

    if (process.env.NODE_ENV === "development") {
        return {
            statusCode: 200,
            body      : JSON.stringify( { message: template( data ) } )
        }
    }

    const recaptchaResponse = await getRecaptchaServer( data.recaptcha_response )
    if (!recaptchaResponse.success) {
        return {
            statusCode: 400,
            body      : JSON.stringify( { message: `reCaptcha Failed` } )
        }
    }

    const mailOptions = {
        from   : process.env.NODEMAILER_EMAIL_FROM,
        to     : process.env.NODEMAILER_EMAIL_TO,
        subject: 'Contact Submission - ManosM',
        html   : template( data )
    };

    try {
        let info = await transporter.sendMail( mailOptions )
        return {
            statusCode: 200,
            body      : JSON.stringify( { message: `Email sent: ${ info.response }` } )
        }
    } catch (e) {
        if (e instanceof Error) {
            return {
                statusCode: 400,
                body      : JSON.stringify( { message: `There was an error: ${ e.message }` } )
            }
        } else {
            return {
                statusCode: 400,
                body      : JSON.stringify( { message: `Unknown error`, error: e } )
            }
        }
    }
}

function template( data: TContactDetails ) {
    return `<div style="background: #1b172b; width: 100%; font-family: sans-serif; padding: 60px 0;">
      <div style="max-width: 800px; margin: auto; background: #fff">
        <h1 style="text-align: center; margin: 0; padding: 15px; background: #302a4d; color: #00ccb4;">
          Contact from ManosM
        </h1>
        <div style="font-size: 16px; padding: 20px">
          <p>From: <b>${ data.firstName } ${ data.lastName }</b></p>
          <p>Email: <b>${ data.email }</b></p>
          <p>${ data.message }</p>
        </div>
      </div>
    </div>`;
}

export { handler };
