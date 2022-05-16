export type TPerson = {
    firstName: string
    lastName: string
    email: string
    phone?: string
}

export type TFormFields = {
    recaptcha_response: string
    general?: string
}

export type TContactDetails = TPerson & TFormFields & {
    message: string
}
