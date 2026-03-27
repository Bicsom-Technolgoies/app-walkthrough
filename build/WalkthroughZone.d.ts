import React from "react";
import { ViewStyle } from "react-native";
import { MarginProps, PaddingProps } from "./types";
type Props = {
    zone: number;
    text: string;
    title?: string;
    shape?: "rect" | "circle";
    borderRadius?: number;
    style?: ViewStyle;
    children: React.ReactNode;
    isGlow?: boolean;
    borderColor?: string;
    padding?: PaddingProps;
    margin?: MarginProps;
};
export declare const WalkthroughZone: ({ zone, text, title, shape, borderRadius, style, children, isGlow, borderColor, padding, margin, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=WalkthroughZone.d.ts.map