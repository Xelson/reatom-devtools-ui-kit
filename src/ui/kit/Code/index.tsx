import { memo } from 'preact/compat';
import { css } from 'vite-css-in-js';

const style = css`
  display: block;
`

export const Code = memo(function Code({ code }: { code: unknown }) {
  return <code class={style}>{JSON.stringify(code, null, 2)}</code>;
});
