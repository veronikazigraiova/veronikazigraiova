/* The wandering chimera: change the dialogue lists to give it new things to say. */
(()=>{
  if(document.getElementById('site-chimera'))return;
  const lines=[
    "The void left me on read.","I exist. Nobody consulted me.","I stared into the abyss. It asked for my email.",
    "Free will was a questionable design decision.","My five-year plan is to decompose gracefully.",
    "I have achieved nothing today. A personal best.","I tried optimism once. Horrible texture.",
    "Reality is doing that thing again.","I'm having an existential inconvenience.",
    "I asked the universe for a sign. It sent an invoice.","I am mostly bones and unresolved questions.",
    "The concept of tomorrow seems a bit presumptuous.","I don't fear death. I fear small talk.",
    "My soul is currently out of office.","The afterlife has terrible customer service.",
    "The void is full. Please try again later.","I'm not lost. I'm haunting strategically.",
    "Your bones seem very attached to you.","The walls have ears. Mine are decorative.",
    "Something followed you here. Probably harmless.","The mushrooms have reached a verdict.",
    "I know what you did. Not what it was, but I know.","Don't worry. The scratching is probably structural.",
    "The basement is making decisions again.","One of us is cursed. I won't say which.",
    "I would avoid the third door. There are only two.","I have teeth in places you haven't considered.",
    "The shadows are gossiping about you.","No sudden movements. The wallpaper is nervous.",
    "I collect teeth. Not professionally.","The ceiling knows something.",
    "Soup is just a beverage with responsibilities.","I have never trusted a staircase.",
    "Somewhere, a Victorian child is coughing.","The moon looks suspicious tonight.",
    "My therapist is a damp rock.","I am banned from three cemeteries and one aquarium.",
    "I was raised by a very judgmental bog.","I ate a candle once. Would not recommend.",
    "My hobbies include lurking and administrative errors.","I am technically an indoor cryptid.",
    "I have a skeleton. Several, actually.","A moth once called me dramatic.",
    "I can't come out tonight. I have to stand ominously in a corridor.",
    "I was going to say something profound, but a beetle distracted me.",
    "The mushrooms say you're doing fine. They're unreliable.",
    "I'm not a bug. I'm a deeply unfortunate feature.","Please ignore the ominous clicking.",
    "I came here for the ambience and stayed because I lack a map.",
    "A little decay builds character.","I'm not brooding. I'm photosynthesising badly.",
    "This is my good side. All the others are worse.","Please do not mistake my silence for wisdom.",
    "The crypt is closed for renovations.","I have never won an argument with a mushroom.",
    "Somewhere a crow is disappointed in us.","I was normal once. Briefly. Allegedly.",
    "Do you think the worms have a union?","I regret learning what taxes are.",
    "Everything is temporary. Except that smell.","This website has excellent hiding places."
  ];
  const rare=[
    "The prophecy was a typo.","I am the reason the church bells ring at 3:17.",
    "Do not trust the second moon.","I've been here longer than the domain name.",
    "The bones are not mine. Please stop asking.","The last visitor is still technically here."
  ];
  const annoyed=[
    "Again? How industrious.","You're quite committed to this bit.",
    "I'm filing a complaint with the cemetery.","Congratulations. You've annoyed a cryptid.",
    "You have mistaken me for a button. Rude, but accurate.",
    "This is becoming a relationship.","Your finger and I need boundaries.",
    "I have other hauntings scheduled.","The mushrooms are taking notes.",
    "Do you also poke wild animals?"
  ];
  const milestones={1:"Oh. Hello.",3:"You've touched me three times. We're practically engaged.",5:"Do you not have a perfectly good website to browse?",10:"Fine. We're friends now. Unfortunately.",20:"Twenty clicks. I'm putting you in my will. It's mostly moss.",30:"Thirty clicks. The cemetery has been notified.",50:"Fifty clicks. You are now legally a cryptid."};
  const wrap=document.createElement('div');wrap.id='site-chimera';
  const speech=document.createElement('div');speech.id='site-chimera-speech';speech.setAttribute('role','status');speech.setAttribute('aria-live','polite');speech.hidden=true;
  const creature=document.createElement('button');creature.type='button';creature.id='site-chimera-creature';creature.setAttribute('aria-label','Talk to the floating chimera');
  const pic=document.createElement('img');pic.src=new URL('assets/chimera.png',document.currentScript?.src||document.baseURI).href;pic.alt='';creature.append(pic);
  const dismiss=document.createElement('button');dismiss.type='button';dismiss.id='site-chimera-dismiss';dismiss.setAttribute('aria-label','Hide the chimera');dismiss.textContent='×';
  const summon=document.createElement('button');summon.type='button';summon.id='site-chimera-return';summon.textContent='Summon the chimera';summon.hidden=true;
  wrap.append(speech,creature,dismiss);document.body.append(wrap,summon);
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let clicks=0,shown=true,x=0,y=0,tx=0,ty=0,frame=0,last=0,nextTarget=0,vanishAt=0,returnAt=0,speechUntil=0,previous=-1;
  const pick=(arr)=>{let i=Math.floor(Math.random()*arr.length);if(arr.length>1&&i===previous)i=(i+1)%arr.length;previous=i;return arr[i]};
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
  function limits(){return {x:Math.max(0,innerWidth-wrap.offsetWidth-8),y:Math.max(0,innerHeight-wrap.offsetHeight-8)}}
  function target(){const b=limits();tx=Math.random()*b.x;ty= Math.min(b.y,55+Math.random()*Math.max(0,b.y-100))}
  function position(){const b=limits();x=clamp(x,0,b.x);y=clamp(y,0,b.y);wrap.style.transform=`translate3d(${x}px,${y}px,0)`;speech.style.left=clamp(innerWidth/2-x,Math.min(75,innerWidth/2),Math.max(75,wrap.offsetWidth-10))+'px';}
  function tick(t){if(!shown)return;const dt=last?Math.min((t-last)/1000,.05):0;last=t;
    if(!reduced){if(t>=nextTarget){target();nextTarget=t+3500+Math.random()*4500}const speed=27;x+=clamp(tx-x,-speed*dt,speed*dt);y+=clamp(ty-y,-speed*dt,speed*dt);position()}
    if(speechUntil&&t>speechUntil){speech.hidden=true;speechUntil=0}
    if(!reduced&&t>vanishAt&&!returnAt&&!speechUntil){wrap.style.opacity='0';returnAt=t+900}
    if(returnAt&&t>returnAt){target();x=tx;y=ty;position();wrap.style.opacity='1';vanishAt=t+18000+Math.random()*18000;returnAt=0}
    frame=requestAnimationFrame(tick);
  }
  creature.addEventListener('click',()=>{clicks++;speech.textContent=milestones[clicks]||(clicks>10&&Math.random()<.3?pick(annoyed):Math.random()<.045?pick(rare):pick(lines));speech.hidden=false;speechUntil=performance.now()+4600;vanishAt=performance.now()+18000;wrap.style.opacity='1';returnAt=0;});
  dismiss.addEventListener('click',()=>{shown=false;cancelAnimationFrame(frame);wrap.hidden=true;summon.hidden=false;speech.hidden=true;});
  summon.addEventListener('click',()=>{shown=true;wrap.hidden=false;summon.hidden=true;last=0;target();position();wrap.style.opacity='1';vanishAt=performance.now()+20000;frame=requestAnimationFrame(tick);});
  window.addEventListener('resize',position);
  x=Math.max(0,innerWidth-wrap.offsetWidth-25);y=Math.max(60,innerHeight-wrap.offsetHeight-100);position();target();vanishAt=performance.now()+22000;frame=requestAnimationFrame(tick);
})();
