import { isValidElement } from 'preact';
import { cloneElement, PropsWithChildren, ReactNode } from 'preact/compat';
import { css } from 'vite-css-in-js';

const stl = {
  tab: css`
    padding: 0 8px;
    border-radius: 0;
    height: 42px;
    min-width: 80px;

    &[data-active='true'] {
      border-bottom: 2px solid var(--accent);
      opacity: 1;
    }
  `,
  label: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 6px;
    // border: 1px solid transparent;
    // border-radius: var(--l2);
    // padding: 4px 10px;
    // opacity: 0.8;

    // [data-active='true'] & {
    //   border-color: var(--level-5);
    //   background-color: var(--level-2);
    //   opacity: 1;
    // }
  `,
  tabsList: css`
    display: flex;
    // border: 1px solid var(--level-5);
    // border-radius: var(--l3);
    // padding: 2px;
  `
};

export function Tab({
  label,
  onClick,
  active,
  icon,
}: { label: string; onClick: () => void; active: boolean; icon?: ReactNode }) {
  return (
    <button class={stl.tab} data-active={active} onClick={onClick}>
      <span class={stl.label}>
        {icon && isValidElement(icon) && cloneElement(icon, { size: 16 })} {label}
      </span>
    </button>
  );
}

export function TabsList({
  children
}: PropsWithChildren<{}>) {
  return (
    <div class={stl.tabsList}>
      {children}
    </div>
  );
}