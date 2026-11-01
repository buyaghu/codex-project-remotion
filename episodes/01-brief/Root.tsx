import {Composition} from 'remotion';
import {BriefFilm} from './Film';
import timing from './timing.json';
export const Root = () => <Composition id="CodexBrief" component={BriefFilm} durationInFrames={timing.durationInFrames} fps={30} width={1080} height={1920}/>;
