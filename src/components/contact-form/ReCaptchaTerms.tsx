import React, { FC } from "react";
import { useLocalization } from "gatsby-theme-i18n";

interface IReCaptchaTerms {

}

const ReCaptchaTerms: FC<IReCaptchaTerms> = () => {
    const { locale } = useLocalization()
    return (
        <div className={ "recaptcha-terms" }>
            { locale === "en" ?
                <p>
                    This site is protected by reCAPTCHA and the Google <a target={ "_blank" } rel={ "noopener noreferrer" } href="https://policies.google.com/privacy">Privacy Policy</a> and <a target={ "_blank" } rel={ "noopener noreferrer" } href="https://policies.google.com/terms">Terms of Service</a> apply.
                </p>
                :
                <p>
                    Αυτή η ιστοσελίδα προστατεύεται από reCAPTCHA και την <a target={ "_blank" } rel={ "noopener noreferrer" } href="https://policies.google.com/privacy?hl=el">Πολιτική Απορρήτου</a> και τους <a target={ "_blank" } rel={ "noopener noreferrer" } href="https://policies.google.com/terms?hl=el">Όρους Παροχής Υπηρεσιών</a> της Google.
                </p>
            }
        </div>
    )
}

export default ReCaptchaTerms
