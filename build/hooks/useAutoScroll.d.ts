import { RefObject } from 'react';
import { ScrollView } from 'react-native';
import { WalkthroughStep } from '../types';
/**
 * Ensures the active WalkthroughZone is visible within a ScrollView
 * before the spotlight overlay renders.
 *
 * @param currentStep  - The active step from useWalkthrough()
 * @param scrollRef    - Ref attached to the parent ScrollView
 */
export declare const useAutoScroll: (currentStep: WalkthroughStep | null, scrollRef: RefObject<ScrollView> | null) => void;
//# sourceMappingURL=useAutoScroll.d.ts.map