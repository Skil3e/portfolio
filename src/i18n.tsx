import { useLocalization } from "gatsby-theme-i18n"

type TypeTranslations = {
    [key: string]: string
}

const translations: TypeTranslations = {
    "Home"        : "Αρχική",
    "Contact"     : "Επικοινωνία",
    "First Name"  : "Όνομα",
    "Last Name"   : "Επώνυμο",
    "Phone"       : "Τηλέφωνο",
    "Message"     : "Μήνυμα",
    "Send"        : "Αποστολή",
}

export default function t( string: string ) {
    const { locale } = useLocalization();
    return translationMap( string, locale )
}

export function translationMap( string: string, locale: string ) {
    if (locale === 'en') {
        return string
    } else {
        return translations[string] ?? string
    }
}
