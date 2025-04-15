import type { JSX } from 'preact/jsx-runtime';
import { css } from 'vite-css-in-js';

const stl = {
  section: css`
    display: flex;
    flex-flow: column nowrap;
    min-height: 0;
    &[data-greedy='true'] {
      flex: 1;
    }
  `,
  sectionTitle: css`
    padding: 4px 8px;
    background-color: var(--level-3);
    font-weight: bold;
  `,
  sectionContent: css`
    display: flex;
    flex-direction: column;
    padding: 4px;
    overflow: auto;

    &:has(code) {
      padding-left: 10px;
      padding-right: 10px;
    }
  `,
};

export const SectionTitle = ({ children }: { children: string | JSX.Element[] | JSX.Element }) => (
  <div class={stl.sectionTitle}>{children}</div>
);

export const SectionContent = ({ children }: { children: JSX.Element[] | JSX.Element }) => (
  <div class={stl.sectionContent}>{children}</div>
);

export function Section({
  children,
  title,
  greedy = false,
}: {
  children: JSX.Element[] | JSX.Element;
  title: string;
  greedy?: boolean;
}) {
  return (
    <div class={stl.section} data-greedy={greedy}>
      <SectionTitle>{title}</SectionTitle>
      <SectionContent>{children}</SectionContent>
    </div>
  );
}
