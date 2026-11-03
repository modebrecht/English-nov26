/* English Lab · November 2026. Original teaching material, not a transcription.
   Each {{answer}} is one independently revealable step. No external dependencies. */
'use strict';

const lessons = {
  prepositions: {
    kicker: 'EXERCISE 01  /  PREPOSITIONS',
    title: 'Where is the ball?',
    description: 'Schau auf das Bild und ergänze das richtige englische Wort. Ein Wort passt pro Bild.',
    bank: ['in', 'on', 'under', 'next to', 'behind', 'between', 'in front of', 'above'],
    type: 'scenes',
    cards: [
      {position: 'on', sentence: 'The ball is {{on}} the box.'},
      {position: 'under', sentence: 'The ball is {{under}} the box.'},
      {position: 'in', sentence: 'The ball is {{in}} the box.'},
      {position: 'next-to', sentence: 'The ball is {{next to}} the box.'},
      {position: 'behind', sentence: 'The ball is {{behind}} the box.'},
      {position: 'between', sentence: 'The ball is {{between}} the boxes.'},
      {position: 'in-front-of', sentence: 'The ball is {{in front of}} the box.'},
      {position: 'above', sentence: 'The ball is {{above}} the box.'}
    ]
  },
  possessives: {
    kicker: 'EXERCISE 02  /  POSSESSIVES',
    title: 'Whose is it?',
    description: 'Wem gehört der Gegenstand? Setze my, your, his oder her ein.',
    bank: ['my', 'your', 'his', 'her'],
    type: 'sentences',
    cards: [
      {hint: 'Amira has a red bike.', sentence: 'This is {{her}} bike.'},
      {hint: 'I have a purple pencil case.', sentence: 'This is {{my}} pencil case.'},
      {hint: 'You have a green cap.', sentence: 'Is this {{your}} cap?'},
      {hint: 'Leo has a new laptop.', sentence: 'This is {{his}} laptop.'},
      {hint: 'I own this watch.', sentence: 'It is {{my}} watch.'},
      {hint: 'Mia has two cats.', sentence: 'They are {{her}} cats.'},
      {hint: 'You brought a map.', sentence: 'Where is {{your}} map?'},
      {hint: 'Ethan loves football.', sentence: 'It is {{his}} favourite sport.'}
    ]
  },
  contractions: {
    kicker: 'EXERCISE 03  /  SHORT FORMS',
    title: 'Is it is or has?',
    description: 'Entscheide, ob ’s in diesen Sätzen für is oder has steht.',
    bank: ['is', 'has'],
    type: 'sentences',
    cards: [
      {hint: 'She’s at the library.', sentence: 'She’s = She {{is}}'},
      {hint: 'He’s got a new skateboard.', sentence: 'He’s = He {{has}}'},
      {hint: 'It’s Monday today.', sentence: 'It’s = It {{is}}'},
      {hint: 'Mum’s got my phone.', sentence: 'Mum’s = Mum {{has}}'},
      {hint: 'The teacher’s in the room.', sentence: 'The teacher’s = The teacher {{is}}'},
      {hint: 'Our dog’s got a red collar.', sentence: 'Our dog’s = Our dog {{has}}'},
      {hint: 'Ben’s really tired.', sentence: 'Ben’s = Ben {{is}}'},
      {hint: 'Maya’s got two tickets.', sentence: 'Maya’s = Maya {{has}}'}
    ]
  },
  profiles: {
    kicker: 'EXERCISE 04  /  PEOPLE & PLACES',
    title: 'Meet Priya and Hugo',
    description: 'Lies zuerst die Steckbriefe. Ergänze dann die kurzen Texte – jedes fehlende Wort wird einzeln aufgedeckt.',
    bank: [],
    type: 'profiles',
    cards: [
      {
        name: 'Priya', icon: 'P', tone: 'coral',
        facts: [['City', 'Brighton'], ['Country', 'England'], ['Family', '2 sisters · no brothers'], ['Mum', 'Meera'], ['Favourite city', 'York']],
        sentence: '{{Her}} name is Priya. {{She’s}} from Brighton, and {{she’s}} English. {{She’s}} got two sisters, but {{she hasn’t}} got a brother. {{Her}} mum is called Meera. {{Her}} favourite city is York.'
      },
      {
        name: 'Hugo', icon: 'H', tone: 'mint',
        facts: [['City', 'Geneva'], ['Country', 'Switzerland'], ['Family', '1 sister · no brothers'], ['Dad', 'Leo'], ['Favourite city', 'Lausanne']],
        sentence: '{{His}} name is Hugo. {{He’s}} from Geneva, and {{he’s}} Swiss. {{He’s}} got one sister, but {{he hasn’t}} got a brother. {{His}} dad is called Leo. {{His}} favourite city is Lausanne.'
      }
    ]
  }
};

