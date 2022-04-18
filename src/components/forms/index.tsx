import * as React from "react";
import { forwardRef, FunctionComponent, HTMLAttributes, InputHTMLAttributes, Ref, TextareaHTMLAttributes } from "react";
import classNames from "classnames";
import PhoneInput from "react-phone-input-2";
import { Controller } from "react-hook-form";
import t from "@i18n";

export interface InputWrapperProps extends HTMLAttributes<HTMLDivElement> {
    name?: string
    label?: string
    errors?: any
    labelClassName?: string
}

const InputWrapper = forwardRef(
    ( props: InputWrapperProps, ref?: Ref<HTMLDivElement> ) => {
        const { label, errors, name, children, labelClassName, className, ...rest } = props;
        const cls = classNames( "input__wrapper", className );
        const labelCls = classNames( "input__label", labelClassName );
        return (
            <>
                <div { ...rest } ref={ ref } className={ cls }>
                    { label && <label className={ labelCls } htmlFor={ name }>{ t( label ) }</label> }
                    { children }
                    { errors && name && errors[name] && <div className={ "input__error" }>{ errors[name].message }</div> }
                </div>

            </>
        )
    } )

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    wrapperClassName?: string
    label?: string
    errors?: any
    labelClassName?: string
    type?: 'text' | 'number' | 'tel' | 'email' | 'password' | 'datetime-local' | 'file' | 'month' | 'search' | 'time' | 'url' | 'week' | 'date'
}

export const Input = forwardRef(
    ( props: InputProps, ref?: Ref<HTMLInputElement> ) => {
        const { type, label, errors, className, wrapperClassName, labelClassName, name, ...rest } = props
        const inputCls = classNames( "input__field", className )
        return (
            <InputWrapper className={ wrapperClassName }
                          name={ name }
                          label={ label }
                          errors={ errors }
                          labelClassName={ labelClassName }
            >
                <input { ...rest } ref={ ref } className={ inputCls } type={ type } id={ name } name={ name }/>
            </InputWrapper>
        )
    } )

export type Option = {
    value: string | number
    label?: string
}

export interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    wrapperClassName?: string
    label?: string
    errors?: any
    customErrors?: any
    options: Option[]
    labelClassName?: string
}

export const Select = React.forwardRef(
    ( props: SelectProps, ref?: React.Ref<HTMLSelectElement> ) => {
        const { id, label, errors, customErrors, className, wrapperClassName, options, labelClassName, name, ...rest } = props
        const inputCls = classNames( "input__field", className )
        return (
            <InputWrapper className={ wrapperClassName }
                          name={ name }
                          label={ label }
                          errors={ errors }
                          labelClassName={ labelClassName }
            >
                <select { ...rest } ref={ ref } className={ inputCls } id={ id } name={ name }>
                    { options.map( option => <option key={ option.value } value={ option.value }>{ option.label ? option.label : option.value }</option> ) }
                </select>
            </InputWrapper>
        )
    } )

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    wrapperClassName?: string
    label?: string
    errors?: any
    labelClassName?: string
}

export const TextArea = forwardRef(
    ( props: TextAreaProps, ref?: Ref<HTMLTextAreaElement> ) => {
        const { label, errors, className, wrapperClassName, labelClassName, name, ...rest } = props
        const inputCls = classNames( "input__field", className )
        return (
            <InputWrapper className={ wrapperClassName }
                          name={ name }
                          label={ label }
                          errors={ errors }
                          labelClassName={ labelClassName }
            >
                <textarea { ...rest } ref={ ref } className={ inputCls } id={ name } name={ name }/>
            </InputWrapper>
        )
    } )

interface PhoneInputWrapperProps {
    name: string
    label: string
    className?: string
    textArea?: boolean
    disabled?: boolean
    errors: { [key: string]: { message?: string } } | undefined
    onChange?: ( value: string ) => void
    control: any
}

export const PhoneInputWrapper: FunctionComponent<PhoneInputWrapperProps> = ( { name, errors, className, label, control } ) => {
    const labelCls = classNames( "input__label" );
    return (
        <div className={ classNames( "input__wrapper", className ) }>
            <label className={ labelCls } htmlFor={ name }>{ t( label ) } <span className={ "small ml--auto" }>({ t( "optional" ) })</span></label>
            <Controller
                control={ control }
                name={ "phone" }
                render={ ( { field: { onChange, value } } ) => {
                    return (
                        <PhoneInput
                            enableSearch
                            country={ 'gr' }
                            onChange={ ( _, __, ___, formattedValue ) => onChange( formattedValue ) }
                            value={ value ?? "+30" }
                            inputProps={ { id: name, name: name } }
                            countryCodeEditable={ false }
                        />
                    );
                } }
            />
            { errors && name && errors[name] && <div className={ "input__error" }>{ errors[name].message }</div> }
        </div>
    )
};

