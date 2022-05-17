import React, { FC } from "react";
import { Button, Input, PhoneInputWrapper, TextArea } from "@components";
import { useForm } from "react-hook-form";
import { TContactDetails } from "@types";
import { sendMail } from "@services";
import t from "@i18n";
import ReCaptchaTerms from "./ReCaptchaTerms";
import { AnimatePresence, motion } from "framer-motion";
import { fade, fadeLeft, fadeRight } from "@animations";

type TypeContactForm = {}

const defaultValues = {
    firstName         : "",
    lastName          : "",
    email             : "",
    phone             : "+30",
    message           : "",
    recaptcha_response: "",
};

const ContactForm: FC<TypeContactForm> = () => {
    const { register, control, handleSubmit, reset, setError, clearErrors, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<TContactDetails>();

    const onSubmit = handleSubmit( async ( data ) => {
        await sendMail<TContactDetails>( {
            url                   : "/.netlify/functions/send-email",
            data,
            onSuccess             : () => {
                reset( defaultValues );
            },
            recaptchaErrorCallback: () => {
                setError( "general", {
                    type   : "manual",
                    message: "Captcha is missing",
                } );
            },
            fetchErrorCallback    : ( e ) => {
                setError( "general", {
                    type   : "manual",
                    message: e.message,
                } );
            },
        } );
    } );
    return (
        <AnimatePresence>
            <div className={ "contact-form" }>
                { isSubmitSuccessful ? (
                    <motion.div className={ "contact-form__success-message" } variants={ fade } initial={ "hidden" } animate={ "show" } exit={ "hidden" }>
                        <motion.div variants={ fadeRight }>
                            <h2 style={ { fontSize: "var(--font-size-4)", marginBlock: "var(--size-md)" } }>Thank you for your message!</h2>
                            <p>We will get back to you as soon as possible.</p>
                        </motion.div>
                        <motion.svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="498.09869" height="646.465" viewBox="0 0 498.09869 646.465" variants={ fadeLeft }>
                            <path
                                d="M497.85558,369.39014,358.82286,339.39852l-1.80686-.38885a5.00224,5.00224,0,0,0-5.54552,7.10585L406.67216,458.217a5.0183,5.0183,0,0,0,3.72746,2.72926,4.96825,4.96825,0,0,0,4.37912-1.50154l38.34178-40.42814a2.91036,2.91036,0,0,1,2.13875-.93407,3.01064,3.01064,0,0,1,2.67965,1.558l7.8535,14.52626a4.88621,4.88621,0,0,0,5.47116,2.50722l.03909-.00865a4.893,4.893,0,0,0,3.87711-4.6473l1.57322-33.53178a3.05774,3.05774,0,0,1,.307-1.20476,3.254,3.254,0,0,1,.78832-.97333L499.968,378.15066a5.00564,5.00564,0,0,0-2.11243-8.76052Zm.84922,7.21694-22.11962,18.15759a4.93346,4.93346,0,0,0-.77862.78665l-117.235-53.16816a1.74378,1.74378,0,0,0-.32206-.113,2.00253,2.00253,0,0,0-1.66918,3.56479l96.39341,70.80742a4.79554,4.79554,0,0,0-1.30551.99549l-38.34133,40.42792a3.00049,3.00049,0,0,1-4.86432-.73653L353.26092,345.22777a3.00779,3.00779,0,0,1,3.32825-4.25969l1.84977.39973,138.98933,29.98084a3.00669,3.00669,0,0,1,1.27653,5.25843Z"
                                transform="translate(-350.95066 -126.7675)" fill="#00ccb4" />
                            <path
                                d="M527.492,769.29283c-12.47123-3.36845-27.64871-17.37787-24.39937-36.6341,1.61151-9.55,7.79666-15.732,14.20994-19.72938,8.87087-5.52915,18.97378-7.61271,28.70983-8.13908,11.22989-.60717,22.44725.92373,33.59325,2.54269,11.00345,1.59829,22.00778,3.02939,33.06039,3.90316A426.181,426.181,0,0,0,741.70229,701.655q15.6504-3.61166,31.11314-8.47413a213.747,213.747,0,0,0,28.5787-10.6814c12.25583-5.884,32.18686-17.3338,30.56169-38.53888-.86174-11.24352-7.48306-20.2235-14.16178-26.47976-8.07544-7.56463-17.41979-12.54174-26.57194-17.37492-42.57048-22.4815-85.22406-44.6961-127.836-67.04222-9.94515-5.21531-19.95642-10.29093-29.60825-16.40265-9.03649-5.72208-18.03069-12.36888-25.30284-21.55935-6.35165-8.02718-12.02739-18.80349-11.82714-30.84974.16606-9.99023,4.71231-18.46777,10.28032-24.8036,13.7853-15.68634,33.28584-22.0464,50.91043-25.37786,21.89667-4.139,44.11031-4.11759,66.02128-8.11429,17.69177-3.22713,36.59531-9.457,50.98378-24.05564a45.59972,45.59972,0,0,0,12.42882-21.71495,42.67829,42.67829,0,0,0-2.55578-25.76791c-3.89761-9.30966-10.11483-16.72577-16.65218-22.79845a99.91441,99.91441,0,0,0-25.25625-16.87337c-19.43291-9.26029-39.86761-14.08181-59.77313-21.18824-9.76212-3.48516-19.623-7.30685-28.68774-13.29314-7.67975-5.07168-16.04558-11.90785-20.31823-22.07381-8.81554-20.97479,12.21534-33.47549,24.13206-38.21054a155.15636,155.15636,0,0,1,24.94085-7.13994c1.79691-.38581,1.03448-3.97259-.754-3.58863a149.21671,149.21671,0,0,0-26.19085,7.64761c-7.18613,2.98571-14.60076,6.9095-20.24543,13.66154a28.43768,28.43768,0,0,0-6.42551,22.23459c1.4951,10.0639,7.99422,17.81842,14.098,23.43518,8.07158,7.42755,17.27457,12.27825,26.6055,16.23233,9.82719,4.16437,19.86291,7.40982,29.89527,10.59326,20.04681,6.36116,40.993,12.03,59.0898,25.5661,12.65931,9.469,29.85671,27.22287,25.64575,49.2291-1.86927,9.76868-7.54569,17.40622-13.67139,23.0237a79.6032,79.6032,0,0,1-24.484,14.88719c-40.10267,16.13908-84.23837,4.59774-123.3075,26.518-13.28375,7.453-29.41873,21.02272-29.54861,42.37352-.06743,11.09128,4.37845,21.26357,9.87491,29.30381,6.5832,9.63,15.108,16.75124,23.78148,22.703a276.82338,276.82338,0,0,0,28.39866,16.44217q16.03077,8.42025,32.06858,16.81772l64.884,34.02583L785.05473,600.852c9.83916,5.15974,19.931,10.10922,28.877,17.68346,7.32486,6.20174,15.979,16.37607,15.23163,29.00981-.5935,10.03327-7.25874,17.27376-13.34932,22.11458-7.88668,6.26837-16.74607,10.32273-25.56086,13.69186-10.16729,3.886-20.50176,7.10958-30.85626,10.00791a416.59168,416.59168,0,0,1-64.73684,12.67106A425.69163,425.69163,0,0,1,628.895,708.482q-16.6374-.66953-33.22314-2.66157c-11.39758-1.37281-22.74638-3.48763-34.17334-4.4259-10.33591-.8487-20.77138-.652-30.95021,2.07575-8.49907,2.27761-17.47811,6.33735-23.92963,14.2589a31.54336,31.54336,0,0,0-6.69562,21.30473,38.25646,38.25646,0,0,0,7.84294,21.11157,35.4889,35.4889,0,0,0,18.97222,12.7361c1.78156.48118,2.54349-3.10534.754-3.58863Z"
                                transform="translate(-350.95066 -126.7675)" fill="#e6e6e6" />
                            <rect x="174.06608" y="644.22427" width="324.03261" height="2.24072" fill="#3f3d56" />
                            <circle cx="472.13713" cy="517.5024" r="21.16809" fill="#e6e6e6" />
                            <circle cx="433.51814" cy="219.14839" r="21.1681" fill="#e6e6e6" />
                            <path
                                d="M736.6097,127.653l-58.777,25.55173a10.69385,10.69385,0,0,0-5.53753,14.05476l18.2512,41.98347a10.6938,10.6938,0,0,0,14.05477,5.53757l58.777-25.55173A10.69382,10.69382,0,0,0,768.9157,175.174l-18.2512-41.98347A10.69386,10.69386,0,0,0,736.6097,127.653Zm2.4335,5.5978a4.55688,4.55688,0,0,1,1.09871-.31636L720.27009,170.4267l-40.8146-11.16918a4.58053,4.58053,0,0,1,.81072-.455Zm21.90145,50.3802-58.777,25.55173a4.58317,4.58317,0,0,1-6.02348-2.37327L678.05688,165.203l42.9598,11.75636a3.052,3.052,0,0,0,3.50205-1.5145l20.79933-39.24265,17.99983,41.40525A4.58318,4.58318,0,0,1,760.94465,183.631Z"
                                transform="translate(-350.95066 -126.7675)" fill="#e6e6e6" />
                            <circle cx="319.73326" cy="311.53784" r="53.51916" fill="#00ccb4" />
                            <path
                                d="M662.251,771.65067H647.49121a6.50753,6.50753,0,0,1-6.5-6.5V642.137a6.50753,6.50753,0,0,1,6.5-6.5H662.251a6.50753,6.50753,0,0,1,6.5,6.5V765.15067A6.50753,6.50753,0,0,1,662.251,771.65067Z"
                                transform="translate(-350.95066 -126.7675)" fill="#2f2e41" />
                            <path
                                d="M691.44336,771.65067H676.68359a6.50753,6.50753,0,0,1-6.5-6.5V642.137a6.50753,6.50753,0,0,1,6.5-6.5h14.75977a6.50753,6.50753,0,0,1,6.5,6.5V765.15067A6.50753,6.50753,0,0,1,691.44336,771.65067Z"
                                transform="translate(-350.95066 -126.7675)" fill="#2f2e41" />
                            <path
                                d="M752.60645,629.27372a6.54421,6.54421,0,0,1-1.91309-.28809,6.4603,6.4603,0,0,1-3.83594-3.168l-57.665-108.66113a6.49944,6.49944,0,0,1,2.69434-8.78809l13.03711-6.91894a6.49864,6.49864,0,0,1,8.78906,2.69433L771.377,612.805a6.49785,6.49785,0,0,1-2.69433,8.78808L755.64551,628.512A6.45965,6.45965,0,0,1,752.60645,629.27372Z"
                                transform="translate(-350.95066 -126.7675)" fill="#00ccb4" />
                            <path
                                d="M632.56348,529.11649a6.46045,6.46045,0,0,1-2.28321-.417h-.001L515.20166,485.22586a6.49367,6.49367,0,0,1-3.77539-8.377l5.20605-13.80762a6.51872,6.51872,0,0,1,8.38623-3.77734l115.0752,43.46387a6.51786,6.51786,0,0,1,3.78613,8.375l-5.21582,13.80957A6.52931,6.52931,0,0,1,632.56348,529.11649Z"
                                transform="translate(-350.95066 -126.7675)" fill="#00ccb4" />
                            <rect x="279.59389" y="374.35506" width="79.06239" height="154.47574" rx="6" fill="#2f2e41" />
                            <path
                                d="M710.2148,385.89448c3.14447,6.90062,6.15456,15.24071,2.76979,22.62258a12.72387,12.72387,0,0,1-6.516,6.70769c-3.48856,1.39154-7.29105.59741-10.52366-1.0849-6.80615-3.542-11.19315-10.12369-17.2701-14.63276a20.53442,20.53442,0,0,0-9.504-4.0958c-3.9931-.52048-7.95718.42133-11.86275,1.14845-4.15382.77333-8.44682,1.18146-12.29128-.92481a18.04425,18.04425,0,0,1-7.5408-8.61525c-.79169-1.75741-3.37783-.23376-2.59041,1.51416,3.269,7.25667,10.02943,12.20159,18.15233,11.62967,4.298-.30262,8.44935-1.69044,12.75467-1.88923a17.04345,17.04345,0,0,1,10.90314,3.4856c6.67216,4.756,11.20045,12.06,18.85468,15.51434,3.61146,1.62982,7.74711,2.30915,11.55481.9055a15.14759,15.14759,0,0,0,7.73706-6.7377c5.02336-8.64913,1.797-18.64769-2.03711-27.0617-.79947-1.75445-3.38585-.23145-2.59041,1.51416Z"
                                transform="translate(-350.95066 -126.7675)" fill="#2f2e41" />
                            <path
                                d="M676.60059,456.17508c-3.30567-.09277-7.4209-.208-10.58985-2.52343a8.13393,8.13393,0,0,1-3.20019-6.07227,5.47021,5.47021,0,0,1,1.86035-4.49316c1.6543-1.39893,4.07129-1.72754,6.67871-.96094l-2.7002-19.72608,1.98243-.27148,3.17285,23.18945-1.6543-.7583c-1.917-.87988-4.55176-1.32861-6.18848.05469a3.51473,3.51473,0,0,0-1.15234,2.895,6.14725,6.14725,0,0,0,2.38086,4.52783c2.4668,1.80176,5.74609,2.03516,9.4668,2.13867Z"
                                transform="translate(-350.95066 -126.7675)" fill="#2f2e41" />
                            <rect x="297.12845" y="297.33288" width="10.77148" height="2" fill="#2f2e41" />
                            <rect x="331.12845" y="297.33288" width="10.77148" height="2" fill="#2f2e41" />
                            <path
                                d="M630.4559,528.23209l-47.29355-14.42094a6,6,0,0,1-4.06563-7.21509l5.52108-21.75436a6,6,0,0,1,8.39144-3.943l46.90816,22.29692a6.01089,6.01089,0,0,1,3.49516,7.73035l-5.21658,13.8101A6.01071,6.01071,0,0,1,630.4559,528.23209Z"
                                transform="translate(-350.95066 -126.7675)" fill="#2f2e41" />
                            <path
                                d="M690.04241,515.92583,710.325,561.0175a6,6,0,0,0,7.67107,3.12113l20.88212-8.22628a6,6,0,0,0,2.85081-8.82249l-28.04671-43.714a6.01089,6.01089,0,0,0-8.11011-2.49011l-13.04,6.92017A6.01071,6.01071,0,0,0,690.04241,515.92583Z"
                                transform="translate(-350.95066 -126.7675)" fill="#2f2e41" />
                            <path
                                d="M497.85558,369.39014,358.82286,339.39852l-1.80686-.38885a5.00224,5.00224,0,0,0-5.54552,7.10585L406.67216,458.217a5.0183,5.0183,0,0,0,3.72746,2.72926,4.96825,4.96825,0,0,0,4.37912-1.50154l38.34178-40.42814a2.91036,2.91036,0,0,1,2.13875-.93407,3.01064,3.01064,0,0,1,2.67965,1.558l7.8535,14.52626a4.88621,4.88621,0,0,0,5.47116,2.50722l.03909-.00865a4.893,4.893,0,0,0,3.87711-4.6473l1.57322-33.53178a3.05774,3.05774,0,0,1,.307-1.20476,3.254,3.254,0,0,1,.78832-.97333L499.968,378.15066a5.00564,5.00564,0,0,0-2.11243-8.76052Zm.84922,7.21694-22.11962,18.15759a4.93346,4.93346,0,0,0-.77862.78665,4.64685,4.64685,0,0,0-.53242.83481,4.79649,4.79649,0,0,0-.36273.95079l.00217.00977a4.73079,4.73079,0,0,0-.15751,1.04879l-1.57276,33.53167a2.90448,2.90448,0,0,1-2.32273,2.7876l-.01955.00433a2.91087,2.91087,0,0,1-3.2907-1.49442l-7.85566-14.536a4.98939,4.98939,0,0,0-4.09973-2.60589l-.00954.00211c-.11421-.00536-.228-.01094-.33956-.00675a4.86576,4.86576,0,0,0-2.27209.56424,4.79554,4.79554,0,0,0-1.30551.99549l-38.34133,40.42792a3.00049,3.00049,0,0,1-4.86432-.73653L353.26092,345.22777a3.00779,3.00779,0,0,1,3.32825-4.25969l1.84977.39973,138.98933,29.98084a3.00669,3.00669,0,0,1,1.27653,5.25843Z"
                                transform="translate(-350.95066 -126.7675)" fill="#3f3d56" />
                            <path
                                d="M476.25014,395.75022l-.82617,1.8216-.51039-.22513-.00217-.00977L357.76929,344.22l97.81611,71.86487.00954-.00211.259.19874-1.17942,1.61283-1.70078-1.252-96.39341-70.80742a2.00253,2.00253,0,0,1,1.66918-3.56479,1.74378,1.74378,0,0,1,.32206.113l117.235,53.16816Z"
                                transform="translate(-350.95066 -126.7675)" fill="#3f3d56" />
                        </motion.svg>
                    </motion.div>
                ) : (
                      <motion.form className={ "form flow" } onSubmit={ onSubmit } variants={ fade } initial={ "hidden" } animate={ "show" } exit={ "hidden" }>
                          <div className={ "input__group" }>
                              <Input label={ "First Name" } errors={ errors } { ...register( "firstName", { required: t( "First name is required." ) } ) } />
                              <Input label={ "Last Name" } errors={ errors } { ...register( "lastName", { required: t( "Last name is required." ) } ) } />
                          </div>
                          <Input label={ "Email" } errors={ errors }
                                 { ...register( "email", {
                                     required: t( "Email is required." ),
                                     pattern : {
                                         value  : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                         message: "Invalid email address",
                                     },
                                 } ) } />
                          <PhoneInputWrapper name={ "phone" } label={ "Phone" } errors={ errors } control={ control } />
                          <TextArea label={ "Message" } errors={ errors } { ...register( "message" ) } rows={ 6 } />
                          { errors.general && <p className={ "input__error" }>{ errors.general.message }</p> }
                          <ReCaptchaTerms />
                          <Button disabled={ isSubmitting } look={ "primary" } type={ "submit" } onClick={ () => clearErrors() }>Submit</Button>
                      </motion.form>
                  ) }
            </div>
        </AnimatePresence>
    );
};

export default ContactForm;
