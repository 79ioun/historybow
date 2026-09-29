// ===================== Stage data =====================
const STAGES = [
  {
    key: 'stage1',
    bossHp: 35,
    bossScore: 300,
    label: '1편: 고구려',
    assetPrefix: 'ASSET_STAGE1_',
    introTitle: '역사를 지켜라 — 고구려 편',
    introBody: '612년, 수나라 대군이 고구려로 밀려옵니다.<br>폰 컨트롤러의 코드를 입력해 연결한 뒤, 아래 버튼을 눌러 방어를 시작하세요!',
    waves: [
      { infantry: 7, cavalry: 0 },
      { infantry: 5, cavalry: 5 },
    ],
    quizzes: [
      {
        question: '고구려를 침공한 나라는 어디일까요?',
        options: ['수나라', '몽골', '일본', '거란'],
        correct: 0,
        explanation: '612년, 중국을 통일한 수나라의 수양제가 대군을 이끌고 고구려를 침략했어요.',
      },
      {
        question: '고구려군을 이끌고 살수에서 큰 승리를 거둔 장군은 누구일까요?',
        options: ['을지문덕', '이순신', '강감찬', '김유신'],
        correct: 0,
        explanation: '을지문덕 장군은 거짓으로 항복하는 척하며 적을 유인한 뒤, 살수(청천강)에서 크게 무찔렀어요. 이것이 바로 "살수대첩"입니다.',
      },
    ],
    clearTitle: '스테이지 1 클리어!',
    clearBody: `실제 역사에서는, 살수대첩(612년)에서 고구려군에게 크게 패한 수나라 별동대 약 30만 명 중<br>
     살아 돌아간 사람은 2,700여 명에 불과했다고 전해집니다.<br><br>
     을지문덕 장군의 지략이 고구려를 지켜낸 순간이었어요.`,
  },
  {
    key: 'stage2',
    bossHp: 50,
    bossScore: 450,
    label: '2편: 고려',
    assetPrefix: 'ASSET_STAGE2_',
    introTitle: '역사를 지켜라 — 고려 편',
    introBody: '1232년, 몽골 제국의 대군이 고려로 밀려옵니다.<br>아래 버튼을 눌러 방어를 시작하세요!',
    waves: [
      { infantry: 7, cavalry: 0 },
      { infantry: 5, cavalry: 5 },
    ],
    quizzes: [
      {
        question: '몽골의 침입에 맞서 고려 조정이 도읍을 옮긴 곳은 어디일까요?',
        options: ['강화도', '제주도', '울릉도', '완도'],
        correct: 0,
        explanation: '1232년, 고려는 몽골의 침입에 맞서기 위해 도읍을 강화도로 옮겼어요 (강화천도).',
      },
      {
        question: '고려가 부처의 힘으로 나라를 지키고자 새긴 것은 무엇일까요?',
        options: ['팔만대장경', '훈민정음', '동의보감', '조선왕조실록'],
        correct: 0,
        explanation: '고려는 몽골의 침입 속에서 부처님의 힘으로 나라를 지키고자 팔만대장경을 새겼어요. 지금도 합천 해인사에 보존되어 있습니다.',
      },
    ],
    clearTitle: '스테이지 2 클리어!',
    clearBody: `실제 역사에서는, 고려는 1270년까지 약 40년간 강화도에서 몽골에 맞서 싸웠습니다.<br><br>
     그 어려운 시기에 새겨진 팔만대장경은 지금까지도 세계기록유산으로 남아있어요.`,
  },
  {
    key: 'stage3',
    bossHp: 65,
    bossScore: 600,
    label: '3편: 조선',
    assetPrefix: 'ASSET_STAGE3_',
    introTitle: '역사를 지켜라 — 조선 편',
    introBody: '1592년, 왜군이 조선을 침략했습니다.<br>아래 버튼을 눌러 바다를 지켜내세요!',
    waves: [
      { infantry: 7, cavalry: 0 },
      { infantry: 5, cavalry: 5 },
    ],
    quizzes: [
      {
        question: '임진왜란 때 이순신 장군이 이끈 군대는 무엇일까요?',
        options: ['조선 수군', '조선 기병대', '의병', '별기군'],
        correct: 0,
        explanation: '이순신 장군은 바다를 지키는 조선 수군(해군)을 이끌고 왜군에 맞섰어요.',
      },
      {
        question: '한산도대첩에서 이순신 장군이 사용한, 학이 날개를 편 모양의 진법은?',
        options: ['학익진', '어린진', '방원진', '장사진'],
        correct: 0,
        explanation: '학익진은 배들을 학이 날개를 펼친 모양으로 넓게 벌려 적을 둘러싸는 진법이에요. 한산도대첩(1592년)에서 큰 승리를 거뒀습니다.',
      },
    ],
    clearTitle: '스테이지 3 클리어!',
    clearBody: `실제 역사에서는, 한산도대첩(1592년)에서 조선 수군은 일본 전선 수십 척을 격파했습니다.<br><br>
     이 전투는 진주대첩·행주대첩과 함께 임진왜란 3대 대첩으로 꼽혀요.`,
  },
];

