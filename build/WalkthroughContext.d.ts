import { WalkthroughStep } from "./types";
import { View } from "react-native";
export type StepLayout = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type WalkthroughCallbacks = {
    onStart?: () => void;
    onStop?: () => void;
    onStepChange?: (step: WalkthroughStep) => void;
    onFinish?: () => void;
};
export type WalkthroughContextValue = {
    registerStep: (step: Omit<WalkthroughStep, "layout">, layout: StepLayout) => void;
    unregisterStep: (zone: number) => void;
    start: (fromZone?: number) => void;
    stop: () => void;
    next: () => void;
    prev: () => void;
    isRunning: boolean;
    currentStep: WalkthroughStep | null;
    currentIndex: number;
    totalSteps: number;
    canStart: boolean;
    rootRef: React.RefObject<View | null>;
};
export declare const WalkthroughContext: import("react").Context<WalkthroughContextValue | null>;
//# sourceMappingURL=WalkthroughContext.d.ts.map