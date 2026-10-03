(function(){
  const D = COPHYD;
  const lab = document.getElementById('lab'), cv = document.getElementById('fx'), ctx = cv.getContext('2d');
  const can = document.getElementById('can'), sub = document.getElementById('sub'), score = document.getElementById('score');
  const scentsEl = document.getElementById('scents'), canlabel = document.getElementById('canlabel');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W, H, dpr, mode = 'stop', spraying = false, aim = {x:0,y:0}, parts = [], flies = [], dust, dustCtx, cleanPct = 0, scent = {n:'Lavande', c:'185,160,232'}, haze = 0, t = 0;

  const TXT = {
    stop: "Maintenez appuyé sur l'écran pour pulvériser STOP sur les mouches.",
    ambisens: "Choisissez une senteur, puis maintenez appuyé pour parfumer la pièce.",
    krosti: "Maintenez appuyé sur le tableau de bord pour le nettoyer avec KROSTI."
  };

  function resize(){
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = lab.clientWidth; H = lab.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    makeDust();
    aim = {x: W*0.35, y: H*0.55};
  }

  // Mouches
  function makeFlies(){
    flies = Array.from({length:12}, () => ({x: W*(0.1+Math.random()*0.75), y: H*(0.38+Math.random()*0.42), a: Math.random()*6.28, v: 0.6+Math.random()*0.8, dead:false, vy:0, rot:0}));
  }
  function drawFly(f){
    ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.dead ? f.rot : f.a); if (W > 800) ctx.scale(1.6,1.6);
    const flap = f.dead ? 0 : Math.sin(t*0.9 + f.x) * 0.5;
    ctx.fillStyle = 'rgba(238,243,244,.35)';
    ctx.beginPath(); ctx.ellipse(-2, -5, 6, 3, -0.6 + flap, 0, 6.28); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-2, 5, 6, 3, 0.6 - flap, 0, 6.28); ctx.fill();
    ctx.fillStyle = f.dead ? '#3c4f56' : '#0a1418';
    ctx.beginPath(); ctx.ellipse(0, 0, 7, 4, 0, 0, 6.28); ctx.fill();
    ctx.restore();
  }

  // Tableau de bord poussiéreux
  function makeDust(){
    dust = document.createElement('canvas'); dust.width = W; dust.height = H; dustCtx = dust.getContext('2d');
    const y0 = H*0.42, h = H*0.34;
    dustCtx.fillStyle = 'rgb(120,112,98)'; roundRect(dustCtx, W*0.05, y0, W*0.9, h, 26); dustCtx.fill();
    for (let i=0;i<1400;i++){ dustCtx.fillStyle = `rgba(${150+Math.random()*60},${140+Math.random()*50},${120+Math.random()*40},${Math.random()*0.5})`; dustCtx.fillRect(W*0.05+Math.random()*W*0.9, y0+Math.random()*h, 2+Math.random()*3, 2+Math.random()*3); }
    dustCtx.globalCompositeOperation = 'destination-out';
    cleanPct = 0;
  }
  function roundRect(c,x,y,w,h,r){ c.beginPath(); c.moveTo(x+r,y); c.arcTo(x+w,y,x+w,y+h,r); c.arcTo(x+w,y+h,x,y+h,r); c.arcTo(x,y+h,x,y,r); c.arcTo(x,y,x+w,y,r); c.closePath(); }
  function drawDash(){
    const x = W*0.05, y = H*0.42, w = W*0.9, h = H*0.34;
    const g = ctx.createLinearGradient(x, y, x+w, y+h);
    g.addColorStop(0,'#1b2329'); g.addColorStop(.5,'#2f3d45'); g.addColorStop(1,'#141b20');
    ctx.fillStyle = g; roundRect(ctx,x,y,w,h,26); ctx.fill();
    ctx.save(); roundRect(ctx,x,y,w,h,26); ctx.clip();
    const s = (t*3) % (w*2) - w*0.5;
    const sh = ctx.createLinearGradient(x+s, y, x+s+140, y+h);
    sh.addColorStop(0,'rgba(255,255,255,0)'); sh.addColorStop(.5,'rgba(255,255,255,.18)'); sh.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle = sh; ctx.fillRect(x,y,w,h);
    ctx.strokeStyle = 'rgba(120,205,230,.55)'; ctx.lineWidth = 3;
    [[.25,.5],[.55,.5]].forEach(([cx,cy]) => { ctx.beginPath(); ctx.arc(x+w*cx, y+h*cy, Math.min(w,h)*0.26, 2.4, 7.0); ctx.stroke(); });
    ctx.restore();
    ctx.drawImage(dust, 0, 0, W, H);
  }

  function nozzle(){
    const r = can.getBoundingClientRect(), l = lab.getBoundingClientRect();
    return { x: r.left - l.left + r.width*0.12, y: r.top - l.top + r.height*0.07 };
  }

  function emit(){
    const n = nozzle(), dx = aim.x - n.x, dy = aim.y - n.y, ang = Math.atan2(dy, dx), dist = Math.hypot(dx,dy);
    for (let i=0;i<9;i++){
      const a = ang + (Math.random()-0.5)*0.45, sp = 6 + Math.random()*7;
      parts.push({x:n.x, y:n.y, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp, life:1, r:2+Math.random()*3, max: dist/sp*1.25 + 10, age:0});
    }
  }

  function step(){
    t++;
    ctx.clearRect(0,0,W,H);
    if (mode === 'ambisens'){
      haze = Math.max(0, haze - 0.0008);
      const g = ctx.createRadialGradient(W*0.4,H*0.6,0,W*0.4,H*0.6,Math.max(W,H));
      g.addColorStop(0, `rgba(${scent.c},${0.55*haze})`); g.addColorStop(1, `rgba(${scent.c},${0.12*haze})`);
      ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
    }
    if (mode === 'krosti') drawDash();
    if (spraying) emit();

    const col = mode === 'ambisens' ? scent.c : mode === 'krosti' ? '200,235,245' : '240,245,230';
    for (let i = parts.length - 1; i >= 0; i--){
      const p = parts[i];
      p.x += p.vx; p.y += p.vy; p.vx *= 0.955; p.vy = p.vy*0.955 + 0.03; p.age++; p.r += 0.35;
      p.life = 1 - p.age / (p.max + 30);
      if (p.life <= 0){ parts.splice(i,1); continue; }
      ctx.fillStyle = `rgba(${col},${0.13*p.life})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
      if (mode === 'stop') flies.forEach(f => { if (!f.dead && Math.hypot(f.x-p.x, f.y-p.y) < p.r + 6 && p.age > 6){ f.dead = true; f.vy = 0.5; } });
      if (mode === 'krosti' && p.age > 8 && p.age % 3 === 0){ dustCtx.beginPath(); dustCtx.arc(p.x, p.y, p.r*0.55, 0, 6.28); dustCtx.fill(); }
      if (mode === 'ambisens' && p.age % 10 === 0) haze = Math.min(1, haze + 0.00015);
    }

    if (mode === 'stop'){
      flies.forEach(f => {
        if (f.dead){ f.vy += 0.25; f.y = Math.min(H - 20, f.y + f.vy); f.rot += 0.2; }
        else { f.a += (Math.random()-0.5)*0.5; f.x += Math.cos(f.a)*f.v*2; f.y += Math.sin(f.a)*f.v*2;
          if (f.x < 20 || f.x > W-20) f.a = Math.PI - f.a; if (f.y < H*0.32 || f.y > H*0.85) f.a = -f.a;
          f.x = Math.max(20, Math.min(W-20, f.x)); f.y = Math.max(H*0.32, Math.min(H*0.85, f.y)); }
        drawFly(f);
      });
      const dead = flies.filter(f=>f.dead).length;
      score.innerHTML = dead === flies.length ? `Pièce dégagée<small>Parfum citron</small>` : `${dead}/${flies.length}<small>mouches éliminées</small>`;
    }
    if (mode === 'ambisens') score.innerHTML = `${scent.n}<small>${Math.round(haze*100)} % de la pièce parfumée</small>`;
    if (mode === 'krosti' && t % 20 === 0){
      const x0 = Math.round(W*0.05), y0 = Math.round(H*0.42), w = Math.round(W*0.9), h = Math.round(H*0.34);
      const d = dustCtx.getImageData(x0, y0, w, h).data; let a = 0, n = 0;
      for (let i = 3; i < d.length; i += 4*40){ n++; if (d[i] < 40) a++; }
      cleanPct = Math.round(a/n*100);
      score.innerHTML = cleanPct > 85 ? `Comme neuf<small>Tableau de bord nettoyé</small>` : `${cleanPct} %<small>du tableau nettoyé</small>`;
    }
    requestAnimationFrame(step);
  }

  function setMode(m){
    mode = m; lab.dataset.mode = m; parts = []; haze = 0;
    document.querySelectorAll('.modes button').forEach(b => b.setAttribute('aria-selected', b.dataset.m === m));
    scentsEl.hidden = m !== 'ambisens';
    canlabel.textContent = m === 'stop' ? 'STOP' : m === 'ambisens' ? 'AMBI' : 'KROSTI';
    canlabel.setAttribute('font-size', m === 'krosti' ? 24 : 30);
    sub.textContent = TXT[m];
    if (m === 'stop') makeFlies();
    if (m === 'krosti') makeDust();
  }

  // Interaction
  function pos(e){ const r = lab.getBoundingClientRect(); aim = {x: e.clientX - r.left, y: e.clientY - r.top}; }
  lab.addEventListener('pointerdown', e => {
    if (e.target.closest('button,a')) return;
    pos(e); spraying = true; lab.classList.add('spraying'); lab.setPointerCapture(e.pointerId);
  });
  lab.addEventListener('pointermove', e => { if (spraying) pos(e); });
  const stop = () => { spraying = false; lab.classList.remove('spraying'); };
  lab.addEventListener('pointerup', stop); lab.addEventListener('pointercancel', stop);
  const hold = document.getElementById('hold');
  const aimTarget = () => { aim = mode === 'stop' ? (flies.find(f=>!f.dead) || {x:W*0.4,y:H*0.6}) : {x: W*(0.25+Math.random()*0.5), y: H*(0.5+Math.random()*0.2)}; };
  let holdT;
  hold.addEventListener('pointerdown', e => { e.stopPropagation(); aimTarget(); spraying = true; lab.classList.add('spraying'); holdT = setInterval(aimTarget, 250); });
  ['pointerup','pointerleave','pointercancel'].forEach(ev => hold.addEventListener(ev, () => { clearInterval(holdT); stop(); }));
  hold.addEventListener('keydown', e => { if ((e.key===' '||e.key==='Enter') && !spraying){ e.preventDefault(); aimTarget(); spraying = true; lab.classList.add('spraying'); } });
  hold.addEventListener('keyup', stop);
  document.querySelectorAll('.modes button').forEach(b => b.addEventListener('click', () => setMode(b.dataset.m)));
  scentsEl.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    scentsEl.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
    scent = {n: b.dataset.s, c: b.dataset.rgb}; haze = Math.min(haze, .3);
  }));
  addEventListener('resize', () => { resize(); if (mode==='stop') makeFlies(); });

  resize(); setMode('stop');
  requestAnimationFrame(step);

  // Contenus
  const firstProd = id => D.products.find(p => p.b === id);
  document.getElementById('rail').innerHTML = D.brands.map(b => {
    const p = firstProd(b.id);
    return `<a class="tile" href="../marques.html#${b.id}"><div class="tl"><img src="${b.logo}" alt="Logo ${b.name}" loading="lazy"></div>
      <div class="pi">${p ? `<img src="${p.img}" alt="${p.name}" loading="lazy">` : ''}</div>
      <small>${b.cat}</small><h3>${b.name}</h3><p>${b.line}</p></a>`;
  }).join('');
  document.getElementById('bestImg').src = D.products[0].img;
  document.getElementById('usineImg').src = D.photos.usine;
  document.getElementById('insta').innerHTML = D.contact.insta.map(([n,u]) => `<a href="${u}" target="_blank" rel="noopener">Instagram ${n}</a>`).join(' · ');
})();
