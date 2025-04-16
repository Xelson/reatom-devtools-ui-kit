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
      color: var(--accent);
      border-bottom: 2px solid var(--accent);
      opacity: 1;
    }
  `,
  label: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 6px;
  `,
  tabsList: css`
    display: flex;
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