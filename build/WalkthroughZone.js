import React, { useRef, useEffect, useCallback } from "react";
import { View } from "react-native";
import { useWalkthrough } from "./hooks/useWalkthrough";
export const WalkthroughZone = ({ zone, text, title, shape = "rect", borderRadius, style, children, isGlow, borderColor = "white", padding = {}, margin = {}, }) => {
    const ref = useRef(null);
    const { registerStep, unregisterStep, rootRef } = useWalkthrough();
    const measure = useCallback(() => {
        if (!ref.current || !rootRef.current)
            return;
        ref.current.measureLayout(rootRef.current, (x, y, width, height) => {
            if (!width || !height)
                return;
            registerStep({
                zone,
                text,
                title,
                shape,
                borderRadius,
                isGlow,
                borderColor,
                padding,
                margin,
            }, { x, y, width, height });
        }, () => { });
    }, [
        zone,
        text,
        title,
        shape,
        borderRadius,
        isGlow,
        borderColor,
        registerStep,
        rootRef,
        padding,
        margin,
    ]);
    useEffect(() => {
        const id = setTimeout(() => {
            measure();
        }, 500);
        return () => {
            clearTimeout(id);
            unregisterStep(zone);
        };
    }, [measure, zone, unregisterStep]);
    return (<View ref={ref} collapsable={false} style={style} onLayout={() => {
            measure();
        }}>
      {children}
    </View>);
};
//# sourceMappingURL=WalkthroughZone.js.map