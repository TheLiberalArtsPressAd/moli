(function () {
  var out = document.createElement("pre");
  out.id = "selftestOut";
  out.style.cssText = "position:fixed;left:0;bottom:0;z-index:99999;background:#000;color:#0f0;font:11px monospace;max-width:100%;white-space:pre-wrap;margin:0;";
  out.textContent = "pending";
  document.body.appendChild(out);
  window.__SELFTEST = { errors: [] };
  window.addEventListener("error", function (e) {
    window.__SELFTEST.errors.push(String(e.message || e.error || "error"));
  });

  function log(obj) { out.textContent = JSON.stringify(obj); }

  var tries = 0;
  var timer = setInterval(function () {
    tries++;
    var dbg = window.__MOLI_DEBUG;
    var G = dbg && dbg.state();
    if (!G || !G.player) {
      if (tries > 80) { clearInterval(timer); log({ ok: false, why: "no game", errors: window.__SELFTEST.errors }); }
      return;
    }
    clearInterval(timer);
    var p = G.player;
    var keys = ["poisonNova", "galeWheel", "earthSpikes", "frostDomain", "windStep", "lastStand",
      "bladeCyclone", "voidRift", "starBurst", "thunderGod", "lastStand2",
      "iceTrap", "stormCloud", "spiritWolf", "sunBeam", "bloodMoon",
      "glacier", "inferno", "judgement", "eclipse"];
    var abilityKeys = dbg.abilityKeys();
    var present = {};
    keys.forEach(function (k) {
      present[k] = abilityKeys.indexOf(k) >= 0 && typeof dbg.abilityDesc(k) === "string";
      p.abilities[k] = 2;
    });
    p.armorPen = 0.3;
    p.dmgReduce = 0.15;
    p.hp = p.maxhp * 0.3;

    var t0 = performance.now();
    var iv = setInterval(function () {
      if (performance.now() - t0 < 5000) return;
      clearInterval(iv);
      var timers = p.abilityTimers;
      var venom = 0;
      for (var ei = 0; ei < G.enemies.length; ei++) if (G.enemies[ei].venomT > 0) venom++;
      var m = {};
      (G.fx || []).forEach(function (f) { m[f.type] = (m[f.type] || 0) + 1; });
      log({
        ok: true,
        errors: window.__SELFTEST.errors,
        armorPen: p.armorPen,
        dmgReduce: p.dmgReduce,
        hpPct: Math.round(p.hp / p.maxhp * 100),
        timers: {
          poison: timers.poison, gale: timers.gale, spikes: timers.spikes, domain: timers.domain,
          blade: timers.blade, void: timers.void, star: timers.star, god: timers.god,
          lastStand2: timers.lastStand2, trap: timers.trap, cloud: timers.cloud,
          wolf: timers.wolf, sun: timers.sun, blood: timers.blood,
          glacier: timers.glacier, inferno: timers.inferno, judge: timers.judge, eclipse: timers.eclipse
        },
        poisonEnemies: venom,
        fxTypes: m,
        newAbilityKeys: present,
        abilityTotal: abilityKeys.length,
        statTotal: dbg.statCount(),
        enemyCount: G.enemies.length,
        shots: (G.shots || []).length
      });
    }, 120);
  }, 100);
})();