// ===================== Assets =====================
const images = {}; // images[stageKey] = { bg, player, infantry, cavalry, boss, ultimate }
const endingImages = {}; // { gameclear, gameover }
let imagesLoaded = 0;
let totalImages = 0;

function loadImages(onDone) {
  const assetMap = {
    stage1: {
      bg: 'assets/images/stage1-bg.png', player: 'assets/images/stage1-player.png',
      infantry: 'assets/images/stage1-enemy-infantry.png', cavalry: 'assets/images/stage1-enemy-cavalry.png',
      boss: 'assets/images/stage1-boss.png', ultimate: 'assets/images/stage1-ultimate.png',
      projectile: 'assets/images/stage1-projectile.png',
    },
    stage2: {
      bg: 'assets/images/stage2-bg.png', player: 'assets/images/stage2-player.png',
      infantry: 'assets/images/stage2-enemy-infantry.png', cavalry: 'assets/images/stage2-enemy-cavalry.png',
      boss: 'assets/images/stage2-boss.png', ultimate: 'assets/images/stage2-ultimate.png',
      projectile: 'assets/images/stage2-projectile.png',
    },
    stage3: {
      bg: 'assets/images/stage3-bg.png', player: 'assets/images/stage3-player.png',
      infantry: 'assets/images/stage3-enemy-infantry.png', cavalry: 'assets/images/stage3-enemy-cavalry.png',
      boss: 'assets/images/stage3-boss.png', ultimate: 'assets/images/stage3-ultimate.png',
      projectile: 'assets/images/stage3-projectile.png',
    },
  };

  Object.entries(assetMap).forEach(([stageKey, srcs]) => {
    images[stageKey] = {};
    Object.entries(srcs).forEach(([part, src]) => {
      totalImages++;
      const img = new Image();
      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === totalImages) onDone();
      };
      img.src = src;
      images[stageKey][part] = img;
    });
  });

  const endingSrcs = { gameclear: 'assets/images/gameclear-bg.png', gameover: 'assets/images/gameover-bg.png', intro: 'assets/images/intro-bg.png' };
  Object.entries(endingSrcs).forEach(([key, src]) => {
    totalImages++;
    const img = new Image();
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === totalImages) onDone();
    };
    img.src = src;
    endingImages[key] = img;
  });
}

// ===================== Canvas setup =====================
// ===================== Sound (real audio files, pooled for overlapping playback) =====================
let audioInited = false;
const soundSources = {
  fire: 'assets/sounds/fire.mp3',
  hit: 'assets/sounds/hit.mp3',
  correct: 'assets/sounds/correct.mp3',
  hurt: 'assets/sounds/hurt.mp3',
};
const soundPools = {};
const poolIndex = { fire: 0, hit: 0, correct: 0, hurt: 0 };
const POOL_SIZE = 4;

