import * as React from 'react';

import { WalkthroughViewProps } from './Walkthrough.types';

export default function WalkthroughView(props: WalkthroughViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
