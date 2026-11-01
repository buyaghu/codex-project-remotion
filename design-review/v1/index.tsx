import {Composition,registerRoot} from 'remotion';
import {DesignFrame,ReviewBoard,MotionReview} from './Review';
const Root=()=> <>{[0,1,2].map(i=><Composition key={i} id={'Design'+['A','B','C'][i]} component={DesignFrame} defaultProps={{variant:i}} width={1080} height={1920} fps={30} durationInFrames={120}/>)}<Composition id="ReviewBoard" component={ReviewBoard} width={1620} height={960} fps={30} durationInFrames={120}/><Composition id="MotionReview" component={MotionReview} width={1080} height={1920} fps={30} durationInFrames={360}/></>;
registerRoot(Root);
