import { requireNativeView } from 'expo';
import * as React from 'react';

import { WalkthroughViewProps } from './Walkthrough.types';

const NativeView: React.ComponentType<WalkthroughViewProps> =
  requireNativeView('Walkthrough');

export default function WalkthroughView(props: WalkthroughViewProps) {
  return <NativeView {...props} />;
}