function initAudio() {
  if (audioInited) return;
  audioInited = true;
  Object.entries(soundSources).forEach(([key, src]) => {
    soundPools[key] = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      const a = new Audio(src);
      a.preload = 'auto';
      soundPools[key].push(a);
      // "unlock" playback on this real user gesture so later programmatic
      // calls (triggered by phone input over the network) are allowed to play.
      // Pause synchronously (not inside the play() promise callback) so this
      // unlock step can never race with and clobber a genuine later playSound() call.
      const p = a.play();
      if (p && p.catch) p.catch(() => {});
      try { a.pause(); a.currentTime = 0; } catch (e) {}
    }
  });
}

function playSound(key, volume) {
  const pool = soundPools[key];
  if (!pool) return;
  const idx = poolIndex[key];
  const a = pool[idx];
  poolIndex[key] = (idx + 1) % pool.length;
  try {
    a.currentTime = 0;
    a.volume = volume != null ? volume : 1;
    const p = a.play();
    if (p && p.catch) p.catch(() => {});
  } catch (e) {}
}

function playFireSound() { playSound('fire', 0.5); }
function playHitSound() { playSound('hit', 0.55); }
function playCorrectSound() { playSound('correct', 0.7); }
function playHurtSound() { playSound('hurt', 0.65); }

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const W = canvas.width;   // 1600
const H = canvas.height;  // 900
const PLAYER_Y_MIN = H * 0.62;
const PLAYER_Y_MAX = H * 0.90;

const scoreEl = document.getElementById('score');
const heartsEl = document.getElementById('hearts');
const connBadge = document.getElementById('connBadge');
const codeDisplay = document.getElementById('codeDisplay');
const introCodeBox = document.getElementById('introCodeBox');
const introQrPlaceholder = document.getElementById('introQrPlaceholder');
const introCodeValue = document.getElementById('introCodeValue');
const waveLabel = document.getElementById('waveLabel');
const stageLabel = document.getElementById('stageLabel');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayBody = document.getElementById('overlayBody');
const startBtn = document.getElementById('startBtn');
const quizOverlay = document.getElementById('quizOverlay');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizFeedback = document.getElementById('quizFeedback');
const bossHpWrap = document.getElementById('bossHpWrap');
const bossHpFill = document.getElementById('bossHpFill');

// ===================== Game state =====================
let input = { up:false, down:false, left:false, right:false, fire:false };

let player = { x: W/2, y: PLAYER_Y_MAX - 20, w: 150, h: 150, speed: 6.5 };
let bullets = [];
let enemyBullets = [];
let enemies = [];
let effects = [];

let hearts = 5;
const MAX_HEARTS = 5;
let score = 0;
let alive = false;
let gamePhase = 'intro'; // intro | wave | quiz | boss | stageclear | gameclear | gameover
let lastShot = 0;
const FIRE_COOLDOWN = 260;
let damageMultiplier = 1;
let damageBuffUntil = 0;
let hitFlashUntil = 0;
let invulnerableUntil = 0;
const INVULNERABLE_DURATION = 1100;

let boss = null;
const BOSS_SHOT_INTERVAL = 1600;
const QUIZ_CORRECT_SCORE = 50;

let stageIndex = 0;
let waveIndex = 0;
let spawnQueue = [];
let spawnTimer = 0;
const SPAWN_INTERVAL = 850;

function currentStage() { return STAGES[stageIndex]; }
function currentImages() { return images[currentStage().key]; }

// ===================== Helpers =====================
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function updateHeartsDisplay() {
  heartsEl.textContent = '❤️'.repeat(Math.max(0, hearts)) + '🤍'.repeat(Math.max(0, MAX_HEARTS - hearts));
}

function updateStageLabel() {
  stageLabel.textContent = currentStage().label;
}

function buildSpawnQueue(waveDef) {
  const queue = [];
  for (let i = 0; i < waveDef.infantry; i++) queue.push('infantry');
  for (let i = 0; i < waveDef.cavalry; i++) queue.push('cavalry');
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }
  return queue;
}

