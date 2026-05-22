(function () {
  'use strict';

  // ==========================================================
  // SIRVIENDO AHORA — Editar este objeto cuando rota el café.
  // La barra superior se actualiza automáticamente al recargar.
  // El HTML estático tiene los mismos valores; mantenerlos coherentes.
  // ==========================================================

  // ========================================
  // RATING DE GOOGLE — ACTUALIZAR MANUALMENTE
  // Ir a Google Maps > Batata Cofi > copiar rating y cantidad de reseñas
  // Última actualización: 2026-05-08
  // ========================================
  var GOOGLE_RATING = 4.8;
  var GOOGLE_REVIEW_COUNT = 277;

  var SERVING_NOW = {
    espresso: {
      label: 'En espresso',
      origin: 'Colombia, Caldas',
      process: 'Lavado',
      variety: 'Caturra, Castillo, Colombia'
    },
    filtrado: {
      label: 'En filtrado',
      origin: 'El Salvador',
      process: 'Natural anaeróbico',
      variety: 'Pacamara'
    }
  };

  // ==========================================================
  // PANTRY — Productos de la despensa.
  // Editar este array cuando cambia disponibilidad o se agrega.
  // available: false → sale con badge "Próximamente" y opacidad reducida.
  // ==========================================================

  var PANTRY = [
    { name: 'Café en granos',  desc: 'El mismo que tomás acá. Tostado de la semana.',  image: 'img/pantry/cafe.jpg?v=25b',      available: true  },
    { name: 'Miel orgánica',   desc: 'De productores familiares. Pura, sin filtrar.',  image: 'img/pantry/miel.jpg?v=25b',      available: true  },
    { name: 'Aceite de oliva', desc: 'De fincas de Valle de Uno. Extra virgen.',       image: 'img/pantry/aceite.jpg?v=25b',    available: true  },
    { name: 'Mermelada casera',desc: 'Hecha en casa con frutas de estación.',          image: 'img/logo.png', available: false, placeholder: true },
    { name: 'Granola',         desc: 'La que servimos en el yogurt. Hecha por nosotros.', image: 'img/logo.png', available: false, placeholder: true }
  ];

  // ==========================================================
  // TESTIMONIALS — Reseñas reales o placeholder.
  // Reemplazar con reseñas reales de Google cuando estén.
  // ==========================================================

  var TESTIMONIALS = [
    {
      quote: 'Fuimos hoy a merendar, el lugar es lindo y la comida muy rica. La atención es buena también. Lo que mas nos gustó fue el latte patagónico y el suave (el almíbar le daba ese toque más dulce muy rico). Y de comida el tostado es un 10/10, el resto de cosas también ricas y se veían bien. Lo único que quizás es medio chico el lugar, no había espacio cuando llegamos pero eso demuestra que se come y pasa bien. Recomendado si querés tomar una rica merienda en un lindo lugar.',
      author: 'mica.c',
      source: 'Google'
    },
    {
      quote: 'Hermoso lugar. Merendé con una amiga y su mascota. Nos trajeron agua para la perrita. Super atentos y buenísima atención. Además que todo muy rico. El café un 10.',
      author: 'Mariel Cardoso',
      source: 'Google'
    },
    {
      quote: 'El mejor café de Avellaneda. Todo es muy rico y es hecho con mucho amor. Siempre que ando por la zona paso, 100% recomendado.',
      author: 'Martina Panetta',
      source: 'Google'
    }
  ];

  // ==========================================================
  // INSTAGRAM FEED — Editar este array para actualizar las fotos.
  // Subir cada foto a img/instagram/ y poner el path acá.
  // ==========================================================

  var INSTAGRAM_FEED = [
    { image: 'img/instagram/ig-1.jpg',  alt: 'Cuadro y plantas en el interior del local'   },
    { image: 'img/instagram/ig-2.jpg',  alt: 'Cata de café con grupo de personas'          },
    { image: 'img/instagram/ig-3.jpg',  alt: 'Preparando sándwiches en la cocina'          },
    { image: 'img/instagram/ig-4.jpg',  alt: 'Filmando en la vereda del local'             },
    { image: 'img/instagram/ig-5.jpg',  alt: 'DJ con controladora en la vereda'            },
    { image: 'img/instagram/ig-6.jpg',  alt: 'DJs musicalizando en la puerta del local'    },
    { image: 'img/instagram/ig-7.jpg',  alt: 'Amigos charlando en la vereda'               },
    { image: 'img/instagram/ig-9.jpg',  alt: 'Notas de cata sobre la barra'                },
    { image: 'img/instagram/ig-10.jpg', alt: 'Máquina de espresso con stickers'            }
  ];

  // ==========================================================
  var PRODUCT_IMAGES = {
    // Café
    'Espresso':                        'img/menu/espresso.jpg',
    'Espresso largo':                  'img/menu/espresso-largo.jpg',
    'Cortado':                         'img/menu/cortado.jpg',
    'Filtrado':                        'img/menu/filtrado.jpg?v=25',
    // Especiales
    'Dame números':                    'img/menu/dame-numeros.jpg',
    'Cappusotto':                      'img/menu/cappusotto.jpg',
    'Cappu marplatense':               'img/menu/cappu-marplatense.jpg',
    'Suaave':                          'img/menu/suaave.jpg',
    'Americano especiado':             'img/menu/americano-especiado.jpg',
    // Desayuno
    'Tostadas':                        'img/productos/tostadas.jpg',
    'Yogurt':                          'img/productos/yogurt.jpg',
    'Pancakes':                        'img/productos/pancakes.jpg',
    // Sándwiches
    'Sandwich bondio':                 'img/productos/sandwich-bondio.jpg',
    'Tostado':                         'img/productos/tostado-lomito-queso.jpg',
    'Chipa prensado':                  'img/productos/chipa-prensado.jpg',
    // Tostones
    'Tostón de palta':                 'img/productos/toston-de-palta.jpg',
    'Tostón de berenjena':             'img/productos/toston-de-berenjenas.jpg',
    'Tostón de perso':                 'img/productos/toston-de-perso.jpg',
  };

  var PRODUCT_IMAGES_LOWER = {};

  function rebuildImageLookup() {
    PRODUCT_IMAGES_LOWER = {};
    for (var k in PRODUCT_IMAGES) {
      if (Object.prototype.hasOwnProperty.call(PRODUCT_IMAGES, k)) {
        PRODUCT_IMAGES_LOWER[k.toLowerCase()] = { name: k, image: PRODUCT_IMAGES[k] };
      }
    }
  }
  rebuildImageLookup();

  function lookupProductImage(name) {
    if (!name) return null;
    return PRODUCT_IMAGES_LOWER[name.toLowerCase()] || null;
  }

  function loadMenuImages() {
    if (typeof fetch !== 'function') return;
    fetch('menu-images.json')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (manifest) {
        if (!manifest) return;
        for (var key in manifest) {
          if (Object.prototype.hasOwnProperty.call(manifest, key)) {
            PRODUCT_IMAGES[key] = manifest[key];
          }
        }
        rebuildImageLookup();
        var active = document.querySelector('.tab--active');
        if (active) switchTab(active.dataset.tab);
      })
      .catch(function () {});
  }

  // ==========================================================
  // PASTELERÍA — Lista completa de productos a mostrar en la grid.
  // El orden acá es el que sale en pantalla.
  // ==========================================================

  var PASTRY_DESCRIPTIONS = {
    'Alfa nevado':          'Alfajor mar del plata, tapas de limón, relleno de dulce de leche, corazón de pasta de dátiles y cacao, cobertura de merengue y azúcar impalpable.',
    'Alfajor de almendras': 'Tapa de almendras, relleno de dulce de leche.',
    'Alfranui':             'Tapas de cacao, crema bariloche, crocante de choco blanco, reducción de frambuesas, cobertura parcial de chocolate.',
    'Budín de banana':      'Con nueces y salsa de dulce de leche por encima.',
    'Chipá':                'Sin gluten. Quesos: reggianito, provolone y gouda.',
    'Cookie de frambuesa':  'Cookie de frambuesa y choco blanco.',
    'Cookie de pistacho':   'Cookie de pistacho y naranja.',
    'Cookie vegana':        'De mantequilla de maní con escamas de sal.',
    'Medialuna':            'De Matenca. Argentina y gigante.',
    'Tita':                 'Galletita de limón, rellena de crema de limón, delicado baño de chocolate.',
    'Cookie de choco':      'Cacao y chocolate, nada más. Ingredientes premium posta. Sale calentita.',
    'Budín de limón':       'Clásico con amapolas y glaseado. Esponjoso, delicioso.'
  };

  var PASTRY_LIST = [
    { image: 'img/pasteleria/alfa-nevado.jpg',            caption: 'Alfa nevado' },
    { image: 'img/pasteleria/alfajor-de-almendras-2.jpg', caption: 'Alfajor de almendras' },
    { image: 'img/pasteleria/alfranui.jpg',               caption: 'Alfranui' },
    { image: 'img/pasteleria/budin-de-banana.jpg',        caption: 'Budín de banana' },
    { image: 'img/pasteleria/chipa.jpg',                  caption: 'Chipá' },
    { image: 'img/pasteleria/cookie-frambuesa.jpg',       caption: 'Cookie de frambuesa' },
    { image: 'img/pasteleria/cookie-pistacho.jpg',        caption: 'Cookie de pistacho' },
    { image: 'img/pasteleria/cookie-vegana.jpg',          caption: 'Cookie vegana' },
    { image: 'img/pasteleria/cookie-choco.jpg',           caption: 'Cookie de choco' },
    { image: 'img/pasteleria/budin-de-limon.jpg',         caption: 'Budín de limón' },
    { image: 'img/pasteleria/medialuna.jpg',              caption: 'Medialuna' },
    { image: 'img/pasteleria/tita.jpg',                   caption: 'Tita' }
  ];

  var TORTAS_LIST = [
    { image: 'img/tortas/torta-batata-1.jpg',       caption: 'Torta batata' },
    { image: 'img/tortas/marquise-2.jpg',            caption: 'Marquise' },
    { image: 'img/tortas/key-lime-2.jpg',            caption: 'Key lime' },
    { image: 'img/tortas/cheesecake.jpg',            caption: 'Cheesecake' },
    { image: 'img/tortas/torta-maracuya-1.jpg',      caption: 'Torta maracuyá' },
    { image: 'img/tortas/torta-mama-2.jpg',           caption: 'Torta mamá' },
    { image: 'img/tortas/torta-vasca-frutal.jpg',    caption: 'Torta vasca frutal' },
    { image: 'img/tortas/torta-arandanos-limon.jpg', caption: 'Torta arándanos y limón' }
  ];

  // ==========================================================
  // COMBOS POR FRANJA — v23
  // Cambia título, copy, cards y lista según la hora del usuario.
  // Usa imágenes EXISTENTES: ver mapping abajo.
  // Productos sin precio fijo → se muestran con CTA "Consultar".
  // ==========================================================

  var INSTAGRAM_URL = 'https://www.instagram.com/batata.cofi/';

  var COMBOS_BY_TIMESLOT = {
    manana: {
      label: 'Arrancá bien el día',
      title: 'Para empezar',
      sub: 'Combos de mañana — disponibles de martes a viernes hasta las 13:30.',
      cards: [
        {
          name: 'Latte + cookie',
          desc: 'Pistacho o frambuesa con choco blanco',
          price: '$8.000',
          image: 'img/menu/latte-y-cookie-pistacho-o-frambuesa.jpg'
        },
        {
          name: 'Latte + alfajor',
          desc: 'Alfajor de almendras',
          price: '$8.000',
          image: 'img/menu/latte-y-alfajor-de-almendras.jpg'
        },
        {
          name: 'Latte + chipa',
          desc: 'Chipa recién horneado',
          price: '$8.000',
          image: 'img/menu/latte-y-chipa.jpg'
        }
      ],
      restLabel: 'También de mañana',
      rest: [
        { name: 'Latte + tostadas con manteca y mermelada', price: '$9.900' },
        { name: 'Latte + tostado', price: '$12.300' }
      ]
    },

    mediodia: {
      label: 'La pausa que te merecés',
      title: 'Para el mediodía',
      sub: 'Sandwich + limonada + espresso largo o cortado. Hasta las 13:30.',
      cards: [
        {
          name: 'Sandwich bondio',
          desc: 'Brioche, ranch, bondiola, rúcula, danbo, pera + chips',
          price: '$19.000',
          image: 'img/menu/sandwich-bondio.jpg'
        },
        {
          name: 'Sandwich mortadela',
          desc: 'Masa madre, pesto, mortadela de pistachos, danbo + chips',
          price: '$16.500',
          image: 'img/menu/sandwich-mortadela.jpg'
        },
        {
          name: 'Sandwich veggie',
          desc: 'Brioche, muhammara, zucchini, rúcula, reggianito + chips',
          price: '$16.500',
          image: 'img/menu/sandwich-veggie-de-verano.jpg'
        }
      ],
      restLabel: 'También a esta hora',
      rest: [
        { name: 'Tostón de palta', price: '$7.000', desc: 'Masa madre, queso crema, palta, tomate cherry, oliva y semillas de sésamo', tag: 'Vegetariano' },
        { name: 'Tostón de perso', price: '$9.200', desc: 'Masa madre, queso crema, tomates contados, granola y oliva', tag: 'Vegetariano' }
      ]
    },

    tarde: {
      label: 'La tarde es nuestra',
      title: 'Sugerencias de tarde',
      sub: 'Los combos batateros son hasta las 13:30. A esta hora servimos esto, suelto. Consultá precio en el local.',
      cards: [
        {
          name: 'Cappu + torta del día',
          desc: 'La torta del día varía: consultá en mostrador',
          price: 'Consultar',
          consultar: true,
          image: 'img/tortas/torta-batata-1.jpg'
        },
        {
          name: 'Filtrado Geisha en V60',
          desc: 'Hoy: Perú Amazonas, lavado, Geisha',
          price: 'Consultar',
          consultar: true,
          image: 'img/menu/americano-especiado.jpg'
        },
        {
          name: 'Latte helado + cookie',
          desc: 'Suaave: latte frío con almíbar de lavanda + cookie',
          price: 'Consultar',
          consultar: true,
          image: 'img/menu/suaave.jpg'
        }
      ],
      restLabel: 'Otras combinaciones',
      rest: [
        { name: 'Tostón con queso crema y dulce', price: 'Consultar', consultar: true },
        { name: 'Té de especialidad + pastelería', price: 'Consultar', consultar: true }
      ]
    },

    'after-hours': {
      label: 'Estamos cerrados',
      title: 'Guardá esto para mañana',
      sub: 'Una muestra de lo que tenemos cuando abrimos. La carta completa está más abajo.',
      cards: [
        {
          name: 'Latte + cookie',
          desc: 'Combo de mañana — $8.000',
          price: '$8.000',
          image: 'img/menu/latte-y-cookie-pistacho-o-frambuesa.jpg'
        },
        {
          name: 'Sandwich bondio',
          desc: 'Combo de almuerzo con limonada + espresso',
          price: '$19.000',
          image: 'img/menu/sandwich-bondio.jpg'
        },
        {
          name: 'Filtrado del día',
          desc: 'Café de origen en V60',
          price: 'Consultar',
          consultar: true,
          image: 'img/menu/filtrado.jpg?v=25b'
        }
      ],
      restLabel: null,
      rest: null,
      showHoursCta: true
    }
  };

  // ==========================================================
  // Menu data — Carta Abril 2026
  // ==========================================================

  var MENU = {
    cafe: [
      { name: 'Espresso', desc: 'Solo o doble', price: 3800 },
      { name: 'Espresso doble', desc: 'Doble shot', price: 5000 },
      { name: 'Espresso largo', desc: 'Más agua, misma base', price: 3800 },
      { name: 'Americano', desc: 'Café negro suave', price: 5000, variants: [
        { label: 'Americano mediano', image: 'img/menu/americano-mediano.jpg' },
        { label: 'Americano grande', image: 'img/menu/americano-grande.jpg' }
      ]},
      { name: 'Filtrado', desc: 'Método de goteo', price: 7500 },
      { name: 'Cortado', desc: 'Espresso con un toque de leche', price: 4600 },
      { name: 'Cappu', desc: 'Cappuccino simple', price: 5000, variants: [
        { label: 'Cappu', image: 'img/menu/cappu.jpg' },
        { label: 'Cappu doble', image: 'img/menu/cappu-doble.jpg' }
      ]},
      { name: 'Cappu doble', desc: 'Cappuccino doble', price: 6000 },
      { name: 'Flat white', desc: 'Doble ristretto con leche emulsionada', price: 5800 },
      { name: 'Latte', desc: 'Café con leche suave', price: 5600 },
      { name: 'Té', desc: 'Consultar variedad', price: 5000 }
    ],
    especiales: [
      { name: 'Dame números', desc: 'Cappu doble con base de batata horneada, chocolate, cardamomo', price: 7000 },
      { name: 'Cappusotto', desc: 'Cappu doble, pasta de frutos secos, choco blanco, especias, ralladura de naranja', price: 7100 },
      { name: 'Choco caliente', desc: 'Chocolate, batata, cardamomo, leche emulsionada', price: 6000 },
      { name: 'Cappu marplatense', desc: 'Choco, dulce de leche, mantequilla de maní, sal marina', price: 6300 },
      { name: 'Suaave', desc: 'Latte frío, almíbar de lavanda — se puede pedir frío', price: 6700 },
      { name: 'Americano especiado', desc: 'Agua de pimienta rosa y coriandro, doble shot de café', price: 5300 }
    ],
    desayuno: [
      { name: 'Tostadas', desc: '2 rodajas de pan de molde, queso y mermelada casera', price: 7000 },
      { name: 'Tostada saludable', desc: 'Pan de molde, pasta de maní, rodajas de banana y miel', price: 7500 },
      { name: 'Yogurt', desc: 'Yogur natural, granola casera, miel y frutas de estación', price: 9200 },
      { name: 'Pancakes', desc: 'Dos pancakes de almendras con pasta de maní, miel, frutillas, banana y granola', price: 11000, tag: 'Sin gluten' }
    ],
    sandwiches: [
      { name: 'Sandwich bondio', desc: 'Pan brioche, salsa ranch, ambre de bondiola, rúcula, queso danbo y pera. Con chips de batatas', price: 14000 },
      { name: 'Sandwich mortadela', desc: 'Pan de masa madre con pesto, mortadela de pistachos, queso danbo y tomates contados. Con chips de batatas', price: 12500 },
      { name: 'Sandwich veggie de verano', desc: 'Pan brioche, salsa de morrones asados, zucchini asado, rúcula, queso reggianito rallado. Con chips de batatas', price: 11500, tag: 'Vegetariano' },
      { name: 'Tostado', desc: 'Pan blanco de molde, lomito y queso o capresse', price: 8500, tag: 'Vegetariano' },
      { name: 'Medialuna rellena', desc: 'Rellena de queso danbo y lomito o capresse. Sale calentita', price: 9500, tag: 'Vegetariano' },
      { name: 'Chipa prensado', desc: 'Nuestro chipa relleno de lomito y queso o capresse. Sale tostado y calentito', price: 8000, tag: 'Sin gluten' }
    ],
    tostones: [
      { name: 'Tostón de palta', desc: 'Masa madre, queso crema, palta, tomate cherry, oliva y semillas de sésamo', price: 10000, tag: 'Vegetariano' },
      { name: 'Tostón de berenjena', desc: 'Masa madre, yogur natural, berenjenas en escabeche, tomates cherry contados, granola y miel', price: 7500, tag: 'Vegetariano' },
      { name: 'Tostón de perso', desc: 'Masa madre, queso crema, tomates contados, granola y oliva', price: 7000, tag: 'Vegetariano' }
    ],
    bebidas: [
      { name: 'Pomelada', desc: 'Jugo de pomelo, miel, jengibre, pimienta rosa y almíbar de manzanilla', price: 5000 },
      { name: 'Mandarinada', desc: 'Jugo de mandarina, limón, cardamomo y almíbar de banana', price: 5000 },
      { name: 'Exprimido de naranja', desc: 'Fresco y natural', price: 4500 }
    ],
    combos: {
      horario: 'Martes a viernes, 8:30 a 13:30',
      desayuno: [
        { name: 'Latte + cookie pistacho o frambuesa', desc: 'Café con leche 1 shot o americano', price: 8000 },
        { name: 'Latte + tostadas', desc: 'Café con leche 1 shot o americano + tostadas con mermelada casera y queso', price: 9900 },
        { name: 'Latte + tostado', desc: 'Café con leche 1 shot o americano + tostado', price: 12300 },
        { name: 'Latte + chipa', desc: 'Café con leche 1 shot o americano + chipa', price: 8000 },
        { name: 'Latte + alfajor de almendras', desc: 'Café con leche 1 shot o americano + alfajor de almendras', price: 8000 }
      ],
      almuerzo: [
        { name: 'Sandwich bondio + limonada + espresso largo o cortado', desc: 'Combo almuerzo completo', price: 19000 },
        { name: 'Sandwich mortadela + limonada + espresso largo o cortado', desc: 'Combo almuerzo completo', price: 16500 },
        { name: 'Sandwich veggie + limonada + espresso largo o cortado', desc: 'Combo almuerzo completo', price: 16500 }
      ]
    }
  };

  // ==========================================================
  // Schedule (single source of truth)
  // ==========================================================

  // 510 = 8:30 (8*60+30); 1170 = 19:30; 600 = 10:00; 840 = 14:00; 960 = 16:00.
  var SCHEDULE = {
    monday:    [],
    tuesday:   [{open: 510, close: 1170}],
    wednesday: [{open: 510, close: 1170}],
    thursday:  [{open: 510, close: 1170}],
    friday:    [{open: 510, close: 1170}],
    saturday:  [{open: 600, close: 840}, {open: 960, close: 1170}],
    sunday:    [{open: 960, close: 1170}]
  };

  var WEEKDAYS_TUVW = ['tuesday', 'wednesday', 'thursday', 'friday'];
  var DAY_ORDER = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  var DAY_NAMES_ES = {
    sunday: 'el domingo', monday: 'el lunes', tuesday: 'el martes',
    wednesday: 'el miércoles', thursday: 'el jueves', friday: 'el viernes',
    saturday: 'el sábado'
  };

  // ==========================================================
  // Helpers
  // ==========================================================

  function formatPrice(n) {
    var s = String(n);
    var result = '';
    for (var i = s.length - 1, count = 0; i >= 0; i--, count++) {
      if (count > 0 && count % 3 === 0) result = '.' + result;
      result = s.charAt(i) + result;
    }
    return '$' + result;
  }

  function formatTime(minutes) {
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    return h + ':' + (m < 10 ? '0' + m : m);
  }

  function getBuenosAiresTime() {
    var now = new Date();
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Argentina/Buenos_Aires',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      weekday: 'long'
    }).formatToParts(now);

    var weekday = '';
    var hour = 0;
    var minute = 0;
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (p.type === 'weekday') weekday = p.value.toLowerCase();
      else if (p.type === 'hour') hour = parseInt(p.value, 10) % 24;
      else if (p.type === 'minute') minute = parseInt(p.value, 10);
    }

    return { weekday: weekday, hour: hour, minute: minute, timeInMinutes: hour * 60 + minute };
  }

  function tagClass(tag) {
    var map = {
      'Vegetariano': 'vegetariano',
      'Sin gluten': 'sin-gluten',
      'Sin lácteos': 'sin-lacteos'
    };
    return map[tag] || '';
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ==========================================================
  // Store status
  // ==========================================================

  function getStoreStatus() {
    var t = getBuenosAiresTime();
    var slots = SCHEDULE[t.weekday] || [];

    var open = false;
    for (var i = 0; i < slots.length; i++) {
      if (t.timeInMinutes >= slots[i].open && t.timeInMinutes < slots[i].close) {
        open = true;
        break;
      }
    }
    if (open) return { open: true, message: 'Estamos abiertos' };

    var laterToday = null;
    for (var j = 0; j < slots.length; j++) {
      if (slots[j].open > t.timeInMinutes) { laterToday = slots[j]; break; }
    }
    if (laterToday) {
      return { open: false, message: 'Abrimos ' + formatTime(laterToday.open) };
    }

    var todayIndex = DAY_ORDER.indexOf(t.weekday);
    for (var k = 1; k <= 7; k++) {
      var nextDay = DAY_ORDER[(todayIndex + k) % 7];
      var nextSlots = SCHEDULE[nextDay];
      if (nextSlots && nextSlots.length > 0) {
        var timeStr = formatTime(nextSlots[0].open);
        return {
          open: false,
          message: k === 1 ? 'Abrimos mañana ' + timeStr : 'Abrimos ' + DAY_NAMES_ES[nextDay] + ' ' + timeStr
        };
      }
    }
    return { open: false, message: 'Consultá horarios en Instagram' };
  }

  function updateStoreStatus() {
    var status = getStoreStatus();
    var indicator = document.getElementById('store-status');
    if (!indicator) return;
    indicator.classList.toggle('is-open', status.open);
    indicator.classList.toggle('is-closed', !status.open);
    var msgEl = indicator.querySelector('.store-status__message');
    if (msgEl) msgEl.textContent = status.message;

    var dot = document.getElementById('status-dot');
    if (dot) {
      dot.classList.toggle('status-dot--open', status.open);
      dot.classList.toggle('status-dot--closed', !status.open);
    }
  }

  // ==========================================================
  // Hero message + Banner
  // ==========================================================

  function heroMessage(t) {
    var wd = t.weekday, m = t.timeInMinutes;
    if (wd === 'monday') return 'Hoy descansamos';
    if (WEEKDAYS_TUVW.indexOf(wd) !== -1) {
      if (m < 510)  return 'Abrimos a las 8:30';
      if (m < 720)  return 'Buen día';
      if (m < 1170) return 'Buenas tardes';
      return 'Ya cerramos';
    }
    if (wd === 'saturday') {
      if (m < 600)  return 'Abrimos a las 10';
      if (m < 840)  return 'Buen día';
      if (m < 960)  return 'Volvemos a las 16';
      if (m < 1170) return 'Buenas tardes';
      return 'Ya cerramos';
    }
    if (wd === 'sunday') {
      if (m < 960)  return 'Abrimos a las 16';
      if (m < 1170) return 'Buenas tardes';
      return 'Ya cerramos';
    }
    return '';
  }

  // Hero headline (v23) — emotional copy by timeslot. Replaces heroMessage in init().
  function heroHeadline(t) {
    var wd = t.weekday, m = t.timeInMinutes;

    // Lunes y fuera de horario operativo: mensaje neutro
    if (wd === 'monday') return 'Hoy descansamos. Volvé mañana.';

    var slots = SCHEDULE[wd] || [];
    var open = false;
    for (var i = 0; i < slots.length; i++) {
      if (m >= slots[i].open && m < slots[i].close) { open = true; break; }
    }
    if (!open) return 'Ahora estamos cerrados';

    // Franjas v23 (Mar-Vie y proporcionales a Sáb/Dom)
    if (m < 690) return 'El café que te falta conocer';   // hasta 11:30 → mañana
    if (m < 900) return 'Una pausa que sabe a algo hecho de verdad.';            // hasta 15:00 → mediodía
    return 'El turno tarde es para los que saben vivir.';                         // tarde
  }

  function bannerContent(t) {
    var wd = t.weekday, m = t.timeInMinutes;

    if (wd === 'monday') {
      return { title: 'Hoy descansamos', sub: 'Nos vemos mañana a las 8:30. Mientras, mirá la carta.' };
    }

    if (WEEKDAYS_TUVW.indexOf(wd) !== -1) {
      if (m < 510) {
        return {
          title: 'Abrimos a las 8:30',
          sub: 'Combos batateros de desayuno y almuerzo',
          items: [
            { name: 'Latte + cookie', price: 8000 },
            { name: 'Latte + tostadas', price: 9900 },
            { name: 'Latte + tostado', price: 12300 }
          ]
        };
      }
      if (m < 810) {
        return {
          title: 'Combos batateros',
          sub: 'Desayuno y almuerzo hasta las 13:30',
          items: [
            { name: 'Latte + cookie', price: 8000 },
            { name: 'Latte + tostadas', price: 9900 },
            { name: 'Sandwich bondio combo', price: 19000 }
          ]
        };
      }
      if (m < 1170) {
        return {
          title: 'La hora del especial',
          sub: 'Dame números: cappu doble con batata, chocolate y cardamomo. ' + formatPrice(7000)
        };
      }
      return { title: 'Ya cerramos', sub: 'Nos vemos mañana a las 8:30' };
    }

    if (wd === 'saturday') {
      if (m < 600)  return { title: 'Sábado batatero', sub: 'Abrimos a las 10. Pastelería fresca y cafés especiales' };
      if (m < 840)  return { title: 'Sábado batatero', sub: 'Pastelería fresca de mostrador y cafés especiales' };
      if (m < 960)  return { title: 'Volvemos a las 16', sub: 'Reabrimos a las 16:00 con tortas y pastelería' };
      if (m < 1170) return { title: 'Sábado batatero', sub: 'Tortas y pastelería de la tarde' };
      return { title: 'Ya cerramos', sub: 'Nos vemos mañana a las 16' };
    }

    if (wd === 'sunday') {
      if (m < 960)  return { title: 'Domingo de tortas', sub: 'Hoy abrimos solo de tarde, 16 a 19:30' };
      if (m < 1170) {
        return {
          title: 'Domingo de tortas',
          sub: 'Consultá en Instagram las tortas del día',
          link: { url: 'https://www.instagram.com/batata.cofi/', text: '@batata.cofi' }
        };
      }
      return { title: 'Ya cerramos', sub: 'Nos vemos el martes a las 8:30' };
    }

    return { title: '', sub: '' };
  }

  // ==========================================================
  // COMBOS POR FRANJA (v23)
  // ==========================================================

  function getTimeslot(t) {
    if (t.weekday === 'monday') return 'after-hours';
    var slots = SCHEDULE[t.weekday] || [];
    var open = false;
    for (var i = 0; i < slots.length; i++) {
      if (t.timeInMinutes >= slots[i].open && t.timeInMinutes < slots[i].close) { open = true; break; }
    }
    if (!open) return 'after-hours';
    if (t.timeInMinutes < 690) return 'manana';      // < 11:30
    if (t.timeInMinutes < 900) return 'mediodia';    // 11:30 - 15:00
    return 'tarde';                                   // 15:00 +
  }

  function renderCombosByTimeslot(t) {
    var slot = getTimeslot(t);
    var data = COMBOS_BY_TIMESLOT[slot];
    if (!data) return;

    var section    = document.getElementById('combos-feature');
    var labelEl    = document.getElementById('combos-label');
    var titleEl    = document.getElementById('combos-title');
    var subEl      = document.getElementById('combos-sub');
    var cardsEl    = document.getElementById('combos-cards');
    var restWrap   = document.getElementById('combos-rest');
    var restLabel  = document.getElementById('combos-rest-label');
    var restList   = document.getElementById('combos-rest-list');
    var afterCta   = document.getElementById('combos-after-hours-cta');

    if (!section || !cardsEl) return;

    section.dataset.timeslot = slot;
    if (labelEl) labelEl.textContent = data.label;
    if (titleEl) titleEl.textContent = data.title;
    if (subEl)   subEl.textContent   = data.sub;

    // Cards
    var cardsHtml = '';
    for (var i = 0; i < data.cards.length; i++) {
      var c = data.cards[i];
      var stagger = ' data-stagger="' + i + '"';
      var priceBadge = c.consultar
        ? '<span class="combo-card__price-badge combo-card__price-badge--consultar">Consultar</span>'
        : '<span class="combo-card__price-badge">' + escapeHtml(c.price) + '</span>';
      var hint = c.consultar
        ? '<a class="combo-card__hint combo-card__hint--ig" href="' + INSTAGRAM_URL + '" target="_blank" rel="noopener">Consultar por Instagram</a>'
        : '<span class="combo-card__hint">Ver el producto</span>';

      // Si es consultar, el card NO abre el modal de productos; linkea a Instagram desde el hint.
      // Si no, mantiene comportamiento de modal usando data-combo-* (compat con initComboModal).
      var dataAttrs = c.consultar
        ? ''
        : ' data-combo-image="' + escapeHtml(c.image) + '"' +
          ' data-combo-name="'  + escapeHtml(c.name)  + '"' +
          ' data-combo-price="' + escapeHtml(c.price) + '"' +
          ' data-combo-alt="'   + escapeHtml(c.name)  + '"';

      cardsHtml +=
        '<article class="combo-card' + (c.consultar ? ' combo-card--consultar' : '') + '" role="listitem"' + dataAttrs + ' data-reveal' + stagger + '>' +
          '<div class="combo-card__image-wrap">' +
            '<img class="combo-card__image" src="' + escapeHtml(c.image) + '" alt="" loading="lazy" width="640" height="540">' +
            priceBadge +
          '</div>' +
          '<div class="combo-card__body">' +
            '<h3 class="combo-card__name">' + escapeHtml(c.name) + '</h3>' +
            '<p class="combo-card__desc">' + escapeHtml(c.desc) + '</p>' +
            hint +
          '</div>' +
        '</article>';
    }
    cardsEl.innerHTML = cardsHtml;

    // Rest list
    if (data.rest && data.rest.length) {
      restWrap.hidden = false;
      if (restLabel) restLabel.textContent = data.restLabel || 'Más opciones';
      var restHtml = '';
      for (var j = 0; j < data.rest.length; j++) {
        var r = data.rest[j];
        var imgMatch = PRODUCT_IMAGES_LOWER[r.name.toLowerCase()];
        var priceCol = r.consultar
          ? '<a class="combos-rest-list__price combos-rest-list__price--consultar" href="' + INSTAGRAM_URL + '" target="_blank" rel="noopener">Consultar →</a>'
          : '<span class="combos-rest-list__price">' + escapeHtml(r.price) + '</span>';
        var nameHtml = imgMatch
          ? '<span class="combos-rest-list__name has-photo" data-product-image="' + escapeHtml(imgMatch.image) + '" data-product-name="' + escapeHtml(imgMatch.name) + '">' + escapeHtml(r.name) + ' <span class="menu-item__photo-hint">📷</span></span>'
          : '<span class="combos-rest-list__name">' + escapeHtml(r.name) + '</span>';
        restHtml += '<li>' + nameHtml + priceCol + '</li>';
      }
      restList.innerHTML = restHtml;
    } else {
      restWrap.hidden = true;
    }

    // After-hours CTA
    if (afterCta) afterCta.hidden = !data.showHoursCta;
  }

  function defaultTab(t) {
    var wd = t.weekday, m = t.timeInMinutes;
    if (wd === 'monday') return 'cafe';
    if (WEEKDAYS_TUVW.indexOf(wd) !== -1) return m < 810 ? 'combos' : 'especiales';
    return 'especiales';
  }

  // ==========================================================
  // Rendering
  // ==========================================================

  function renderBanner(data) {
    var el = document.getElementById('banner-content');
    if (!el) return;
    if (!data || !data.title) {
      el.innerHTML = '';
      return;
    }

    var html = '<p class="banner__title">' + escapeHtml(data.title) + '</p>';
    var subHtml = escapeHtml(data.sub);
    if (data.link) {
      subHtml += ' <a href="' + escapeHtml(data.link.url) + '" target="_blank" rel="noopener">' + escapeHtml(data.link.text) + '</a>';
    }
    html += '<p class="banner__sub">' + subHtml + '</p>';

    if (data.items && data.items.length) {
      html += '<div class="banner__items">';
      for (var i = 0; i < data.items.length; i++) {
        var item = data.items[i];
        html += '<span class="banner__item"><strong>' + escapeHtml(item.name) + '</strong>'
              + '<span class="banner__price">' + formatPrice(item.price) + '</span></span>';
      }
      html += '</div>';
    }

    el.innerHTML = html;
  }

  var PHOTO_HINT_SVG = '<span class="menu-item__photo-hint" aria-hidden="true">'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>'
    + '<circle cx="12" cy="13" r="4"/>'
    + '</svg></span>';

  function renderItems(items) {
    var html = '';
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var tagHtml = '';
      if (item.tag) {
        tagHtml = '<span class="menu-item__tag menu-item__tag--' + tagClass(item.tag) + '">' + escapeHtml(item.tag) + '</span>';
      }

      var photo = lookupProductImage(item.name);
      var hasVariants = item.variants && item.variants.length > 0;
      var openTag, hintHtml = '';
      if (hasVariants) {
        openTag = '<div class="menu-item has-photo"'
                + ' data-product-variants="' + escapeHtml(JSON.stringify(item.variants)) + '"'
                + ' data-product-name="' + escapeHtml(item.name) + '"'
                + ' data-product-price="' + formatPrice(item.price) + '"'
                + ' role="button" tabindex="0"'
                + ' aria-label="Ver variantes de ' + escapeHtml(item.name) + '">';
        hintHtml = PHOTO_HINT_SVG;
      } else if (photo) {
        openTag = '<div class="menu-item has-photo"'
                + ' data-product-image="' + escapeHtml(photo.image) + '"'
                + ' data-product-name="' + escapeHtml(item.name) + '"'
                + ' data-product-price="' + formatPrice(item.price) + '"'
                + ' role="button" tabindex="0"'
                + ' aria-label="Ver foto de ' + escapeHtml(item.name) + '">';
        hintHtml = PHOTO_HINT_SVG;
      } else {
        openTag = '<div class="menu-item">';
      }

      html += openTag
            +   '<div class="menu-item__info">'
            +     '<span class="menu-item__name">' + escapeHtml(item.name) + hintHtml + '</span>'
            +     '<span class="menu-item__desc">' + escapeHtml(item.desc) + '</span>'
            +     tagHtml
            +   '</div>'
            +   '<span class="menu-item__price">' + formatPrice(item.price) + '</span>'
            + '</div>';
    }
    return html;
  }

  // ==========================================================
  // v6 — Pastelería render
  // ==========================================================

  function renderPastry() {
    var grid = document.getElementById('pastry-grid');
    if (!grid) return;
    var html = '';
    for (var i = 0; i < PASTRY_LIST.length; i++) {
      var item = PASTRY_LIST[i];
      var desc = PASTRY_DESCRIPTIONS[item.caption] || '';
      html += '<figure class="pastry-card has-photo"'
            +   ' data-product-image="' + escapeHtml(item.image) + '"'
            +   ' data-product-name="' + escapeHtml(item.caption) + '"'
            +   (desc ? ' data-product-desc="' + escapeHtml(desc) + '"' : '')
            +   ' role="button" tabindex="0"'
            +   ' aria-label="Ver foto de ' + escapeHtml(item.caption) + '"'
            +   ' data-reveal data-stagger="' + (i % 6) + '">'
            +   '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.caption) + '" loading="lazy" width="640" height="540">'
            +   '<figcaption class="pastry-card__caption">' + escapeHtml(item.caption) + '</figcaption>'
            + '</figure>';
    }
    grid.innerHTML = html;
  }

  function renderCombos(combos) {
    return '<div class="combos-section">'
      + '<p class="combos__horario">' + escapeHtml(combos.horario) + '</p>'
      + '<h3 class="combos__subtitle">Desayuno</h3>'
      + renderItems(combos.desayuno)
      + '<div class="combos__divider"></div>'
      + '<h3 class="combos__subtitle">Almuerzo</h3>'
      + renderItems(combos.almuerzo)
      + '</div>';
  }

  function switchTab(name) {
    var list = document.getElementById('menu-list');
    if (!list) return;
    var tabs = document.querySelectorAll('.tab');

    for (var i = 0; i < tabs.length; i++) {
      var isActive = tabs[i].dataset.tab === name;
      tabs[i].classList.toggle('tab--active', isActive);
      tabs[i].setAttribute('aria-selected', isActive ? 'true' : 'false');
    }

    list.classList.add('fading');

    setTimeout(function () {
      list.classList.toggle('menu-list--combos', name === 'combos');
      if (name === 'combos') {
        list.innerHTML = renderCombos(MENU.combos);
      } else if (MENU[name]) {
        list.innerHTML = renderItems(MENU[name]);
      } else {
        list.innerHTML = '';
      }
      list.classList.remove('fading');
    }, 150);
  }

  // ==========================================================
  // Combo modal
  // ==========================================================

  // ==========================================================
  // Product modal — combos destacados, ítems del menú con foto y pastelería.
  // ==========================================================

  function initComboModal() {
    var modal = document.getElementById('combo-modal');
    if (!modal) return;
    var contentEl = modal.querySelector('.combo-modal__content');
    var imgEl = modal.querySelector('.combo-modal__image');
    var nameEl = modal.querySelector('.combo-modal__name');
    var priceEl = modal.querySelector('.combo-modal__price');
    var closeBtn = modal.querySelector('.combo-modal__close');
    var lastFocused = null;

    function clearCarousel() {
      var existing = modal.querySelector('.product-modal__carousel');
      if (existing) existing.remove();
      var existingDots = modal.querySelector('.product-modal__dots');
      if (existingDots) existingDots.remove();
      var existingDesc = modal.querySelector('.pastry-modal__description');
      if (existingDesc) existingDesc.remove();
      imgEl.style.display = '';
    }

    function openWith(image, name, price, alt) {
      if (!image || !name) return;
      lastFocused = document.activeElement;
      clearCarousel();
      imgEl.src = image;
      imgEl.alt = alt || name;
      nameEl.textContent = name;
      priceEl.textContent = price || '';
      modal.hidden = false;
      document.body.classList.add('modal-open');
      requestAnimationFrame(function () {
        modal.classList.add('is-visible');
      });
      if (closeBtn) closeBtn.focus();
    }

    function openWithCarousel(variants, name, price) {
      lastFocused = document.activeElement;
      clearCarousel();
      imgEl.style.display = 'none';
      nameEl.textContent = name;
      priceEl.textContent = price || '';

      var carouselHtml = '<div class="product-modal__carousel">';
      for (var i = 0; i < variants.length; i++) {
        carouselHtml += '<div class="product-modal__slide">'
          + '<img src="' + escapeHtml(variants[i].image) + '" alt="' + escapeHtml(variants[i].label) + '" width="640" height="480">'
          + '<span class="product-modal__slide-label">' + escapeHtml(variants[i].label) + '</span>'
          + '</div>';
      }
      carouselHtml += '</div>';

      var dotsHtml = '<div class="product-modal__dots">';
      for (var j = 0; j < variants.length; j++) {
        dotsHtml += '<button class="product-modal__dot' + (j === 0 ? ' is-active' : '') + '" data-slide="' + j + '" aria-label="Slide ' + (j + 1) + '"></button>';
      }
      dotsHtml += '</div>';

      imgEl.insertAdjacentHTML('afterend', carouselHtml + dotsHtml);

      var carousel = modal.querySelector('.product-modal__carousel');
      var dots = modal.querySelectorAll('.product-modal__dot');
      if (carousel && dots.length) {
        carousel.addEventListener('scroll', function () {
          var scrollLeft = carousel.scrollLeft;
          var slideWidth = carousel.offsetWidth;
          var activeIndex = Math.round(scrollLeft / slideWidth);
          for (var k = 0; k < dots.length; k++) {
            dots[k].classList.toggle('is-active', k === activeIndex);
          }
        }, { passive: true });
        for (var d = 0; d < dots.length; d++) {
          dots[d].addEventListener('click', function () {
            var idx = parseInt(this.dataset.slide, 10);
            carousel.scrollTo({ left: idx * carousel.offsetWidth, behavior: 'smooth' });
          });
        }
      }

      modal.hidden = false;
      document.body.classList.add('modal-open');
      requestAnimationFrame(function () {
        modal.classList.add('is-visible');
      });
      if (closeBtn) closeBtn.focus();
    }

    function openWithDescription(image, name, description) {
      lastFocused = document.activeElement;
      clearCarousel();
      imgEl.src = image;
      imgEl.alt = name;
      nameEl.textContent = name;
      priceEl.textContent = '';
      if (description) {
        priceEl.insertAdjacentHTML('afterend', '<p class="pastry-modal__description">' + escapeHtml(description) + '</p>');
      }
      modal.hidden = false;
      document.body.classList.add('modal-open');
      requestAnimationFrame(function () {
        modal.classList.add('is-visible');
      });
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      modal.classList.remove('is-visible');
      setTimeout(function () {
        modal.hidden = true;
        document.body.classList.remove('modal-open');
        clearCarousel();
        if (lastFocused && typeof lastFocused.focus === 'function') {
          lastFocused.focus();
        }
      }, 250);
    }

    var encargarBtn = document.getElementById('combo-modal-encargar');

    function openFromTrigger(el) {
      if (el.classList.contains('combo-card')) {
        openWith(el.dataset.comboImage, el.dataset.comboName, el.dataset.comboPrice, el.dataset.comboAlt);
      } else if (el.dataset.productVariants) {
        var variants = JSON.parse(el.dataset.productVariants);
        openWithCarousel(variants, el.dataset.productName, el.dataset.productPrice || '');
      } else if (el.classList.contains('pastry-card')) {
        var desc = el.dataset.productDesc || '';
        openWithDescription(el.dataset.productImage, el.dataset.productName, desc);
      } else {
        openWith(el.dataset.productImage, el.dataset.productName, el.dataset.productPrice || '', el.dataset.productName);
      }
      if (encargarBtn) {
        var isTorta = el.classList.contains('torta-card');
        encargarBtn.hidden = !isTorta;
        if (isTorta) {
          encargarBtn.href = 'encargo.html?torta=' + encodeURIComponent(el.dataset.productName || '');
        }
      }
    }

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest && e.target.closest('.combo-card[data-combo-image], .menu-item.has-photo, .pastry-card.has-photo, .torta-card.has-photo, .combos-rest-list__name.has-photo');
      if (trigger) {
        e.preventDefault();
        openFromTrigger(trigger);
        return;
      }
      if (e.target === modal || e.target === closeBtn) {
        close();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) {
        close();
        return;
      }
      if (e.key === 'Enter' || e.key === ' ') {
        var active = document.activeElement;
        if (active && active.matches && active.matches('.combo-card[data-combo-image], .menu-item.has-photo, .pastry-card.has-photo, .torta-card.has-photo, .combos-rest-list__name.has-photo')) {
          e.preventDefault();
          openFromTrigger(active);
        }
      }
    });
  }

  // ==========================================================
  // Hero parallax + scroll fade
  // ==========================================================

  function initParallax() {
    var bg = document.querySelector('.hero__bg');
    var scroll = document.querySelector('.hero__scroll');
    var hero = document.querySelector('.hero');
    if (!bg || !hero) return;

    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var y = window.scrollY;
          var h = hero.offsetHeight;
          if (y < h) {
            bg.style.transform = 'translateY(' + (y * 0.25) + 'px)';
          }
          if (scroll) {
            scroll.style.opacity = Math.max(0, 1 - y / 180).toString();
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ==========================================================
  // Smooth scroll
  // ==========================================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ==========================================================
  // Tabs
  // ==========================================================

  function initTabs() {
    document.querySelectorAll('.tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        switchTab(this.dataset.tab);
        this.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
    });
  }

  // ==========================================================
  // QR mode
  // ==========================================================

  function handleQR() {
    if (window.location.search.indexOf('qr') !== -1 || window.location.hash.indexOf('qr') !== -1) {
      var el = document.getElementById('cta-llegar');
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }
  }

  // ==========================================================
  // Scroll reveal (IntersectionObserver)
  // ==========================================================

  function initScrollReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var stagger = parseInt(entry.target.dataset.stagger || '0', 10);
          entry.target.style.transitionDelay = (stagger * 80) + 'ms';
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  // ==========================================================
  // v5 — Serving now
  // ==========================================================

  function renderServingNow() {
    var espressoEl = document.querySelector('[data-serving="espresso"]');
    var filtradoEl = document.querySelector('[data-serving="filtrado"]');
    if (espressoEl && SERVING_NOW.espresso) {
      var e = SERVING_NOW.espresso;
      espressoEl.textContent = e.origin + ', ' + e.process + ' — ' + e.variety;
    }
    if (filtradoEl && SERVING_NOW.filtrado) {
      var f = SERVING_NOW.filtrado;
      filtradoEl.textContent = f.origin + ', ' + f.process + ' — ' + f.variety;
    }
  }

  // ==========================================================
  // v5 — Pantry
  // ==========================================================

  function renderPantry() {
    var grid = document.getElementById('pantry-grid');
    if (!grid) return;
    var sorted = PANTRY.slice().sort(function (a, b) {
      return (a.available === b.available) ? 0 : (a.available ? -1 : 1);
    });
    var html = '';
    for (var i = 0; i < sorted.length; i++) {
      var p = sorted[i];
      var stagger = i;
      var classes = 'pantry-card' + (p.available ? '' : ' pantry-card--coming-soon') + (p.placeholder ? ' pantry-card--placeholder' : '');
      var badgeText = p.available ? 'Disponible' : 'Próximamente';
      html += '<article class="' + classes + '" data-reveal data-stagger="' + stagger + '">'
            +   '<div class="pantry-card__image-wrap">'
            +     '<img class="pantry-card__image" src="' + escapeHtml(p.image) + '" alt="' + escapeHtml(p.name) + '" loading="lazy" width="500" height="500">'
            +   '</div>'
            +   '<span class="pantry-card__badge">' + badgeText + '</span>'
            +   '<div class="pantry-card__body">'
            +     '<h3 class="pantry-card__name">' + escapeHtml(p.name) + '</h3>'
            +     '<p class="pantry-card__desc">' + escapeHtml(p.desc) + '</p>'
            +   '</div>'
            + '</article>';
    }
    grid.innerHTML = html;
  }

  function renderTortas() {
    var grid = document.getElementById('tortas-grid');
    if (!grid) return;
    var html = '';
    for (var i = 0; i < TORTAS_LIST.length; i++) {
      var item = TORTAS_LIST[i];
      html += '<figure class="torta-card has-photo"'
            +   ' data-product-image="' + escapeHtml(item.image) + '"'
            +   ' data-product-name="' + escapeHtml(item.caption) + '"'
            +   ' data-product-price="$70.000"'
            +   ' role="button" tabindex="0"'
            +   ' aria-label="Ver foto de ' + escapeHtml(item.caption) + '"'
            +   ' data-reveal data-stagger="' + (i % 4) + '">'
            +   '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.caption) + '" loading="lazy" width="640" height="540">'
            +   '<figcaption class="torta-card__caption">' + escapeHtml(item.caption) + '</figcaption>'
            +   '<span class="torta-card__price">$70.000</span>'
            + '</figure>';
    }
    grid.innerHTML = html;
  }

  // ==========================================================
  // v5 — Testimonials
  // ==========================================================

  function renderTestimonials() {
    var grid = document.getElementById('testimonials-grid');
    if (!grid) return;
    var html = '';
    for (var i = 0; i < TESTIMONIALS.length; i++) {
      var t = TESTIMONIALS[i];
      html += '<article class="testimonial-card" data-reveal data-stagger="' + i + '">'
            +   '<svg class="testimonial-card__quote-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'
            +     '<path d="M7 7v6c0 2-2 4-4 4v2c4 0 7-3 7-7V7H7zm10 0v6c0 2-2 4-4 4v2c4 0 7-3 7-7V7h-3z"/>'
            +   '</svg>'
            +   '<blockquote class="testimonial-card__quote">' + escapeHtml(t.quote) + '</blockquote>'
            +   '<footer class="testimonial-card__author">'
            +     '<span class="testimonial-card__name">' + escapeHtml(t.author) + '</span>'
            +     '<span class="testimonial-card__source">via ' + escapeHtml(t.source) + '</span>'
            +   '</footer>'
            + '</article>';
    }
    grid.innerHTML = html;
  }

  // ==========================================================
  // v5 — Instagram feed
  // ==========================================================

  function renderInstagramFeed() {
    var grid = document.getElementById('instagram-feed-grid');
    if (!grid) return;
    var igIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'
      + '<path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>'
      + '</svg>';
    var html = '';
    for (var i = 0; i < INSTAGRAM_FEED.length; i++) {
      var item = INSTAGRAM_FEED[i];
      html += '<a href="https://www.instagram.com/batata.cofi/" target="_blank" rel="noopener" class="ig-tile" aria-label="' + escapeHtml(item.alt) + '">'
            +   '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.alt) + '" loading="lazy" width="500" height="500">'
            +   '<span class="ig-tile__overlay" aria-hidden="true">' + igIcon + '</span>'
            + '</a>';
    }
    grid.innerHTML = html;
  }

  // ==========================================================
  // v5 — Voucher
  // ==========================================================

  var VOUCHER_STORAGE_KEY = 'batata_voucher';
  var VOUCHER_TTL_MS = 4 * 24 * 60 * 60 * 1000;
  var VOUCHER_DAYS_ES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var VOUCHER_MONTHS_ES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

  function readStoredVoucher() {
    try {
      var raw = window.localStorage.getItem(VOUCHER_STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed.expires !== 'number') return null;
      return parsed;
    } catch (err) {
      return null;
    }
  }

  function writeStoredVoucher(data) {
    try {
      window.localStorage.setItem(VOUCHER_STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      /* localStorage no disponible: el voucher solo vive durante esta sesión */
    }
  }

  function generateVoucherCode() {
    var ts = Date.now().toString(36).toUpperCase().slice(-4);
    var rand = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
    while (rand.length < 4) rand += 'X';
    return 'BATATA-' + ts + '-' + rand;
  }

  function formatVoucherDate(d) {
    return VOUCHER_DAYS_ES[d.getDay()] + ' ' + d.getDate() + ' de ' + VOUCHER_MONTHS_ES[d.getMonth()];
  }

  function initVoucher() {
    var modal = document.getElementById('voucher-modal');
    if (!modal) return;
    var form = document.getElementById('voucher-form');
    var closeBtn = modal.querySelector('.voucher-modal__close');
    var codeField = document.getElementById('voucher-code-field');
    var expiresField = document.getElementById('voucher-expires-field');
    var codeDisplay = document.getElementById('voucher-code-display');
    var expiryDisplay = document.getElementById('voucher-expiry-display');
    var formView = modal.querySelector('[data-voucher-view="form"]');
    var resultView = modal.querySelector('[data-voucher-view="result"]');
    var lastFocused = null;

    function showVoucher(code, expires) {
      codeDisplay.textContent = code;
      expiryDisplay.textContent = formatVoucherDate(new Date(expires));
      formView.hidden = true;
      resultView.hidden = false;
    }

    function showForm() {
      formView.hidden = false;
      resultView.hidden = true;
    }

    function openModal() {
      lastFocused = document.activeElement;
      var saved = readStoredVoucher();
      if (saved && saved.expires > Date.now()) {
        showVoucher(saved.code, saved.expires);
      } else {
        showForm();
      }
      modal.hidden = false;
      document.body.classList.add('modal-open');
      requestAnimationFrame(function () {
        modal.classList.add('is-visible');
      });
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove('is-visible');
      setTimeout(function () {
        modal.hidden = true;
        document.body.classList.remove('modal-open');
        if (lastFocused && typeof lastFocused.focus === 'function') {
          lastFocused.focus();
        }
      }, 250);
    }

    document.querySelectorAll('[data-open-voucher]').forEach(function (btn) {
      btn.addEventListener('click', openModal);
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target === closeBtn) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var submitBtn = form.querySelector('button[type="submit"]');
        var originalLabel = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Generando…';

        var code = generateVoucherCode();
        var expires = Date.now() + VOUCHER_TTL_MS;
        codeField.value = code;
        expiresField.value = new Date(expires).toISOString();

        writeStoredVoucher({ code: code, expires: expires, created: Date.now() });

        var endpoint = form.action;
        var isPlaceholder = !endpoint || endpoint.indexOf('PLACEHOLDER') !== -1;

        var finalize = function () {
          showVoucher(code, expires);
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
          updateVoucherButtonsLabel();
        };

        if (isPlaceholder || typeof window.fetch !== 'function') {
          finalize();
          return;
        }

        var formData = new FormData(form);
        fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        }).then(finalize, finalize);
      });
    }

    updateVoucherButtonsLabel();
  }

  function updateVoucherButtonsLabel() {
    var saved = readStoredVoucher();
    var hasActive = !!(saved && saved.expires > Date.now());
    document.querySelectorAll('[data-open-voucher]').forEach(function (btn) {
      btn.textContent = hasActive ? 'Ver mi voucher activo' : 'Reclamar mi latte gratis';
    });
  }

  // ==========================================================
  // v6 — Education video lazy load
  // Sólo carga el video cuando la sección entra en viewport, y solamente
  // si el <source> está activo (Gabriel ya descomentó el archivo).
  // ==========================================================

  function initEducationVideo() {
    var video = document.querySelector('.education__video');
    if (!video) return;
    var hasSource = video.querySelector('source');
    if (!hasSource) return;

    function tryPlay() {
      video.preload = 'auto';
      video.load();
      var p = video.play();
      if (p && typeof p.then === 'function') {
        p.catch(function () {
          function retryOnInteract() {
            video.play().catch(function () {});
            document.removeEventListener('touchstart', retryOnInteract);
            document.removeEventListener('scroll', retryOnInteract);
          }
          document.addEventListener('touchstart', retryOnInteract, { once: true, passive: true });
          document.addEventListener('scroll', retryOnInteract, { once: true, passive: true });
        });
      }
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            tryPlay();
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '300px' });
      observer.observe(video);
    } else {
      tryPlay();
    }
  }

  // ==========================================================
  // Site nav — scroll, active state, offset
  // ==========================================================

  function initSiteNav() {
    var nav = document.getElementById('site-nav');
    if (!nav) return;

    // Keep content below the fixed nav
    function updateNavOffset() {
      document.body.style.paddingTop = nav.offsetHeight + 'px';
    }
    updateNavOffset();
    window.addEventListener('resize', updateNavOffset, { passive: true });

    // Stronger shadow on scroll
    function handleNavScroll() {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // Smooth scroll — scroll-margin-top in CSS handles the offset
    var navLinks = document.querySelectorAll('.site-nav__link');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = this.getAttribute('href').substring(1);
        var target = document.getElementById(targetId);
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Logo: scroll to top
    var logo = document.querySelector('.site-nav__logo');
    if (logo) {
      logo.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Active state tracking
    var sectionIds = [];
    for (var j = 0; j < navLinks.length; j++) {
      sectionIds.push(navLinks[j].getAttribute('data-section'));
    }
    var sections = [];
    for (var k = 0; k < sectionIds.length; k++) {
      var sec = document.getElementById(sectionIds[k]);
      if (sec) sections.push(sec);
    }

    if (sections.length > 0 && 'IntersectionObserver' in window) {
      var navHeight = nav.offsetHeight;
      var activeObserver = new IntersectionObserver(function (entries) {
        for (var m = 0; m < entries.length; m++) {
          if (entries[m].isIntersecting) {
            for (var n = 0; n < navLinks.length; n++) {
              navLinks[n].classList.remove('active');
            }
            var activeLink = document.querySelector('.site-nav__link[data-section="' + entries[m].target.id + '"]');
            if (activeLink) activeLink.classList.add('active');
          }
        }
      }, {
        rootMargin: '-' + (navHeight + 20) + 'px 0px -60% 0px',
        threshold: 0
      });
      for (var p = 0; p < sections.length; p++) {
        activeObserver.observe(sections[p]);
      }
    }
  }

  // ==========================================================
  // Hamburger menu (v24)
  // ==========================================================

  function initHamburger() {
    var btn = document.getElementById('nav-hamburger');
    var menu = document.getElementById('nav-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isOpen);
      btn.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
      menu.classList.toggle('is-open', !isOpen);
    });

    menu.querySelectorAll('.site-nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Abrir menú');
        menu.classList.remove('is-open');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Abrir menú');
        menu.classList.remove('is-open');
        btn.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (btn.getAttribute('aria-expanded') === 'true' && !e.target.closest('.site-nav')) {
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Abrir menú');
        menu.classList.remove('is-open');
      }
    });
  }

  // ==========================================================
  // Cursos urgency (v23)
  // ==========================================================

  function initCursosUrgency() {
    var spotsEl = document.getElementById('cursos-spots');
    var urgEl   = document.getElementById('cursos-urgency');
    if (!spotsEl || !urgEl) return;
    var n = 3 + Math.floor(Math.random() * 3); // 3, 4 o 5
    spotsEl.textContent = n;
    urgEl.hidden = false;
  }

  // ==========================================================
  // Init
  // ==========================================================

  var statusInterval = null;

  function init() {
    var t = getBuenosAiresTime();

    var heroEl = document.getElementById('hero-headline');
    if (heroEl) heroEl.textContent = heroHeadline(t);

    var ratingTextEl = document.querySelector('.hero__rating-text');
    if (ratingTextEl) {
      ratingTextEl.innerHTML = '<strong>' + GOOGLE_RATING + '</strong> · ' + GOOGLE_REVIEW_COUNT + ' reseñas en Google';
    }

    renderBanner(bannerContent(t));
    renderCombosByTimeslot(t);

    switchTab(defaultTab(t));

    updateStoreStatus();
    if (statusInterval) clearInterval(statusInterval);
    statusInterval = setInterval(updateStoreStatus, 60000);

    renderServingNow();
    renderPastry();
    renderPantry();
    renderTortas();
    renderTestimonials();
    renderInstagramFeed();

    initTabs();
    initComboModal();
    initVoucher();
    initParallax();
    initSmoothScroll();
    handleQR();
    initScrollReveal();
    initEducationVideo();
    initCursosUrgency();
    initHamburger();
    initSiteNav();
    loadMenuImages();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
