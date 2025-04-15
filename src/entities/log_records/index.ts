import { computed, signal } from '@preact/signals';
import mock from './mockData.ts';

interface ActionFiredRecord {
  name: string;
  type: 'actionFired';
  payload: unknown;
}
interface StateChangeRecord {
  name: string;
  type: 'stateChange';
  payload: unknown;
}

export type ReatomLogRecord = ActionFiredRecord | StateChangeRecord;

const $all = signal<ReatomLogRecord[][]>([[]]);
const $current = signal<ReatomLogRecord | null>(null);
const $filter = signal<string>('');
const $filtered = computed(() => {
  const filter = $filter.value;
  const all = $all.value;
  return filter.length ? all.flat().filter((x) => x.name.includes(filter)) : all;
});

export const entities = {
  $all,
  $current,
  $filtered,
  set: (entities: ReatomLogRecord[][]) => {
    $all.value = entities;
  },
  add: (entity: ReatomLogRecord[]) => {
    $all.value = [...$all.value, entity];
  },
  select: (entity: ReatomLogRecord) => {
    $current.value = entity;
  },
  // https://english.stackexchange.com/questions/18465/unselect-or-deselect
  deselect: () => {
    $current.value = null;
  },
  setFilter: (filter: string) => {
    $filter.value = filter;
  },
};

export const mockEntities = () => {
  entities.set(mock);
};

export const $recording = (() => {
  const $recording = signal(true);
  const actions = {
    toggle: () => {
      $recording.value = !$recording.value;
    },
    start: () => {
      $recording.value = true;
    },
    stop: () => {
      $recording.value = false;
    },
  };
  return Object.assign($recording, actions);
})();
