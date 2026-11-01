import {execFileSync} from 'node:child_process';
for(const label of ['A','B','C']) execFileSync('npx',['remotion','still','design-review/v1/index.tsx','Design'+label,`out/design-review/design-${label}.png`,'--frame=90'],{stdio:'inherit'});
execFileSync('npx',['remotion','still','design-review/v1/index.tsx','ReviewBoard','out/design-review/comparison.png','--frame=90'],{stdio:'inherit'});
execFileSync('npx',['remotion','render','design-review/v1/index.tsx','MotionReview','out/design-review/motion-review.mp4','--codec=h264','--concurrency=2'],{stdio:'inherit'});