function startWave(index) {
  waveIndex = index;
  gamePhase = 'wave';
  spawnQueue = buildSpawnQueue(currentStage().waves[index]);
  spawnTimer = 0;
  waveLabel.textContent = `${index + 1} / ${currentStage().waves.length}웨이브`;
  hideOverlay();
}

function startBossPhase() {
  gamePhase = 'boss';
  waveLabel.textContent = '보스전';
  const maxHp = currentStage().bossHp;
  boss = {
    x: W/2, y: H*0.28, w: 260, h: 260,
    hp: maxHp, maxHp: maxHp, dir: 1, speed: 2.4,
    lastShot: performance.now() + 600, // small delay before the first shot
  };
  enemies = [];
  enemyBullets = [];
  bossHpWrap.classList.remove('hidden');
  updateBossHpBar();
  hideOverlay();
}

function updateBossHpBar() {
  const pct = Math.max(0, boss.hp / boss.maxHp) * 100;
  bossHpFill.style.width = pct + '%';
}

function showQuiz(index) {
  gamePhase = 'quiz';
  const q = currentStage().quizzes[index];
  quizQuestion.textContent = q.question;
  quizOptions.innerHTML = '';
  quizFeedback.textContent = '';
  quizFeedback.className = 'quiz-feedback';

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = 'quiz-option';
    btn.onclick = () => {
      if (btn.disabled) return;
      Array.from(quizOptions.children).forEach(b => b.disabled = true);
      const correct = i === q.correct;
      if (correct) {
        btn.classList.add('correct');
        score += QUIZ_CORRECT_SCORE;
        quizFeedback.textContent = '정답! (+' + QUIZ_CORRECT_SCORE + '점) ' + q.explanation;
        quizFeedback.className = 'quiz-feedback good';
      } else {
        btn.classList.add('wrong');
        quizFeedback.textContent = '아쉬워요! ' + q.explanation + ' (하트 1개 감소)';
        quizFeedback.className = 'quiz-feedback bad';
        hearts -= 1;
        updateHeartsDisplay();
        playHurtSound();
      }
      setTimeout(() => {
        quizOverlay.classList.add('hidden');
        if (hearts <= 0) {
          gameOver();
          return;
        }
        if (correct) {
          damageMultiplier = 2;
          damageBuffUntil = performance.now() + 8000;
          spawnEffect('ultimate-flash');
          playCorrectSound();
          enemies = [];
          enemyBullets = [];
        }
        proceedAfterQuiz();
      }, 2200);
    };
    quizOptions.appendChild(btn);
  });

  quizOverlay.classList.remove('hidden');
}

function proceedAfterQuiz() {
  if (waveIndex + 1 < currentStage().waves.length) {
    startWave(waveIndex + 1);
  } else {
    startBossPhase();
  }
}

function spawnEffect(type) {
  if (type === 'ultimate-flash') {
    effects.push({ type, born: performance.now(), duration: 900 });
  }
}

// ===================== Intro / clear / game over cards =====================
function showOverlay(title, body, buttonLabel) {
  overlayTitle.textContent = title;
  overlayBody.innerHTML = body;
  startBtn.textContent = buttonLabel || '게임 시작';
  overlay.classList.remove('hidden');
}
function hideOverlay() {
  overlay.classList.add('hidden');
}

function startNewGame() {
  stageIndex = 0;
  score = 0;
  beginStage(0, true);
}

function beginStage(index, resetHeartsAndScore) {
  stageIndex = index;
  player.x = W/2; player.y = PLAYER_Y_MAX - 20;
  bullets = []; enemies = []; enemyBullets = []; effects = [];
  if (resetHeartsAndScore) hearts = MAX_HEARTS;
  // otherwise keep whatever hearts the player had at the end of the previous stage
  damageMultiplier = 1; damageBuffUntil = 0;
  hitFlashUntil = 0; invulnerableUntil = 0;
  boss = null;
  bossHpWrap.classList.add('hidden');
  overlay.style.backgroundImage = '';
  overlay.classList.remove('ending-bg', 'intro-minimal');
  introCodeBox.classList.add('hidden');
  introQrPlaceholder.classList.add('hidden');
  updateHeartsDisplay();
  updateStageLabel();
  alive = true;
  startWave(0);
}

