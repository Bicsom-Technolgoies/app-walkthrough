import { NativeModule, requireNativeModule } from 'expo';

import { WalkthroughModuleEvents } from './Walkthrough.types';

declare class WalkthroughModule extends NativeModule<WalkthroughModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<WalkthroughModule>('Walkthrough');
