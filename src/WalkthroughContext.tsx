import { createContext } from "react";
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
  // Registration
  registerStep: (
    step: Omit<WalkthroughStep, "layout">,
    layout: StepLayout,
  ) => void;
  unregisterStep: (zone: number) => void;
  // Control
  start: (fromZone?: number) => void;
  stop: () => void;
  next: () => void;
  prev: () => void;
  // State
  isRunning: boolean;
  currentStep: WalkthroughStep | null;
  currentIndex: number;
  totalSteps: number;
  canStart: boolean;
  rootRef: React.RefObject<View | null>;
};

export const WalkthroughContext = createContext<WalkthroughContextValue | null>(
  null,
);
