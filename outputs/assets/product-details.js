'use strict';
/* Cinco referencias fotográficas por colección. Sustituye las fotos por piezas propias cuando estén disponibles. */
const COLLECTIONS = {
  trofeos: {
    lead:'El triunfo merece una forma que permanezca.',
    note:'Copas, estatuillas y formatos para celebrar grandes logros.',
    photos:[
      [35119581,'Copa dorada con cintas','Copa dorada con cintas y medallas'],
      [6532365,'Trofeo de oro y plata','Trofeos dorado y plateado sobre una mesa oscura'],
      [29707905,'Colección de copas','Fila de trofeos dorados'],
      [7005047,'Trofeo de mesa','Trofeo dorado expuesto sobre una mesa'],
      [38729654,'Copa de fútbol','Trofeo de fútbol junto a un balón en el césped']
    ]
  },
  vidrio: {
    lead:'La luz también puede contar una historia.',
    note:'Ideas de placas y reconocimientos transparentes para nombres, fechas y mensajes.',
    photos:[
      [30689698,'Reconocimiento en vitrina','Reconocimiento expuesto dentro de una vitrina de vidrio'],
      [7005062,'Placa conmemorativa','Persona sosteniendo una placa de reconocimiento'],
      [7005619,'Premio de reconocimiento','Mujer sosteniendo un reconocimiento'],
      [7005751,'Distinción de empresa','Persona mostrando una distinción corporativa'],
      [7005628,'Entrega de reconocimiento','Entrega de un premio en un entorno corporativo']
    ]
  },
  medallas: {
    lead:'Cada meta tiene un peso propio.',
    note:'Referencias para torneos, carreras, ligas y celebraciones deportivas.',
    photos:[
      [6120397,'Medalla dorada','Medalla dorada sobre una superficie negra'],
      [1722396,'Podio completo','Medallas de oro, plata y bronce sobre una mesa'],
      [18618747,'Medallas de competición','Conjunto de medallas doradas de competición'],
      [21690899,'Medallas de maratón','Medallas preparadas para una maratón'],
      [36728007,'Serie deportiva','Medallas deportivas de oro, plata y bronce']
    ]
  },
  condecoraciones: {
    lead:'Un gesto solemne para una gran trayectoria.',
    note:'Insignias, medallas y distinciones para reconocer servicio y dedicación.',
    photos:[
      [7468067,'Distinciones sobre uniforme','Condecoraciones sobre un uniforme'],
      [17575279,'Medalla de honor','Persona con una medalla ceremonial'],
      [37391175,'Insignia ceremonial','Detalle de una medalla sobre uniforme'],
      [7468255,'Medallas de servicio','Medallas doradas en un uniforme azul'],
      [33552000,'Ceremonia de entrega','Entrega formal de medallas en una ceremonia']
    ]
  },
  resinas: {
    lead:'La forma se convierte en recuerdo.',
    note:'Explora acabados, volúmenes y procesos que inspiran piezas escultóricas.',
    photos:[
      [6532364,'Pieza escultórica','Trofeos dorados de formas escultóricas'],
      [7256575,'Trabajo en molde','Vertido de resina en un molde'],
      [2098604,'Figura de referencia','Figura escultórica de pie'],
      [7256199,'Acabado artístico','Persona mostrando una pieza de arte en resina'],
      [7256648,'Proceso artesanal','Personas elaborando piezas de resina']
    ]
  },
  personalizados: {
    lead:'No hay dos historias iguales.',
    note:'Un reconocimiento único nace del material, la idea y los detalles que eliges.',
    photos:[
      [33339857,'Trabajo a medida','Artesano trabajando metal en su taller'],
      [28399433,'Detalle de fabricación','Primer plano de metal trabajado a mano'],
      [37892682,'Forma personalizada','Artesano dando forma a una pieza de metal'],
      [37642007,'Oficio y precisión','Artesano en un taller de Ciudad de México'],
      [35078118,'Acabado manual','Artesano trabajando en un taller tradicional']
    ]
  },
  uv: {
    lead:'El detalle lleva la identidad más lejos.',
    note:'Referencias visuales de personalización, impresión y grabado de precisión.',
    photos:[
      [7254422,'Precisión de máquina','Detalle de un equipo de grabado CNC'],
      [30983996,'Grabado en proceso','Máquina láser trabajando una superficie'],
      [9550363,'Impresión de detalle','Primer plano de una máquina de impresión'],
      [36522026,'Equipo de taller','Máquina CNC en un entorno industrial'],
      [39013539,'Proceso de corte','Máquina industrial de corte láser en funcionamiento']
    ]
  },
  fotograbado: {
    lead:'Una imagen que se puede conservar.',
    note:'Texturas, retratos y detalles visuales llevados a una pieza conmemorativa.',
    photos:[
      [10824759,'Trabajo sobre metal','Persona trabajando una pieza metálica'],
      [38030790,'Grabado de precisión','Láser grabando una superficie de madera'],
      [6654025,'Detalle artesanal','Persona tallando una superficie de madera'],
      [6016970,'Memoria grabada','Emblema grabado en una placa conmemorativa'],
      [13061427,'Tipografía tallada','Detalle de letras grabadas en una superficie']
    ]
  }
};

