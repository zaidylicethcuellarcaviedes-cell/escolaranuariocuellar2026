const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "tu-proyecto-12345.firebaseapp.com",
  databaseURL: "https://tu-proyecto-12345-default-rtdb.firebaseio.com",
  projectId: "tu-proyecto-12345",
  storageBucket: "tu-proyecto-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/* =========================================================
   DATOS DEL ANUARIO (tomados del formulario de Google)
   Orden = lista oficial del curso (alfabético por apellido)
   sig = ID del archivo de la firma en Drive | photo = ID de la foto en Drive
   ========================================================= */
const TEACHER = {
  name: `Johan Sebastian Masmelas Vega`,
  quote: `La constancia concede la victoria`,
  memory: `Cuando me gradué de Ingeniero`,
  asp: [`Doctorado en Educación`, `Tener salud`, `Ser feliz`],
  thanks: `A mi familia quiero agradecerles por ser mi mayor refugio y mi equipo incondicional.`,
  sig: `1Lz-OtVKWva1mLcI3HVq1IirdXPn3x436`,
  photo: `1wC6z4B7fxdYV0s4u2i_p3jRRc6w9JS_r`
};

const STUDENTS = [
  { name: `Laura Liney Alarcon Cortes`,
    quote: `El que persevera alcanza`,
    memory: `Haber encontrado una persona realmente leal en mi vida`,
    asp: [`Enfermera`, `Doctora`, `Ingeniera`],
    thanks: `Agradezco a Dios y a mi familia que me acompañaron en esta etapa, por su apoyo, consejos y paciencia.`,
    sig: `1IPv--clJ5UyswHYTJjTlMi9K1ZtPqRyA`, photo: `1Gwy4a1iObBHX734ieWDZN-e-kEWaoGAc` },

  { name: `Narly Lizeth Amaya Losada`,
    quote: `No entendí nada`,
    memory: `Conocer amistades que me ayudaron en el peor momento y me sacaban una sonrisa`,
    asp: [`Seguir estudiando`, `Terminar hasta sacar el tecnólogo`, `Trabajar para conseguir mis cosas`],
    thanks: `A mis padres y a todos los docentes que me acompañaron.`,
    sig: `19-rsYfIzTJYstmzLoP5_3SOlLnSpMgjX`, photo: `1fGMBAenGLS86sfqOlHCNcN9lYbg5jpmL` },

  { name: `Nycolt Danihela Barrera Mosquera`,
    quote: `Su Madreeee`,
    memory: `Cuando iniciamos nuestro grupito de 4 en séptimo con unas amigas`,
    asp: [`Estudiar en el SENA`, `Hacer orgullosa a mi madre`, `Infante de Marina`, `Chef`],
    thanks: `Le doy gracias a mi madre por darme su apoyo incondicional en mis estudios y por siempre confiar en mí.`,
    sig: `1lIuyzfjk_gTg_C7dMygCoYW7qEzw3o2d`, photo: `1Afics_wPmXbKt6b2k2HJhtzJhwtqH3CQ` },

  { name: `Andres Felipe Bastidas Lombana`,
    quote: `Relax que yo remonto`,
    memory: `Mi noviazgo`,
    asp: [`Odontólogo`],
    thanks: `Agradezco a mis padres por todo el esfuerzo que hicieron todos estos años para que yo pudiera llegar hasta acá: mi grado de bachiller.`,
    sig: `1gPg5rH-Mg6t2HjcoHEmtcMcEaEAtzpJH`, photo: `1Q_BcZBFbvz2IffUyVuvChQdZh5PIwRjf` },

  { name: `Estiven Julian Benitez Castro`,
    quote: `Mire a este negro`,
    memory: `Sin duda, mi recuerdo favorito fue el día en que me organizaron una fiesta de cumpleaños sorpresa. Ver reunidos a mis 4 mejores amigos, para celebrar conmigo es un momento que guardo con muchísimo cariño en el corazón.`,
    asp: [`Mi mayor aspiración es convertirme en doctor y alcanzar todas mis metas profesionales, preparándome con dedicación para proteger la salud de las personas y cumplir con éxito cada objetivo que me proponga en el futuro.`],
    thanks: `Agradezco profundamente a mis compañeros, familiares y profesores por haberme acompañado y guiado en esta etapa. Su apoyo y compañía fueron fundamentales durante todo mi proceso educativo en la secundaria.`,
    sig: `1wh3YCSf83k3EoFq0GOVR_vjlGKgD1vXc`, photo: `19NPaWe31ZieErbXIKnrIL4fTH5w1MJm-` },

  { name: `Nikoll Lizeth Bocanegra Giraldo`,
    quote: `En nombre de Dios, todo lo lograré`,
    memory: `Todos los recuerdos de octavo, pero especialmente cuando dañamos un candado para no tener clases con una profesora`,
    asp: [`Estudiar la carrera de mis sueños`],
    thanks: `Gracias a mi familia por el apoyo.`,
    sig: `1o6RCWXn0QQU-Dji6nyHquBYXT6ed-ZIw`, photo: `1z53NTeELCuo_n4iFVHHHIoCAUnGw0mt2` },

  { name: `Danna Valentina Caviedes Perdomo`,
    quote: `Ay Dios mío`,
    memory: `Mi recuerdo favorito es cuando unos compañeros estaban jugando con una pelota de papel, y accidentalmente le pegaron a una profesora casi dañándole las gafas.`,
    asp: [`Estudiar psicología`, `Seguir con el técnico`],
    thanks: `Les doy las gracias a mis padres por su apoyo emocional y económico, a mis maestros por su paciencia, y por todas las enseñanzas que me han dejado.`,
    sig: `1Ck-IuPGAJcg_NJnxECB9U5rnTCrFv6km`, photo: `18uI9sY0pgl0awPkb-AJUyk9YocEH_jZI` },

  { name: `Zaidy Liseth Cuellar Caviedes`,
    quote: `Ay no, qué pena`,
    memory: `Mi recuerdo favorito de décimo fue compartir risas, locuras y momentos inolvidables con mis compañeros, creando recuerdos que siempre llevaré en mi corazón.`,
    asp: [`Estudiar en el SENA`, `Hacer orgullosa a mi familia`, `Cumplir mi sueño sin rendirme`, `Crecer como persona y aprender de mis errores`],
    thanks: `Agradezco a mis padres por su amor incondicional, por apoyarme en cada momento y por hacer tantos esfuerzos para darme lo mejor. Gracias por sus consejos, por confiar en mí y por motivarme a seguir adelante, incluso cuando las cosas se ponen difíciles. Ustedes son una parte fundamental de mi vida y una de mis mayores motivaciones para cumplir mis sueños. Todo lo que hacen por mí lo llevo en mi corazón, y espero algún día poder devolverles un poquito de todo lo que me han dado. Los amo mucho y me siento muy afortunada de tenerlos en mi vida.`,
    sig: `10YOb6L7ZgzdIhLEgHVJqs5djKQEdCTEh`, photo: `1mOYvzofE_O2CSRC74LTnZqa4RO0licBo` },

  { name: `Kewin Daniel Escobar Ramirez`,
    quote: `Ole no`,
    memory: `El día que jugué un torneo departamental`,
    asp: [`Ser profesional en multimedia`, `Debutar como jugador`],
    thanks: `Le agradezco a mi familia por apoyarme.`,
    sig: `1nqxymZ5gGT2csSPludqqVY95I_iQcLoB`, photo: `1ej6XjqP9CyFix8nZVUa3uNpYwbALRO0r` },

  { name: `Laura Valentina Fuentes Aranda`,
    quote: `Estoy siendo víctima de xenofobia por parte de mi compañero Benítez`,
    memory: `Todos los días a partir de 9no (2024) han sido como el mejor de todos. Pero los mejores como Prom fueron las horas lúdicas a la última hora de todos los miércoles.`,
    asp: [`Ser programadora y tener una vida tranquila y digna`],
    thanks: `Agradezco a cada uno de mis compañeros por haber formado parte de los recuerdos más bonitos de mi último año escolar. Me llevo conmigo las risas, las enseñanzas, los momentos compartidos y la tristeza de saber que una etapa tan especial está llegando a su fin.
A Yuvettslit Yunda, por ser mi primera amiga al llegar a la institución, por permitirme verla crecer y por ocupar un lugar en mi corazón que el tiempo nunca podrá borrar. A Julieta Rocha, por ser mi compañía, cómplice, apoyo incondicional y una de las amistades más valiosas de este camino. A Isabella Monje, por tenderme la mano cuando más lo necesité; a Laura Serrato, por los momentos vividos; a Estiven Benítez, por su liderazgo, amistad y por hacerme bullying de vez en cuando; a Laura Marinez, por tantas risas y su apoyo; a Cristian Muñoz, por su compañía; a Heilyn Sánchez y Saory Montaña, por estar presentes cuando pudieron; a Laura Galindo, por su cariño y confianza; y a Johan Ramírez, por su carisma y honestidad. Gracias a todos por dejar un pedacito de ustedes en esta historia que siempre recordaré con cariño.
A mis profesores, especialmente al profe Sebastián Masmelas, gracias por despertar en mí el amor por la programación.
A mi padre, Leonardo Fuentes, por su apoyo económico durante mi formación; a mis hermanos mayores, Cristian Galindo y Yonatan Galindo, por tenderme la mano cuando lo necesité; y a Esther Hernández, por acompañarme espiritual y emocionalmente en este proceso.
Pero, sobre todo, mi agradecimiento más profundo es para mi mamá, Lina Aranda. Gracias por cada sacrificio, por cada esfuerzo silencioso y por luchar incansablemente para darme un futuro mejor. Gracias por salvarme de la ignorancia, por creer en mí incluso en medio de las dificultades y por dejarlo todo con tal de verme llegar lejos. Si hoy puedo soñar con un futuro lleno de oportunidades, es porque tú has construido el camino con tus propias manos.`,
    sig: `1hQRvj96ZDvIuxYmWEMlhNXH4aBoVYnCe`, photo: `14QqznC7cIClQJI3b_LetyBoWnrJehtyC` },

  { name: `Laura Valentina Galindo Diaz`,
    quote: `Tengo sueño`,
    memory: `Mi recuerdo favorito es cuando conocí por primera vez a mi mejor amiga Valeria en sexto.`,
    asp: [`Poder especializarme en lo que más aspiro`],
    thanks: `Le agradezco a mis padres por darme motivación y fuerzas para lograr mis metas y poder seguir adelante.`,
    sig: `1xOEPp4iYRi_qSyw_vHDqTloY9BGHDXsB`, photo: `11ufYvLxGH21KwTB_1CELVFFOaQ_HOEg7` },

  { name: `Mariana Garcia Perez`,
    quote: `Falsos`,
    memory: `La vez que hicieron caer a Edwin y de paso a Natalia en el puente de Guaunda y quedó cochino.`,
    asp: [`Psicología o licenciatura en lengua castellana`],
    thanks: `Agradezco principalmente a Dios y a mis padres, sobre todo a mi hermana Nubia, quien ha hecho el papel principal en apoyarme tanto académica como financieramente. Los amo.`,
    sig: `1NTbYW0xUXR2IAa6DKy6tT6dcD0rnBMpk`, photo: `1_rXuwN0kDITTVxw6ePxjUmOAvFQ94fqY` },

  { name: `Jesus Fernando Gutierrez Diz`,
    quote: `Los errores ocurren`,
    memory: `Cuando obtuve las 80 horas sociales sin hacer prácticamente nada.`,
    asp: [`Convertirme en médico`],
    thanks: `Gracias a mis padres, hermano y profesores que me apoyaron en todo para poder salir adelante.`,
    sig: `10t7ZC-UdMbHzy3BVwn3Uk7Ngksh6OvZg`, photo: `1sfRXUOKSXYskq6o-q2E6FUUv91bJ3Au2` },

  { name: `Laura Angeline Marinez Olaya`,
    quote: `No joda`,
    memory: `Con mis padres de pequeña`,
    asp: [`Estudiar derecho`],
    thanks: `Agradezco a mi familia.`,
    sig: `15We6yfCRc4oQIAI8ZgdkGyxfmi307jaI`, photo: `1-VsQzhQRQvmCZT4B3xWrRsIFqdZ3regx` },

  { name: `Francy Fidelina Medina Garcia`,
    quote: `Todo es mental`,
    memory: `Mi recuerdo favorito en general es cuando compartimos.`,
    asp: [`Graduarme e ingresar a la universidad`, `Estudiar Medicina`, `Crecer como persona y ayudar a mi familia`, `Conocer nuevos lugares y cumplir cada uno de mis sueños`],
    thanks: `Agradezco a mi familia, docentes y compañeros por su apoyo, dedicación y enseñanzas durante esta etapa, que han contribuido a mi formación personal y académica.`,
    sig: `1ks6Xli0UV0blsupAvkBm2pJebN8IAVPT`, photo: `1ehy9tYF3NRYSQelvJ5GhRCuWtTw5NCDd` },

  { name: `Isabella Monje Vega`,
    quote: `Te cuento un chiste, amiga`,
    memory: `Cuando estaba en el puente con mis amigos y nos inventamos un caso para un juicio.`,
    asp: [`Tener mi propia empresa`, `Llegar a componer mis propias canciones`],
    thanks: `Le agradezco a mi mamá, tío y abuela por nunca dejarme sola y confiar en mí incluso cuando yo no lo podía hacer.`,
    sig: `17xfhc6I-iyRS62w0pUB4lDzj_5KjetVU`, photo: `198YHO7iwlGUdWOCUxQqHgJbaFc7EadRC` },

  { name: `Saory Valentina Montaña Piñeros`,
    quote: `Tengo hambre`,
    memory: `Cuando me la pasaba jugando voleibol.`,
    asp: [`Salir del colegio y formar una carrera`],
    thanks: `Agradecimiento a todos los que me acompañaron en mi formación académica.`,
    sig: `172aTK0HVy1QYD4oOlxepQkC5UAZL-cwD`, photo: `1NRKmorWYuMnlvDMlhQkCtvTxb8UTHe_W` },

  { name: `Julieth Valentina Mora Esquivel`,
    quote: `Somos la resistencia`,
    memory: `En 7mo, cuando jugábamos fútbol, la mayoría del salón unidos.`,
    asp: [`Estudiar lo que me gusta y terminarlo`, `Trabajar en eso`, `Formar una hermosa familia`],
    thanks: `Agradezco primeramente a Dios por permitirme estar donde estoy y con vida, y a mis padres por apoyarme en cada momento de mi vida y suplir cada necesidad que tengo.`,
    sig: `1jUO3JInobkAUrlmebcsbfF90jS6yUD6k`, photo: `1EqxH5j63XALoksrbppNzSTxeHmKbYDRb` },

  { name: `Cristian Rene Muñoz Quintero`,
    quote: `Amo a Angeline`,
    memory: `Cuando fui novio de Angeline.`,
    asp: [`Hacer un tecnólogo en el SENA`, `Ir a la universidad y estudiar lo que me gusta`, `Ganar mucha plata`],
    thanks: ``,
    sig: `1SL19OeUyHtSL6d2y_aObhV_aJdYnUyhY`, photo: `1rhm62Kw6RgOgc05TjKzKwuERA0cXU1m3` },

  { name: `Alex Felipe Ortiz Narvaez`,
    quote: `No mienta`,
    memory: `Cuando jugaba micro con mis compañeros.`,
    asp: [`Estudiar la carrera de mis sueños`, `Ser un gran profesional`],
    thanks: `Primero que todo, quiero dar gracias a Dios por haberme permitido vivir esta experiencia escolar con salud y vida. También agradecer a los profesores que se esforzaron por enseñarnos con dedicación, paciencia y esfuerzo todos sus conocimientos y valores que nos puedan servir en nuestra vida cotidiana. Por último, estaré infinitamente agradecido con mis padres por haberme acompañado y apoyado en todos mis proyectos y en mi trayectoria como estudiante a través del tiempo.`,
    sig: `10YoPdJHBt4_EnPQYELcZgV5ZrfCVXzvM`, photo: `1BElPcguZokclbu8LSIFmBHssYehEBLB6` },

  { name: `Duvan Felipe Ortiz Sarmiento`,
    quote: `Yo sí estudié, pero se me olvidó todo`,
    memory: `Cuando jugué fútbol con mis compañeros y nos golearon, pero no faltaron las risas.`,
    asp: [`Terminar mis estudios, graduarme y estudiar lo que me gusta para convertirme en un gran profesional`, `Tener un buen trabajo, una casa propia y ayudar económicamente a mi familia`, `Hacer sentir orgullosos a mi mamá y hermano, viajar y conocer nuevos lugares`, `Ser una persona responsable, humilde y respetuosa, y cumplir cada uno de mis sueños con la ayuda de Dios`],
    thanks: `Gracias, Dios, por permitirme vivir esta hermosa etapa de mi vida, por darme la oportunidad de aprender, por cada compañero que puso una sonrisa en mis días y por cada maestro que me enseñó algo más que una lección. Gracias por los momentos felices, por las dificultades que me hicieron más fuerte y por los recuerdos que siempre llevaré en mi corazón. Hoy entiendo que el colegio no solo me dejó conocimientos, sino también amistades, experiencias y enseñanzas que me acompañarán toda la vida.`,
    sig: `1gbaKgYNO5AGJZB_nJOIfv_Bn_YUejFil`, photo: `1iaiZ-2vis8RWQvonJT2TzTX3r7vh2FiG` },

  { name: `Joan Sebastian Ramirez Garcia`,
    quote: `Sapa`,
    memory: `Ninguno`,
    asp: [`Ser un gran empresario`],
    thanks: `A mi familia.`,
    sig: `1cMGdF6zeFoJ_S6f1ajfVl95hgqg5NqnA`, photo: `1Apw-0FYsWWQyt0P77iYRjirCVIYNgCwK` },

  { name: `Julieta Rocha Losada`,
    quote: `Todo pasa por algo, los planes de Dios son perfectos`,
    memory: `Cuando me caí en un río con mis amigos y aprovechamos y nos bañamos.`,
    asp: [`Llegar a ser profesora de pedagogía infantil para mostrar el gran amor que tengo por los niños y enseñarles las bases que les van a servir para el resto de su vida`, `Después, estudiar para ser azafata: uno de mis mayores sueños`],
    thanks: `A mis papás, que han estado desde el momento en que nací y me han apoyado en todo.`,
    sig: `1xJmvRGSIdFMgkE-v0dmxD6N3zWXABzhP`, photo: `1A-kdHoGADSSK0ifUBhS6XBSOg6l7xPoA` },

  { name: `Heilyn Yireth Sanchez Dussan`,
    quote: `Ya quisiera yo`,
    memory: `El compartir de la salchipapa`,
    asp: [`Llegar a ser una persona exitosa que no necesita ayuda de los demás`],
    thanks: `Agradezco a mi familia, amigos, compañeros y profesores por darme enseñanzas, ejemplos y aprendizaje que me ayudaron a formarme como la persona que soy ahora.`,
    sig: ``, photo: `12Tii4J_3ZgtwgLNvEnbNpfGyLnpIs7Sz` },

  { name: `Thaliana Sofia Sanchez Rocha`,
    quote: `Vive la vida`,
    memory: `El 2022 con mis amigas`,
    asp: [`Ser feliz`],
    thanks: `Agradezco a MDZS, a mis padres, a mis profesores y a los compañeros por ayudarme a lograr mis metas.`,
    sig: `1J0jxNV3DfrN8CVZrQDg4dA88P6edZpCU`, photo: `1Yf0nQMO3T7Qx5qXfuwujg4tkAoNs08TR` },

  { name: `Hillary Natalia Serrato Acosta`,
    quote: `No todo es para siempre, pero tú sí vas a poder con todo.`,
    memory: `Una vez que estaba caminando con mis amigos por el patio del colegio y después nos fuimos para un lado en el que había un río; esa vez me lanzaron al río con otro compañero. Yo no quería culpar ni avisar a la responsable, pero ya la habían delatado en coordinación, nos llevaron para allá, le pusieron observación y nos regañaron.`,
    asp: [`Terminar mi bachillerato con la ayuda de Dios`, `Graduarme`, `Estudiar para ser una gran licenciada en educación infantil`],
    thanks: `Quiero terminar mi bachillerato con la ayuda de Dios, graduarme y estudiar para ser una gran licenciada en educación infantil.`,
    sig: `1LuRtGpqdPrLMoLgXrwzmJdQIcJGUj_0f`, photo: `105cQQ4GJrk37KC280fGPFzoot1Mh4SQm` },

  { name: `Laura Sofia Serrato Trujillo`,
    quote: `Uy no, atrás Satanás`,
    memory: `Mi recuerdo favorito es cuando todos fuimos a la casa del man que me gustaba y se pusieron a darle serenata con la canción de "La ventana marroncita".`,
    asp: [`Graduarme feliz junto a mis amigos`, `Terminar el tecnólogo, homologar y estudiar diseño`, `Estudiar más cursos en el SENA`, `Entrar a la universidad a estudiar biología, graduarme y ser profesional con lo estudiado`],
    thanks: `Gracias a mis amigos: Laura Fuentes, Ancizar Triana, Joan Ramírez, Isabella Monje, Yuvettslit Yunda... y a todo el salón por ser tan especial para mí y por ser tan unidos a pesar de nuestras diferencias.`,
    sig: `1mRmD3oL2RemUl23xSBuKdmDXAUFP0oPO`, photo: `1xaD5-0lkBCOQ7l_OANPiaPjTm4YsZLHt` },

  { name: `Nicolas Soto Calderon`,
    quote: `Yo que me saqué un 3, me conformo`,
    memory: `Cuando jugamos un partido con mis amigos y nos golearon.`,
    asp: [`Tener un trabajo estable`, `Tener un título profesional de ingeniero`, `Estar junto a mis padres`],
    thanks: `Primero que todo, darle el agradecimiento a mis padres, que son los que me han apoyado siempre y en cualquier circunstancia; también a mis abuelas, que es otro mérito de orgullo saber que tengo una familia unida y que me apoya en todo, y gracias a eso he podido con todo y siempre salir adelante afrontando todo.`,
    sig: `1Enyh8QnHeBoJuEmIYkQrKVFcOA0PHXUC`, photo: `1cXOVlypcZyFssF8mzYwHz0uJrMjJGSaL` },

  { name: `Ancizar Steven Triana Murcia`,
    quote: `Six seven`,
    memory: `El día del compartir en 10°`,
    asp: [`Terminar el tecnólogo`, `Irme del país junto a mi familia`, `Hacer la universidad`, `Tener hijos`],
    thanks: `Agradezco a mis padres por el gran amor que me han dado, a mis hermanos, al profe Sebas por ser tan buen docente y a mis amigos por hacer los días tan divertidos y más fáciles.`,
    sig: `1Cv-TT4F97KgUwTNO3nb_1UJP5PnoxZ8J`, photo: `18NzJ3TYERWqcAsLJ6jMvL-mYRMPS6aIB` },

  { name: `Yuvettslit Yunda Cortes`,
    quote: `Life goes on`,
    memory: `Mi mamá y yo en la graduación de 9no: por cómo se veía y sentí su orgullo.`,
    asp: [`Ayudar a mi mamá`, `Llegar a ser profesional en marketing`, `Viajar y tener un trabajo estable`, `Obtener dinero y especializarme en algo`],
    thanks: `A mi mamá y a mi hermano, por acompañarme durante todo este proceso, por su esfuerzo para conseguir lo que yo necesitaba y, sobre todo, por demostrarme su apoyo, amor y orgullo.`,
    sig: `1KAYVPbtKyzA5Uw4rdCBrgbQiDVcPYzqj`, photo: `1nnCBhK8HLKlHwWTWW6npgM1t_qBRPaO4` }
];