const state = {
  lesson: 'prepositions',
  revealed: Object.fromEntries(Object.keys(lessons).map(key => [key, 0])),
  stepMap: [],
  spotlight: null,
  marker: false,
  zoom: 100,
  theme: 'light'
};

const $ = id => document.getElementById(id);
const escapeHtml = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const number = n => String(n).padStart(2, '0');
function safePref(name, fallback) { try { return localStorage.getItem(name) || fallback; } catch { return fallback; } }
function savePref(name, value) { try { localStorage.setItem(name, String(value)); } catch {} }

/* Small educational diagrams use original SVG shapes, not photographed illustrations. */
function sceneSvg(position) {
  const box = (x=98,y=56,w=75,h=65) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#cce8e4" stroke="#195f63" stroke-width="3.5"/><path d="M${x+11} ${y+11}h${w-22}" stroke="#94c9c6" stroke-width="3" stroke-linecap="round"/>`;
  const ball = (x,y) => `<circle cx="${x}" cy="${y}" r="20" fill="#fd9d65" stroke="#a9502b" stroke-width="3.5"/><path d="M${x-7} ${y-7}q8-7 14 2" fill="none" stroke="#ffdcba" stroke-width="3.5" stroke-linecap="round"/>`;
  const shadow = `<ellipse cx="136" cy="137" rx="105" ry="5" fill="#b8c4c6" opacity=".18"/>`;
  let art = '';
  switch(position) {
    case 'on': art = box(98,67,75,62)+ball(136,47); break;
    case 'under': art = box(98,22,75,62)+ball(136,111); break;
    case 'in': art = `<rect x="98" y="43" width="75" height="80" rx="8" fill="#d9eeea" stroke="#195f63" stroke-width="3.5"/>`+ball(136,87)+`<path d="M98 112h75" stroke="#195f63" stroke-width="3.5"/>`; break;
    case 'next-to': art = box(62,56,75,65)+ball(184,94); break;
    case 'behind': art = ball(136,57)+box(98,63,75,65); break;
    case 'between': art = box(20,56,72,65)+box(181,56,72,65)+ball(136,89); break;
    case 'in-front-of': art = box(98,36,75,65)+ball(136,106); break;
    case 'above': art = box(98,83,75,54)+ball(136,30); break;
  }
  return `<svg class="scene-svg" viewBox="0 0 273 150" role="img" aria-label="Ball and box position"><rect x="0" y="0" width="273" height="150" rx="17" fill="transparent"/>${shadow}${art}</svg>`;
}

function markedText(text, cardIndex) {
  let last = 0;
  const fragments = [];
  const matcher = /\{\{([^{}]+)\}\}/g;
  for (const m of text.matchAll(matcher)) {
    fragments.push(escapeHtml(text.slice(last,m.index)));
    const step = state.stepMap.length;
    state.stepMap.push({step,cardIndex,answer:m[1]});
    fragments.push(`<span class="answer-slot" data-step="${step}" data-answer="${escapeHtml(m[1])}" aria-label="Lücke">········</span>`);
    last = m.index+m[0].length;
  }
  fragments.push(escapeHtml(text.slice(last)));
  return fragments.join('');
}

