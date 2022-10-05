import type { Component } from 'solid-js';

import { Icon, IconProps } from '@hope-ui/solid';
import { mergeProps } from 'solid-js';

const Check: Component<IconProps> = (props) => {
  const iconProps = mergeProps(
    { width: '24px', height: '24px', viewBox: '0 0 24 24', fill: 'currentColor' },
    props,
  );
  return (
    <Icon {...iconProps}>
      <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
    </Icon>

  );
};

export default Check;