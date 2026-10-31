import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const timing=JSON.parse(readFileSync('src/timing.json','utf8'));
for(const index of [0,2,5,6]) {
  const scene=timing.scenes[index];
  const frame=scene.from+Math.min(90,Math.floor(scene.duration/2));
  execFileSync('npx',['remotion','still','src/index.ts','BandarLampung',`out/preview-${index+1}.png`,`--frame=${frame}`],{stdio:'inherit'});
}
