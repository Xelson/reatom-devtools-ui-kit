import { isValidElement } from 'preact';
import { cloneElement, ReactNode } from 'preact/compat';
import { css } from 'vite-css-in-js';

const stl = {
  tab: css`
    padding: 10px 2px;
    &:hover { 
      background-color: transparent;
      & span {
        background-color: var(--level-3);
      }
    }
  `,
  label: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 6px;
    border: 1px solid transparent;
    border-radius: var(--l2);
    padding: 4px 10px;
    opacity: 0.8;

    [data-active='true'] & {
      border-color: var(--level-5);
      background-color: var(--level-2);
      opacity: 1;
    }
  `,
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
