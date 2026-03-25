import { registerWebModule, NativeModule } from 'expo';

import { WalkthroughModuleEvents } from './Walkthrough.types';

class WalkthroughModule extends NativeModule<WalkthroughModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(WalkthroughModule, 'WalkthroughModule');
