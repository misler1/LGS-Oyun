// game.js
import { GAMES } from './data.js';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let order = [];
let current = 0;
let gameState = {};

function buildDots() {
  const bar = document.getElementById('dot-bar');
  if(!bar) return;
  bar.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const d = document.createElement('div');
    d.className = 'prog-dot';
    d.id = 'dot-' + i;
    bar.appendChild(d);
  }
}

function updateDots() {
  for (let i = 0; i < 12; i++) {
    const d = document.getElementById('dot-' + i);
    if (!d) continue;
    d.className = 'prog-dot' + (i < current ? ' done' : i === current ? ' current' : '');
  }
}

function startGame() {
  order = shuffle([...Array(12).keys()]);
  current = 0;
  showScreen('game-screen');
  renderGame();
}

function restartGame() {
  order = shuffle([...Array(12).keys()]);
  current = 0;
  showScreen('welcome');
  updateDots();
}

function goWelcome() {
  updateDots();
  showScreen('welcome');
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function renderGame() {
  const idx = order[current];
  const g = GAMES[idx];
  const area = document.getElementById('game-area');
  area.innerHTML = '';
  gameState = { answered: false };

  document.getElementById('tb-label').textContent = `Görev ${current + 1}`;
  document.getElementById('tb-count').textContent = `${current + 1} / 12`;
  document.getElementById('prog-fill').style.width = `${((current) / 12) * 100}%`;

  const card = document.createElement('div');
  card.className = 'game-card';

  const badge = `<div class="category-badge" style="background:${g.catBg};color:${g.catColor}">${g.category}</div>`;
  const title = `<div class="game-title">${g.title}</div>`;
  const instr = `<div class="game-instruction">${g.instruction}</div>`;

  let inner = '';
  if (g.type === 'tf')      inner = buildTF(g);
  else if (g.type === 'mcq')   inner = buildMCQ(g);
  else if (g.type === 'match')  inner = buildMatch(g);
  else if (g.type === 'slider') inner = buildSlider(g);
  else if (g.type === 'fill')   inner = buildFill(g);
  else if (g.type === 'memory') inner = buildMemory(g);
  else if (g.type === 'anagram') inner = buildAnagram(g);
  else if (g.type === 'sentence_anagram') inner = buildSentenceAnagram(g);

  card.innerHTML = badge + title + instr + inner + `
    <div class="feedback success" id="fb">
      <div class="fb-title">🎉 Harika iş!</div>
      <div class="fb-tip" id="fb-tip"></div>
    </div>
    <button class="btn-next" id="btn-next" style="display:none" onclick="nextGame()">
      ${current < 11 ? 'Sonraki Görev →' : 'Bitir! 🏆'}
    </button>
  `;
  area.appendChild(card);
}

function showFeedback(tip, isSuccess = true) {
  gameState.answered = true;
  const fb = document.getElementById('fb');
  const fbTitle = document.querySelector('.fb-title');
  fb.style.display = 'block';
  if (isSuccess) {
    fb.classList.remove('error'); fb.classList.add('success');
    fbTitle.textContent = '🎉 Harika iş!';
  } else {
    fb.classList.remove('success'); fb.classList.add('error');
    fbTitle.textContent = '❌ Hay aksi! Öyle değil!';
  }
  document.getElementById('fb-tip').textContent = tip;
  document.getElementById('btn-next').style.display = 'block';
  fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function nextGame() {
  current++;
  if (current >= 12) { showFinish(); return; }
  updateDots();
  renderGame();
  document.getElementById('game-area').scrollIntoView({ behavior: 'smooth' });
}

function showFinish() {
  document.getElementById('prog-fill').style.width = '100%';
  updateDots();
  const list = document.getElementById('tips-list');
  
  const cleanTip = (text) => text.replace('✨ ', '').trim();
  
  const birGunOnceEmoji = GAMES.find(g => g.category.includes("Bir Gün Önce")).category.split(' ')[0];
  const sinavSabahiEmoji = GAMES.find(g => g.category.includes("Sınav Sabahı")).category.split(' ')[0];
  const sinavAnindaEmoji = GAMES.find(g => g.category.includes("Sınav Anında")).category.split(' ')[0];

  const birGunOnce = GAMES.filter(g => g.category.includes("Bir Gün Önce")).map(g => cleanTip(g.tip));
  const sinavSabahi = GAMES.filter(g => g.category.includes("Sınav Sabahı")).map(g => cleanTip(g.tip));
  const sinavAninda = GAMES.filter(g => g.category.includes("Sınav Anında")).map(g => cleanTip(g.tip));

  let htmlContent = '<h3>✅ Öğrendiklerin</h3>';

  htmlContent += `<div style="margin-top: 1rem; margin-bottom: 0.5rem; font-weight: 800; color: #7C3AED;">📅 Sınavdan Bir Gün Önce;</div>`;
  birGunOnce.forEach(tip => {
    htmlContent += `<div class="tip-item"><span>${birGunOnceEmoji}</span><span>${tip}</span></div>`;
  });

  htmlContent += `<div style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 800; color: #0D9488;">🌅 Sınav Sabahı;</div>`;
  sinavSabahi.forEach(tip => {
    htmlContent += `<div class="tip-item"><span>${sinavSabahiEmoji}</span><span>${tip}</span></div>`;
  });

  htmlContent += `<div style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 800; color: #D97706;">✏️ Sınav Anında;</div>`;
  sinavAninda.forEach(tip => {
    htmlContent += `<div class="tip-item"><span>${sinavAnindaEmoji}</span><span>${tip}</span></div>`;
  });

  list.innerHTML = htmlContent;
  showScreen('finish');
}

// ══════ TF ══════
function buildTF(g) {
  return `<div class="tf-statement">"${g.statement}"</div>
    <div class="tf-buttons">
      <button class="tf-btn" id="tf-true" onclick="tfClick(true)">✅ Doğru</button>
      <button class="tf-btn" id="tf-false" onclick="tfClick(false)">❌ Yanlış</button>
    </div>`;
}
function tfClick(val) {
  if (gameState.answered) return;
  const g = GAMES[order[current]];
  const trueBtn = document.getElementById('tf-true');
  const falseBtn = document.getElementById('tf-false');
  trueBtn.disabled = falseBtn.disabled = true;
  const isCorrect = val === g.answer;
  if (isCorrect) {
    (val ? trueBtn : falseBtn).classList.add('correct-pick');
  } else {
    (val ? trueBtn : falseBtn).classList.add('wrong-pick');
    (g.answer ? trueBtn : falseBtn).classList.add('correct-pick');
  }
  showFeedback(g.tip, isCorrect);
}

// ══════ MCQ ══════
function buildMCQ(g) {
  const mappedOptions = g.options.map((opt, originalIdx) => ({
    text: opt,
    isCorrect: originalIdx === g.correct
  }));
  
  const shuffledOptions = shuffle(mappedOptions);
  gameState.currentMCQOptions = shuffledOptions;

  return `<div class="mcq-options">` +
    shuffledOptions.map((o, i) => `<button class="mcq-opt" id="mq-${i}" onclick="mcqClick(${i})">${o.text}</button>`).join('') +
    `</div>`;
}
function mcqClick(idx) {
  if (gameState.answered) return;
  const g = GAMES[order[current]];
  document.querySelectorAll('.mcq-opt').forEach(b => b.disabled = true);
  
  const selectedOption = gameState.currentMCQOptions[idx];
  const isCorrect = selectedOption.isCorrect;
  
  gameState.currentMCQOptions.forEach((o, i) => {
    if (o.isCorrect) {
      document.getElementById('mq-' + i).classList.add('correct');
    }
  });
  
  if (!isCorrect) {
    document.getElementById('mq-' + idx).classList.add('wrong');
  }
  
  showFeedback(g.tip, isCorrect);
}

// ══════ MATCH ══════
function buildMatch(g) {
  const lefts = shuffle(g.pairs.map((p, i) => ({ text: p[0], id: i })));
  const rights = shuffle(g.pairs.map((p, i) => ({ text: p[1], id: i })));
  gameState.matchLeft = lefts;
  gameState.matchRight = rights;
  gameState.matchSel = null;
  gameState.matchDone = 0;
  return `<div class="match-grid">
    <div class="match-col" id="match-left">
      ${lefts.map((l, i) => `<div class="match-item match-left" id="ml-${i}" onclick="matchClick('l',${i})">${l.text}</div>`).join('')}
    </div>
    <div class="match-col" id="match-right">
      ${rights.map((r, i) => `<div class="match-item match-right" id="mr-${i}" onclick="matchClick('r',${i})">${r.text}</div>`).join('')}
    </div>
  </div>`;
}
function matchClick(side, idx) {
  if (gameState.answered) return;
  const el = document.getElementById((side === 'l' ? 'ml-' : 'mr-') + idx);
  if (el.classList.contains('matched')) return;
  if (!gameState.matchSel) {
    el.classList.add('selected');
    gameState.matchSel = { side, idx };
  } else {
    const prev = gameState.matchSel;
    if (prev.side === side) {
      document.getElementById((prev.side === 'l' ? 'ml-' : 'mr-') + prev.idx).classList.remove('selected');
      el.classList.add('selected');
      gameState.matchSel = { side, idx };
      return;
    }
    const lIdx = side === 'l' ? idx : prev.idx;
    const rIdx = side === 'r' ? idx : prev.idx;
    const lId = gameState.matchLeft[lIdx].id;
    const rId = gameState.matchRight[rIdx].id;
    const lEl = document.getElementById('ml-' + lIdx);
    const rEl = document.getElementById('mr-' + rIdx);
    lEl.classList.remove('selected'); rEl.classList.remove('selected');
    if (lId === rId) {
      lEl.classList.add('matched'); rEl.classList.add('matched');
      gameState.matchDone++;
      if (gameState.matchDone === GAMES[order[current]].pairs.length) showFeedback(GAMES[order[current]].tip);
    } else {
      lEl.classList.add('wrong'); rEl.classList.add('wrong');
      setTimeout(() => { lEl.classList.remove('wrong'); rEl.classList.remove('wrong'); }, 500);
    }
    gameState.matchSel = null;
  }
}

// ══════ SLIDER ══════
function buildSlider(g) {
  const defaultVal = g.defaultValue || Math.round((g.min + g.max) / 2);
  return `<div class="slider-q">${g.instruction}</div>
    <div class="slider-wrap">
      <div class="slider-val" id="slv">${defaultVal}</div>
      <div class="slider-unit">${g.unit}</div>
      <input type="range" id="sli" min="${g.min}" max="${g.max}" value="${defaultVal}" oninput="document.getElementById('slv').textContent=this.value">
      <div class="slider-labels"><span>${g.min}${g.unit}</span><span>${g.max}${g.unit}</span></div>
    </div>
    <button class="btn-check" onclick="sliderCheck()">Kontrol Et ✓</button>`;
}
function sliderCheck() {
  if (gameState.answered) return;
  const g = GAMES[order[current]];
  const val = parseInt(document.getElementById('sli').value);
  const isCorrect = Math.abs(val - g.correct) <= g.tolerance;
  document.getElementById('sli').disabled = true;
  showFeedback(g.tip, isCorrect);
}

// ══════ FILL ══════
function buildFill(g) {
  return `<div class="fill-sentence">${g.before}<span class="fill-blank" id="fill-blank">___</span>${g.after}</div>
    <div class="fill-options">` +
    shuffle(g.options).map(o => `<button class="fill-opt" onclick="fillClick(this,'${o.replace(/'/g,"\\'")}','${g.blank.replace(/'/g,"\\'")}','${g.tip.replace(/'/g,"\\'")}')">${o}</button>`).join('') +
    `</div>`;
}
function fillClick(btn, val, correct, tip) {
  if (gameState.answered) return;
  document.querySelectorAll('.fill-opt').forEach(b => b.disabled = true);
  const isCorrect = val === correct;
  if (isCorrect) {
    btn.classList.add('selected-correct');
    document.getElementById('fill-blank').textContent = val;
    document.getElementById('fill-blank').style.color = 'var(--green)';
  } else {
    btn.classList.add('selected-wrong');
    document.querySelectorAll('.fill-opt').forEach(b => { if (b.textContent === correct) b.classList.add('selected-correct'); });
    document.getElementById('fill-blank').textContent = correct;
    document.getElementById('fill-blank').style.color = 'var(--green)';
  }
  showFeedback(tip, isCorrect);
}

// ══════ MEMORY ══════
function buildMemory(g) {
  const cards = shuffle([...g.pairs.map((p,i) => ({id:i,face:p[0],type:'emoji'})), ...g.pairs.map((p,i) => ({id:i,face:p[1],type:'text'}))]);
  gameState.memFlipped = [];
  gameState.memMatched = 0;
  gameState.memLocked = false;
  return `<div class="memory-grid">` +
    cards.map((c, i) =>
      `<div class="mem-card" id="mc-${i}" data-id="${c.id}" data-face="${c.face.replace(/"/g,'&quot;')}" data-type="${c.type}" onclick="memClick(${i})">
        <div class="mem-card-inner">
          <div class="mem-face mem-back">🔮</div>
          <div class="mem-face mem-front">${c.face}</div>
        </div>
      </div>`
    ).join('') + `</div>`;
}
function memClick(idx) {
  if (gameState.answered || gameState.memLocked) return;
  const card = document.getElementById('mc-' + idx);
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  card.classList.add('flipped');
  gameState.memFlipped.push(idx);
  if (gameState.memFlipped.length === 2) {
    gameState.memLocked = true;
    const [a, b] = gameState.memFlipped.map(i => document.getElementById('mc-' + i));
    if (a.dataset.id === b.dataset.id && a.dataset.type !== b.dataset.type) {
      setTimeout(() => {
        a.classList.add('matched'); b.classList.add('matched');
        gameState.memFlipped = [];
        gameState.memMatched++;
        gameState.memLocked = false;
        if (gameState.memMatched === GAMES[order[current]].pairs.length) showFeedback(GAMES[order[current]].tip);
      }, 500);
    } else {
      setTimeout(() => {
        a.classList.remove('flipped'); b.classList.remove('flipped');
        gameState.memFlipped = [];
        gameState.memLocked = false;
      }, 900);
    }
  }
}

// ══════ ANAGRAM ══════
let activeSelectedChar = null;
function buildAnagram(g) {
  gameState.anagramWords = shuffle(g.words.map((w, i) => ({ word: w.toUpperCase(), idx: i })));
  gameState.anagramSolved = [];
  activeSelectedChar = null;
  return `<div>` +
    gameState.anagramWords.map((wordObj, wordIdx) => {
      const word = wordObj.word;
      const chars = shuffle(word.split(''));
      return `<div class="anagram-puzzle" id="puzzle-wrap-${wordIdx}">
        <div class="anagram-scrambled-pool" id="pool-${wordIdx}">
         ${chars.map((char, charIdx) =>
          `<div class="anagram-char"
            onclick="anagramCharClick(this, ${wordIdx}, ${charIdx}, '${char}')"
            data-char="${char}"
            data-word-id="${wordIdx}"
            data-char-id="${charIdx}">
            ${char}
          </div>`
        ).join('')}
        </div>
        <div class="anagram-slots" id="slots-${wordIdx}">
          ${word.split('').map((_, slotIdx) =>
            `<div class="anagram-slot" data-word-id="${wordIdx}" data-slot-id="${slotIdx}" onclick="anagramSlotClick(${wordIdx}, ${slotIdx})"></div>`
          ).join('')}
        </div>
        <div class="anagram-answer" id="answer-${wordIdx}" style="display:none">${word}</div>
      </div>`;
    }).join('') + `</div>`;
}
function anagramCharClick(el, wordId, charId, char) {
  if (gameState.answered) return;
  if (el.style.opacity === '0.3') return;
  document.querySelectorAll('.anagram-char').forEach(c => c.classList.remove('selected'));
  if (activeSelectedChar && activeSelectedChar.element === el) { activeSelectedChar = null; return; }
  el.classList.add('selected');
  activeSelectedChar = { element: el, wordId, charId, char };
}
function anagramSlotClick(wordId, slotId) {
  if (gameState.answered) return;
  const slot = document.querySelector(`[data-word-id="${wordId}"][data-slot-id="${slotId}"]`);
  if (!slot) return;
  if (slot.textContent) {
    const oldChar = slot.textContent;
    const oldCharId = slot.dataset.fromCharId;
    const poolCharDiv = document.querySelector(`#pool-${wordId} .anagram-char[data-char="${oldChar}"][data-char-id="${oldCharId}"]`);
    if (poolCharDiv) { poolCharDiv.style.opacity = '1'; poolCharDiv.style.pointerEvents = 'auto'; }
    slot.textContent = ''; slot.classList.remove('filled'); slot.removeAttribute('data-from-char-id');
    checkAnagramAnswer(wordId);
    return;
  }
  if (activeSelectedChar) {
    if (activeSelectedChar.wordId !== wordId) return;
    slot.textContent = activeSelectedChar.char;
    slot.classList.add('filled');
    slot.dataset.fromCharId = activeSelectedChar.charId;
    activeSelectedChar.element.style.opacity = '0.3';
    activeSelectedChar.element.style.pointerEvents = 'none';
    activeSelectedChar.element.classList.remove('selected');
    activeSelectedChar = null;
    checkAnagramAnswer(wordId);
  }
}
function checkAnagramAnswer(wordId) {
  const g = GAMES[order[current]];
  const targetWord = gameState.anagramWords[wordId].word;
  const allSlots = document.querySelectorAll(`#slots-${wordId} .anagram-slot`);
  let enteredWord = '';
  let complete = true;
  allSlots.forEach(s => { if (!s.textContent) complete = false; enteredWord += s.textContent; });
  if (complete) {
    if (enteredWord === targetWord) {
      document.getElementById(`answer-${wordId}`).style.display = 'block';
      allSlots.forEach(s => s.style.pointerEvents = 'none');
      if (!gameState.anagramSolved.includes(wordId)) gameState.anagramSolved.push(wordId);
      if (gameState.anagramSolved.length === gameState.anagramWords.length) showFeedback(g.tip, true);
    } else {
      allSlots.forEach(s => {
        const oldChar = s.textContent; const oldCharId = s.dataset.fromCharId;
        const poolCharDiv = document.querySelector(`#pool-${wordId} .anagram-char[data-char="${oldChar}"][data-char-id="${oldCharId}"]`);
        if (poolCharDiv) { poolCharDiv.style.opacity = '1'; poolCharDiv.style.pointerEvents = 'auto'; }
        s.textContent = ''; s.classList.remove('filled'); s.removeAttribute('data-from-char-id');
      });
    }
  }
}

// ══════ SENTENCE ANAGRAM ══════
let saSelected = null;
function buildSentenceAnagram(g) {
  gameState.saWords = g.words.map((w, i) => {
    const chars = shuffle(w.split(''));
    let attempts = 0;
    while (chars.join('') === w && w.length > 1 && attempts < 20) {
      chars.sort(() => Math.random() - 0.5);
      attempts++;
    }
    return { word: w, chars, solved: false, idx: i };
  });
  gameState.saSolved = 0;
  gameState.saFixed = g.fixed;
  saSelected = null;

  return `<div id="sa-container">${renderSAWords(g)}</div>`;
}

function renderSAWords(g) {
  const words = gameState.saWords;
  const fixed = gameState.saFixed;
  let html = `<div class="sa-sentence-preview" id="sa-preview">${getSAPreview()}</div>`;
  words.forEach((wordObj, wi) => {
    html += `<div class="sa-puzzle">`;
    html += `<div style="font-size:.8rem;color:var(--muted);font-weight:700;margin-bottom:.3rem;">Kelime ${wi+1}: ${wordObj.solved ? '<span style="color:var(--green)">✓ '+wordObj.word+'</span>' : '?'.repeat(wordObj.word.length)}</div>`;
    html += `<div class="sa-pool" id="sa-pool-${wi}">`;
    wordObj.chars.forEach((ch, ci) => {
      const hidden = wordObj.solved ? 'style="opacity:0.3;pointer-events:none"' : '';
      html += `<div class="sa-char" id="sa-char-${wi}-${ci}" data-wi="${wi}" data-ci="${ci}" onclick="saCharClick(${wi},${ci})" ${hidden}>${ch}</div>`;
    });
    html += `</div>`;
    html += `<div class="sa-slots" id="sa-slots-${wi}">`;
    wordObj.word.split('').forEach((_, si) => {
      html += `<div class="sa-slot" id="sa-slot-${wi}-${si}" data-wi="${wi}" data-si="${si}" onclick="saSlotClick(${wi},${si})"></div>`;
    });
    html += `</div>`;
    html += `</div>`;
    if (fixed && fixed.after === wi + 1) {
      html += `<div style="text-align:center;margin:.4rem 0"><span class="sa-fixed-badge">${fixed.text}</span></div>`;
    }
  });
  return html;
}

function getSAPreview() {
  const words = gameState.saWords;
  const fixed = gameState.saFixed;
  let parts = [];
  words.forEach((w, i) => {
    if (w.solved) {
      parts.push(`<span class="sa-solved">${w.word}</span>`);
    } else {
      parts.push('_'.repeat(w.word.length));
    }
    if (fixed && fixed.after === i + 1) {
      parts.push(`<span style="color:#7C3AED;font-weight:900">${fixed.text}</span>`);
    }
  });
  return parts.join(' ');
}

function saCharClick(wi, ci) {
  if (gameState.answered) return;
  const el = document.getElementById(`sa-char-${wi}-${ci}`);
  if (!el || el.style.opacity === '0.3') return;
  document.querySelectorAll('.sa-char').forEach(c => c.classList.remove('selected'));
  if (saSelected && saSelected.wi === wi && saSelected.ci === ci) { saSelected = null; return; }
  el.classList.add('selected');
  saSelected = { wi, ci, char: gameState.saWords[wi].chars[ci] };
}

function saSlotClick(wi, si) {
  if (gameState.answered) return;
  const slot = document.getElementById(`sa-slot-${wi}-${si}`);
  if (!slot) return;
  if (slot.dataset.fromCi !== undefined && slot.textContent) {
    const oldCi = parseInt(slot.dataset.fromCi);
    const charEl = document.getElementById(`sa-char-${wi}-${oldCi}`);
    if (charEl) { charEl.style.opacity = '1'; charEl.style.pointerEvents = 'auto'; }
    slot.textContent = '';
    slot.classList.remove('filled');
    delete slot.dataset.fromCi;
    checkSAWord(wi);
    return;
  }
  if (saSelected && saSelected.wi === wi) {
    slot.textContent = saSelected.char;
    slot.classList.add('filled');
    slot.dataset.fromCi = saSelected.ci;
    const charEl = document.getElementById(`sa-char-${wi}-${saSelected.ci}`);
    if (charEl) { charEl.style.opacity = '0.3'; charEl.style.pointerEvents = 'none'; charEl.classList.remove('selected'); }
    saSelected = null;
    checkSAWord(wi);
  }
}

function checkSAWord(wi) {
  const wordObj = gameState.saWords[wi];
  const slots = document.querySelectorAll(`#sa-slots-${wi} .sa-slot`);
  let entered = '';
  let complete = true;
  slots.forEach(s => { if (!s.textContent) complete = false; entered += s.textContent; });
  if (!complete) return;
  if (entered === wordObj.word) {
    wordObj.solved = true;
    slots.forEach(s => s.style.pointerEvents = 'none');
    gameState.saSolved++;
    const labelEl = document.querySelector(`#sa-pool-${wi}`).previousElementSibling;
    if (labelEl) labelEl.innerHTML = `<span style="color:var(--green);font-weight:700">✓ ${wordObj.word}</span>`;
    const preview = document.getElementById('sa-preview');
    if (preview) preview.innerHTML = getSAPreview();
    if (gameState.saSolved === gameState.saWords.length) {
      showFeedback(GAMES[order[current]].tip, true);
    }
  } else {
    slots.forEach(s => {
      if (s.dataset.fromCi !== undefined) {
        const ci = parseInt(s.dataset.fromCi);
        const charEl = document.getElementById(`sa-char-${wi}-${ci}`);
        if (charEl) { charEl.style.opacity = '1'; charEl.style.pointerEvents = 'auto'; }
        s.textContent = ''; s.classList.remove('filled'); delete s.dataset.fromCi;
      }
    });
  }
}

// Global window bağlamaları (Modüler JS yapısında HTML'deki inline onclick yapıları için zorunludur)
window.startGame = startGame;
window.restartGame = restartGame;
window.goWelcome = goWelcome;
window.nextGame = nextGame;
window.tfClick = tfClick;
window.mcqClick = mcqClick;
window.matchClick = matchClick;
window.sliderCheck = sliderCheck;
window.fillClick = fillClick;
window.memClick = memClick;
window.anagramCharClick = anagramCharClick;
window.anagramSlotClick = anagramSlotClick;
window.saCharClick = saCharClick;
window.saSlotClick = saSlotClick;

// Uygulamayı başlat
document.addEventListener("DOMContentLoaded", () => {
  buildDots();
  updateDots();
});