import type { JSX } from 'preact/jsx-runtime';
import { css } from 'vite-css-in-js';
import { ArrowUpIcon } from '../Icons/ArrowUpIcon.tsx';

const stl = {
  traceRow: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
  `,
  traceRowIcon: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding-right: 2px;
    opacity: 0.4;
  `,
  traceRowValue: css`
    flex: 1;
  `,
};

export function TraceRow({ children }: { children: JSX.Element }) {
  return (
    <div class={stl.traceRow}>
      <div class={stl.traceRowIcon}>
        <ArrowUpIcon />
      </div>
      <div class={stl.traceRowValue}>{children}</div>
    </div>
  );
}