const DATA_VERSION = 'excel-2026-11-04';
const driveImg = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
const PH = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#eef2ee"/><circle cx="100" cy="78" r="36" fill="#b9c7bb"/><path d="M30 190c4-45 34-62 70-62s66 17 70 62z" fill="#b9c7bb"/></svg>');
window.PH = PH;
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
const quoted = (t) => `"${t.replace(/^["“]+|["”]+$/g, '')}"`;

document.addEventListener('DOMContentLoaded', () => {
  const TOTAL_PAGES = STUDENTS.length + 3; // portada + profesor + estudiantes + cierre
  document.getElementById('total-pages-display').textContent = TOTAL_PAGES;

  // Reinicia una sola vez lo guardado en el navegador para que se vean los datos nuevos del Excel
  if (localStorage.getItem('anuario_data_version') !== DATA_VERSION) {
    Object.keys(localStorage).filter(k => k.startsWith('anuario_')).forEach(k => localStorage.removeItem(k));
    localStorage.setItem('anuario_data_version', DATA_VERSION);
  }
  let currentPage = 1;

  const bookContainer = document.getElementById('book');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const pageSelect = document.getElementById('page-select');
  const btnSave = document.getElementById('btn-save');
  const btnPrint = document.getElementById('btn-print');

  function playPageFlipSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const bufferSize = audioCtx.sampleRate * 0.18;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000 + Math.random() * 400, audioCtx.currentTime);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noise.start();
      noise.stop(audioCtx.currentTime + 0.18);
    } catch (e) {}
  }

  function buildBook() {
    bookContainer.innerHTML = '';
    
    for (let i = 1; i <= TOTAL_PAGES; i++) {
      const pageEl = document.createElement('article');
      pageEl.className = `page ${i === 1 ? 'active' : ''}`;
      pageEl.dataset.page = i;
      pageEl.style.zIndex = TOTAL_PAGES - i + 1;

      if (i === 1) {
        pageEl.innerHTML = createCoverHTML();
      } else if (i === 2) {
        pageEl.innerHTML = createTeacherPageHTML();
      } else if (i === TOTAL_PAGES) {
        pageEl.innerHTML = createClosingPageHTML();
      } else {
        pageEl.innerHTML = createStudentPageHTML(i - 2);
      }

      pageEl.addEventListener('click', (e) => {
        if (e.target.closest('.editable, .photo-input, .sig-file-input, .signature-upload-btn, .sticker-btn, .dropped-sticker')) return;
        if (i === currentPage && currentPage < TOTAL_PAGES) {
          goToPage(currentPage + 1);
        }
      });

      bookContainer.appendChild(pageEl);

      const option = document.createElement('option');
      option.value = i;
      if (i === 1) option.textContent = '1. Portada';
      else if (i === 2) option.textContent = '2. Profesor: ' + TEACHER.name;
      else if (i === TOTAL_PAGES) option.textContent = `${i}. Cierre / Contraportada`;
      else option.textContent = `${i}. ${STUDENTS[i - 3].name}`;
      pageSelect.appendChild(option);
    }

    loadStoredData();
    setupEditablePersistence();
    setupImageUploaders();
    setupSignatureUploaders();
    setupStickers();
  }

  function createCoverHTML() {
    return `
      <div class="washi-tape"></div>
      <div class="cover-page">
        <div class="cover-badge-top">✦ EDICIÓN ESPECIAL ✦</div>
        <div class="cover-main-hero">
          <h1 class="cover-giant-title">ANUARIO</h1>
          <span class="cover-giant-script">Promoción 2026</span>
        </div>
        <div class="cover-school-block">
          <p class="cover-school-name">INSTITUCIÓN EDUCATIVA<br>EUGENIO FERRO FALLA</p>
        </div>
        <div class="cover-motto-ribbon">"Hoy estudiante, mañana gran sueño"</div>
        <div class="cover-year-bottom">— CIENCIA Y VIRTUD —</div>
      </div>
    `;
  }

  function profileHTML(d, key, opts) {
    const asp = d.asp.slice(0, 4);
    while (asp.length < 4) asp.push('');
    const aspHTML = asp.map((a, idx) =>
      `<li class="editable" contenteditable="true" data-key="asp${idx + 1}_${key}">${esc(a)}</li>`).join('');
    const hasSig = !!d.sig;
    const sigFallback = "this.style.display='none';this.closest('.info-block').querySelector('.signature-box').style.display=''";
    return `
      <div class="washi-tape"></div>
      <header class="page-header-mini">
        <span class="school-tag">I.E. EUGENIO FERRO FALLA</span>
        ${opts.num ? `<span style="font-family: var(--font-script); font-weight: bold; font-size: 1.5rem; color: var(--red-institutional);">#${opts.num}</span>` : `<span class="school-tag">DOCENTE DE LA TÉCNICA</span>`}
      </header>

      <section class="student-grid">
        <label class="polaroid-frame" title="Hacer clic para cambiar foto">
          <img src="${d.photo ? driveImg(d.photo) : PH}" class="polaroid-img" alt="${esc(d.name)}" data-key="photo_${key}" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src=window.PH">
          <input type="file" class="photo-input" accept="image/*">
          <span class="polaroid-label">${opts.label}</span>
        </label>

        <div class="student-info">
          <div class="info-block">
            <span class="block-tag green">👤 Nombre Completo</span>
            <div class="editable student-name-input" contenteditable="true" data-key="name_${key}">${esc(d.name)}</div>
          </div>

          <div class="info-block highlight">
            <span class="block-tag pink">💬 Frase Favorita</span>
            <div class="editable quote-input" contenteditable="true" data-key="quote_${key}">${esc(quoted(d.quote))}</div>
          </div>
        </div>
      </section>

      <section class="bottom-sections" style="margin-top: 0.4rem;">
        <div class="info-block scroll-box">
          <span class="block-tag green">⭐ Recuerdo Favorito</span>
          <div class="editable content-fun-font" contenteditable="true" data-key="memory_${key}">${esc(d.memory)}</div>
        </div>

        <div class="info-block scroll-box">
          <span class="block-tag pink">🎯 Mis Aspiraciones</span>
          <ul class="aspirations-list content-fun-font">${aspHTML}</ul>
        </div>
      </section>

      <div class="bottom-sections">
        <div class="info-block large-space">
          <span class="block-tag blue">💌 Agradecimientos</span>
          <div class="editable content-fun-font" contenteditable="true" data-key="thanks_${key}">${esc(d.thanks)}</div>
        </div>

        <div class="info-block">
          <span class="block-tag green">✍️ ${opts.sigLabel}</span>
          <div class="signature-container">
            <div class="signature-box editable content-fun-font" contenteditable="true" data-key="sigtext_${key}" style="${hasSig ? 'display:none' : ''}">${opts.sigText}</div>
            <label class="signature-upload-btn">
              📂 Subir Firma
              <input type="file" class="sig-file-input" accept="image/*">
            </label>
          </div>
          <div style="text-align: center; margin-top: 4px;">
            <img src="${hasSig ? driveImg(d.sig) : ''}" alt="Firma" class="signature-img-preview" data-key="sigimg_${key}" referrerpolicy="no-referrer" style="${hasSig ? 'display:inline-block' : ''}" ${hasSig ? `onerror="${sigFallback}"` : ''}>
          </div>
        </div>
      </div>

      <footer class="page-footer-note">${opts.footer}</footer>
    `;
  }

  function createTeacherPageHTML() {
    return profileHTML(TEACHER, 'teacher', {
      label: 'Foto Profe', sigLabel: 'Firma del Docente', sigText: 'Firma del Profe',
      footer: 'Con mucho orgullo para la Promoción 2026 ✨'
    });
  }

  function createStudentPageHTML(studentNum) {
    return profileHTML(STUDENTS[studentNum - 1], studentNum, {
      num: studentNum, label: 'Mi Foto', sigLabel: 'Firma del Estudiante', sigText: 'Firma digital',
      footer: 'Gracias por ser parte de esta gran familia ✨'
    });
  }

  function createClosingPageHTML() {
    return `
      <div class="washi-tape"></div>
      <div class="closing-page">
        <h2 class="closing-title">¡PROMOCIÓN 2026!</h2>
        <div class="closing-subtitle">"Hoy estudiante, mañana gran sueño"</div>
        <p style="font-size: 1.15rem; color: #0b6623; max-width: 460px; line-height: 1.6;">
          Este anuario guarda los recuerdos, risas y aspiraciones de una etapa inolvidable en la <strong>Institución Educativa Eugenio Ferro Falla</strong>. ¡Mucho éxito en el futuro!
        </p>
        <div style="font-size: 3.5rem;">🎓✨🚀</div>
      </div>
    `;
  }

  function goToPage(targetPage) {
    if (targetPage < 1 || targetPage > TOTAL_PAGES) return;
    
    playPageFlipSound();

    const pages = document.querySelectorAll('.page');
    pages.forEach((page) => {
      const pageNum = parseInt(page.dataset.page);
      if (pageNum < targetPage) {
        page.classList.add('flipped');
        page.classList.remove('active');
      } else if (pageNum === targetPage) {
        page.classList.remove('flipped');
        page.classList.add('active');
      } else {
        page.classList.remove('flipped', 'active');
      }
    });

    currentPage = targetPage;
    pageSelect.value = currentPage;
  }

  btnNext.addEventListener('click', () => goToPage(currentPage + 1));
  btnPrev.addEventListener('click', () => goToPage(currentPage - 1));
  pageSelect.addEventListener('change', (e) => goToPage(parseInt(e.target.value)));

  document.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('editable')) return;
    if (e.key === 'ArrowRight') goToPage(currentPage + 1);
    if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
  });

  function saveToStorage(key, value) {
    localStorage.setItem('anuario_' + key, value);
    try { db.ref('anuario/' + key).set(value); } catch(e){}
    btnSave.textContent = '☁️ Guardado';
    setTimeout(() => { btnSave.textContent = '☁️ Sincronizado en la Nube'; }, 1000);
  }

  function loadStoredData() {
    for (let i = 0; i < localStorage.length; i++) {
      const fullKey = localStorage.key(i);
      if (fullKey.startsWith('anuario_')) {
        const key = fullKey.replace('anuario_', '');
        const val = localStorage.getItem(fullKey);

        const textEl = document.querySelector(`[data-key="${key}"]`);
        if (textEl && textEl.classList.contains('editable')) {
          textEl.innerHTML = val;
        }

        const imgEl = document.querySelector(`img[data-key="${key}"]`);
        if (imgEl) {
          imgEl.src = val;
          if (imgEl.classList.contains('signature-img-preview')) {
            imgEl.style.display = 'inline-block';
            const sigBox = imgEl.closest('.info-block').querySelector('.signature-box');
            if (sigBox) sigBox.style.display = 'none';
          }
        }
      }
    }
  }

  function setupEditablePersistence() {
    document.querySelectorAll('.editable').forEach(el => {
      el.addEventListener('input', () => {
        const key = el.dataset.key;
        if (key) saveToStorage(key, el.innerHTML);
      });
    });
  }

  function setupImageUploaders() {
    document.querySelectorAll('.photo-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const frame = e.target.closest('.polaroid-frame');
            if (frame) {
              const img = frame.querySelector('.polaroid-img');
              if (img) {
                img.src = event.target.result;
                const key = img.dataset.key;
                if (key) saveToStorage(key, event.target.result);
              }
            }
          };
          reader.readAsDataURL(file);
        }
      });
    });
  }

  function setupSignatureUploaders() {
    document.querySelectorAll('.sig-file-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const container = e.target.closest('.info-block');
            const textBox = container.querySelector('.signature-box');
            const previewImg = container.querySelector('.signature-img-preview');
            
            textBox.style.display = 'none';
            previewImg.src = event.target.result;
            previewImg.style.display = 'inline-block';

            const key = previewImg.dataset.key;
            if (key) saveToStorage(key, event.target.result);
          };
          reader.readAsDataURL(file);
        }
      });
    });
  }

  function setupStickers() {
    document.querySelectorAll('.sticker-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const emoji = btn.dataset.sticker;
        const activePage = document.querySelector('.page.active');
        if (activePage) {
          const stickerEl = document.createElement('div');
          stickerEl.className = 'dropped-sticker';
          stickerEl.textContent = emoji;
          stickerEl.style.left = `${Math.random() * 60 + 20}%`;
          stickerEl.style.top = `${Math.random() * 60 + 20}%`;
          
          let isDragging = false;
          let offsetX, offsetY;

          stickerEl.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - stickerEl.getBoundingClientRect().left;
            offsetY = e.clientY - stickerEl.getBoundingClientRect().top;
          });

          document.addEventListener('mousemove', (e) => {
            if (isDragging) {
              const pageRect = activePage.getBoundingClientRect();
              stickerEl.style.left = `${e.clientX - pageRect.left - offsetX}px`;
              stickerEl.style.top = `${e.clientY - pageRect.top - offsetY}px`;
            }
          });

          document.addEventListener('mouseup', () => { isDragging = false; });

          stickerEl.addEventListener('dblclick', () => stickerEl.remove());
          activePage.appendChild(stickerEl);
        }
      });
    });
  }

  btnPrint.addEventListener('click', () => window.print());

  buildBook();
});