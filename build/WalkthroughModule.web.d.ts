import { NativeModule } from 'expo';
import { WalkthroughModuleEvents } from './Walkthrough.types';
declare class WalkthroughModule extends NativeModule<WalkthroughModuleEvents> {
    PI: number;
    setValueAsync(value: string): Promise<void>;
    hello(): string;
}
declare const _default: typeof WalkthroughModule;
export default _default;
//# sourceMappingURL=WalkthroughModule.web.d.ts.map