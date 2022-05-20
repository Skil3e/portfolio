import React, { ComponentPropsWithoutRef, ElementType, FC, SVGProps } from "react";
import t from "@i18n";
import classNames from "classnames";

export interface IIconWithText<T extends ElementType> {
    as?: T;
    label: string;
    Icon: FC<SVGProps<SVGSVGElement>>;
    iconProps?: SVGProps<SVGSVGElement>;
    iconOnly?: boolean
}

const IconWithText = <T extends ElementType = "div">( { as, label, Icon, iconProps, iconOnly, ...props }: IIconWithText<T> & ComponentPropsWithoutRef<T> ) => {
    const defaultIconProps = {
        height: 32,
        ...iconProps,
    };
    const Component = as ?? "div";
    const { className } = props;
    return (
        <Component { ...props } className={ classNames( "icon-text", className ) } title={ iconOnly ? t( label ) : undefined }>
            { Icon ? <Icon { ...defaultIconProps } className={ classNames( "icon-text__icon", iconProps?.className ) }/> : null }
            <p className={ classNames( "icon-text__label", iconOnly && "sr-only" ) }>{ t( label ) }</p>
        </Component>
    );
};

export default IconWithText;
