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
export type WalkthroughStep = {
    zone: number;
    text: string;
    title?: string;
    shape?: "rect" | "circle";
    borderRadius?: number;
    layout: StepLayout;
    isGlow?: boolean;
    borderColor?: string;
    padding?: PaddingProps;
    margin?: MarginProps;
};
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
export interface Step {
    name: string;
    order: number;
    text: string;
    targetRef: any;
}
export interface WalkthroughContextType {
    registerStep: (step: Step) => void;
    unregisterStep: (name: string) => void;
    currentStep: Step | null;
    currentLayout: StepLayout | null;
    start: () => void;
    stop: () => void;
    next: () => void;
    prev: () => void;
    isFirstStep: boolean;
    isLastStep: boolean;
}
export interface PaddingProps {
    padding?: number;
    paddingHorizontal?: number;
    paddingVertical?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
}
export interface MarginProps {
    margin?: number;
    marginHorizontal?: number;
    marginVertical?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
}
//# sourceMappingURL=types.d.ts.map