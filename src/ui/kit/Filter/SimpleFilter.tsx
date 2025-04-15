import { css } from 'vite-css-in-js';
import { RegexpIcon } from '../Icons/RegexpIcon.tsx';
import { SearchIcon } from 'lucide-react';

const stl = {
  root: css`
    display: flex;
    padding: 0 0 0 8px;
    flex-flow: row nowrap;
    color: inherit;
    align-items: center;
    width: 100%;
    border: 1px solid var(--level-4);
    border-radius: var(--l3);
    padding: 3px 12px;
    padding-right: 3px;
    box-sizing: border-box;
    height: 32px;
    gap: 4px;
    transition: 100ms all;
    background-color: transparent;
    &:hover {
      background-color: var(--level-2);
    }
  `,
  input: css`
    width: 100%;
    border: none;
    background-color: transparent;
    &:focus {
      outline: none;
      background-color: var(--focus-color);
    }
  `,
};

export function SimpleFilter({
  placeholder,
  onInput,
}: { placeholder: string; onInput: (value: string) => void }) {
  return (
    <label class={stl.root}>
      <SearchIcon size="16" />
      <input
        class={stl.input}
        type="search"
        placeholder={placeholder}
        onChange={(e) => onInput(e.currentTarget.value)}
      />
      <button type="button">
        <RegexpIcon />
      </button>
    </label>
  );
}
