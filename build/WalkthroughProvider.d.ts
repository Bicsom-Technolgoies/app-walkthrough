import React from "react";
import { WalkthroughCallbacks } from "./WalkthroughContext";
import { TooltipProps } from "./types";
type Props = WalkthroughCallbacks & {
    children: React.ReactNode;
    tooltipComponent?: React.ComponentType<TooltipProps>;
    overlayColor?: string;
    overlayOpacity?: number;
    borderRadius?: number;
    startAtMount?: boolean;
    arrowColor?: string;
};
export declare const WalkthroughProvider: ({ children, onStart, onStop, onStepChange, onFinish, tooltipComponent, overlayColor, overlayOpacity, borderRadius, startAtMount, arrowColor, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=WalkthroughProvider.d.ts.map