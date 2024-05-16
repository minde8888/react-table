import React, { forwardRef, useEffect, useRef, InputHTMLAttributes, MutableRefObject } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ indeterminate = false, ...rest }, ref) => {
        const defaultRef = useRef<HTMLInputElement>(null);
        const resolvedRef = (ref as MutableRefObject<HTMLInputElement>) || defaultRef;

        useEffect(() => {
            if (resolvedRef && 'current' in resolvedRef && resolvedRef.current) {
                resolvedRef.current.indeterminate = indeterminate;
            }
        }, [indeterminate, resolvedRef]);

        return (
            <input type="checkbox" ref={resolvedRef} {...rest} />
        );
    }
);
