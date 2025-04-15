import { signal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { css } from 'vite-css-in-js';
import { mockEntities } from '#entities';
import './app.css';

import { ControlsBar } from './ControlsBar';
import { EventsView } from './views/events';
import { StateOverviewView } from './views/state_overview';

const stl = {
  app: css`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
    border: 1px solid var(--level-10);
    border-radius: var(--l3);
    overflow: hidden;
  `,
  view: css`
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    height: 100%;
    min-height: 0px;
    box-sizing: border-box;
  `,
};

enum Views {
  Events = 'Events',
  StateOverview = 'StateOverview',
}

const views = {
  [Views.Events]: <EventsView />,
  [Views.StateOverview]: <StateOverviewView />,
};

const $view = signal(Views.Events);

export function App() {
  useEffect(() => {
    mockEntities();
  }, []);

  return (
    <div class={stl.app}>
      <ControlsBar />
      <div class={stl.view}>{views[$view.value] ?? null}</div>
    </div>
  );
}
