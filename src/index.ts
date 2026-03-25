// Reexport the native module. On web, it will be resolved to WalkthroughModule.web.ts
// and on native platforms to WalkthroughModule.ts
export { default } from './WalkthroughModule';
export { default as WalkthroughView } from './WalkthroughView';
export * from  './Walkthrough.types';
