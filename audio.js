/* 音樂與音效：使用專案裡的原版 Crossgate BGM／SE。
 *
 * - BGM 用 <audio loop> 播放，WAV 迴圈不會像 MP3 一樣有編碼延遲的接縫。
 * - 切換曲目時做交叉淡入淡出；菜單、各關卡、霸主波各有不同氣氛。
 * - 第一次點擊／按键才真正播放（瀏覽器 autoplay 政策），音量與靜音會記在 localStorage。
 * - 音效走 Web Audio，延遲低，也能限制升級音效不要連發。
 */
(function () {
  "use strict";
  if (window.AUDIO) return;

  var BGM = {
    menu:   { src: "web-assets/audio/bgm/cgbgm_d1.wav",  vol: 0.62 },
    field1: { src: "web-assets/audio/bgm/cgbgm_d1.wav",  vol: 0.72 },
    field2: { src: "web-assets/audio/bgm/cgbgm_f1.wav",  vol: 0.72 },
    field3: { src: "web-assets/audio/bgm/exbgm_f0.wav",  vol: 0.72 },
    boss:   { src: "web-assets/audio/bgm/exbgm_f0.wav",  vol: 0.88 }
  };

  var SFX = {
    click:   { src: "web-assets/audio/sfx/click.wav",   vol: 0.55, cd: 0.03 },
    levelup: { src: "web-assets/audio/sfx/levelup.wav", vol: 0.9,  cd: 1.6 },
    victory: { src: "web-assets/audio/sfx/victory.wav", vol: 1.0,  cd: 2.0 },
    // 戰鬥
    hit:     { src: "web-assets/audio/sfx/hit.wav",     vol: 0.34, cd: 0.045 },
    hitbig:  { src: "web-assets/audio/sfx/hitbig.wav",  vol: 0.55, cd: 0.09 },
    kill:    { src: "web-assets/audio/sfx/kill.wav",    vol: 0.44, cd: 0.07 },
    killbig: { src: "web-assets/audio/sfx/killbig.wav", vol: 0.72, cd: 0.5 },
    hurt:    { src: "web-assets/audio/sfx/hurt.wav",    vol: 0.5,  cd: 0.16 },
    // 施法
    cast:    { src: "web-assets/audio/sfx/cast.wav",    vol: 0.5,  cd: 0.12 },
    cast2:   { src: "web-assets/audio/sfx/cast2.wav",   vol: 0.5,  cd: 0.12 },
    ecast:   { src: "web-assets/audio/sfx/ecast.wav",   vol: 0.42, cd: 0.22 },
    // 流程
    wave:    { src: "web-assets/audio/sfx/wave.wav",    vol: 0.6,  cd: 1.2 },
    ready:   { src: "web-assets/audio/sfx/ready.wav",   vol: 0.55, cd: 3.0 },
    boss:    { src: "web-assets/audio/sfx/boss.wav",    vol: 0.85, cd: 3.0 },
    pickup:  { src: "web-assets/audio/sfx/pickup.wav",  vol: 0.34, cd: 0.05 },
    portal:  { src: "web-assets/audio/sfx/portal.wav",  vol: 0.4,  cd: 0.5 },
    step:    { src: "web-assets/audio/sfx/step.wav",    vol: 0.16, cd: 0.22 },
    // 必殺技
    ultsword:{ src: "web-assets/audio/sfx/ultsword.wav", vol: 0.95, cd: 1.5 },
    ultbow:  { src: "web-assets/audio/sfx/ultbow.wav",   vol: 0.95, cd: 1.5 }
  };

  // 原版 wav 之外，再用 Web Audio 合成一批「動作音」。
  // 這樣不必新增音檔，也能讓走路、揮擊、各元素詠唱、怪物死亡都有聲音。
  var SYNTH = {
    swing:             { vol: 0.28, cd: 0.06 },
    bow:               { vol: 0.26, cd: 0.06 },
    monster_attack:    { vol: 0.30, cd: 0.10 },
    monster_attack_big:{ vol: 0.40, cd: 0.16 },
    monster_cast:      { vol: 0.28, cd: 0.14 },
    monster_die:       { vol: 0.40, cd: 0.08 },
    monster_die_big:   { vol: 0.60, cd: 0.35 },
    cast_fire:         { vol: 0.42, cd: 0.16 },
    cast_ice:          { vol: 0.38, cd: 0.16 },
    cast_thunder:      { vol: 0.42, cd: 0.18 },
    cast_poison:       { vol: 0.34, cd: 0.18 },
    cast_holy:         { vol: 0.40, cd: 0.20 },
    cast_dark:         { vol: 0.42, cd: 0.20 },
    cast_earth:        { vol: 0.40, cd: 0.20 },
    cast_wind:         { vol: 0.32, cd: 0.14 },
    cast_water:        { vol: 0.34, cd: 0.16 },
    cast_arcane:       { vol: 0.38, cd: 0.16 },
    levelup2:          { vol: 0.55, cd: 0.6 },
    lowhp:             { vol: 0.34, cd: 2.2 },
    treasure:          { vol: 0.40, cd: 0.4 },
    // 場景／霸主／新能力
    quake:             { vol: 0.55, cd: 0.30 },
    boss_phase:        { vol: 0.85, cd: 1.2 },
    elite:             { vol: 0.50, cd: 0.35 },
    poison:            { vol: 0.36, cd: 0.25 },
    gale:              { vol: 0.34, cd: 0.12 },
    spikes:            { vol: 0.45, cd: 0.20 },
    frost:             { vol: 0.38, cd: 0.18 },
    laststand:         { vol: 0.50, cd: 3.0 },
    heal:              { vol: 0.40, cd: 0.25 },
    // 地圖互動、霸主詠唱
    boss_cast:         { vol: 0.55, cd: 0.8 },
    shrine:            { vol: 0.42, cd: 0.6 },
    powerup:           { vol: 0.40, cd: 0.6 },
    campfire:          { vol: 0.36, cd: 0.8 },
    totem:             { vol: 0.50, cd: 0.6 }
  };

  function playSynth(name) {
    var def = SYNTH[name];
    if (!def || muted || vol <= 0) return;
    var ctx = ensureSfx();
    if (!ctx) return;
    if (ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
    var t0 = ctx.currentTime + 0.005;
    var master = ctx.createGain();
    master.gain.value = def.vol * vol;
    master.connect(ctx.destination);

    function env(gain, at, dur, peak) {
      gain.gain.setValueAtTime(0.0001, t0 + at);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t0 + at + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + at + dur);
    }
    function osc(type, f0, f1, dur, peak, at, detune) {
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f0, t0 + (at || 0));
      if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t0 + (at || 0) + dur);
      if (detune) o.detune.value = detune;
      env(g, at || 0, dur, peak);
      o.connect(g); g.connect(master);
      o.start(t0 + (at || 0));
      o.stop(t0 + (at || 0) + dur + 0.05);
    }
    function noise(dur, peak, at, filterType, f0, f1, q) {
      var len = Math.max(1, Math.floor(ctx.sampleRate * dur));
      var buf = ctx.createBuffer(1, len, ctx.sampleRate);
      var data = buf.getChannelData(0);
      for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      var src = ctx.createBufferSource();
      src.buffer = buf;
      var flt = ctx.createBiquadFilter();
      flt.type = filterType || "bandpass";
      flt.frequency.setValueAtTime(f0 || 900, t0 + (at || 0));
      if (f1 && f1 !== f0) flt.frequency.exponentialRampToValueAtTime(Math.max(40, f1), t0 + (at || 0) + dur);
      flt.Q.value = q || 0.8;
      var g = ctx.createGain();
      env(g, at || 0, dur, peak);
      src.connect(flt); flt.connect(g); g.connect(master);
      src.start(t0 + (at || 0));
      src.stop(t0 + (at || 0) + dur + 0.05);
    }

    if (name === "swing") {
      noise(0.14, 0.5, 0, "highpass", 2200, 700, 0.5);
      osc("sawtooth", 520, 140, 0.1, 0.12, 0);
    } else if (name === "bow") {
      osc("triangle", 920, 240, 0.13, 0.4, 0);
      noise(0.06, 0.25, 0, "highpass", 3000, 1800, 0.6);
    } else if (name === "monster_attack") {
      noise(0.16, 0.35, 0, "lowpass", 900, 300, 0.9);
      osc("sawtooth", 150, 70, 0.16, 0.22, 0);
    } else if (name === "monster_attack_big") {
      noise(0.3, 0.5, 0, "lowpass", 700, 160, 0.9);
      osc("sawtooth", 110, 40, 0.34, 0.38, 0);
      osc("square", 70, 50, 0.4, 0.16, 0.02);
    } else if (name === "monster_cast") {
      osc("sine", 260, 820, 0.34, 0.28, 0);
      noise(0.3, 0.2, 0, "bandpass", 500, 2200, 2.2);
    } else if (name === "monster_die" || name === "monster_die_big") {
      var big = name === "monster_die_big";
      osc("sawtooth", big ? 150 : 240, big ? 28 : 45, big ? 0.95 : 0.55, big ? 0.45 : 0.3, 0);
      noise(big ? 0.8 : 0.45, big ? 0.35 : 0.22, 0, "lowpass", 1400, 180, 0.7);
      if (big) osc("square", 60, 30, 1.0, 0.15, 0.05);
    } else if (name.indexOf("cast_") === 0) {
      var el = name.slice(5);
      if (el === "fire") {
        noise(0.42, 0.42, 0, "lowpass", 400, 2800, 1.1);
        osc("sawtooth", 90, 260, 0.36, 0.22, 0);
      } else if (el === "ice") {
        osc("sine", 1300, 2500, 0.36, 0.3, 0);
        osc("triangle", 900, 1750, 0.42, 0.18, 0.03);
        noise(0.24, 0.14, 0, "highpass", 4200, 2600, 0.8);
      } else if (el === "thunder") {
        noise(0.22, 0.55, 0, "highpass", 2600, 1100, 0.6);
        osc("square", 95, 55, 0.3, 0.28, 0.02);
        osc("sawtooth", 420, 90, 0.16, 0.16, 0.01);
      } else if (el === "poison") {
        noise(0.36, 0.26, 0, "bandpass", 320, 900, 3.5);
        osc("square", 190, 120, 0.28, 0.14, 0);
      } else if (el === "holy") {
        osc("sine", 784, 784, 0.7, 0.2, 0);
        osc("sine", 1046, 1046, 0.7, 0.16, 0.04);
        osc("sine", 1568, 1568, 0.6, 0.1, 0.08);
      } else if (el === "dark") {
        osc("sine", 95, 48, 0.6, 0.34, 0);
        osc("sawtooth", 180, 70, 0.45, 0.12, 0.05, -20);
        noise(0.4, 0.12, 0, "lowpass", 500, 140, 1.2);
      } else if (el === "earth") {
        osc("sawtooth", 70, 38, 0.45, 0.4, 0);
        noise(0.34, 0.3, 0, "lowpass", 420, 120, 0.8);
      } else if (el === "wind") {
        noise(0.34, 0.34, 0, "bandpass", 700, 2400, 1.6);
      } else if (el === "water") {
        osc("sine", 420, 900, 0.3, 0.26, 0);
        noise(0.3, 0.2, 0, "lowpass", 1800, 600, 1.1);
      } else {
        osc("sine", 440, 880, 0.4, 0.24, 0);
        osc("triangle", 660, 1320, 0.34, 0.14, 0.03);
      }
    } else if (name === "levelup2") {
      var notes = [523, 659, 784, 1046];
      for (var ni = 0; ni < notes.length; ni++) osc("triangle", notes[ni], notes[ni], 0.28, 0.22, ni * 0.085);
    } else if (name === "lowhp") {
      osc("sine", 90, 55, 0.18, 0.3, 0);
      osc("sine", 90, 55, 0.18, 0.24, 0.28);
    } else if (name === "treasure") {
      osc("sine", 1046, 1046, 0.45, 0.22, 0);
      osc("sine", 1568, 1568, 0.5, 0.16, 0.06);
    } else if (name === "quake") {
      noise(0.5, 0.5, 0, "lowpass", 260, 60, 0.9);
      osc("sine", 62, 28, 0.55, 0.42, 0);
      osc("square", 110, 45, 0.28, 0.14, 0.02);
    } else if (name === "boss_phase") {
      osc("sawtooth", 70, 210, 0.85, 0.4, 0);
      osc("square", 140, 58, 0.9, 0.22, 0.03);
      noise(0.8, 0.34, 0, "lowpass", 900, 160, 0.7);
      osc("sine", 110, 48, 1.0, 0.32, 0.12);
    } else if (name === "elite") {
      osc("triangle", 660, 990, 0.22, 0.28, 0);
      osc("sine", 1320, 1320, 0.3, 0.16, 0.05);
      noise(0.24, 0.22, 0, "bandpass", 1400, 800, 1.4);
    } else if (name === "poison") {
      noise(0.55, 0.28, 0, "bandpass", 260, 760, 4.2);
      osc("square", 150, 90, 0.45, 0.16, 0);
      osc("sine", 70, 120, 0.5, 0.1, 0.04);
    } else if (name === "gale") {
      noise(0.32, 0.36, 0, "bandpass", 900, 3200, 1.4);
      osc("sine", 420, 1200, 0.26, 0.1, 0);
    } else if (name === "spikes") {
      noise(0.18, 0.45, 0, "highpass", 3200, 1400, 0.7);
      osc("sawtooth", 180, 42, 0.35, 0.34, 0);
      noise(0.3, 0.28, 0.03, "lowpass", 600, 160, 0.9);
    } else if (name === "frost") {
      osc("sine", 1600, 2400, 0.3, 0.22, 0);
      osc("triangle", 1100, 700, 0.42, 0.14, 0.04);
      noise(0.24, 0.14, 0, "highpass", 4600, 3000, 0.9);
    } else if (name === "laststand") {
      osc("sine", 74, 48, 0.24, 0.42, 0);
      osc("sine", 74, 48, 0.24, 0.32, 0.3);
      osc("sawtooth", 150, 70, 0.6, 0.16, 0.06);
    } else if (name === "heal") {
      osc("sine", 523, 784, 0.32, 0.22, 0);
      osc("sine", 784, 1046, 0.36, 0.14, 0.06);
    } else if (name === "boss_cast") {
      osc("sawtooth", 60, 240, 0.7, 0.34, 0);
      osc("square", 130, 65, 0.75, 0.18, 0.04);
      noise(0.6, 0.28, 0, "bandpass", 420, 1800, 1.8);
      osc("sine", 880, 440, 0.4, 0.12, 0.1);
    } else if (name === "shrine") {
      [523, 659, 784, 1046].forEach(function (f, i) { osc("sine", f, f, 0.55, 0.16, i * 0.06); });
      osc("triangle", 1568, 1568, 0.6, 0.08, 0.12);
    } else if (name === "powerup") {
      osc("triangle", 320, 960, 0.42, 0.3, 0);
      osc("sine", 960, 1440, 0.34, 0.16, 0.08);
      noise(0.3, 0.14, 0, "highpass", 3200, 1800, 0.8);
    } else if (name === "campfire") {
      noise(0.55, 0.24, 0, "lowpass", 900, 260, 0.7);
      osc("sine", 196, 392, 0.4, 0.14, 0.02);
      osc("sine", 392, 523, 0.3, 0.1, 0.12);
    } else if (name === "totem") {
      osc("sine", 98, 49, 0.8, 0.4, 0);
      osc("sawtooth", 196, 98, 0.6, 0.16, 0.03);
      noise(0.5, 0.3, 0, "lowpass", 700, 140, 0.8);
      osc("triangle", 660, 330, 0.45, 0.12, 0.1);
    }
  }


  // ------------------------------------------------------------- 環境音
  // 用 Web Audio 即時合成，不新增音檔：每個地區都有低頻底噪與隨機點綴，
  // 讓森林、洞窟、雪原、火山的「空間感」不一樣。
  var AMBIENT = {
    forest:     { vol: 0.090, filter: "bandpass", f: 950,  q: 0.7, event: "bird",  every: [3.5, 8.0] },
    deepforest: { vol: 0.090, filter: "bandpass", f: 720,  q: 0.8, event: "bird",  every: [4.0, 9.0] },
    cave:       { vol: 0.110, filter: "lowpass",  f: 320,  q: 1.1, event: "drip",  every: [2.4, 6.0] },
    snow:       { vol: 0.115, filter: "bandpass", f: 850,  q: 0.5, event: "gust",  every: [2.5, 5.5] },
    desert:     { vol: 0.105, filter: "bandpass", f: 650,  q: 0.5, event: "gust",  every: [2.0, 5.0] },
    volcano:    { vol: 0.130, filter: "lowpass",  f: 460,  q: 0.8, event: "crackle", every: [0.12, 0.55] },
    graveyard:  { vol: 0.095, filter: "lowpass",  f: 260,  q: 0.9, event: "bell",  every: [6.0, 13.0] },
    underwater: { vol: 0.140, filter: "lowpass",  f: 400,  q: 1.2, event: "bubble", every: [1.6, 4.5] },
    island:     { vol: 0.115, filter: "lowpass",  f: 520,  q: 0.8, event: "wave",  every: [3.0, 6.0] },
    default:    { vol: 0.075, filter: "bandpass", f: 800,  q: 0.6, event: null,    every: [4, 9] }
  };

  var amb = {
    name: null, gain: null, src: null, filter: null,
    timers: [], token: 0, vol: 0, desired: null
  };

  function ambRand(a, b) { return a + Math.random() * (b - a); }

  function clearAmbTimers() {
    for (var i = 0; i < amb.timers.length; i++) clearTimeout(amb.timers[i]);
    amb.timers = [];
  }

  function ambTone(dest, type, f0, f1, dur, peak, delay) {
    if (!dest) return;
    var ctx = sfxCtx;
    var t0 = ctx.currentTime + (delay || 0);
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t0);
    if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t0 + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(dest);
    o.start(t0); o.stop(t0 + dur + 0.05);
  }

  function ambNoise(dest, dur, peak, filterType, f0, f1, q) {
    if (!dest) return;
    var ctx = sfxCtx;
    var len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    var buf = ctx.createBuffer(1, len, ctx.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    var src = ctx.createBufferSource();
    src.buffer = buf;
    var flt = ctx.createBiquadFilter();
    flt.type = filterType || "bandpass";
    flt.frequency.setValueAtTime(f0 || 800, ctx.currentTime);
    if (f1 && f1 !== f0) flt.frequency.exponentialRampToValueAtTime(Math.max(40, f1), ctx.currentTime + dur);
    flt.Q.value = q || 0.8;
    var g = ctx.createGain();
    var t0 = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t0 + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(flt); flt.connect(g); g.connect(dest);
    src.start(t0); src.stop(t0 + dur + 0.05);
  }

  function playAmbEvent(kind, dest) {
    if (kind === "bird") {
      var n = 2 + Math.floor(Math.random() * 3);
      for (var i = 0; i < n; i++) {
        var f = ambRand(1500, 2600);
        ambTone(dest, "sine", f, f * ambRand(0.85, 1.25), 0.1, 0.035, i * 0.11);
      }
    } else if (kind === "drip") {
      ambTone(dest, "sine", ambRand(700, 1200), ambRand(160, 300), 0.18, 0.06, 0);
      ambNoise(dest, 0.12, 0.03, "bandpass", 1800, 600, 1.4);
    } else if (kind === "gust") {
      ambNoise(dest, ambRand(1.2, 2.4), 0.07, "bandpass", ambRand(500, 900), ambRand(1400, 2600), 0.9);
    } else if (kind === "crackle") {
      ambNoise(dest, ambRand(0.05, 0.14), 0.09, "highpass", 2400, 900, 0.7);
      if (Math.random() < 0.3) ambTone(dest, "sine", ambRand(80, 160), 45, 0.16, 0.05, 0);
    } else if (kind === "bell") {
      ambTone(dest, "sine", 196, 196, 1.6, 0.05, 0);
      ambTone(dest, "sine", 392, 392, 1.3, 0.03, 0.02);
      ambTone(dest, "sine", 588, 588, 1.0, 0.018, 0.05);
    } else if (kind === "bubble") {
      for (var b = 0; b < 3; b++) {
        var bf = ambRand(240, 520);
        ambTone(dest, "sine", bf, bf * ambRand(1.5, 2.4), 0.13, 0.04, b * 0.09);
      }
    } else if (kind === "wave") {
      ambNoise(dest, ambRand(1.6, 2.8), 0.075, "lowpass", 900, 260, 0.7);
      ambTone(dest, "sine", 90, 60, 1.4, 0.035, 0.1);
    }
  }

  function scheduleAmbEvents() {
    var p = AMBIENT[amb.name] || AMBIENT.default;
    if (!p.event) return;
    var token = amb.token;
    var wait = ambRand(p.every[0], p.every[1]);
    var id = setTimeout(function () {
      if (token !== amb.token || !amb.gain) return;
      if (!muted && vol > 0) playAmbEvent(p.event, amb.gain);
      scheduleAmbEvents();
    }, wait * 1000);
    amb.timers.push(id);
  }

  function stopAmbient(ms, keepDesired) {
    if (!keepDesired) amb.desired = null;
    clearAmbTimers();
    amb.token = (amb.token || 0) + 1;
    var old = amb;
    if (!old.gain || !sfxCtx) {
      amb.name = null; amb.gain = null; amb.src = null; amb.filter = null;
      return;
    }
    var fade = ms > 0 ? ms / 1000 : 0;
    try {
      var t = sfxCtx.currentTime;
      old.gain.gain.cancelScheduledValues(t);
      old.gain.gain.setValueAtTime(old.gain.gain.value, t);
      old.gain.gain.linearRampToValueAtTime(0.0001, t + fade);
    } catch (e) {}
    setTimeout(function () {
      try { old.src.stop(); } catch (e) {}
      try { old.src.disconnect(); old.filter.disconnect(); old.gain.disconnect(); } catch (e) {}
    }, Math.max(60, (ms || 0) + 80));
    amb.name = null; amb.gain = null; amb.src = null; amb.filter = null;
  }

  function startAmbient(name) {
    if (!name) return;
    amb.desired = name;
    if (!unlocked || muted || vol <= 0) return;
    var ctx = ensureSfx();
    if (!ctx) return;
    if (ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
    if (amb.name === name && amb.src) return;

    stopAmbient(0, true);
    var p = AMBIENT[name] || AMBIENT.default;
    var g = ctx.createGain();
    g.gain.value = 0.0001;
    g.connect(ctx.destination);

    var len = Math.max(1, Math.floor(ctx.sampleRate * 4));
    var buf = ctx.createBuffer(1, len, ctx.sampleRate);
    var data = buf.getChannelData(0);
    var last = 0;
    for (var i = 0; i < len; i++) {
      var w = Math.random() * 2 - 1;
      last = last * 0.985 + w * 0.015;
      data[i] = w * 0.6 + last * 2.0;
    }
    var src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    var flt = ctx.createBiquadFilter();
    flt.type = p.filter;
    flt.frequency.value = p.f;
    flt.Q.value = p.q;
    src.connect(flt); flt.connect(g);
    try { src.start(0); } catch (e) {}

    amb.name = name;
    amb.gain = g;
    amb.src = src;
    amb.filter = flt;
    amb.vol = p.vol;
    amb.token = (amb.token || 0) + 1;
    var target = muted ? 0.0001 : Math.max(0.0001, p.vol * vol);
    try {
      g.gain.linearRampToValueAtTime(target, ctx.currentTime + 1.2);
    } catch (e) { g.gain.value = target; }
    scheduleAmbEvents();
  }

  var STORE_MUTE = "moli.audio.muted";

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function read(key, fallback) {
    try { var v = localStorage.getItem(key); return v === null ? fallback : v; } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, String(value)); } catch (e) {}
  }

  var STORE_VOL = "moli.audio.volume";
  var STORE_MUTE = "moli.audio.muted";

  var vol = clamp(parseFloat(read(STORE_VOL, "0.6")), 0, 1);
  if (!isFinite(vol)) vol = 0.6;
  var muted = read(STORE_MUTE, "0") === "1";

  var pool = {};          // src -> HTMLAudioElement
  var current = null;     // { key, src, el, vol }
  var desired = null;     // 手勢解鎖後要播放的曲目
  var unlocked = false;

  // ------------------------------------------------------------- BGM
  function getEl(src) {
    if (pool[src]) return pool[src];
    var a = document.createElement("audio");
    a.src = src;
    a.preload = "auto";
    a.loop = true;
    a.setAttribute("playsinline", "");
    a.setAttribute("aria-hidden", "true");
    a.style.display = "none";
    document.body.appendChild(a);
    pool[src] = a;
    return a;
  }

  function fadeEl(el, to, ms, done) {
    if (!el) { if (done) done(); return; }
    if (el._fadeTimer) { clearInterval(el._fadeTimer); el._fadeTimer = 0; }
    to = clamp(to, 0, 1);
    if (!(ms > 0)) { el.volume = to; if (done) done(); return; }
    var from = el.volume;
    var t0 = performance.now();
    el._fadeTimer = setInterval(function () {
      var k = Math.min(1, (performance.now() - t0) / ms);
      el.volume = clamp(from + (to - from) * k, 0, 1);
      if (k >= 1) {
        clearInterval(el._fadeTimer);
        el._fadeTimer = 0;
        if (done) done();
      }
    }, 25);
  }

  function safePlay(el) {
    try {
      var p = el.play();
      if (p && p.catch) p.catch(function () {});
    } catch (e) {}
  }

  function startTrack(key) {
    var def = BGM[key];
    if (!def) return;
    if (current && current.key === key && !current.el.paused) return;

    // 同一個音檔（菜單 ↔ 第一關）不重播，只調整音量，接縫更自然。
    if (current && current.src === def.src) {
      current.key = key;
      current.vol = def.vol;
      if (current.el.paused) safePlay(current.el);
      fadeEl(current.el, muted ? 0 : def.vol * vol, 500);
      refreshUI();
      return;
    }

    var el = getEl(def.src);
    el.volume = 0;
    try { el.currentTime = 0; } catch (e) {}
    safePlay(el);

    var old = current;
    current = { key: key, src: def.src, el: el, vol: def.vol };
    fadeEl(el, muted ? 0 : def.vol * vol, 1100);
    if (old && old.el !== el) {
      fadeEl(old.el, 0, 900, function () {
        try { old.el.pause(); old.el.currentTime = 0; } catch (e) {}
      });
    }
    refreshUI();
  }

  function playBgm(key) {
    desired = key;
    if (!unlocked) return;
    startTrack(key);
  }

  function stopBgm(ms) {
    desired = null;
    if (!current) return;
    var old = current;
    current = null;
    fadeEl(old.el, 0, ms > 0 ? ms : 800, function () {
      try { old.el.pause(); old.el.currentTime = 0; } catch (e) {}
    });
  }

  // ------------------------------------------------------------- SFX
  var sfxCtx = null;
  var sfxBuffers = {};
  var sfxLoading = {};
  var sfxLast = {};
  var sfxHtml = {};
  var sfxHtmlActive = 0;
  var sfxFetchBroken = false;

  function ensureSfx() {
    if (sfxCtx) return sfxCtx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { sfxCtx = new AC(); } catch (e) { sfxCtx = null; }
    return sfxCtx;
  }

  // file:// 直接開檔時 fetch 會被封鎖，退回 <audio> 播放同一個 wav。
  function playHtmlSfx(def) {
    if (sfxHtmlActive > 10) return;
    var el = sfxHtml[def.src];
    if (!el) {
      el = document.createElement("audio");
      el.src = def.src;
      el.preload = "auto";
      el.setAttribute("aria-hidden", "true");
      el.style.display = "none";
      document.body.appendChild(el);
      sfxHtml[def.src] = el;
    }
    try {
      var node = el.cloneNode(true);
      node.volume = Math.min(1, def.vol * vol * 1.15);
      sfxHtmlActive++;
      node.addEventListener("ended", function () {
        sfxHtmlActive--;
        if (node.parentNode) node.parentNode.removeChild(node);
      }, { once: true });
      document.body.appendChild(node);
      var p = node.play();
      if (p && p.catch) p.catch(function () {
        sfxHtmlActive--;
        if (node.parentNode) node.parentNode.removeChild(node);
      });
    } catch (e) {}
  }

  function playSfx(name) {
    var def = SFX[name];
    var synthDef = SYNTH[name];
    if (!def && !synthDef) return;
    if (muted || vol <= 0) return;
    var now = performance.now() / 1000;
    var cd = def ? def.cd : synthDef.cd;
    if (sfxLast[name] && now - sfxLast[name] < cd) return;
    sfxLast[name] = now;

    // 不是原版 wav 的動作音，直接合成
    if (!def) { playSynth(name); return; }

    if (sfxFetchBroken) { playHtmlSfx(def); return; }

    var ctx = ensureSfx();
    if (!ctx) { playHtmlSfx(def); return; }
    if (ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }

    function fire(buf) {
      if (!buf) return;
      try {
        var src = ctx.createBufferSource();
        src.buffer = buf;
        var g = ctx.createGain();
        g.gain.value = def.vol * vol;
        src.connect(g);
        g.connect(ctx.destination);
        src.start(0);
      } catch (e) {}
    }

    if (sfxBuffers[def.src]) { fire(sfxBuffers[def.src]); return; }
    if (!sfxLoading[def.src]) {
      sfxLoading[def.src] = fetch(def.src)
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          return r.arrayBuffer();
        })
        .then(function (buf) { return buf ? ctx.decodeAudioData(buf) : null; })
        .then(function (buf) { if (buf) sfxBuffers[def.src] = buf; return buf; })
        .catch(function () {
          // 連線或解碼失敗：之後統一走 <audio>，避免每個音效都重試。
          sfxFetchBroken = true;
          return null;
        });
    }
    sfxLoading[def.src].then(function (buf) {
      if (buf) fire(buf);
      else playHtmlSfx(def);
    });
  }

  // ------------------------------------------------------------- 解鎖 / 音量
  function unlock() {
    if (!unlocked) unlocked = true;
    var ctx = ensureSfx();
    if (ctx && ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
    if (desired) startTrack(desired);
    if (amb.desired) startAmbient(amb.desired);
  }

  function applyVolumes() {
    for (var src in pool) {
      var el = pool[src];
      if (el._fadeTimer) { clearInterval(el._fadeTimer); el._fadeTimer = 0; }
      if (current && el === current.el) continue;
      // 正在淡出的舊曲目：直接收乾淨，避免調音量後殘留播放
      if (el && !el.paused) {
        try { el.pause(); el.currentTime = 0; } catch (e) {}
      }
      if (el) el.volume = 0;
    }
    if (current) current.el.volume = muted ? 0 : current.vol * vol;
    if (amb.gain) {
      try { amb.gain.gain.value = muted ? 0.0001 : Math.max(0.0001, amb.vol * vol); } catch (e) {}
    }
    if (!muted && amb.desired && !amb.src) startAmbient(amb.desired);
    var ctx = sfxCtx;
    if (ctx && !muted) { try { if (ctx.state === "suspended") ctx.resume(); } catch (e) {} }
    refreshUI();
  }

  function setVolume(v) {
    vol = clamp(parseFloat(v) || 0, 0, 1);
    write(STORE_VOL, vol.toFixed(2));
    applyVolumes();
  }

  function toggleMute() {
    muted = !muted;
    write(STORE_MUTE, muted ? "1" : "0");
    applyVolumes();
    if (!muted && current) safePlay(current.el);
    return muted;
  }

  // ------------------------------------------------------------- UI
  var hudBtn = document.getElementById("audioBtn");
  var menuBtn = document.getElementById("audioMute");
  var volInput = document.getElementById("audioVol");
  var pctEl = document.getElementById("audioPct");

  function refreshUI() {
    if (hudBtn) {
      hudBtn.textContent = muted ? "靜音" : "♪";
      hudBtn.classList.toggle("muted", muted);
      hudBtn.title = muted ? "音樂已關閉（M 開啟）" : "音樂開啟（M 關閉）";
    }
    if (menuBtn) {
      menuBtn.textContent = muted ? "♪ 音樂 OFF" : "♪ 音樂 ON";
      menuBtn.classList.toggle("muted", muted);
      menuBtn.setAttribute("aria-pressed", muted ? "true" : "false");
    }
    if (volInput && document.activeElement !== volInput) volInput.value = String(Math.round(vol * 100));
    if (pctEl) pctEl.textContent = Math.round(vol * 100) + "%";
  }

  if (hudBtn) hudBtn.addEventListener("click", function () { toggleMute(); playSfx("click"); });
  if (menuBtn) menuBtn.addEventListener("click", function () { toggleMute(); playSfx("click"); });
  if (volInput) {
    volInput.addEventListener("input", function () { setVolume(Number(volInput.value) / 100); });
    volInput.addEventListener("change", function () { playSfx("click"); });
  }

  // 第一次互動才播放（Chrome／Safari 的 autoplay 限制）
  function onGesture() {
    if (!unlocked) unlocked = true;
    var ctx = ensureSfx();
    if (ctx && ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
    if (desired && (!current || current.el.paused)) startTrack(desired);
    if (amb.desired && !amb.src) startAmbient(amb.desired);
  }
  ["pointerdown", "keydown", "touchstart"].forEach(function (ev) {
    document.addEventListener(ev, onGesture, true);
  });

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if ((e.key || "").toLowerCase() === "m") {
      toggleMute();
      e.preventDefault();
    }
  });

  refreshUI();

  window.AUDIO = {
    playBgm: playBgm,
    stopBgm: stopBgm,
    ambient: startAmbient,
    stopAmbient: stopAmbient,
    sfx: playSfx,
    unlock: unlock,
    setVolume: setVolume,
    getVolume: function () { return vol; },
    isMuted: function () { return muted; },
    toggleMute: toggleMute,
    // 除錯／驗收用
    _debug: function () {
      return {
        desired: desired, current: current ? current.key : null, src: current ? current.src : null,
        playing: !!(current && !current.el.paused), unlocked: unlocked, muted: muted,
        vol: vol, elVolume: current ? Number(current.el.volume.toFixed(3)) : null,
        ambient: amb.name, ambientDesired: amb.desired,
        ctx: sfxCtx ? sfxCtx.state : null, sfxCache: Object.keys(sfxBuffers)
      };
    }
  };
})();
