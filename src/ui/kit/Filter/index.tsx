import { useSignal } from '@preact/signals';
import { css } from 'vite-css-in-js';
import { type ProFilter, createFilter } from '#entities';
import { PlusIcon } from '../Icons/PlusIcon.tsx';
import { Switch } from '../Switch/index.tsx';
import { AdvancedFilter } from './AdvancedFilter.tsx';
import { SimpleFilter } from './SimpleFilter.tsx';
import { BrainIcon, RabbitIcon, SearchIcon } from 'lucide-react';

const stl = {
  filters: css`
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    border-bottom: 1px solid var(--level-4);
    border-top: 1px solid var(--level-4);
    padding: 10px 6px;
    box-sizing: border-box;
    gap: 8px;
  `,
  easy: css`
    display: flex;
    width: 100%;
  `,
  pro: css`
    width: 100%;
    display: flex;
    gap: 8px;
    flex-flow: column nowrap;
  `,
  actions: css`
    margin-bottom: auto;
    flex-shrink: 0;
  `,
  icon: css`
    display: block;
    width: 32px;
    padding-right: 4px;
  `,
  input: css`
    width: 100%;
    padding: 8px;
    border: none;
    background-color: transparent;
    &:focus {
      outline: none;
      background-color: var(--focus-color);
    }
  `,
  addBtn: css`
    padding: 4px 8px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
  `,
  switch: css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    border-radius: var(--l2);
    border: 1px solid var(--level-4);
    font-size: 0.9em;
    font-weight: 600;
    height: 32px;
    width: 64px;
  `,
};

const Mods = Object.freeze({
  Easy: 'Easy',
  Pro: 'Pro',
} as const);

export function Filter({ onInput }: { onInput: (value: string) => void }) {
  const $searchMode = useSignal<keyof typeof Mods>(Mods.Easy);
  const $proFilters = useSignal<ProFilter[]>([createFilter(), createFilter(), createFilter()]);

  return (
    <div class={stl.filters}>
      {$searchMode.value === Mods.Easy ? (
        <div class={stl.easy}>
          <SimpleFilter startElement={<SearchIcon size="16" />} placeholder="Filter events by name or state" onInput={onInput} />
        </div>
      ) : (
        <div class={stl.pro}>
          {$proFilters.value.map((pFilter) => (
            <AdvancedFilter
              onToggle={() => console.log('toggle')}
              key={pFilter.id}
              filter={pFilter}
              onRemove={(deletedFilter) => {
                $proFilters.value = $proFilters.value.filter((f) => f !== deletedFilter);
              }}
            />
          ))}
          <button
            class={stl.addBtn}
            onClick={() => {
              $proFilters.value = [...$proFilters.value, createFilter()];
            }}
            type="button"
          >
            <PlusIcon /> Add filter
          </button>
        </div>
      )}
      <div class={stl.actions}>
        <Switch
          enabled={$searchMode.value === Mods.Pro}
          onClick={() => {
            $searchMode.value = $searchMode.value === Mods.Easy ? Mods.Pro : Mods.Easy;
          }}
          iconOn={
            <button title="Current mode: Pro" class={stl.switch}>
              <BrainIcon /> Pro
            </button>
          }
          iconOff={
            <button title="Current mode: Easy" class={stl.switch}>
              <RabbitIcon /> Easy
            </button>
          }
        />
      </div>
    </div>
  );
}
