import { useLayoutEffect, useRef } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';
import { css } from 'vite-css-in-js';

const getSectionVarName = (i: number) => `--sec-${i}`;
const getSectionVarValue = (el: HTMLElement, i: number): number | null => {
  const cssVarVal = el.style.getPropertyValue(getSectionVarName(i));
  if (cssVarVal !== '') return Number.parseInt(cssVarVal);
  return null;
};
const setSectionVarValue = (el: HTMLElement, i: number, val: number) =>
  el.style.setProperty(getSectionVarName(i), `${val}px`);

const stl = {
  column: css`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: var(--sec-0, 1fr) var(--sec-1, 1fr) var(--sec-2, 1fr);
    height: 100%;
  `,
  cell: css`
    display: flex;
    flex-flow: column nowrap;
    min-height: 0;
    box-sizing: border-box;
    /* box-shadow: inset 0 0 0 2px rgba(255,0,0,.8); */
  `,
  resizeHandle: css`
    position: relative;
    top: 3px;
    width: 100%;
    height: 6px;

    cursor: row-resize;
    flex-shrink: 0;
    user-select: none;
    &:hover {
      background-color: var(--level-5);
    }
  `,
};

function onDragStart(
  root: { current: HTMLDivElement | null },
  handleIdx: number,
  { minHeight }: { minHeight: number },
) {
  return (event: MouseEvent) => {
    const rootEl = root.current;
    if (rootEl === null) return;
    const initialY = event.clientY;
    console.assert(handleIdx !== 0, "Top section doesn't have a resize handle");
    const setSectionHeight = (sec: number, height: number) => setSectionVarValue(rootEl, sec, height);

    // Prepare initial heights;
    const initialHeights: number[] = [];
    let checksum = 0;
    let section = 0;
    if (!root.current) return;
    while (true) {
      const initialHeight = getSectionVarValue(root.current, section);
      if (initialHeight !== null) {
        initialHeights.push(initialHeight);
        checksum += initialHeight;
        section++;
      } else break;
    }
    const totalSections = section - 1;

    const onMouseMove = (e: MouseEvent) => {
      const shift = Math.ceil(initialY - e.clientY);
      const changeset: number[] = [];
      let canContinue = true;

      // Apply shift for above panel
      canContinue = (() => {
        let aboveShift = shift;
        let i = handleIdx - 1;
        while (i >= 0) {
          const newHeight = initialHeights[i] - aboveShift;
          if (newHeight < minHeight) {
            changeset[i] = minHeight;
            aboveShift = aboveShift - (initialHeights[i] - minHeight);
            i--;
          } else {
            aboveShift = 0;
            changeset[i] = newHeight;
            break;
          }
        }
        return aboveShift === 0;
      })();
      if (!canContinue) return;

      // Apply shift for below panel
      canContinue = (() => {
        let belowShift = shift;
        let k = handleIdx;
        while (k <= initialHeights.length - 1) {
          const newHeight = initialHeights[k] + belowShift;
          if (newHeight < minHeight) {
            changeset[k] = minHeight;
            belowShift = belowShift + (initialHeights[k] - minHeight);
            k++;
          } else {
            belowShift = 0;
            changeset[k] = newHeight;
            break;
          }
        }
        return belowShift === 0;
      })();
      if (!canContinue) return;

      // Apply changes
      let section = totalSections;
      while (section >= 0) {
        const finalHeight = changeset[section] ?? initialHeights[section];
        setSectionHeight(section, finalHeight);
        section--;
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

export function VerticalSections({
  children,
  minHeight = 100,
}: {
  children: JSX.Element[];
  minHeight?: number;
}) {
  const rootElRef = useRef<HTMLDivElement>(null);
  const cellsRefs = useRef<HTMLDivElement[]>([]);

  // Setup variables
  useLayoutEffect(() => {
    const rootEl = rootElRef.current;
    if (!rootEl) return;
    cellsRefs.current.forEach((cell, i) => {
      requestAnimationFrame(() => {
        const { height } = cell.getBoundingClientRect();
        rootEl.style.setProperty(`--sec-${i}`, `${height}px`);
      });
    });
  }, []);
  return (
    <div class={stl.column} ref={rootElRef}>
      {children.map((child, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={i}
          class={stl.cell}
          ref={(el) => {
            cellsRefs.current[i] = el!;
          }}
        >
          {i !== 0 && <div class={stl.resizeHandle} onMouseDown={onDragStart(rootElRef, i, { minHeight })} />}
          {child}
        </div>
      ))}
    </div>
  );
}
