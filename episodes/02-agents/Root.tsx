import {Composition} from 'remotion';
import {AgentsFilm} from './Film';
import timing from './timing.json';
export const Root = () => <Composition id="CodexAgents" component={AgentsFilm} durationInFrames={timing.durationInFrames} fps={30} width={1080} height={1920}/>;
