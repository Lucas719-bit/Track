export class ClosureTimer { since=null; update(closed,now,delay){if(!closed){this.since=null;return false;} this.since??=now;return now-this.since>=delay;} }
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);
export function fingers(p){return [distance(p[4],p[17])>distance(p[3],p[17])*1.15,...[8,12,16,20].map(i=>distance(p[i],p[0])>distance(p[i-2],p[0])*1.15)];}
export function gestureName(f){const key=f.map(Number).join('');return {'01001':'Rock on','11001':'I love you','01100':'Peace','11111':'Open palm','00000':'Fist','01000':'Pointing up','10000':'Thumb extended','00001':'Pinky','01110':'Three','01111':'Four'}[key]||'Hand';}
// Hysteresis prevents confidence jitter near the closing threshold resetting the timer.
export class EyeClosure {
  closed=false;
  update(left,right,threshold){
    if(!Number.isFinite(left)||!Number.isFinite(right)){this.closed=false;return false;}
    const boundary=this.closed?Math.max(.05,threshold-.18):threshold;
    this.closed=left>=boundary&&right>=boundary;
    return this.closed;
  }
}