function gameOver() {
  alive = false;
  gamePhase = 'gameover';
  overlay.style.backgroundImage = `url('${endingImages.gameover.src}')`;
  overlay.classList.add('ending-bg');
  showOverlay(
    `패배... — 점수 ${Math.floor(score)}`,
    `${currentStage().label}에서 무너지고 말았어요.<br>처음부터 다시 도전하시겠습니까?`,
    '예, 처음부터 다시'
  );
}

function stageClear() {
  alive = false;
  const stage = currentStage();
  if (stageIndex + 1 < STAGES.length) {
    gamePhase = 'stageclear';
    overlay.style.backgroundImage = '';
    overlay.classList.remove('ending-bg');
    showOverlay(
      `${stage.clearTitle} — 점수 ${Math.floor(score)}`,
      `${stage.clearBody}<br><br>다음 편으로 이어서 진행할까요?`,
      `다음 편: ${STAGES[stageIndex + 1].label}`
    );
  } else {
    gamePhase = 'gameclear';
    overlay.style.backgroundImage = `url('${endingImages.gameclear.src}')`;
    overlay.classList.add('ending-bg');
    showOverlay(
      `전체 클리어! — 최종 점수 ${Math.floor(score)}`,
      `${stage.clearBody}<br><br>고구려, 고려, 조선까지 — 세 번의 위기에서 역사를 모두 지켜냈습니다!<br>
       처음부터 다시 플레이하시겠어요?`,
      '처음부터 다시 플레이'
    );
  }
}

function onStartButtonClick() {
  initAudio();
  if (gamePhase === 'stageclear') {
    beginStage(stageIndex + 1, false);
  } else {
    startNewGame();
  }
}

// ===================== Networking (PeerJS) =====================
let activeConn = null;

