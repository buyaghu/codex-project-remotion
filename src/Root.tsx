import {Composition} from 'remotion';
import {Film} from './Film';
import timing from './timing.json';
export const Root = () => <Composition id="BandarLampung" component={Film} durationInFrames={timing.durationInFrames} fps={30} width={1080} height={1920}/>;
