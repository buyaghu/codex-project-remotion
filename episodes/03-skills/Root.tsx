import {Composition} from 'remotion';
import {SkillsFilm} from './Film';
import timing from './timing.json';
export const Root = () => <Composition id="CodexSkills" component={SkillsFilm} durationInFrames={timing.durationInFrames} fps={30} width={1080} height={1920}/>;