const LAYOUTS = {
  trofeos:{id:'orbit',instruction:'Gira el anillo para recorrer la colección y pulsa cualquier pieza para ver sus detalles.'},
  vidrio:{id:'grid-flow',instruction:'Las referencias avanzan de izquierda a derecha y continúan en la fila inferior.'},
  medallas:{id:'rail',instruction:'Desliza la banda horizontal para recorrer cada medalla y abrir su ficha.'},
  condecoraciones:{id:'alternating',instruction:'Una secuencia editorial alterna cada distinción con su información.'},
  resinas:{id:'fan',instruction:'Las piezas se presentan como un abanico de formas y acabados superpuestos.'},
  personalizados:{id:'spotlight',instruction:'Una pieza protagonista guía la mirada y las demás completan el taller.'},
  uv:{id:'precision',instruction:'Una retícula técnica combina una vista principal con detalles de precisión.'},
  fotograbado:{id:'slices',instruction:'Los paneles verticales revelan distintas texturas y técnicas de grabado.'}
};

const collectionId = document.body.dataset.product;
const collection = COLLECTIONS[collectionId];
const product = PRODUCTS.find(item => item.id === collectionId);
const layout = LAYOUTS[collectionId];
const detailRoot = document.getElementById('productDetail');

if (collection && product && layout && detailRoot) {
  const imageUrl = (id, width = 1000) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
  const sourceUrl = id => `https://www.pexels.com/photo/${id}/`;
  const itemDescription = caption => `${caption} es una referencia visual que podemos adaptar en tamaño, materiales, colores y personalización. Consulta cantidades, acabados y tiempos para tu evento.`;
  const picture = ([id, caption, alt]) => `<figure class="collection-photo collection-featured">
    <img src="${imageUrl(id,1400)}" width="1400" height="1500" fetchpriority="high" decoding="async" alt="${escapeHtml(alt)}">
    <figcaption><span>${escapeHtml(caption)}</span><a href="${sourceUrl(id)}" target="_blank" rel="noopener noreferrer">Foto de ejemplo · Pexels ↗</a></figcaption>
  </figure>`;
  const card = ([id, caption, alt], index, extra = '') => `<article class="product-shot-card ${extra}" style="--i:${index}">
    <button class="product-shot" type="button" data-item="${index}" aria-haspopup="dialog" aria-label="Ver detalles de ${escapeHtml(caption)}">
      <img src="${imageUrl(id)}" width="1000" height="1250" loading="lazy" decoding="async" alt="${escapeHtml(alt)}">
      <span class="product-shot-action">Ver detalles ↗</span>
    </button>
    <div class="product-shot-meta"><h3>${escapeHtml(caption)}</h3><p>${escapeHtml(product.name)}</p></div>
  </article>`;
  const cards = collection.photos.map((entry,index) => card(entry,index)).join('');
  const arrow = direction => `<button class="collection-carousel-arrow" type="button" data-direction="${direction}" aria-label="${direction < 0 ? 'Producto anterior' : 'Producto siguiente'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${direction < 0 ? 'M19 12H5m7 7-7-7 7-7' : 'M5 12h14m-7-7 7 7-7 7'}"/></svg></button>`;

  function galleryMarkup() {
    if (layout.id === 'orbit') return `<div class="collection-carousel" role="region" aria-roledescription="carrusel" aria-label="Cinco productos de ${escapeHtml(product.name.toLowerCase())}">
      <div class="collection-carousel-stage" id="collectionCarouselStage" tabindex="0" aria-label="Usa las flechas del teclado o desliza para girar la colección"><div class="collection-carousel-wheel">${collection.photos.map((entry,index)=>card(entry,index,'collection-carousel-slide')).join('')}</div></div>
      <div class="collection-carousel-controls">${arrow(-1)}<div class="collection-carousel-info" aria-live="polite" aria-atomic="true"><p id="carouselCaption"></p><span id="carouselCounter"></span></div>${arrow(1)}</div>
      <div class="collection-carousel-dots" role="group" aria-label="Elegir producto">${collection.photos.map((entry,index)=>`<button type="button" data-go="${index}" aria-label="Ver ${escapeHtml(entry[1])}" aria-pressed="false"><span></span></button>`).join('')}</div>
    </div>`;
    if (layout.id === 'spotlight') return `<div class="product-layout layout-spotlight"><div class="spotlight-main">${card(collection.photos[0],0)}</div><div class="spotlight-thumbs">${collection.photos.slice(1).map((entry,index)=>card(entry,index+1)).join('')}</div></div>`;
    const dragAttributes = ['rail','fan'].includes(layout.id) ? 'data-drag-scroll tabindex="0" aria-label="Galería deslizable; arrastra hacia la derecha o izquierda"' : '';
    return `<div class="product-layout layout-${layout.id}" ${dragAttributes}>${cards}</div>`;
  }

  const currentIndex = PRODUCTS.findIndex(item => item.id === collectionId);
  const previous = PRODUCTS[(currentIndex + PRODUCTS.length - 1) % PRODUCTS.length];
  const next = PRODUCTS[(currentIndex + 1) % PRODUCTS.length];
  document.title = `${product.name} — Mundo del Trofeo`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', `${product.name}: cinco productos de referencia para cotizar en Mundo del Trofeo Fabricantes, Latacunga.`);
  detailRoot.innerHTML = `
    <section class="collection-hero" aria-labelledby="collectionTitle"><div class="collection-hero-copy"><a class="collection-back" href="productos.html#catalogo">← Volver a productos</a><h1 id="collectionTitle">${escapeHtml(product.name)}<span class="collection-period">.</span></h1><p class="collection-lead">${escapeHtml(collection.lead)}</p><p class="collection-description">${escapeHtml(collection.note)}</p><a class="button collection-quote" href="${wa(`Hola, me interesa cotizar ${product.name.toLowerCase()}. ¿Me pueden ayudar?`)}" target="_blank" rel="noopener noreferrer">Cotizar ${escapeHtml(product.name.toLowerCase())} ↗</a><span class="collection-count">Cinco productos para explorar</span></div>${picture(collection.photos[0])}</section>
    <section class="collection-gallery section layout-section-${layout.id}" aria-labelledby="galleryTitle"><div class="collection-gallery-intro"><h2 id="galleryTitle">Explora los<br><span class="display-serif accent">detalles.</span></h2><p>${escapeHtml(layout.instruction)}</p></div>${galleryMarkup()}</section>
    <section class="collection-closer"><div><h2>Hagamos que<br>se recuerde.</h2><p>Cuéntanos la ocasión, la cantidad y la idea que tienes en mente.</p></div><a class="button" href="${wa(`Hola, quiero cotizar ${product.name.toLowerCase()}. Me gustaría conocer opciones y precios.`)}" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp ↗</a></section>
    <nav class="collection-next" aria-label="Explorar otras colecciones"><a href="${PRODUCT_PAGES[previous.id]}">← ${escapeHtml(previous.name)}</a><a href="productos.html#catalogo">Todas las colecciones</a><a href="${PRODUCT_PAGES[next.id]}">${escapeHtml(next.name)} →</a></nav>
    <dialog class="product-detail-dialog" id="productDetailDialog" aria-labelledby="detailProductTitle"><button class="product-dialog-close" type="button" aria-label="Cerrar detalles">×</button><div class="product-dialog-media"><img id="detailProductImage" alt=""></div><div class="product-dialog-copy"><p class="product-dialog-category" id="detailProductCategory"></p><h2 id="detailProductTitle"></h2><p id="detailProductDescription"></p><ul><li>Personalizable en medidas y acabados</li><li>Disponible para pedidos individuales o por cantidad</li><li>Cotización directa por WhatsApp</li></ul><a class="button" id="detailProductQuote" href="#" target="_blank" rel="noopener noreferrer">Cotizar este producto ↗</a><a class="product-dialog-credit" id="detailProductCredit" href="#" target="_blank" rel="noopener noreferrer">Ver fotografía de referencia en Pexels ↗</a></div></dialog>
  `;

  if (layout.id === 'orbit') {
    const carousel = detailRoot.querySelector('.collection-carousel');
    const stage = detailRoot.querySelector('#collectionCarouselStage');
    const wheel = detailRoot.querySelector('.collection-carousel-wheel');
    const slides = [...detailRoot.querySelectorAll('.collection-carousel-slide')];
    const dots = [...detailRoot.querySelectorAll('[data-go]')];
    let activeSlide = 0, turns = 0, touchStart = null;
    const showSlide = (index,direction=0) => {
      const previousSlide = activeSlide;
      activeSlide = (index + slides.length) % slides.length;
      const forward = (activeSlide - previousSlide + slides.length) % slides.length;
      turns += direction || (forward <= slides.length / 2 ? forward : forward - slides.length);
      wheel.style.setProperty('--rotation',`${-turns*(360/slides.length)}deg`);
      slides.forEach((slide,slideIndex)=>{const offset=(slideIndex-activeSlide+slides.length)%slides.length;slide.style.setProperty('--index',slideIndex);slide.setAttribute('aria-current',String(offset===0));slide.querySelector('.product-shot').tabIndex=offset===0?0:-1;});
      dots.forEach((dot,dotIndex)=>dot.setAttribute('aria-pressed',String(dotIndex===activeSlide)));
      detailRoot.querySelector('#carouselCaption').textContent=collection.photos[activeSlide][1];
      detailRoot.querySelector('#carouselCounter').textContent=`${activeSlide+1} de ${slides.length}`;
    };
    showSlide(0); carousel.classList.add('is-enhanced'); requestAnimationFrame(()=>carousel.classList.add('is-ready'));
    carousel.querySelectorAll('[data-direction]').forEach(button=>button.addEventListener('click',()=>{const direction=Number(button.dataset.direction);showSlide(activeSlide+direction,direction);}));
    dots.forEach(dot=>dot.addEventListener('click',()=>showSlide(Number(dot.dataset.go))));
    stage.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();if(event.key==='ArrowRight')showSlide(activeSlide+1,1);if(event.key==='ArrowLeft')showSlide(activeSlide-1,-1);if(event.key==='Home')showSlide(0);if(event.key==='End')showSlide(slides.length-1);});
    stage.addEventListener('touchstart',event=>{touchStart={x:event.touches[0].clientX,y:event.touches[0].clientY};},{passive:true});
    stage.addEventListener('touchend',event=>{if(!touchStart)return;const dx=event.changedTouches[0].clientX-touchStart.x,dy=event.changedTouches[0].clientY-touchStart.y;touchStart=null;if(Math.abs(dx)<45||Math.abs(dx)<Math.abs(dy))return;const direction=dx<0?1:-1;showSlide(activeSlide+direction,direction);},{passive:true});
    let mouseDrag=null,suppressOrbitClick=false;
    stage.addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse'||event.button!==0)return;mouseDrag={x:event.clientX,y:event.clientY};suppressOrbitClick=false;stage.setPointerCapture(event.pointerId);stage.classList.add('is-dragging');});
    stage.addEventListener('pointermove',event=>{if(!mouseDrag)return;if(Math.abs(event.clientX-mouseDrag.x)>8)suppressOrbitClick=true;});
    stage.addEventListener('pointerup',event=>{if(!mouseDrag)return;const dx=event.clientX-mouseDrag.x,dy=event.clientY-mouseDrag.y;mouseDrag=null;stage.classList.remove('is-dragging');if(Math.abs(dx)>=55&&Math.abs(dx)>Math.abs(dy)){const direction=dx<0?1:-1;showSlide(activeSlide+direction,direction);}});
    stage.addEventListener('click',event=>{if(!suppressOrbitClick)return;event.preventDefault();event.stopPropagation();suppressOrbitClick=false;},true);
  }

  detailRoot.querySelectorAll('[data-drag-scroll]').forEach(scroller=>{
    let drag=null,suppressClick=false;
    scroller.addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse'||event.button!==0||scroller.scrollWidth<=scroller.clientWidth+2)return;drag={x:event.clientX,scrollLeft:scroller.scrollLeft};suppressClick=false;scroller.setPointerCapture(event.pointerId);scroller.classList.add('is-dragging');});
    scroller.addEventListener('pointermove',event=>{if(!drag)return;const distance=event.clientX-drag.x;if(Math.abs(distance)>6)suppressClick=true;scroller.scrollLeft=drag.scrollLeft-distance;});
    const finishDrag=()=>{drag=null;scroller.classList.remove('is-dragging');};
    scroller.addEventListener('pointerup',finishDrag);
    scroller.addEventListener('pointercancel',finishDrag);
    scroller.addEventListener('click',event=>{if(!suppressClick)return;event.preventDefault();event.stopPropagation();suppressClick=false;},true);
  });

  const dialog = detailRoot.querySelector('#productDetailDialog');
  const closeDialog = () => dialog.close();
  detailRoot.querySelector('.product-dialog-close').addEventListener('click',closeDialog);
  dialog.addEventListener('click',event=>{if(event.target===dialog)closeDialog();});
  dialog.addEventListener('close',()=>document.body.classList.remove('locked'));
  let detailTrigger = null;
  detailRoot.querySelectorAll('[data-item]').forEach(button=>button.addEventListener('click',()=>{
    const index=Number(button.dataset.item),[id,caption,alt]=collection.photos[index],reference=imageUrl(id,1400);
    detailRoot.querySelector('#detailProductImage').src=reference;
    detailRoot.querySelector('#detailProductImage').alt=alt;
    detailRoot.querySelector('#detailProductCategory').textContent=product.name;
    detailRoot.querySelector('#detailProductTitle').textContent=caption;
    detailRoot.querySelector('#detailProductDescription').textContent=itemDescription(caption);
    detailRoot.querySelector('#detailProductCredit').href=sourceUrl(id);
    detailRoot.querySelector('#detailProductQuote').href=wa(`Hola, quiero cotizar el producto “${caption}” de la categoría ${product.name}.\n\nImagen de referencia: ${reference}\n\n¿Me pueden indicar opciones, precio y tiempo de entrega?`);
    detailTrigger=button; document.body.classList.add('locked'); dialog.showModal();
  }));
  dialog.addEventListener('close',()=>detailTrigger?.focus());
}
