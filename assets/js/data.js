/* Données COPHYD — reprises de cophyd.com (images affichées depuis leur serveur) */
const U = 'https://cophyd.com/wp-content/uploads/';
window.COPHYD = {
  brands: [
    { id:'stop', name:'STOP', cat:'Insecticides', logo:U+'2023/06/stop.png', hero:U+'2026/09/stop-2.png',
      line:"L'insecticide créé il y a plus de 50 ans, contre les insectes volants et rampants : mouches, moustiques, cafards, fourmis." },
    { id:'ambisens', name:'AMBISENS', cat:"Parfums d'intérieur", logo:U+'2023/06/ambi-sens.png', hero:U+'2026/09/AMBIPNG-3.png',
      line:"Désodorisants et neutralisateurs d'odeurs : 750 ml, à forme 300 ml, Refill et Ergo 250 ml." },
    { id:'krosti', name:'KROSTI', cat:'Entretien automobile', logo:U+'2023/06/krosti.png', hero:U+'2026/09/KROS.png',
      line:"Nettoyants tableau de bord, parfums auto, rénovateurs et shampoing pour l'entretien de la voiture." },
    { id:'krostipro', name:'KROSTI PRO', cat:'Auto, professionnels', logo:U+'2024/02/KROSTI-PRO-LOGO-1024x1024.png', hero:null,
      line:"La gamme d'entretien automobile destinée aux professionnels." },
    { id:'sdidox', name:'SDIDOX', cat:'Technique', logo:U+'2023/06/sdidox.png', hero:null,
      line:"Le dégrippant qui réunit six fonctions techniques." },
    { id:'gazal', name:'GAZAL', cat:'Gaz', logo:U+'2024/02/Sans-titre-11-1024x400.png', hero:U+'2026/09/gGAZ-3.png',
      line:"La cartouche de gaz butane à usage multiple, en 400 ml et 600 ml." },
    { id:'dari', name:'DARI', cat:'Ménager', logo:U+'2023/06/dari.png', hero:null,
      line:"Les produits ménagers de la maison COPHYD." }
  ],
  products: [
    { id:'stop-750', b:'stop', name:'STOP Spécial Volants Citron', size:'750 ml', img:U+'2024/03/stop-750-500x500.png', best:true,
      txt:"Formule à action rapide contre mouches et moustiques. Agit par contact et par ingestion, et laisse la pièce parfumée au citron." },
    { id:'amb-linge', b:'ambisens', sub:'À forme', name:'Ambisens à forme Linge propre', size:'300 ml', img:U+'2025/05/LINGE-PROPRE-WEB-3-500x500.png', txt:"Parfum d'intérieur à forme, senteur linge propre." },
    { id:'amb-cachemire', b:'ambisens', sub:'À forme', name:'Ambisens à forme Cachemire', size:'300 ml', img:U+'2025/05/cashemire-web-3-500x500.png', txt:"Parfum d'intérieur à forme, senteur cachemire." },
    { id:'amb-coton', b:'ambisens', sub:'À forme', name:'Ambisens à forme Fleur de coton', size:'300 ml', img:U+'2025/05/FLEUR-DE-COTON-web-500x500.png', txt:"Parfum d'intérieur à forme, senteur fleur de coton." },
    { id:'amb-wc', b:'ambisens', sub:'Neutralisateurs', name:'Neutralisateur WC et salle de bain', size:'Spray', img:U+'2025/05/neutralisateur-WC-3-500x500.png', isnew:true, txt:"Double action : élimine les mauvaises odeurs à la source et laisse une senteur fraîche." },
    { id:'amb-cuisine', b:'ambisens', sub:'Neutralisateurs', name:'Neutralisateur odeurs de cuisine', size:'Spray', img:U+'2025/05/neutralisateur-cuisine-web-3-500x500.png', isnew:true, txt:"Double action contre les odeurs de cuisson." },
    { id:'amb-animaux', b:'ambisens', sub:'Neutralisateurs', name:"Neutralisateur odeurs d'animaux", size:'Spray', img:U+'2025/05/neutralisateur-animaux-web-3-500x500.png', isnew:true, txt:"Double action contre les odeurs d'animaux." },
    { id:'amb-petales', b:'ambisens', sub:'750 ml', name:'Ambisens Pétales de roses', size:'750 ml', img:U+'2024/12/ambisens-750ml-petales-500x500.png', txt:"Parfum d'intérieur grand format." },
    { id:'amb-orchidee', b:'ambisens', sub:'750 ml', name:'Ambisens Orchidée', size:'750 ml', img:U+'2024/12/orchidee-web-3-500x500.png', txt:"Parfum d'intérieur grand format." },
    { id:'amb-grenade', b:'ambisens', sub:'750 ml', name:'Ambisens Grenade', size:'750 ml', img:U+'2024/12/grenade-web-3-500x500.png', txt:"Parfum d'intérieur grand format." },
    { id:'amb-lavande', b:'ambisens', sub:'750 ml', name:'Ambisens Lavande', size:'750 ml', img:U+'2023/08/lavande-web-3-500x500.png', txt:"Parfum d'intérieur grand format." },
    { id:'amb-refill-lav', b:'ambisens', sub:'Refill', name:'Ambisens Refill Lavender', size:'250 ml', img:U+'2023/08/11-500x500.png', txt:"Recharge 250 ml, senteur lavande." },
    { id:'amb-ergo-wf', b:'ambisens', sub:'Ergo', name:'Ambisens Ergo White Flowers', size:'250 ml', img:U+'2023/08/1-500x500.png', txt:"Format Ergo, senteur fleurs blanches." },
    { id:'kro-marine', b:'krosti', sub:'Nettoyant tableau', name:'Krosti Nettoyant tableau Marine', size:'300 ml', img:U+'2023/10/BM-2024-10-31-at-14.12.41-1-500x500.png', txt:"Nettoie le tableau de bord, senteur marine." },
    { id:'kro-pomme', b:'krosti', sub:'Nettoyant tableau', name:'Krosti Nettoyant tableau Pomme', size:'300 ml', img:U+'2023/08/PV-2024-10-31-at-14.12.41-1-500x500.png', txt:"Nettoie le tableau de bord, senteur pomme." },
    { id:'kro-newcar', b:'krosti', sub:'Nettoyant tableau', name:'Krosti Nettoyant tableau New Car', size:'300 ml', img:U+'2023/08/NC-Image-2024-10-31-at-14.12.41-1-500x500.png', txt:"Nettoie le tableau de bord, senteur voiture neuve." },
    { id:'kro-shampoing', b:'krosti', sub:'Shampoing', name:'Krosti Shampoing mousse', size:'10 kg', img:U+'2025/05/shamooing-krosti-500x500.png', txt:"Shampoing mousse en bidon pour le lavage." },
    { id:'sdidox', b:'sdidox', name:'Sdidox Dégrippant 6 fonctions', size:'Aérosol', img:U+'2024/02/SDIDOX--500x500.png', txt:"Dégrippant qui réunit six fonctions techniques." },
    { id:'gazal-400', b:'gazal', sub:'400 ml', name:'Gazal 400 ml', size:'400 ml', img:U+'2024/03/gazal-500x500.png', txt:"Cartouche de gaz butane à usage multiple." },
    { id:'gazal-600', b:'gazal', sub:'600 ml', name:'Gazal 600 ml', size:'600 ml', img:U+'2024/03/GAZAL-web-500x500.png', txt:"Cartouche de gaz butane à usage multiple, grand format." }
  ],
  photos: { usine:U+'2024/03/IMG_3145-scaled.jpg', salon:U+'2024/03/DSC04052-scaled.jpg', logoLight:U+'2023/06/logo-bottom.png' },
  contact: {
    adresse:"Micro zone industrielle de Koléa, BP 184, 10 route nationale 67, 42240 Koléa, Tipaza",
    tel:"+213 28 86 24 16", mail:"contact@cophyd.com", export:"d.export@cophyd.com",
    map:"https://maps.google.com/maps?q=COPHYD%20Kol%C3%A9a%20Tipaza&z=14&output=embed",
    insta:[["Ambisens","https://www.instagram.com/ambisens_officiel/"],["Krosti","https://www.instagram.com/krosti_officiel/"],["STOP","https://www.instagram.com/stop.cophyd/"]]
  },
  wilayas:["Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaïa","Biskra","Béchar","Blida","Bouira","Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou","Alger","Djelfa","Jijel","Sétif","Saïda","Skikda","Sidi Bel Abbès","Annaba","Guelma","Constantine","Médéa","Mostaganem","M'Sila","Mascara","Ouargla","Oran","El Bayadh","Illizi","Bordj Bou Arréridj","Boumerdès","El Tarf","Tindouf","Tissemsilt","El Oued","Khenchela","Souk Ahras","Tipaza","Mila","Aïn Defla","Naâma","Aïn Témouchent","Ghardaïa","Relizane","Timimoun","Bordj Badji Mokhtar","Ouled Djellal","Béni Abbès","In Salah","In Guezzam","Touggourt","Djanet","El M'Ghair","El Meniaa"]
};
