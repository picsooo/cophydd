(function(){
  const page = document.body.dataset.page;
  const links = [['index.html','Accueil','home'],['marques.html','Marques et produits','marques'],['distribution.html','Distribution','distribution'],['contact.html','Contact','contact']];
  const nav = links.map(([h,l,k]) => `<a href="${h}"${k===page?' aria-current="page"':''}>${l}</a>`).join('');
  document.querySelector('[data-header]').outerHTML = `
  <header class="top"><div class="wrap">
    <a class="wordmark" href="index.html">COPHYD <small>depuis 1971</small></a>
    <nav class="nav" aria-label="Navigation principale">${nav}</nav>
    <button class="burger" data-menu aria-label="Ouvrir le menu"><span></span></button>
  </div></header>`;
  const C = COPHYD.contact;
  document.querySelector('[data-footer]').outerHTML = `
  <iframe class="map" data-map title="Plan d'accès COPHYD à Koléa" loading="lazy"></iframe>
  <footer class="foot"><div class="wrap">
    <div><span class="wordmark">COPHYD</span><p style="margin-top:12px">Fabricant algérien d'aérosols et de produits d'hygiène, droguerie et entretien depuis 1971. Entreprise familiale certifiée ISO 9001, 14001 et 45001.</p></div>
    <ul>${links.map(([h,l])=>`<li><a href="${h}">${l}</a></li>`).join('')}</ul>
    <ul>${COPHYD.brands.map(b=>`<li><a href="marques.html#${b.id}">${b.name}</a></li>`).join('')}</ul>
    <ul><li>${C.adresse}</li><li><a href="tel:+21328862416">${C.tel}</a></li><li><a href="mailto:${C.mail}">${C.mail}</a></li>
    <li>${C.insta.map(([n,u])=>`<a href="${u}" target="_blank" rel="noopener">Instagram ${n}</a>`).join(' · ')}</li></ul>
    <p class="legal">© <span class="year"></span> SARL COPHYD, Koléa. Tous droits réservés.</p>
  </div></footer>`;
})();
