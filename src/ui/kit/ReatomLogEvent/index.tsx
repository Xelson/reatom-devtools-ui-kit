import type { JSX } from 'preact/jsx-runtime';
import { css } from 'vite-css-in-js';
import { Dropdown } from '../Dropdown';
import type { Action } from '../Dropdown/types';
import { LogEventTypeIcon } from './LogEventTypeIcon';
import { ReatomLogEventType } from './types';

const stl = {
  recordRoot: css`
    display: flex;
    flex-direction: column;
    align-items: stretch; 
    margin: var(--gap, 4px);
    font-size: 14px;
    align-items: flex-start;
    border-radius: var(--l1);
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid var(--level-5);
    outline: 2px solid transparent;
    flex-shrink: 0;
    &:hover {
      background-color: var(--level-1);
    }
    &:hover button {
      visibility: visible;
    }
    &[data-active='true'] {
      outline-color: var(--accent);
      background-color: var(--level-3);
    }
    & > * {
      width: 100%;
      box-sizing: border-box;
    }
  `,
  recordName: css`
    padding: 0 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    font-family: monospace;
  `,
  recordType: css`
    color: #4b4b4b;
    & > svg {
      display: block;
    }
  `,
  recordTitle: css`
    font-weight: 500;
    padding: 4px 8px;
    flex: 1;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    background-color: var(--level-2);
    border-bottom: 1px solid var(--level-5);
  `,
  content: css`
    padding: 4px 8px;

  `,
};

export function ReatomLogEvent({
  type,
  name,
  actions,
  selected,
  onClick,
  content,
}: {
  type: ReatomLogEventType;
  name: string;
  actions?: Action[];
  selected: boolean;
  onClick?: () => void;
  content?: JSX.Element;
}) {
  return (
    <div class={stl.recordRoot} data-active={selected} onClick={onClick}>
      <div class={stl.recordTitle}>
        <div class={stl.recordType}>
          <LogEventTypeIcon type={type} />
        </div>
        <div class={stl.recordName} title={name}>
          {name}
        </div>
        {actions?.length ? <Dropdown actions={actions} /> : null}
      </div>
      {content ? <div class={stl.content}>{content}</div> : null}
    </div>
  );
}
