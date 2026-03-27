import { useContext } from 'react';
import { WalkthroughContext } from '../WalkthroughContext';
export const useWalkthrough = () => {
    const ctx = useContext(WalkthroughContext);
    if (!ctx)
        throw new Error('useWalkthrough must be used inside <WalkthroughProvider>');
    return ctx;
};
//# sourceMappingURL=useWalkthrough.js.map