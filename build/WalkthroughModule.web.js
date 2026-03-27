import { registerWebModule, NativeModule } from 'expo';
class WalkthroughModule extends NativeModule {
    PI = Math.PI;
    async setValueAsync(value) {
        this.emit('onChange', { value });
    }
    hello() {
        return 'Hello world! 👋';
    }
}
export default registerWebModule(WalkthroughModule, 'WalkthroughModule');
//# sourceMappingURL=WalkthroughModule.web.js.map