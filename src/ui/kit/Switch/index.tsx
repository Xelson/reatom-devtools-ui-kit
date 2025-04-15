import type { JSX } from 'preact/jsx-runtime';
import { css } from 'vite-css-in-js';

const stl = {
  base: css`
    display: contents
  `,
  flashing: css`
    &[data-enabled='false'] {
      color: hsl(0, 100%, 50%);
      animation: 0.6s linear 0s infinite alternate flashing;
    }
  `,
};
export function Switch({
  enabled,
  onClick,
  flashing,
  iconOn,
  iconOff,
}: {
  enabled: boolean;
  onClick: () => void;
  flashing?: boolean;
  iconOn: JSX.Element;
  iconOff: JSX.Element;
}) {
  return (
    <div onClick={onClick} data-enabled={enabled} class={`${stl.base} ${flashing ? stl.flashing : ''}`}>
      {enabled ? iconOn : iconOff}
    </div>
  );
}
