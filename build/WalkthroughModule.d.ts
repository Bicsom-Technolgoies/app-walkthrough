import { NativeModule } from 'expo';
import { WalkthroughModuleEvents } from './Walkthrough.types';
declare class WalkthroughModule extends NativeModule<WalkthroughModuleEvents> {
    PI: number;
    hello(): string;
    setValueAsync(value: string): Promise<void>;
}
declare const _default: WalkthroughModule;
export default _default;
//# sourceMappingURL=WalkthroughModule.d.ts.map