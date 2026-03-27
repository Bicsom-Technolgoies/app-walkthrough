import React from "react";
import { WalkthroughStep } from "../types";
export type TooltipProps = {
    step: WalkthroughStep;
    currentIndex: number;
    totalSteps: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    onNext: () => void;
    onPrev: () => void;
    onStop: () => void;
};
export declare const TooltipBox: ({ step, currentIndex, totalSteps, isFirstStep, isLastStep, onNext, onPrev, onStop, }: TooltipProps) => React.JSX.Element;
//# sourceMappingURL=TooltipBox.d.ts.map