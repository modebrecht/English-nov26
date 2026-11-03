/* Vanilla JavaScript, no server and no dependencies. Only the teacher controls reveals. */
(() => {
  'use strict';
  const exercises = window.CLASSROOM_DATA;
  const byId = id => document.getElementById(id);
  const refs = {
    pageNav:byId('pageNav'),exerciseNav:byId('exerciseNav'),
    pageTag:byId('pageTag'),unitTag:byId('unitTag'),
    title:byId('exerciseTitle'),instruction:byId('instruction'),stage:byId('exerciseStage'),
    progressText:byId('progressText'),progressBar:byId('progressBar'),progressFill:byId('progressFill'),
    stateHint:byId('stateHint'),fontScale:byId('fontScale'),fontValue:byId('fontValue'),
    next:byId('nextButton'),nextText:byId('nextButtonText'),prev:byId('previousButton'),
    showAll:byId('showAllButton'),hideAll:byId('hideAllButton'),
    theme:byId('themeButton'),projector:byId('projectorButton'),
    marker:byId('markerButton'),reset:byId('resetAllButton'),fullscreen:byId('fullscreenButton'),
    live:byId('liveStatus')
  };
  const STORAGE = 'accessories-classroom-v1';
  const DEFAULT = {selectedId:1,revealed:{},font:110,theme:'dark',marker:false,projector:false,markerFocus:{}};
  let state = {...DEFAULT};
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE) || '{}');
    state = {...state,...saved};
    state.revealed = saved.revealed && typeof saved.revealed==='object' ? saved.revealed : {};
    state.markerFocus = saved.markerFocus && typeof saved.markerFocus==='object' ? saved.markerFocus : {};
  } catch (_) { /* Private browsing may disable storage. The app still works. */ }
  if (!exercises.some(ex => ex.id===state.selectedId)) state.selectedId=1;
  state.font = Math.max(85,Math.min(190,Number(state.font)||110));
  state.theme = state.theme === 'light' ? 'light' : 'dark';
  let previousFont = 110;
  const esc = text => String(text ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const active = () => exercises.find(ex => ex.id===state.selectedId);
  const totalSteps = ex => ex.type==='wordsearch' ? ex.words.length + 1 + (ex.answer ? 1 : 0)
    : ex.type==='crossword' ? ex.clues.length + (ex.secret ? 1 : 0)
    : ex.rows.length;
  const steps = ex => Math.max(0,Math.min(totalSteps(ex),Number(state.revealed[ex.id])||0));
  const asset = name => (window.CLASSROOM_ASSETS && window.CLASSROOM_ASSETS[name]) || `assets/${name}.webp`;
  const art = (name,cls='') => name ? `<img class="illustration ${cls}" src="${asset(name)}" alt="Bildhinweis" loading="lazy" />` : '';
  const save = () => {try{localStorage.setItem(STORAGE,JSON.stringify(state));}catch(_){ /* app functions without storage */ }};
  function showStatus(text){refs.live.textContent=text;}
  function setExercise(id) {state.selectedId=id;save();render();window.scrollTo({top:0,behavior:'smooth'});}
  function bringFreshStepIntoView(ex) {
    // Wordsearch grids should stay visible during word reveals. Scroll only
    // when the hidden final message appears; other exercise types follow the
    // most recently revealed question automatically.
    const selector = ex.type==='wordsearch'
      ? (steps(ex)>ex.words.length ? '.secret-card' : null)
      : ex.type==='crossword' ? '.clue-row.newest'
      : '.question-card.newest';
    if (!selector) return;
    requestAnimationFrame(() => {
      const node=refs.stage.querySelector(selector);
      if (!node) return;
      const rect=node.getBoundingClientRect();
      const footer=document.querySelector('.command-bar');
      const safeBottom=window.innerHeight-(footer?footer.getBoundingClientRect().height:0)-12;
      if(rect.bottom>safeBottom || rect.top<10)
        node.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});
    });
  }
  function setCount(n, announce=true) {
    const ex=active();
    state.revealed[ex.id]=Math.max(0,Math.min(totalSteps(ex),n));
    save();render();bringFreshStepIntoView(ex);
    if(announce) showStatus(`Exercise ${ex.id}: ${steps(ex)} von ${totalSteps(ex)} Schritten sichtbar.`);
  }
  function next() {
    const ex=active();const count=steps(ex);
    if(count<totalSteps(ex))setCount(count+1);
    else if(ex.id<exercises[exercises.length-1].id)setExercise(ex.id+1);
  }
  function previous() {
    const ex=active();const count=steps(ex);
    if(count>0)setCount(count-1);
    else if(ex.id>1)setExercise(ex.id-1);
  }
  function changeFont(newFont){state.font=Math.max(85,Math.min(190,Number(newFont)||110));state.projector=state.font>=150 && state.projector;save();renderSettings();}
  const marked = (ex,key) => state.marker && state.markerFocus[ex.id]===key;
  function markAttributes(key){return `data-mark-id="${esc(key)}" data-markable="true"`;}
  function markClass(ex,key){return marked(ex,key)?' manual-mark':'';}

  function renderNav(){
    const ex=active(),pages=[...new Set(exercises.map(e=>e.page))];
    refs.pageNav.innerHTML=pages.map(page=>`<button class="page-pill ${page===ex.page?'selected':''}" data-page="${page}" aria-current="${page===ex.page?'page':'false'}">Seite ${page}</button>`).join('');
    refs.exerciseNav.innerHTML=exercises.filter(e=>e.page===ex.page).map(e=>`<button class="exercise-pill ${e.id===ex.id?'selected':''}" data-exercise="${e.id}" aria-current="${e.id===ex.id?'true':'false'}">Exercise ${e.id}${steps(e)===totalSteps(e)?'<span class="completed">✓</span>':''}</button>`).join('');
  }
  function renderHeader(){
    const ex=active(),count=steps(ex),total=totalSteps(ex);
    refs.pageTag.textContent=`SEITE ${ex.page}`;
    refs.unitTag.textContent=ex.section;
    refs.title.textContent=`Exercise ${ex.id} · ${ex.title}`;
    refs.instruction.textContent=ex.instruction;
    refs.progressText.textContent=`${count} / ${total} gelöst`;
    refs.progressBar.setAttribute('aria-valuemax',total);
    refs.progressBar.setAttribute('aria-valuenow',count);
    refs.progressFill.style.width=`${100*count/total}%`;
    refs.stateHint.textContent=count===0?'Lösungen verborgen':count===total?'Alle Lösungen sichtbar':'Schrittweise aufdecken';
    refs.prev.disabled=ex.id===1 && count===0;
    refs.next.disabled=ex.id===exercises[exercises.length-1].id && count===total;
    refs.nextText.textContent=count===total ? (ex.id===9?'Fertig':'Nächste Übung'):'Nächste Lösung';
    refs.showAll.disabled=count===total;
    refs.hideAll.disabled=count===0;
  }
  function renderSettings(){
    document.documentElement.style.setProperty('--zoom',String(state.font/100));
    document.body.dataset.theme=state.theme;
    refs.fontScale.value=String(state.font);
    refs.fontValue.textContent=`${state.font}%`;
    refs.theme.textContent=state.theme==='dark'?'☀':'☾';
    refs.projector.classList.toggle('on',state.projector);
    refs.projector.setAttribute('aria-pressed',String(state.projector));
    refs.marker.classList.toggle('on',state.marker);
    refs.marker.setAttribute('aria-pressed',String(state.marker));
    refs.marker.textContent=state.marker?'✎ Marker an':'✎ Marker aus';
  }
  function wordPositions(word){
    return Array.from({length:word.word.length},(_,i)=>`${word.r+word.dr*i}-${word.c+word.dc*i}`);
  }
  function renderWordsearch(ex){
    const count=steps(ex),shown=Math.min(count,ex.words.length),secretShown=count>ex.words.length;
    const selected=new Map(),used=new Set();
    ex.words.forEach((word,i)=>{
      const pos=wordPositions(word);
      for(const key of pos){used.add(key);if(i<shown)selected.set(key,i);}
    });
    const letters=ex.grid.map((line,r)=>[...line].map((letter,c)=>{
      const key=`${r}-${c}`,selection=selected.get(key),isNew=selection===shown-1 && count<=ex.words.length;
      const classes=['word-cell'];
      if(selection!==undefined){classes.push('found');if(isNew)classes.push('newest');}
      if(secretShown&&!used.has(key))classes.push('leftover');
      if(marked(ex,`cell-${key}`))classes.push('manual-mark');
      return `<div class="${classes.join(' ')}" ${markAttributes(`cell-${key}`)} aria-label="Reihe ${r+1}, Spalte ${c+1}, ${esc(letter)}">${esc(letter)}</div>`;
    }).join('')).join('');
    const tokens=ex.words.map((word,i)=>{
      const visible=i<shown;
      return `<span class="word-token ${visible?'revealed':''} ${i===shown-1 && count<=ex.words.length?'newest':''}" aria-label="Wort ${i+1}: ${visible?word.word:'verborgen'}">${visible?esc(word.word):`Wort ${i+1} · ${word.word.length} Buchstaben`}</span>`;
    }).join('');
    const secretMarkup=`<div class="secret-card ${secretShown?'newest':''}">
      <div class="secret-label">${esc(ex.secret.label)}</div>
      <div class="secret-value ${secretShown?'visible':'hidden'}">${secretShown?esc(ex.secret.text):'· · · · · · · · ·'}</div>
      ${secretShown?`<div class="secret-note">${esc(ex.secret.note)}</div>`:''}
      ${ex.answer?`<div class="divider-line"></div><div class="secret-label">Answer it</div><div class="secret-value ${count>ex.words.length+1?'visible':'hidden'}">${count>ex.words.length+1?esc(ex.answer):'…'}</div>`:''}
    </div>`;
    return `<div class="stage-layout">
       <div class="puzzle-side"><div class="puzzle-heading">Wortsuchrätsel · ${ex.grid.length} × ${ex.grid[0].length}</div><div class="board-wrap"><div class="letter-grid" style="--cols:${ex.grid[0].length}" aria-label="Wortsuchrätsel">${letters}</div></div>${ex.illustration?`<div class="side-illustration">${art(ex.illustration)}</div>`:''}</div>
       <div><div class="puzzle-heading">Gefundene Wörter · ${shown} / ${ex.words.length}</div><div class="puzzle-guide">${tokens}</div>${secretMarkup}<p class="legend-note">Mit „Nächste Lösung“ ein Wort nach dem anderen hervorheben.</p></div>
     </div>`;
  }
  function renderGrammar(){return `<details class="grammar-details"><summary>Grammatik-Spickzettel · have got &amp; object pronouns</summary>
     <div class="grammar-inner"><div><strong>Have / has got</strong><p>I / you / we / they <b>have got</b></p><p>he / she / it <b>has got</b></p><p><b>Have</b> you got a watch? Yes, I <b>have</b>.</p></div>
       <div><strong>Negative</strong><p>I <b>haven’t got</b> it.</p><p>He <b>hasn’t got</b> it.</p><p><b>Has</b> she got a wallet?</p></div>
       <div class="wide"><strong>Subject → object pronouns</strong><div class="chip-line"><span>I → me</span><span>you → you</span><span>he → him</span><span>she → her</span><span>it → it</span><span>we → us</span><span>they → them</span></div><p>Have you got your watch? Yes, I’ve got <b>it</b>.</p></div>
     </div></details>`;}
  function renderSentences(ex){
    const count=steps(ex);
    const example=ex.example?`<div class="given-example">${art(ex.example.image)}<div><span class="example-label">Beispiel · bereits gelöst</span><p>${esc(ex.example.text)}</p></div></div>`:'';
    const cards=ex.rows.map((row,i)=>{
      const shown=i<count,newest=i===count-1;
      return `<article class="question-card with-picture ${shown?'revealed':''} ${newest?'newest':''}${markClass(ex,`row-${i}`)}" ${markAttributes(`row-${i}`)}>
        <img class="question-image" src="${asset(row.image)}" alt="Bildhinweis für Aufgabe ${i+1}" loading="lazy" />
        <div><div class="question-text ${shown?'':'placeholder'}">${i+1}. ${esc(row.prompt)}</div>
        ${shown?`<div class="question-answer ${newest?'newest':''}">${esc(row.answer)}</div>`:
          '<div class="question-answer" style="opacity:.4;letter-spacing:.17em">············</div>'}
        </div>
      </article>`;
    }).join('');
    return `${ex.grammar?renderGrammar():''}${example}<div class="sentence-list">${cards}</div>`;
  }
  function makeCrossword(ex){
    const cells=new Map(),starts=new Map();let maxX=0,maxY=0;
    ex.clues.forEach(clue=>{
      starts.set(`${clue.x}-${clue.y}`,(starts.get(`${clue.x}-${clue.y}`)||[]).concat(clue.number));
      [...clue.word].forEach((char,i)=>{
        const x=clue.x+i*clue.dx,y=clue.y+i*clue.dy,key=`${x}-${y}`;
        if(cells.has(key)&&cells.get(key).letter!==char)throw Error(`Conflict at ${key} (${clue.number})`);
        const entry=cells.get(key)||{letter:char,clues:[]};entry.clues.push(clue.number);cells.set(key,entry);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);
      });
    });
    return {cells,starts,width:maxX+1,height:maxY+1};
  }
  function renderCrossword(ex){
    const {cells,starts,width,height}=makeCrossword(ex),count=steps(ex),shown=Math.min(count,ex.clues.length),secretShown=count>ex.clues.length;
    const selected=new Set(ex.clues.slice(0,shown).map(c=>c.number)),last=shown?ex.clues[shown-1].number:null;
    const greyMap=new Map((ex.grey||[]).map(c=>[`${c.x}-${c.y}`,c]));
    let html='';
    for(let y=0;y<height;y++)for(let x=0;x<width;x++){
      const key=`${x}-${y}`,entry=cells.get(key);
      if(!entry){html+='<div class="cross-cell blank" aria-hidden="true"></div>';continue;}
      const number=starts.get(key),gray=greyMap.get(key),revealed=entry.clues.some(n=>selected.has(n)),isNew=entry.clues.includes(last);
      html+=`<div class="cross-cell ${gray?'gray':''} ${revealed?'filled':''} ${revealed&&isNew?'newest':''}${markClass(ex,`cell-${key}`)}" ${markAttributes(`cell-${key}`)}>
         ${number?`<span class="cell-number">${esc(number[0])}</span>`:''}
         ${revealed?esc(entry.letter):''}${gray?`<span class="grey-number">${gray.label}</span>`:''}
       </div>`;
    }
    const clues=ex.clues.map((clue,i)=>{
      const revealed=i<shown;
      return `<div class="clue-row ${clue.image?'picture-clue':''} ${i===shown-1 && count<=ex.clues.length?'newest':''}${markClass(ex,`clue-${i}`)}" ${markAttributes(`clue-${i}`)}>
        <div class="question-num">${clue.number}</div>
        ${clue.image?`<img src="${asset(clue.image)}" alt="Bildhinweis ${clue.number}" loading="lazy" />`:''}
        <div><div class="clue-copy">${clue.clue?esc(clue.clue):'Bildhinweis'}</div>
        ${revealed?`<span class="clue-answer">${esc(clue.word)}</span>`:`<span class="clue-empty">${'– '.repeat(Math.min(clue.word.length,15))}</span>`}
        </div>
       </div>`;
    }).join('');
    const secret=ex.secret?`<div class="secret-card"><div class="secret-label">${esc(ex.secret.label)}</div>
      <div class="secret-value ${secretShown?'visible':'hidden'}">${secretShown?esc(ex.secret.note):'········· at TIFFANY’S'}</div>
      ${secretShown?`<div class="secret-note">${esc(ex.secret.text)} = geheime Buchstaben 1–9</div>`:''}</div>`:'';
    return `<div class="stage-layout reverse"><div><div class="puzzle-heading">${ex.image?'Bildhinweise':'Hinweise'} · ${shown} / ${ex.clues.length}</div><div class="crossword-clues">${clues}</div>${secret}</div>
        <div class="puzzle-side"><div class="puzzle-heading">Kreuzworträtsel</div><div class="board-wrap"><div class="crossword-board" style="--cols:${width}" role="img" aria-label="Kreuzworträtsel mit ${width} Spalten und ${height} Reihen">${html}</div></div><p class="legend-note">Die Buchstaben erscheinen direkt im Rätsel.</p></div></div>`;
  }
  function renderScramble(ex){
    const count=steps(ex);
    const answersVisible=new Set(ex.rows.slice(0,count).map(row=>row.answer.split(' · ')[0]));
    const scramble=`<div class="puzzle-heading">Unscramble</div><div class="scramble-key">${ex.scrambled.map(word=>`<div class="scramble-item"><small>${word.letter}.</small>${esc(word.scramble)}${answersVisible.has(word.letter)?`<strong>→ ${esc(word.answer)}</strong>`:'<span class="scramble-hidden">→ ?</span>'}</div>`).join('')}</div>`;
    const rows=ex.rows.map((row,i)=>{
      const shown=i<count,newest=i===count-1;
      return `<div class="question-card ${shown?'revealed':''} ${newest?'newest':''}${markClass(ex,`row-${i}`)}" ${markAttributes(`row-${i}`)}><div class="question-num">${i+1}</div><div>
         <div class="question-text">${esc(row.prompt)}</div>
         <div class="question-answer">${shown?esc(row.answer):'…'}</div></div></div>`;
    }).join('');
    return `${scramble}<div class="puzzle-heading">Match with the definitions</div><div class="answer-list">${rows}</div>`;
  }
  function render(){
    const ex=active();renderNav();renderHeader();renderSettings();
    refs.stage.innerHTML=ex.type==='wordsearch'?renderWordsearch(ex):ex.type==='crossword'?renderCrossword(ex):ex.type==='scramble'?renderScramble(ex):renderSentences(ex);
  }
  refs.pageNav.addEventListener('click',e=>{const btn=e.target.closest('[data-page]');if(btn){const found=exercises.find(ex=>ex.page===Number(btn.dataset.page));if(found)setExercise(found.id);}});
  refs.exerciseNav.addEventListener('click',e=>{const btn=e.target.closest('[data-exercise]');if(btn)setExercise(Number(btn.dataset.exercise));});
  refs.stage.addEventListener('click',e=>{
    if(!state.marker)return;
    const el=e.target.closest('[data-mark-id]');if(!el)return;
    const current=state.markerFocus[state.selectedId],newMark=el.dataset.markId;
    state.markerFocus[state.selectedId]=current===newMark?'':newMark;
    save();render();
  });
  refs.next.addEventListener('click',next);
  refs.prev.addEventListener('click',previous);
  refs.showAll.addEventListener('click',()=>setCount(totalSteps(active())));
  refs.hideAll.addEventListener('click',()=>setCount(0));
  refs.fontScale.addEventListener('input',e=>changeFont(e.target.value));
  byId('largerButton').addEventListener('click',()=>changeFont(state.font+10));
  byId('smallerButton').addEventListener('click',()=>changeFont(state.font-10));
  refs.marker.addEventListener('click',()=>{state.marker=!state.marker;save();render();});
  refs.theme.addEventListener('click',()=>{state.theme=state.theme==='dark'?'light':'dark';save();renderSettings();});
  refs.projector.addEventListener('click',()=>{
    if(state.projector){state.projector=false;state.font=previousFont;}
    else {previousFont=state.font;state.projector=true;state.font=155;}
    save();renderSettings();
  });
  refs.reset.addEventListener('click',()=>{
    if(!window.confirm('Alle neun Übungen zurücksetzen und alle Lösungen verbergen?'))return;
    state.revealed={};state.markerFocus={};state.selectedId=1;
    save();render();window.scrollTo({top:0,behavior:'smooth'});
    showStatus('Alle Lösungen sind verborgen.');
  });
  refs.fullscreen.addEventListener('click',async()=>{
    try {if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}
    catch (_){showStatus('Vollbild wird in diesem Browser nicht unterstützt.');}
  });
  document.addEventListener('keydown',e=>{
    const el=e.target; if(el instanceof HTMLElement && (['INPUT','TEXTAREA','SELECT'].includes(el.tagName)||el.isContentEditable))return;
    if(e.altKey||e.ctrlKey||e.metaKey)return;
    const key=e.key;
    if(key==='ArrowRight'||key===' '){e.preventDefault();next();}
    else if(key==='ArrowLeft'){e.preventDefault();previous();}
    else if(key.toLowerCase()==='a'){e.preventDefault();setCount(totalSteps(active()));}
    else if(key.toLowerCase()==='h'){e.preventDefault();setCount(0);}
    else if(key.toLowerCase()==='f'){e.preventDefault();refs.fullscreen.click();}
    else if(key==='+'||key==='='){e.preventDefault();changeFont(state.font+10);}
    else if(key==='-'){e.preventDefault();changeFont(state.font-10);}
  });
  // A small, deterministic data sanity check catches transcription errors early.
  function validate(){
    for(const ex of exercises){
      if(ex.type==='crossword'){
        const board=makeCrossword(ex);
        if(ex.grey)for(const item of ex.grey){
          const square=board.cells.get(`${item.x}-${item.y}`);
          if(!square || square.letter!==item.char)throw Error(`Grey cell ${item.label} is invalid.`);
        }
        if(ex.grey){const secret=ex.grey.sort((a,b)=>a.label-b.label).map(it=>it.char).join('');if(secret!==ex.secret.text)throw Error('Crossword secret mismatch');}
      }
      if(ex.type==='wordsearch'){
        const used=new Set();const n=ex.grid[0].length;
        for(const row of ex.grid)if(row.length!==n)throw Error(`Grid width mismatch in Exercise ${ex.id}`);
        for(const word of ex.words){
          const letters=[];for(let i=0;i<word.word.length;i++){
            const r=word.r+i*word.dr,c=word.c+i*word.dc;
            if(!ex.grid[r]||!ex.grid[r][c])throw Error(`Word outside grid: ${word.word}`);
            used.add(`${r}-${c}`);letters.push(ex.grid[r][c]);
          }
          if(letters.join('')!==word.word)throw Error(`Grid mismatch for ${word.word}`);
        }
        const remainder=ex.grid.map((row,r)=>[...row].filter((_,c)=>!used.has(`${r}-${c}`)).join('')).join('');
        if(remainder.replace(/[^A-Z]/g,'')!==ex.secret.text.toUpperCase().replace(/[^A-Z]/g,''))throw Error(`Remaining letters do not match secret in Exercise ${ex.id}: ${remainder}`);
      }
    }
  }
  validate();render();
})();
