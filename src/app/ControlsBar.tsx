import { $recording } from '#entities';
import { Header } from '../ui/kit/Header';
import { PauseIcon, PlayIcon, SettingsIcon } from '../ui/kit/Icons';
import { Switch } from '../ui/kit/Switch';
import { Tab, TabsList } from '../ui/kit/Tab';

export function ControlsBar() {
  return (
    <Header
      tabs={
        <TabsList>
          <Tab
            label={'Events'}
            onClick={() => console.log('events tab click')}
            active={true}
          />
          <Tab
            label={'State'}
            onClick={() => console.log('states tab click')}
            active={false}
          />
        </TabsList>
      }
      actions={
        <>
          <button title={'Pause'}>
            <Switch
              enabled={$recording.value}
              onClick={$recording.toggle}
              iconOn={<PauseIcon />}
              iconOff={<PlayIcon />}
              flashing
            />
          </button>
          <button title={'Settings'}>
            <SettingsIcon />
          </button>
        </>
      }
    />
  );
}
