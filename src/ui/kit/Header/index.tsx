import type { JSX } from 'preact/jsx-runtime';
import { css } from 'vite-css-in-js';
const stl = {
  header: css`
    display: block;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  `,
  start: css`
    display: block;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 14px;
  `,
  logo: css`
    width: 32px;
    height: 32px;
    user-select: none;
    cursor: move;
  `,
  tabs: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  `,
  actions: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 2px;
  `,
};

import LogoSvg from './logo.svg';

export function Header({ tabs, actions }: { tabs: JSX.Element; actions: JSX.Element }) {
  return (
    <div class={stl.header}>
      <div class={stl.start}>
        <img draggable={false} class={stl.logo} src={LogoSvg} />
        <div class={stl.tabs}>{tabs}</div>
      </div>
      <div class={stl.actions}>{actions}</div>
    </div>
  );
}
