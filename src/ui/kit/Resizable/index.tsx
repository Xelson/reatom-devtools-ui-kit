import type { ComponentChild } from 'preact';
import { useLayoutEffect, useRef } from 'preact/hooks';

import { css } from 'vite-css-in-js';

const stl = {
  root: css`
    display: flex;
    position: relative;
    flex-shrink: 0;
    &[data-direction='top'] {
      flex-flow: column nowrap;
      height: var(--resizable-value);
      & > #grip {
        width: 100%;
        height: 6px;
        &:hover {
          cursor: row-resize;
        }
      }
    }
    &[data-direction='right'],
    &[data-direction='left'] {
      flex-flow: row nowrap;
      width: var(--resizable-value);
      & > #grip {
        width: 6px;
        height: 100%;
        &:hover {
          cursor: col-resize;
        }
      }
    }
  `,
  grip: css`
    position: absolute;
    top: 0;
    bottom: 0;
    user-select: none;
    &:hover {
      background-color: var(--level-3);
      cursor: col-resize;
    }
  `,
  left: css`
    left: 0;
  `,
  right: css`
    right: 0;
  `,
  top: css`
    top: 0;
  `,
};

type Direction = 'right' | 'left' | 'top';

function onDragStart(
  el: { current: HTMLDivElement | null },
  settings: {
    direction: Direction;
    onCollapse?: () => void;
    collapseThreshold?: number;
  },
) {
  return (event: MouseEvent) => {
    const initialX = event.clientX;
    const initialY = event.clientY;
    const initialValue = Number.parseInt(el.current?.style.getPropertyValue('--resizable-value') || '0');
    const onMouseMove = (e: MouseEvent) => {
      let shift = 0;
      if (settings.direction === 'right') {
        shift = e.clientX - initialX;
      } else if (settings.direction === 'left') {
        shift = initialX - e.clientX;
      } else if (settings.direction === 'top') {
        shift = initialY - e.clientY;
      }
      const result = initialValue + shift;
      el.current?.style.setProperty('--resizable-value', `${result}px`);
      if (settings.collapseThreshold && settings.onCollapse && result < settings.collapseThreshold) {
        settings.onCollapse();
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', onMouseMove);
      },
      { once: true },
    );
  };
}

type ResizableProps =
  | {
      children: ComponentChild;
      defaultValue?: number;
      direction: Direction;
    }
  | {
      children: ComponentChild;
      defaultValue?: number;
      direction: Direction;
      onCollapse: () => void;
      collapseThreshold: number;
    };

export function Resizable({ children, defaultValue, direction, ...rest }: ResizableProps) {
  const rootElRef = useRef<HTMLDivElement>(null);
  const collapseThreshold = 'collapseThreshold' in rest ? rest.collapseThreshold : null;
  const onCollapse = 'onCollapse' in rest ? rest.onCollapse : null;

  useLayoutEffect(() => {
    if (!defaultValue) return;
    if (collapseThreshold) {
      if (defaultValue > collapseThreshold) {
        rootElRef.current?.style.setProperty('--resizable-value', `${defaultValue}px`);
      } else {
        rootElRef.current?.style.setProperty('--resizable-value', '0px');
        onCollapse?.();
      }
    } else {
      rootElRef.current?.style.setProperty('--resizable-value', `${defaultValue}px`);
    }
  }, [defaultValue, collapseThreshold, onCollapse]);
  return (
    <div class={stl.root} data-direction={direction} ref={rootElRef}>
      {children}
      <div
        id="grip"
        class={`${stl.grip} ${stl[direction]}`}
        onMouseDown={onDragStart(rootElRef, { direction, ...rest })}
      />
    </div>
  );
}
