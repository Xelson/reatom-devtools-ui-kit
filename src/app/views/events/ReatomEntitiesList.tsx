import { Virtuoso } from 'react-virtuoso';
import { css } from 'vite-css-in-js';
import { entities } from '#entities';
import { Code, ReatomLogEvent, Stack } from '#ui/kit';

const stl = {
  listRoot: css`
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
  `,
};

const actions = [{ label: 'Log to console', onClick: () => console.log('Action clicked') }];
export function ReatomEntitiesList() {
  const items = entities.$filtered.value;
  const current = entities.$current.value;
  return (
    <div class={stl.listRoot}>
      <Virtuoso
        style={{ height: '100%' }}
        totalCount={items.length}
        itemContent={(i) => {
          const item = items[i];
          if ('length' in item) {
            return (
              <Stack i={i} title={'8:31:09 PM [607ms]'}>
                {item.map((itm) => (
                  <ReatomLogEvent
                    onClick={() => entities.$current.value === itm ? entities.deselect() : entities.select(itm)}
                    key={itm.name}
                    name={itm.name}
                    type={itm.type}
                    selected={current === itm}
                    actions={actions}
                    content={<Code code={itm.payload} />}
                  />
                ))}
              </Stack>
            );
          }
          return (
            <ReatomLogEvent
              onClick={() => entities.select(item)}
              key={item.name}
              name={item.name}
              type={item.type}
              selected={current === item}
              actions={actions}
              content={<Code code={item.payload} />}
            />
          );
        }}
      />
    </div>
  );
}
