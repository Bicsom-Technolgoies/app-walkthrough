import React, { useRef, useEffect, useCallback } from "react";
import { View, ViewStyle } from "react-native";
import { useWalkthrough } from "./hooks/useWalkthrough";
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

export const WalkthroughZone = ({
  zone,
  text,
  title,
  shape = "rect",
  borderRadius,
  style,
  children,
  isGlow,
  borderColor = "white",
  padding = {},
  margin = {},
}: Props) => {
  const ref = useRef<View>(null);
  const { registerStep, unregisterStep, rootRef } = useWalkthrough();
  const measure = useCallback(() => {
    if (!ref.current || !rootRef.current) return;
    ref.current.measureLayout(
      rootRef.current,
      (x, y, width, height) => {
        if (!width || !height) return;
        registerStep(
          {
            zone,
            text,
            title,
            shape,
            borderRadius,
            isGlow,
            borderColor,
            padding,
            margin,
          },
          { x, y, width, height },
        );
      },
      () => {},
    );
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
  return (
    <View
      ref={ref}
      collapsable={false}
      style={style}
      onLayout={() => {
        measure();
      }}
    >
      {children}
    </View>
  );
};
