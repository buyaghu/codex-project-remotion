import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const timing=JSON.parse(readFileSync('episodes/03-skills/timing.json','utf8'));
for(const i of [0,2,4,7]) {
 const s=timing.scenes[i];
 execFileSync('npx',['remotion','still','episodes/03-skills/index.ts','CodexSkills',`out/ep03/preview-${i+1}.png`,`--frame=${s.from+Math.min(100,Math.floor(s.duration*.65))}`],{stdio:'inherit'});
}
