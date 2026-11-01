import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const motion=JSON.parse(readFileSync('episodes/03-skills/host-motion.json','utf8'));
let openFrame=15;
for(let i=15;i<170;i++)if(motion.mouth[i].open>motion.mouth[openFrame].open)openFrame=i;
for(const [name,frame] of [['speaking',openFrame],['blink',75],['eyes-open',81]]){
 execFileSync('npx',['remotion','still','episodes/03-skills/index.ts','KodeyHostDemo',`out/ep03/host-${name}.png`,`--frame=${frame}`],{stdio:'inherit'});
}
