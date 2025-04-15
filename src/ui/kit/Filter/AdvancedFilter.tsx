import { css } from 'vite-css-in-js';
import type { ProFilter } from '#entities';
import { EqualityIcon } from '../Icons/EqualityIcon.tsx';
import { EyeIcon } from '../Icons/EyeIcon.tsx';
import { FilterIcon } from '../Icons/FilterIcon.tsx';
import { HighlighIcon } from '../Icons/HighlighIcon.tsx';
import { NotEqualityIcon } from '../Icons/NotEqualityIcon.tsx';
import { TrashIcon } from '../Icons/TrashIcon.tsx';
import { Switch } from '../Switch/index.tsx';
import { SimpleFilter } from './SimpleFilter.tsx';
import { useSignal } from '@preact/signals';

const stl = {
  root: css`
    display: flex;
    flex-flow: row nowrap;
    border: 1px solid var(--level-6);
    border-radius: var(--l2);
    box-sizing: border-box;
    overflow: hidden;
  `,
  filterControls: css`
    display: flex;
    flex-flow: row nowrap;
    flex: 1;
  `,
  baseBtn: css`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: 0;
    background-color: var(--level-2);
    position: relative;
  `,
  modeBtn: css`
    min-width: 24px;
  `,
  scopeBtn: css`
    min-width: 56px;
    font-size: 0.9em;
    font-family: monospace;
    padding: 0 8px;
    cursor: pointer;
  `,
  controlBtn: css`
  `,
  filter: css`
    display: flex;
    flex-flow: row nowrap;
    flex: 1;
    height: 32px;

    & label {
      border-radius: 0;
      border: none;
    }
  `,
  divider: css`
    width: 1px;
    height: 100%;
    background-color: var(--level-6);
  `,
  colorIndicator: css`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: var(--level-1);
  `,
  colorIndicatorEmpty: css`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px dashed black;
  `,
  colorPicker: css`
    position: absolute;
    inset: 0;
    opacity: 0;
  `
};

export function AdvancedFilter<T extends ProFilter>({
  filter,
  onRemove,
  onToggle,
}: {
  filter: T;
  onRemove: (filter: T) => void;
  onToggle: (filter: T) => void;
}) {
  const $color = useSignal<string | null>('');

  return (
    <div class={stl.root}>
      <button type="button" class={`${stl.baseBtn} ${stl.controlBtn}`} onClick={() => onToggle(filter)}>
        <EyeIcon />
      </button>
      <Divider />
      <div class={stl.filterControls}>
        <button 
          class={`${stl.baseBtn}`} 
          onClick={(event) => {
            if(!$color.value)
              $color.value = 'var(--accent)'
            else if(event.ctrlKey)
              $color.value = null
          }}
        >
          <ColorIndicator color={$color.value} />
          {$color.value ? <ColorPicker onColorChange={(color) => $color.value = color} /> : null}
        </button>
        <Divider />
        <button class={`${stl.baseBtn} ${stl.modeBtn} ${stl.scopeBtn}`}>
          <Switch
            enabled={filter.$searchScope.value === 'name'}
            onClick={() => filter.toggleSearchScope()}
            iconOn={<div>name</div>}
            iconOff={<div>payload</div>}
          />
        </button>
        <Divider />
        <button type="button" class={`${stl.baseBtn} ${stl.modeBtn}`} onClick={() => filter.toggleInvert()}>
          {filter.$inverted.value ? <NotEqualityIcon /> : <EqualityIcon />}
        </button>
        <Divider />
        <div class={stl.filter}>
          <SimpleFilter onInput={console.log} placeholder="Filter by an expression" />
        </div>
        <Divider />
        <button
          type="button"
          class={`${stl.baseBtn} ${stl.modeBtn}`}
          onClick={() => filter.toggleHighlight()}
        >
          {filter.$highlighted.value ? <HighlighIcon /> : <FilterIcon />}
        </button>
      </div>
      <Divider />
      <button type="button" class={`${stl.baseBtn} ${stl.controlBtn}`} onClick={() => onRemove(filter)}>
        <TrashIcon />
      </button>
    </div>
  );
}

function Divider() {
  return <div class={stl.divider} />;
}

function ColorIndicator({ color }: { color: string | null }) {
  return (
    <div
      style={{ backgroundColor: color || undefined }}
      class={color ? stl.colorIndicator : stl.colorIndicatorEmpty}
    />
  )
}

function ColorPicker({ onColorChange }: { onColorChange: (color: string) => void }) {
  return (
    <input
      class={stl.colorPicker}
      type="color"
      onChange={(e) => onColorChange(e.currentTarget.value)}
      onClick={e => {
        if(e.ctrlKey) {
          e.preventDefault()
        }
      }}
    />
  )
}