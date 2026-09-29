let conn = null;
const state = { up:false, down:false, left:false, right:false, fire:false };

const setupEl = document.getElementById('setup');
const padEl = document.getElementById('pad');
const statusEl = document.getElementById('status');
const connDot = document.getElementById('connDot');
const connText = document.getElementById('connText');

function sendState(){
  if (conn && conn.open) {
    conn.send({ type:'input', ...state });
  }
}

document.getElementById('connectBtn').addEventListener('click', () => {
  const code = document.getElementById('codeInput').value.trim().toUpperCase();
  if (!code || code.length < 6) { statusEl.textContent = '6자리 코드를 입력해주세요.'; return; }
  if (typeof Peer === 'undefined') {
    statusEl.textContent = '연결 라이브러리 로드 실패. 인터넷 연결을 확인하세요.';
    return;
  }
  statusEl.textContent = '연결 중...';

  const peer = new Peer();
  peer.on('open', () => {
    conn = peer.connect('historydef-' + code);

    conn.on('open', () => {
      setupEl.classList.add('hidden');
      padEl.classList.add('active');
      connDot.classList.add('live');
      connText.textContent = '연결됨';
      if (navigator.wakeLock) navigator.wakeLock.request('screen').catch(()=>{});
    });
    conn.on('close', () => {
      connDot.classList.remove('live');
      connText.textContent = '연결 끊김';
      setupEl.classList.remove('hidden');
      padEl.classList.remove('active');
      statusEl.textContent = '이미 다른 사람이 조종 중이거나 연결이 끊겼습니다.';
    });
    conn.on('error', () => {
      statusEl.textContent = '연결 실패. 코드를 확인하세요.';
    });
  });
  peer.on('error', () => {
    statusEl.textContent = '연결 실패. 인터넷 연결을 확인하세요.';
  });
});

// The phone is physically held rotated 90°, so the signal each button sends
// is rotated to match: the "up" button (physically now pointing left) sends
// "left", "right" (now pointing up) sends "up", and so on.
const keyMap = { up: 'left', right: 'up', down: 'right', left: 'down' };
const keys = ['up','down','left','right'];
keys.forEach(key => {
  const el = document.getElementById(key);
  const signal = keyMap[key];
  const press = (e) => { e.preventDefault(); el.classList.add('active'); state[signal] = true; sendState(); };
  const release = (e) => { e.preventDefault(); el.classList.remove('active'); state[signal] = false; sendState(); };
  el.addEventListener('touchstart', press);
  el.addEventListener('touchend', release);
  el.addEventListener('touchcancel', release);
});

const fireEl = document.getElementById('fireBtn');
const firePress = (e) => { e.preventDefault(); fireEl.classList.add('active'); state.fire = true; sendState(); };
const fireRelease = (e) => { e.preventDefault(); fireEl.classList.remove('active'); state.fire = false; sendState(); };
fireEl.addEventListener('touchstart', firePress);
fireEl.addEventListener('touchend', fireRelease);
fireEl.addEventListener('touchcancel', fireRelease);