function randomCode(){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function startPeer(attempt = 0){
  if (typeof Peer === 'undefined') {
    connBadge.textContent = '연결 라이브러리 로드 실패 (인터넷 확인)';
    connBadge.className = 'dead';
    return;
  }
  const code = 'historydef-' + randomCode();
  let peer;
  try {
    peer = new Peer(code);
  } catch (e) {
    connBadge.textContent = '연결 서버 오류';
    connBadge.className = 'dead';
    console.error(e);
    return;
  }

  peer.on('open', () => {
    codeDisplay.textContent = code.replace('historydef-', '');
    introCodeValue.textContent = code.replace('historydef-', '');
  });

  peer.on('connection', (conn) => {
    if (activeConn && activeConn.open) {
      conn.on('open', () => conn.close());
      return;
    }
    conn.on('open', () => {
      activeConn = conn;
      connBadge.textContent = '폰 연결됨';
      connBadge.className = 'live';
    });
    conn.on('data', (msg) => {
      input = { ...input, ...msg };
    });
    conn.on('close', () => {
      if (activeConn === conn) activeConn = null;
      connBadge.textContent = '연결 끊김';
      connBadge.className = 'dead';
    });
  });

  peer.on('error', (err) => {
    if (err.type === 'unavailable-id' && attempt < 5) {
      peer.destroy();
      startPeer(attempt + 1);
    } else {
      connBadge.textContent = '연결 서버 오류';
      connBadge.className = 'dead';
      console.error(err);
    }
  });
}

// ===================== Update loop =====================
function update(dt, now) {
  if (!alive) return;

  if (input.left)  player.x -= player.speed * dt;
  if (input.right) player.x += player.speed * dt;
  if (input.up)    player.y -= player.speed * dt;
  if (input.down)  player.y += player.speed * dt;
  player.x = clamp(player.x, player.w/2, W - player.w/2);
  player.y = clamp(player.y, PLAYER_Y_MIN, PLAYER_Y_MAX);

  if (input.fire && now - lastShot > FIRE_COOLDOWN) {
    bullets.push({ x: player.x, y: player.y - 40, r: 6 });
    lastShot = now;
    playFireSound();
  }

  bullets.forEach(b => b.y -= 11 * dt);
  bullets = bullets.filter(b => b.y > -20);

  if (damageBuffUntil && now > damageBuffUntil) {
    damageMultiplier = 1;
    damageBuffUntil = 0;
  }

  if (gamePhase === 'wave') {
    spawnTimer += dt * 16.67;
    if (spawnTimer > SPAWN_INTERVAL && spawnQueue.length > 0) {
      spawnTimer = 0;
      const kind = spawnQueue.shift();
      const size = kind === 'cavalry' ? 150 : 110;
      enemies.push({
        kind,
        x: size/2 + Math.random() * (W - size),
        y: -size,
        w: size, h: size,
        speed: (kind === 'cavalry' ? 2.4 : 1.7) + waveIndex * 0.3,
        hp: kind === 'cavalry' ? 2 : 1,
      });
    }

    enemies.forEach(e => e.y += e.speed * dt);

    if (now > invulnerableUntil) {
      for (const e of enemies) {
        const dx = Math.abs(player.x - e.x);
        const dy = Math.abs(player.y - e.y);
        if (dx < (player.w + e.w) * 0.28 && dy < (player.h + e.h) * 0.28) {
          hearts -= 1;
          updateHeartsDisplay();
          invulnerableUntil = now + INVULNERABLE_DURATION;
          hitFlashUntil = now + 350;
          e.hit = true;
          playHurtSound();
          break;
        }
      }
    }

    enemies = enemies.filter(e => !e.hit && e.y - e.h/2 <= H);

    if (hearts <= 0) { gameOver(); return; }

    for (const e of enemies) {
      for (const b of bullets) {
        if (Math.abs(b.x - e.x) < e.w/2 && Math.abs(b.y - e.y) < e.h/2 && !b.hit && !e.hit) {
          e.hp -= damageMultiplier;
          e.hitFlashAt = now;
          b.hit = true;
          if (e.hp <= 0) {
            e.hit = true;
            score += (e.kind === 'cavalry') ? 15 : 10;
          }
          playHitSound();
        }
      }
    }
    enemies = enemies.filter(e => !e.hit);
    bullets = bullets.filter(b => !b.hit);

    if (spawnQueue.length === 0) {
      if (waveIndex < currentStage().quizzes.length) {
        showQuiz(waveIndex);
      } else {
        proceedAfterQuiz();
      }
    }
  }

  if (gamePhase === 'boss' && boss) {
    boss.x += boss.dir * boss.speed * dt;
    if (boss.x < boss.w/2 + 20 || boss.x > W - boss.w/2 - 20) boss.dir *= -1;

    // boss fires aimed projectiles back at the player
    if (now - boss.lastShot > BOSS_SHOT_INTERVAL) {
      boss.lastShot = now;
      const dx = player.x - boss.x;
      const dy = player.y - boss.y;
      const dist = Math.hypot(dx, dy) || 1;
      const speed = 7;
      enemyBullets.push({
        x: boss.x, y: boss.y + boss.h * 0.3,
        vx: (dx / dist) * speed, vy: (dy / dist) * speed,
      });
    }

    for (const b of bullets) {
      if (!b.hit && Math.abs(b.x - boss.x) < boss.w/2 && Math.abs(b.y - boss.y) < boss.h/2) {
        boss.hp -= damageMultiplier;
        boss.hitFlashAt = now;
        b.hit = true;
        updateBossHpBar();
        playHitSound();
        if (boss.hp <= 0) {
          score += currentStage().bossScore;
          bossHpWrap.classList.add('hidden');
          enemyBullets = [];
          stageClear();
          return;
        }
      }
    }
    bullets = bullets.filter(b => !b.hit);

    // move boss projectiles and check for a hit on the player
    enemyBullets.forEach(b => { b.x += b.vx * dt; b.y += b.vy * dt; });
    if (now > invulnerableUntil) {
      for (const b of enemyBullets) {
        const dx = Math.abs(player.x - b.x);
        const dy = Math.abs(player.y - b.y);
        if (dx < player.w * 0.28 && dy < player.h * 0.28) {
          hearts -= 1;
          updateHeartsDisplay();
          invulnerableUntil = now + INVULNERABLE_DURATION;
          hitFlashUntil = now + 350;
          b.hit = true;
          playHurtSound();
          if (hearts <= 0) { gameOver(); return; }
          break;
        }
      }
    }
    enemyBullets = enemyBullets.filter(b => !b.hit && b.x > -50 && b.x < W + 50 && b.y > -50 && b.y < H + 50);
  }

  effects = effects.filter(fx => now - fx.born < fx.duration);

  scoreEl.textContent = Math.floor(score);
}

// ===================== Draw loop =====================
function drawSprite(img, x, y, w, h, flashing) {
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(x, y + h*0.42, w*0.32, h*0.10, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.55)';
  ctx.shadowBlur = 14;
  if (flashing) ctx.filter = 'brightness(2.4) saturate(0.3)';
  ctx.drawImage(img, x - w/2, y - h/2, w, h);
  ctx.restore();
}

function draw(now) {
  const imgs = currentImages();
  ctx.clearRect(0, 0, W, H);
  ctx.drawImage(imgs.bg, 0, 0, W, H);

  ctx.fillStyle = '#f2c94c';
  bullets.forEach(b => {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.lineTo(4, 6);
    ctx.lineTo(-4, 6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  });

  ctx.fillStyle = '#e5484d';
  ctx.strokeStyle = '#7a1f1f';
  ctx.lineWidth = 2;
  enemyBullets.forEach(b => {
    const projSize = 90;
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(Math.atan2(b.vy, b.vx) + Math.PI / 4); // +45deg since the art points diagonally by default
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 8;
    ctx.drawImage(imgs.projectile, -projSize/2, -projSize/2, projSize, projSize);
    ctx.restore();
  });

  enemies.forEach(e => {
    const img = e.kind === 'cavalry' ? imgs.cavalry : imgs.infantry;
    const flashing = e.hitFlashAt && now - e.hitFlashAt < 120;
    drawSprite(img, e.x, e.y, e.w, e.h, flashing);
  });

  if (boss) {
    const bossFlashing = boss.hitFlashAt && now - boss.hitFlashAt < 120;
    drawSprite(imgs.boss, boss.x, boss.y, boss.w, boss.h, bossFlashing);
  }

  if (alive) {
    const isInvulnerable = now < invulnerableUntil;
    const blinkVisible = !isInvulnerable || Math.floor(now / 100) % 2 === 0;
    if (blinkVisible) {
      drawSprite(imgs.player, player.x, player.y, player.w, player.h);
    }
  }

  effects.forEach(fx => {
    if (fx.type === 'ultimate-flash') {
      const t = (now - fx.born) / fx.duration;
      ctx.globalAlpha = Math.max(0, 1 - t) * 0.85;
      ctx.drawImage(imgs.ultimate, 0, 0, W, H);
      ctx.globalAlpha = 1;
    }
  });

  if (now < hitFlashUntil) {
    const t = (hitFlashUntil - now) / 350;
    ctx.fillStyle = `rgba(220,40,40,${0.35 * t})`;
    ctx.fillRect(0, 0, W, H);
  }
}

// ===================== Main loop =====================
let lastFrame = performance.now();
function loop(now) {
  const dt = Math.min(2.5, (now - lastFrame) / 16.67);
  lastFrame = now;
  update(dt, now);
  draw(now);
  requestAnimationFrame(loop);
}

loadImages(() => {
  stageIndex = 0;
  updateStageLabel();
  overlay.style.backgroundImage = `url('${endingImages.intro.src}')`;
  overlay.classList.add('ending-bg', 'intro-minimal');
  introCodeBox.classList.remove('hidden');
  introQrPlaceholder.classList.remove('hidden');
  showOverlay(STAGES[0].introTitle, STAGES[0].introBody);
  requestAnimationFrame(loop);
  try {
    startPeer();
  } catch (e) {
    connBadge.textContent = '연결 서버 오류';
    connBadge.className = 'dead';
    console.error(e);
  }
});
