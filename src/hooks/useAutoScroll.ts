import { useEffect, RefObject } from 'react';
import { ScrollView } from 'react-native';
import { WalkthroughStep } from '../types';

/**
 * Ensures the active WalkthroughZone is visible within a ScrollView
 * before the spotlight overlay renders.
 *
 * @param currentStep  - The active step from useWalkthrough()
 * @param scrollRef    - Ref attached to the parent ScrollView
 */
export const useAutoScroll = (
    currentStep: WalkthroughStep | null,
    scrollRef: RefObject<ScrollView> | null
) => {
    useEffect(() => {
        // Guard: skip if no active step or no scroll target
        if (!currentStep || !scrollRef?.current) return;


        const { y, height } = currentStep.layout;


        // Center the Zone in the viewport.
        // Subtract one zone height so the zone appears roughly in
        // the middle of the visible area, not flush at the top.
        // Math.max(0) clamps negative values for zones near the top.
        const scrollTarget = Math.max(0, y - height);


        // Uses the native animated driver via the RN ScrollView API.
        // animated: true ensures a smooth transition rather than a jump.
        scrollRef.current.scrollTo({
            y: scrollTarget,
            animated: true,
        });


        // No cleanup needed: scrollTo is fire-and-forget.
        // The useEffect dependency array ensures this runs only when
        // currentStep actually changes (referential equality check).
    }, [currentStep, scrollRef]);
};
