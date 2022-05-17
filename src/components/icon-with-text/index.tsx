import React, { ComponentPropsWithoutRef, ElementType, FC, SVGProps } from "react";
import t from "@i18n";
import classNames from "classnames";

export interface IIconWithText<T extends ElementType> {
    as?: T;
    label: string;
    Icon: FC<SVGProps<SVGSVGElement>>;
    iconProps?: SVGProps<SVGSVGElement>;
}

const IconWithText = <T extends ElementType = "div">( { as, label, Icon, iconProps, ...props }: IIconWithText<T> & ComponentPropsWithoutRef<T> ) => {
    const defaultIconProps = {
        height: 32,
        ...iconProps,
    };
    const Component = as ?? "div";
    const { className } = props;
    return (
        <Component { ...props } className={ classNames( "icon-text", className ) }>
            <Icon { ...defaultIconProps } className={ classNames( "icon-text__icon", iconProps?.className ) } />
            <p className={ "icon-text__label" }>{ t( label ) }</p>
        </Component>
    );
};

export default IconWithText;
