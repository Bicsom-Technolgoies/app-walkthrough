import React, { useState, useRef, useCallback, useMemo, useEffect, } from "react";
import { WalkthroughContext, } from "./WalkthroughContext";
import { SpotlightOverlay } from "./components/SpotlightOverlay";
import { View } from "react-native";
export const WalkthroughProvider = ({ children, onStart, onStop, onStepChange, onFinish, tooltipComponent, overlayColor = "#000", overlayOpacity = 0.7, borderRadius = 8, startAtMount = false, arrowColor = "white", }) => {
    const rootRef = useRef(null);
    // Registry: zone number → step (layout-less spec)
    const registryRef = useRef(new Map());
    // Layouts: zone number → measured layout
    const layoutsRef = useRef(new Map());
    const [isRunning, setIsRunning] = useState(false);
    const [sortedSteps, setSortedSteps] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    // Derived: merge registry + layouts into sorted steps
    const buildSteps = useCallback(() => {
        const steps = [];
        registryRef.current.forEach((spec, zone) => {
            const layout = layoutsRef.current.get(zone);
            if (layout)
                steps.push({ ...spec, layout });
        });
        return steps.sort((a, b) => a.zone - b.zone);
    }, []);
    const canStart = useMemo(() => {
        return (registryRef.current.size > 0 &&
            registryRef.current.size === layoutsRef.current.size);
    }, []);
    // ── Registration API ──────────────────────────────────────
    const registerStep = useCallback((spec, layout) => {
        registryRef.current.set(spec.zone, spec);
        layoutsRef.current.set(spec.zone, layout);
    }, []);
    const unregisterStep = useCallback((zone) => {
        registryRef.current.delete(zone);
        layoutsRef.current.delete(zone);
    }, []);
    // ── Control API ────────────────────────────────────────────
    const start = useCallback((fromZone = 1) => {
        // Re-measure layouts before starting
        requestAnimationFrame(() => {
            const steps = buildSteps();
            if (!steps.length)
                return;
            const startIdx = Math.max(0, steps.findIndex((s) => s.zone >= fromZone));
            setSortedSteps(steps);
            setCurrentIndex(startIdx);
            setIsRunning(true);
            onStart?.();
            onStepChange?.(steps[startIdx]);
        });
    }, [buildSteps, onStart, onStepChange]);
    const stop = useCallback(() => {
        setIsRunning(false);
        onStop?.();
    }, [onStop]);
    const next = useCallback(() => {
        setSortedSteps((prev) => {
            setCurrentIndex((idx) => {
                const nextIdx = idx + 1;
                if (nextIdx >= prev.length) {
                    setIsRunning(false);
                    onFinish?.();
                    return idx;
                }
                onStepChange?.(prev[nextIdx]);
                return nextIdx;
            });
            return prev;
        });
    }, [onFinish, onStepChange]);
    const prev = useCallback(() => {
        setSortedSteps((prev) => {
            setCurrentIndex((idx) => {
                const prevIdx = idx - 1;
                if (prevIdx < 0)
                    return idx;
                onStepChange?.(prev[prevIdx]);
                return prevIdx;
            });
            return prev;
        });
    }, [onStepChange]);
    useEffect(() => {
        if (!startAtMount)
            return;
        const id = setTimeout(() => {
            if (registryRef.current.size === layoutsRef.current.size) {
                start();
            }
        }, 250);
        return () => clearTimeout(id);
    }, [startAtMount, start]);
    const currentStep = isRunning ? (sortedSteps[currentIndex] ?? null) : null;
    const value = useMemo(() => ({
        registerStep,
        unregisterStep,
        start,
        stop,
        next,
        prev,
        isRunning,
        currentStep,
        currentIndex,
        totalSteps: sortedSteps.length,
        canStart,
        rootRef,
    }), [
        registerStep,
        unregisterStep,
        start,
        stop,
        next,
        prev,
        isRunning,
        currentStep,
        currentIndex,
        sortedSteps.length,
        canStart,
    ]);
    return (<WalkthroughContext.Provider value={value}>
      <View ref={rootRef} style={{ flex: 1 }}>
        {children}
      </View>
      {isRunning && currentStep && (<SpotlightOverlay step={currentStep} currentIndex={currentIndex} totalSteps={sortedSteps.length} overlayColor={overlayColor} overlayOpacity={overlayOpacity} defaultBorderRadius={borderRadius} tooltipComponent={tooltipComponent} onNext={next} onPrev={prev} onStop={stop} arrowColor={arrowColor}/>)}
    </WalkthroughContext.Provider>);
};
//# sourceMappingURL=WalkthroughProvider.js.map