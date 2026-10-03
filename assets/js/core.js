(function(){
  const inV2 = location.pathname.includes('/v2/');
  // Bandeau de démonstration
  const demo = document.createElement('div');
  demo.className = 'wm-demo';
  demo.textContent = 'Maquette de démonstration réalisée par Webminds · aucun formulaire n\u2019est enregistré';
  document.body.appendChild(demo);
  // Pastille de version
  const pill = document.createElement('a');
  pill.className = 'wm-pill';
  pill.href = inV2 ? '../index.html' : 'v2/index.html';
  pill.innerHTML = '<span class="wm-dot"></span>' + (inV2 ? 'Découvrir la version corporate' : 'Découvrir la version moderne');
  document.body.appendChild(pill);
  // Menu mobile
  const t = document.querySelector('[data-menu]');
  if (t) t.addEventListener('click', () => document.body.classList.toggle('menu-open'));
  // Wilayas
  document.querySelectorAll('select[data-wilayas]').forEach(s => {
    COPHYD.wilayas.forEach((w,i) => { const o = document.createElement('option'); o.value = w; o.textContent = String(i+1).padStart(2,'0') + ' · ' + w; s.appendChild(o); });
  });
  // Formulaires factices
  document.querySelectorAll('form[data-fake]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const ok = f.querySelector('.form-ok');
    if (ok) { ok.hidden = false; ok.focus(); }
    f.querySelectorAll('input,textarea,select,button[type=submit]').forEach(el => el.disabled = true);
  }));
  // Contacts
  document.querySelectorAll('[data-c]').forEach(el => { el.textContent = COPHYD.contact[el.dataset.c]; });
  document.querySelectorAll('iframe[data-map]').forEach(el => { el.src = COPHYD.contact.map; });
  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());
})();
