const fs = require('fs');
const path = require('path');

const gamePath = path.join(__dirname, 'game.js');
const cfgPath = path.join(__dirname, 'config', 'game_config.json');

let game = fs.readFileSync(gamePath, 'utf8');
const cfg = fs.readFileSync(cfgPath, 'utf8').trim();

// 加入 EMBEDDED_CONFIG
if (!game.includes('EMBEDDED_CONFIG')) {
  const marker = '  var CONFIG = FALLBACK;';
  if (!game.includes(marker)) {
    throw new Error('找不到 CONFIG 標記');
  }
  const emb = '  var CONFIG = FALLBACK;\n\n  // ---------------------------------------------------------------- embedded config (from config/game_config.json)\n  var EMBEDDED_CONFIG = ' + cfg + ';\n';
  game = game.replace(marker, emb);
}

// 取代 loadConfig
const start = game.indexOf('// ---------------------------------------------------------------- config load');
const end = game.indexOf('// ---------------------------------------------------------------- menu');
if (start === -1 || end === -1) {
  throw new Error('找不到 config load/menu 區段');
}

const repl = `// ---------------------------------------------------------------- config load
  var configLoaded = false;
  var loadNote = document.getElementById("loadNote");

  function loadConfig() {
    try {
      if (typeof EMBEDDED_CONFIG !== "undefined" && EMBEDDED_CONFIG && typeof EMBEDDED_CONFIG === "object") {
        CONFIG = normalizeConfig(EMBEDDED_CONFIG);
        finish(true, "embedded");
        return;
      }
    } catch (e) {
      // ignore
    }
    try {
      CONFIG = normalizeConfig(FALLBACK);
      finish(false);
      return;
    } catch (e2) {
      CONFIG = FALLBACK;
      finish(false);
      return;
    }
  }

  `;

game = game.slice(0, start) + repl + game.slice(end);
fs.writeFileSync(gamePath, game, 'utf8');
console.log('done');