function renderCards(lesson) {
  state.stepMap = [];
  return lesson.cards.map((card,i) => {
    const n = `<span class="question-number">${number(i+1)}</span>`;
    let inner = '';
    if (lesson.type==='scenes') {
      inner = `<div class="scene-wrap">${sceneSvg(card.position)}</div><p class="sentence">${markedText(card.sentence,i)}</p>`;
    } else if (lesson.type==='sentences') {
      inner = `<p class="hint">${escapeHtml(card.hint)}</p><p class="sentence">${markedText(card.sentence,i)}</p>`;
    } else {
      inner = `<div class="profile-top"><span class="avatar ${card.tone}">${card.icon}</span><h4>${escapeHtml(card.name)}</h4></div><dl class="facts">${card.facts.map(([k,v])=>`<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join('')}</dl><p class="sentence profile-sentence">${markedText(card.sentence,i)}</p>`;
    }
    const cardClass= lesson.type==='profiles'?' exercise-card profile-card': ' exercise-card';
    return `<section class="${cardClass.trim()}" data-card="${i}" tabindex="0" aria-label="Aufgabe ${i+1}, anklicken zum Markieren"><div class="card-top">${n}<span class="card-mode">${lesson.type==='scenes'?'LOOK & COMPLETE':lesson.type==='profiles'?'READ & COMPLETE':'COMPLETE'}</span><span class="card-marker" aria-hidden="true">✳</span></div>${inner}</section>`;
  }).join('');
}

function selectLesson(name) {
  if (!lessons[name]) return;
  state.lesson = name;
  state.spotlight = null;
  renderLesson();
  if (window.location.hash.slice(1) !== name) history.replaceState(null,'',`#${name}`);
  $('workspace').scrollIntoView({behavior:'smooth',block:'start'});
}

function renderLesson() {
  const lesson = lessons[state.lesson];
  document.querySelectorAll('.lesson-tab').forEach(tab=>{
    const selected=tab.dataset.lesson===state.lesson;
    tab.classList.toggle('active',selected);
    tab.setAttribute('aria-selected',String(selected));
    tab.tabIndex=selected?0:-1;
  });
  $('lessonKicker').textContent=lesson.kicker;
  $('lessonTitle').textContent=lesson.title;
  $('lessonDescription').textContent=lesson.description;
  $('wordBank').hidden=lesson.bank.length===0;
  $('wordBank').innerHTML=lesson.bank.length ? `<span class="bank-heading">WORD BANK</span>${lesson.bank.map(w=>`<span class="bank-chip">${escapeHtml(w)}</span>`).join('')}`:'';
  $('exerciseContent').className='exercise-content '+lesson.type;
  $('exerciseContent').innerHTML=renderCards(lesson);
  updateReveals();
}

function updateReveals() {
  const total=state.stepMap.length;
  const visible=Math.min(total,Math.max(0,state.revealed[state.lesson]));
  state.revealed[state.lesson]=visible;
  document.querySelectorAll('.answer-slot').forEach(el=>{
    const isVisible=Number(el.dataset.step)<visible;
    el.classList.toggle('visible',isVisible);
    el.textContent=isVisible?el.dataset.answer:'········';
    el.setAttribute('aria-label',isVisible?`Lösung: ${el.dataset.answer}`:'Lösung verborgen');
  });
  document.querySelectorAll('.exercise-card').forEach(el=>{
    const i=Number(el.dataset.card);
    el.classList.toggle('highlighted',state.spotlight===i);
    const steps=state.stepMap.filter(s=>s.cardIndex===i);
    el.classList.toggle('complete',steps.length>0 && steps.every(s=>s.step<visible));
  });
  const summary=`${visible} / ${total}`;
  $('revealedValue').textContent=summary;
  $('dockProgress').textContent=summary;
  $('progressFill').style.width=`${total?visible/total*100:0}%`;
  $('nextBtn').disabled=visible>=total;
  $('prevBtn').disabled=visible===0;
  $('endMessage').hidden=visible<total;
}

function moveStep(delta) {
  const before=state.revealed[state.lesson];
  const after=Math.max(0,Math.min(state.stepMap.length,before+delta));
  if(after===before)return;
  state.revealed[state.lesson]=after;
  updateReveals();
  if(delta>0){
    const answer=document.querySelector(`[data-step="${after-1}"]`);
    if(answer){
      answer.classList.remove('just-revealed');
      void answer.offsetWidth;
      answer.classList.add('just-revealed');
      const card=answer.closest('.exercise-card');
      if(card){card.classList.add('recent');window.setTimeout(()=>card.classList.remove('recent'),850);}
      if(card && !isElementMostlyVisible(card))card.scrollIntoView({behavior:'smooth',block:'center'});
    }
  }
  announce(`Lösung ${after} von ${state.stepMap.length} sichtbar`);
}
function isElementMostlyVisible(el){const r=el.getBoundingClientRect();return r.top>=50&&r.bottom<=window.innerHeight-150;}
function announce(text){const el=$('statusLive');el.textContent=text;}
function applyMarker(){document.body.classList.toggle('marker-enabled',state.marker);$('markerBtn').classList.toggle('tool-active',state.marker);$('markerBtn').setAttribute('aria-pressed',String(state.marker));}
function setZoom(value){state.zoom=Math.min(190,Math.max(90,Number(value)));document.documentElement.style.setProperty('--zoom',String(state.zoom/100));$('fontSlider').value=state.zoom;$('fontValue').value=state.zoom+'%';$('fontValue').textContent=state.zoom+'%';savePref('englishLab-zoom',state.zoom);}
function setTheme(name){state.theme=name==='dark'?'dark':'light';document.documentElement.dataset.theme=state.theme;$('themeBtn').textContent=state.theme==='light'?'☾':'☀';savePref('englishLab-theme',state.theme);}

$('lessonTabs').addEventListener('click',event=>{const t=event.target.closest('[data-lesson]');if(t)selectLesson(t.dataset.lesson);});
$('exerciseContent').addEventListener('click',event=>{if(!state.marker)return;const card=event.target.closest('[data-card]');if(!card)return;const idx=Number(card.dataset.card);state.spotlight=state.spotlight===idx?null:idx;updateReveals();});
$('exerciseContent').addEventListener('keydown',event=>{if(!state.marker||!['Enter',' '].includes(event.key))return;const card=event.target.closest('[data-card]');if(!card)return;event.preventDefault();const idx=Number(card.dataset.card);state.spotlight=state.spotlight===idx?null:idx;updateReveals();});
$('prevBtn').addEventListener('click',()=>moveStep(-1));
$('nextBtn').addEventListener('click',()=>moveStep(1));
$('allBtn').addEventListener('click',()=>{state.revealed[state.lesson]=state.stepMap.length;updateReveals();announce('Alle Lösungen sichtbar');});
$('resetBtn').addEventListener('click',()=>{state.revealed[state.lesson]=0;updateReveals();announce('Alle Lösungen verborgen');});
$('markerBtn').addEventListener('click',()=>{state.marker=!state.marker;applyMarker();});
$('fontSlider').addEventListener('input',e=>setZoom(e.target.value));
$('themeBtn').addEventListener('click',()=>setTheme(state.theme==='dark'?'light':'dark'));
$('fullscreenBtn').addEventListener('click',async()=>{try{if(document.fullscreenElement){await document.exitFullscreen();}else{await document.documentElement.requestFullscreen();}}catch{announce('Vollbild wird von diesem Browser nicht unterstützt');}});
window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(lessons[id]&&id!==state.lesson)selectLesson(id);});
window.addEventListener('keydown',event=>{
  const target=event.target;
  if(target.closest('input, textarea, select')||event.altKey||event.ctrlKey||event.metaKey)return;
  const key=event.key;
  if(key==='ArrowRight'){event.preventDefault();moveStep(1);}
  else if(key==='ArrowLeft'){event.preventDefault();moveStep(-1);}
  else if(key.toLowerCase()==='h'){state.revealed[state.lesson]=0;updateReveals();}
  else if(key.toLowerCase()==='a'){state.revealed[state.lesson]=state.stepMap.length;updateReveals();}
  else if(key.toLowerCase()==='f'){$('fullscreenBtn').click();}
  else if(key==='+'||key==='='){setZoom(state.zoom+10);}
  else if(key==='-'){setZoom(state.zoom-10);}
});

const requested=location.hash.slice(1);
if(lessons[requested])state.lesson=requested;
setZoom(safePref('englishLab-zoom','100'));
setTheme(safePref('englishLab-theme','light'));
renderLesson();
applyMarker();