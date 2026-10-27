import test from 'node:test';
import assert from 'node:assert/strict';
import {ClosureTimer, gestureName} from './tracking.js';
test('eye closure must be continuous and resets when face disappears',()=>{const t=new ClosureTimer(); assert.equal(t.update(true,0,1500),false); assert.equal(t.update(true,1499,1500),false); assert.equal(t.update(true,1500,1500),true); assert.equal(t.update(null,1600,1500),false); assert.equal(t.update(true,1700,1500),false); assert.equal(t.update(false,1800,1500),false);});
test('custom finger patterns distinguish rock, peace, and open palm',()=>{assert.equal(gestureName([false,true,false,false,true]),'Rock on');assert.equal(gestureName([false,true,true,false,false]),'Peace');assert.equal(gestureName([true,true,true,true,true]),'Open palm');});
import {EyeClosure} from './tracking.js';
test('highway tolerates borderline blink scores until eyes clearly reopen',()=>{const eyes=new EyeClosure(),timer=new ClosureTimer();assert.equal(timer.update(eyes.update(.8,.8,.5),0,1500),false);assert.equal(timer.update(eyes.update(.48,.49,.5),900,1500),false);assert.equal(timer.update(eyes.update(.7,.7,.5),1500,1500),true);assert.equal(eyes.update(.1,.1,.5),false);});
test('missing face and one closed eye do not trigger highway closure',()=>{const eyes=new EyeClosure();assert.equal(eyes.update(.8,.1,.5),false);assert.equal(eyes.update(.8,.8,.5),true);assert.equal(eyes.update(null,null,.5),false);assert.equal(eyes.update(.45,.45,.5),false);});
