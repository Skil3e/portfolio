import fetch from "node-fetch";
import nodemailer from "nodemailer";
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { RecaptchaResponse, TContactDetails } from "@types";

const transporter = nodemailer.createTransport( {
    service: "gmail",
    auth   : {
        user: process.env.NODEMAILER_GOOGLE_EMAIL,
        pass: process.env.NODEMAILER_GOOGLE_APP_PASSWORD,
    },
} );

export default async function handler( req: GatsbyFunctionRequest, res: GatsbyFunctionResponse ) {
    const data: TContactDetails = req.body;

    if (process.env.NODE_ENV === "development") {
        return res.status( 200 ).json( { message: template( data ) } );
    }

    const recaptchaResponse = await getRecaptchaServer( data.recaptcha_response );

    if (!recaptchaResponse.success) {
        return res.status( 400 ).json( { message: `reCaptcha Failed` } );
    }

    const mailOptions = {
        from   : process.env.NODEMAILER_EMAIL_FROM,
        to     : process.env.NODEMAILER_EMAIL_TO,
        subject: "Room Request",
        html   : template( data ),
    };

    transporter.sendMail( mailOptions, function( error, info ) {
        if (error) {
            return res.status( 400 ).json( { message: `There was an error: ${ error.message }` } );
        } else {
            return res.status( 200 ).json( { message: `Email sent: ${ info.response }` } );
        }
    } );
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
          <p>Phone: <b>${ data?.phone }</b></p>
          <p>${ data.message }</p>
        </div>
      </div>
    </div>`;
}

export async function getRecaptchaServer( recaptcha_response: string ): Promise<RecaptchaResponse> {
    const reCaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${ process.env.GOOGLE_RECAPTCHA_PRIVATE_KEY }&response=${ recaptcha_response }`;
    const result = await fetch( reCaptchaUrl, {
        method: "POST",
    } );
    return await result.json() as RecaptchaResponse;
}
