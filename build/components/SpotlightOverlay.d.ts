import React from "react";
import { TooltipProps, WalkthroughStep } from "../types";
type Props = {
    step: WalkthroughStep;
    currentIndex: number;
    totalSteps: number;
    overlayColor: string;
    overlayOpacity: number;
    defaultBorderRadius: number;
    tooltipComponent?: React.ComponentType<TooltipProps>;
    onNext: () => void;
    onPrev: () => void;
    onStop: () => void;
    arrowColor: string;
};
export declare const SpotlightOverlay: ({ step, currentIndex, totalSteps, overlayColor, overlayOpacity, defaultBorderRadius, tooltipComponent: CustomTooltip, onNext, onPrev, onStop, arrowColor, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=SpotlightOverlay.d.ts.map