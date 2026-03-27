import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  Text,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  useAnimatedProps,
} from "react-native-reanimated";
import { Rect as SvgRect, Circle as SvgCircle } from "react-native-svg";
import { TooltipBox } from "./TooltipBox";
import Svg, { Defs, Mask, RadialGradient, Stop } from "react-native-svg";

import { PaddingProps, TooltipProps, WalkthroughStep } from "../types";

const { width: W, height: H } = Dimensions.get("window");

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
const getPaddingValue = (padding?: number | PaddingProps) => {
  if (!padding) {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }

  // if padding is a number
  if (typeof padding === "number") {
    return {
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
    };
  }

  // if padding is an object
  return {
    top: padding.paddingTop ?? padding.paddingVertical ?? padding.padding ?? 0,
    bottom:
      padding.paddingBottom ?? padding.paddingVertical ?? padding.padding ?? 0,
    left:
      padding.paddingLeft ?? padding.paddingHorizontal ?? padding.padding ?? 0,
    right:
      padding.paddingRight ?? padding.paddingHorizontal ?? padding.padding ?? 0,
  };
};

const AnimatedRect = Animated.createAnimatedComponent(SvgRect);
const AnimatedCircle = Animated.createAnimatedComponent(SvgCircle);

export const SpotlightOverlay = ({
  step,
  currentIndex,
  totalSteps,
  overlayColor,
  overlayOpacity,
  defaultBorderRadius,
  tooltipComponent: CustomTooltip,
  onNext,
  onPrev,
  onStop,
  arrowColor,
}: Props) => {
  const { top, bottom, left, right } = getPaddingValue(step.padding);
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const [layoutMeasured, setLayoutMeasured] = useState(false);
  const { x, y, width, height } = step.layout;
  const isCircle = step.shape === "circle";

  /* ---------- Spotlight Size ---------- */
  const sx = x - left;
  const sy = y - top;
  const sw = width + left + right;
  const sh = height + top + bottom;

  const borderRadius = isCircle
    ? Math.max(sw, sh) / 2
    : (step.borderRadius ?? defaultBorderRadius);

  const centerX = sx + sw / 2;

  /* ---------- Tooltip & Arrow Position ---------- */
  const MARGIN = 18;
  const actualTooltipH = tooltipHeight || 140;
  const canFitBelow = sy + sh + actualTooltipH + MARGIN < H - 40;

  const finalTop = canFitBelow
    ? sy + sh + MARGIN
    : Math.max(StatusBar.currentHeight || 40, sy - actualTooltipH - MARGIN);

  const arrowLeft = Math.max(24, Math.min(centerX - 10, W - 44));

  const tooltipWidth = W - 100;
  const tooltipLeft = Math.max(
    20,
    Math.min(centerX - tooltipWidth / 2, W - tooltipWidth - 10),
  );

  /* ---------- Shared Values ---------- */
  const fade = useSharedValue(0);
  const scale = useSharedValue(0.92);

  const sxAnim = useSharedValue(sx);
  const syAnim = useSharedValue(sy);
  const swAnim = useSharedValue(sw);
  const shAnim = useSharedValue(sh);
  const borderRadiusAnim = useSharedValue(borderRadius);

  const tooltipTop = useSharedValue(finalTop);
  const tooltipLeftAnim = useSharedValue(tooltipLeft);
  const canFitBelowAnim = useSharedValue(canFitBelow ? 1 : 0);
  const arrowLeftAnim = useSharedValue(arrowLeft);

  /* ---------- Animate on step change ---------- */
  useEffect(() => {
    const timingConfig = { duration: 500, easing: Easing.inOut(Easing.ease) };

    fade.value = withTiming(1, { duration: 260 });
    scale.value = withTiming(1, timingConfig);

    sxAnim.value = withTiming(sx, timingConfig);
    syAnim.value = withTiming(sy, timingConfig);
    swAnim.value = withTiming(sw, timingConfig);
    shAnim.value = withTiming(sh, timingConfig);
    borderRadiusAnim.value = withTiming(borderRadius, timingConfig);

    tooltipTop.value = withTiming(finalTop, timingConfig);
    tooltipLeftAnim.value = withTiming(tooltipLeft, timingConfig);
    canFitBelowAnim.value = withTiming(canFitBelow ? 1 : 0, timingConfig);
    arrowLeftAnim.value = withTiming(arrowLeft, timingConfig);
  }, [step.zone]);

  useEffect(() => {
    if (!layoutMeasured) return;

    const timingConfig = { duration: 500, easing: Easing.inOut(Easing.ease) };
    tooltipTop.value = withTiming(finalTop, timingConfig);

    // Adjust arrow based on measured tooltip height

    canFitBelowAnim.value = withTiming(canFitBelow ? 1 : 0, timingConfig);
    tooltipLeftAnim.value = withTiming(tooltipLeft, timingConfig);
    arrowLeftAnim.value = withTiming(arrowLeft, timingConfig);
    tooltipLeftAnim.value = withTiming(tooltipLeft, timingConfig);
    arrowLeftAnim.value = withTiming(arrowLeft, timingConfig);
  }, [layoutMeasured, step.zone]);
  /* ---------- Animated Styles ---------- */
  const spotlightStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top: step.isGlow ? syAnim.value - 18 : syAnim.value,
    left: step.isGlow ? sxAnim.value - 18 : sxAnim.value,
    width: step.isGlow ? swAnim.value + 36 : swAnim.value,
    height: step.isGlow ? shAnim.value + 36 : shAnim.value,
    borderRadius: borderRadiusAnim.value + (step.isGlow ? 18 : 0),
    borderWidth: 2,
    borderColor: step.borderColor || "white",
    opacity: fade.value,
    transform: [{ scale: scale.value }],
  }));

  const tooltipStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top: tooltipTop.value,
    left: tooltipLeftAnim.value,
    width: tooltipWidth,
    opacity: fade.value,
    transform: [{ scale: scale.value }],
  }));

  // arrowStyle:
  const arrowStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top:
      canFitBelowAnim.value > 0.5
        ? tooltipTop.value - 16
        : tooltipTop.value + tooltipHeight - 10,
    left: arrowLeftAnim.value,
    opacity: fade.value,
    transform: [
      { rotate: canFitBelowAnim.value > 0.5 ? "180deg" : "0deg" },
      { scale: scale.value },
    ],
  }));
  /* ---------- Animated Props for SVG ---------- */
  const animatedRectProps = useAnimatedProps(() => ({
    x: sxAnim.value,
    y: syAnim.value,
    width: swAnim.value,
    height: shAnim.value,
    rx: borderRadiusAnim.value,
    ry: borderRadiusAnim.value,
  }));

  const animatedCircleProps = useAnimatedProps(() => ({
    cx: sxAnim.value + swAnim.value / 2,
    cy: syAnim.value + shAnim.value / 2,
    r: Math.max(swAnim.value, shAnim.value) / 2 + 36,
  }));

  const Tooltip = CustomTooltip ?? TooltipBox;

  return (
    <Modal visible transparent statusBarTranslucent animationType="none">
      <View style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[StyleSheet.absoluteFill, { opacity: fade.value }]}
          pointerEvents="none"
        >
          <Svg width="100%" height="100%">
            <Defs>
              <Mask id="mask">
                <SvgRect width="100%" height="100%" fill="white" />
                <AnimatedRect fill="black" animatedProps={animatedRectProps} />
              </Mask>
              <RadialGradient id="glow" cx="50%" cy="50%" r="40%">
                <Stop
                  offset="0%"
                  stopColor="rgba(255,255,255,0.2)"
                  stopOpacity={0}
                />
                <Stop
                  offset="49.52%"
                  stopColor="rgba(255,194,255,0.45)"
                  stopOpacity={0.2}
                />
                <Stop
                  offset="100%"
                  stopColor="rgba(255,194,255,0)"
                  stopOpacity={0}
                />
              </RadialGradient>
            </Defs>

            <SvgRect
              width="100%"
              height="100%"
              fill={overlayColor}
              opacity={overlayOpacity}
              mask="url(#mask)"
            />

            {step.isGlow && (
              <AnimatedCircle
                fill="url(#glow)"
                animatedProps={animatedCircleProps}
              />
            )}
          </Svg>

          <Animated.View style={spotlightStyle} />
        </Animated.View>

        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <Animated.View
            onLayout={(e) => {
              setTooltipHeight(e.nativeEvent.layout.height);
              setLayoutMeasured(true);
            }}
            style={[tooltipStyle, { position: "absolute" }]} // ensure absolute
          >
            <Tooltip
              step={step}
              currentIndex={currentIndex}
              totalSteps={totalSteps}
              isFirstStep={currentIndex === 0}
              isLastStep={currentIndex === totalSteps - 1}
              onNext={onNext}
              onPrev={onPrev}
              onStop={onStop}
            />
          </Animated.View>

          <Animated.View style={[arrowStyle, { position: "absolute" }]}>
            <Text style={{ fontSize: 25, color: arrowColor, lineHeight: 25 }}>
              ▼
            </Text>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};
