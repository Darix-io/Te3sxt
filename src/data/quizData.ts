export interface Option {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  distractorAnalysis?: string;
}

export interface Question {
  id: number;
  topic: string;
  topicKey: 'paquetes' | 'tcpip' | 'lan_wan' | 'router' | 'isp';
  competency: string;
  reference: string;
  scenario: string;
  statement: string;
  options: Option[];
  correctOptionId: 'A' | 'B' | 'C' | 'D';
  pedagogicalFeedback: string;
  bloomLevel: 'Análisis' | 'Aplicación' | 'Comprensión';
}

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    topic: 'Fraccionamiento de Información y Paquetes de Datos',
    topicKey: 'paquetes',
    competency: 'Comprende el mecanismo de conmutación de paquetes, el enrutamiento dinámico y la tolerancia a fallos en la transferencia de datos.',
    reference: 'Tanenbaum & Wetherall (2011) / Compendio UNEMI Unidad 1, Subtema 1.1.1',
    scenario: 'Un estudiante de la Facultad de Ciencias e Ingeniería (UNEMI) envía un informe investigativo de 15 MB al aula virtual. En medio de la transmisión digital, un nodo troncal intermedio sufre congestión severa por tráfico saturado.',
    statement: 'De acuerdo con los principios de conmutación de paquetes descritos en la literatura fundamental de redes, ¿cómo reacciona la arquitectura de Internet para garantizar la entrega íntegra del documento?',
    options: [
      {
        id: 'A',
        text: 'El archivo completo es retenido en el conmutador local emisor hasta que la ruta física original quede totalmente desocupada, evitando la fragmentación.',
        distractorAnalysis: 'Distractor que confunde conmutación de paquetes con conmutación de circuitos tradicional (como la telefonía antigua), donde se requiere una ruta fija dedicada.'
      },
      {
        id: 'B',
        text: 'La información se subdivide en paquetes autónomos que viajan de forma independiente por las rutas más eficientes disponibles y se reensamblan en orden secuencial en el destino.',
        distractorAnalysis: 'Respuesta correcta: describe fielmente el principio de datagramas independientes con cabeceras de secuencia y reensamblaje en destino.'
      },
      {
        id: 'C',
        text: 'El protocolo aborta la transmisión y solicita obligatoriamente que el usuario recomprima el archivo a un tamaño menor al ancho de banda instantáneo del canal.',
        distractorAnalysis: 'Distractor incorrecto; los protocolos de transporte no cancelan una sesión por congestión transitoria, sino que aplican control de flujo y retransmisión.'
      },
      {
        id: 'D',
        text: 'Todos los fragmentos deben viajar forzosamente en hilera cerrada por un único cable submarino previamente reservado, descartando los paquetes que experimenten fluctuación.',
        distractorAnalysis: 'Distractor engañoso; Internet no exige que todos los paquetes compartan el mismo camino físico simultáneo, sino que aprovecha la malla de nodos distribuidos.'
      }
    ],
    correctOptionId: 'B',
    pedagogicalFeedback: 'En Internet la información no viaja en un bloque monolítico; se fracciona en pequeños paquetes de datos dotados de metadatos (origen, destino y número de secuencia). Cada paquete viaja de forma independiente aprovechando la ruta más ágil en cada milisegundo a través de los nodos de la red (según Tanenbaum & Wetherall, 2011). Al llegar al host de destino, se reensamblan en el orden correcto, garantizando resiliencia y alta eficiencia ante nodos congestionados.',
    bloomLevel: 'Análisis'
  },
  {
    id: 2,
    topic: 'Funciones del Protocolo Universal TCP/IP',
    topicKey: 'tcpip',
    competency: 'Identifica la coexistencia y articulación de capas entre el protocolo de control de transmisión (TCP) y el protocolo de Internet (IP).',
    reference: 'Tanenbaum & Wetherall (2011) / Compendio UNEMI Unidad 1, Subtema 1.1.1',
    scenario: 'Al iniciar sesión en la plataforma Moodle institucional, el navegador web solicita la descarga de diapositivas y guías didácticas, activando la pila de protocolos TCP/IP en la interfaz de red del usuario.',
    statement: '¿Cuál es la delimitación funcional precisa y coordinada entre el protocolo IP y el protocolo TCP durante esta comunicación?',
    options: [
      {
        id: 'A',
        text: 'IP se encarga del direccionamiento lógico y el enrutamiento de los paquetes a través de las redes, mientras que TCP gestiona la división de datos, verificación de integridad, control de errores y reordenamiento en destino.',
        distractorAnalysis: 'Respuesta correcta: refleja con exactitud la división de tareas entre la capa de red (IP: dónde va cada paquete) y la capa de transporte (TCP: confiabilidad y orden).'
      },
      {
        id: 'B',
        text: 'TCP modula la señal de radiofrecuencia física de la antena Wi-Fi, mientras que IP renderiza visualmente el código HTML y CSS en la pantalla del computador.',
        distractorAnalysis: 'Distractor que confunde protocolos lógicos con la capa física de hardware (Wi-Fi 802.11) y la capa de aplicación/renderizado del navegador.'
      },
      {
        id: 'C',
        text: 'IP se encarga de retransmitir los paquetes perdidos mediante acuses de recibo (ACKs), mientras que TCP únicamente asigna números identificadores de 32 bits a las tarjetas de red.',
        distractorAnalysis: 'Distractor con funciones invertidas y erróneas; IP es un protocolo no orientado a conexión (best-effort); la garantía de entrega corresponde a TCP.'
      },
      {
        id: 'D',
        text: 'TCP opera exclusivamente en redes locales cableadas (LAN), mientras que IP es un protocolo exclusivo para conexiones inalámbricas por satélite.',
        distractorAnalysis: 'Distractor conceptualmente absurdo; TCP e IP trabajan de forma conjunta en cualquier medio físico de transmisión, sea cableado, inalámbrico o satelital.'
      }
    ],
    correctOptionId: 'A',
    pedagogicalFeedback: 'El conjunto TCP/IP opera como el "reglamento de tránsito" fundamental de la red global. IP (Internet Protocol) cumple la función de navegación y direccionamiento: etiqueta cada paquete con las direcciones IP de origen y destino para que los routers sepan cómo guiarlo. Por su parte, TCP (Transmission Control Protocol) garantiza la confiabilidad: fracciona el mensaje en origen, detecta paquetes dañados o perdidos solicitando su reenvío, y reordena los paquetes antes de entregarlos a la aplicación receptora.',
    bloomLevel: 'Comprensión'
  },
  {
    id: 3,
    topic: 'Identificación de Redes Locales (LAN) frente a Redes Globales (WAN)',
    topicKey: 'lan_wan',
    competency: 'Distingue las características topológicas, de alcance geográfico y de autonomía funcional entre redes LAN y WAN.',
    reference: 'Forouzan (2007) / Compendio UNEMI Unidad 1, Subtema 1.1.2',
    scenario: 'En los laboratorios de cómputo de la UNEMI, las 40 estaciones de trabajo pueden compartir archivos entre sí a alta velocidad y enviar documentos a la impresora central. Sin embargo, repentinamente ningún equipo logra abrir páginas web externas ni acceder al repositorio digital internacional.',
    statement: 'Con base en la clasificación de redes por alcance geográfico y funcionamiento descrita por Forouzan (2007), ¿qué diagnóstico técnico explica con exactitud lo sucedido?',
    options: [
      {
        id: 'A',
        text: 'La red LAN ha dejado de existir porque ninguna red local puede transmitir un solo bit interno si no se encuentra sincronizada en tiempo real con un motor de búsqueda.',
        distractorAnalysis: 'Distractor falaz; una red local es completamente autónoma para servicios internos y no depende de motores de búsqueda externos.'
      },
      {
        id: 'B',
        text: 'La red de área local (LAN) se mantiene en perfecto funcionamiento para la comunicación entre dispositivos cercanos, pero se ha interrumpido la conexión de enlace hacia la red de área amplia (WAN / Internet).',
        distractorAnalysis: 'Respuesta correcta: evidencia la separación entre la infraestructura confinada local (LAN) y el enlace de telecomunicaciones hacia la red global (WAN).'
      },
      {
        id: 'C',
        text: 'El laboratorio se configuró originalmente como una red WAN exclusiva, por lo que al perder señal internacional las computadoras bloquean automáticamente sus puertos USB y discos locales.',
        distractorAnalysis: 'Distractor inverosímil; un laboratorio físico universitario representa paradigmáticamente una red LAN, jamás una red WAN aislada.'
      },
      {
        id: 'D',
        text: 'Las computadoras del laboratorio sufrieron una desconfiguración del protocolo TCP que impidió que las señales eléctricas viajen por los cables de red del edificio.',
        distractorAnalysis: 'Distractor que confunde la conectividad de enlace físico local con fallos de la pasarela troncal externa.'
      }
    ],
    correctOptionId: 'B',
    pedagogicalFeedback: 'De acuerdo con Forouzan (2007), las redes se clasifican por su alcance geográfico. Una red LAN (Local Area Network) interconecta dispositivos en un espacio físico acotado (como un laboratorio o campus universitario), compartiendo recursos locales (impresoras, archivos locales) de manera autónoma. En cambio, una red WAN (Wide Area Network) enlaza países y continentes, siendo Internet la mayor WAN del planeta. Cuando el enlace externo cae, la LAN sigue operativa localmente pero queda aislada de la WAN.',
    bloomLevel: 'Análisis'
  },
  {
    id: 4,
    topic: 'Rol Operativo del Router en la Red Doméstica',
    topicKey: 'router',
    competency: 'Analiza la función del router como dispositivo de conmutación e interconexión entre la subred privada local y la red pública externa.',
    reference: 'Compendio UNEMI Unidad 1, Subtema 1.1.2 / Planificación Didáctica Día 1',
    scenario: 'En un domicilio particular en Milagro, un estudiante asiste a clases virtuales mientras otros familiares usan computadoras y Smart TVs conectadas al mismo router doméstico. Durante una tormenta, una rama corta el cable de fibra óptica que conecta la vivienda con el poste de la calle. El estudiante observa que su celular sigue marcando el icono de Wi-Fi con señal excelente, pero las aplicaciones muestran "Sin conexión a Internet".',
    statement: '¿Cuál es la función operativa del router doméstico que fundamenta técnica y didácticamente esta situación cotidiana?',
    options: [
      {
        id: 'A',
        text: 'El router es simplemente una batería portátil; al cortarse el cable externo se agota su energía y emite falsas señales de radio que no transmiten frecuencias reales.',
        distractorAnalysis: 'Distractor erróneo que asume una naturaleza puramente pasiva y mecánica sin entender la función de conmutación de red del router.'
      },
      {
        id: 'B',
        text: 'El router actúa como "guardia de tránsito" y compuerta de enlace (gateway): gestiona la red inalámbrica local (WLAN) interconectando los equipos de la casa, pero al perder la conexión física con el ISP no puede reenviar paquetes hacia la red exterior.',
        distractorAnalysis: 'Respuesta correcta: desglosa la dualidad del router como punto de acceso local (WLAN) y pasarela hacia la red WAN del proveedor.'
      },
      {
        id: 'C',
        text: 'El router descarga periódicamente una réplica total de la red Internet en su memoria flash interna, por lo que el mensaje de error es un fallo exclusivo de la pantalla del smartphone.',
        distractorAnalysis: 'Distractor absurdo que asume capacidades de almacenamiento imposibles para un dispositivo doméstico.'
      },
      {
        id: 'D',
        text: 'El router solo puede conectarse a un dispositivo a la vez, por lo que al desconectarse el cable exterior entra en conflicto de direcciones físicas entre los celulares conectados.',
        distractorAnalysis: 'Distractor que desconoce la capacidad de multiplexación y enrutamiento simultáneo de los routers domésticos modernos.'
      }
    ],
    correctOptionId: 'B',
    pedagogicalFeedback: 'El router hogareño cumple un doble rol esencial: por el lado interno actúa como director de tráfico de la red local (WLAN/LAN), asignando direcciones IP privadas y manteniendo la comunicación inalámbrica activa entre los dispositivos del hogar (por eso el icono de Wi-Fi sigue conectado y con señal fuerte). Por el lado externo, sirve como puerta de enlace (Gateway) hacia el ISP. Si la línea física externa se corta, la red local no desaparece, pero pierde el puente que le permite enviar y recibir paquetes desde los servidores de Internet.',
    bloomLevel: 'Aplicación'
  },
  {
    id: 5,
    topic: 'Función e Impacto de los ISPs en el Entorno Ecuatoriano',
    topicKey: 'isp',
    competency: 'Evalúa la estructura y el impacto de los Proveedores de Servicios de Internet (ISPs) en el acceso a la infraestructura global de telecomunicaciones.',
    reference: 'Compendio UNEMI Unidad 1, Subtema 1.1.1 (CNT, Claro, Netlife, Movistar)',
    scenario: 'Una unidad académica en la provincia del Guayas debe seleccionar un proveedor de servicios de Internet (ISP) corporativo entre empresas como CNT, Netlife o Claro para abastecer con ancho de banda y conectividad simétrica a sus facultades.',
    statement: 'Desde la perspectiva de la arquitectura de redes y el contexto de telecomunicaciones del Ecuador, ¿cuál es la función técnica primordial y el impacto operativo que tienen los ISPs en la experiencia digital de los usuarios?',
    options: [
      {
        id: 'A',
        text: 'Desarrollar plataformas de redes sociales exclusivas para el territorio nacional y comercializar licencias obligatorias de motores de búsqueda.',
        distractorAnalysis: 'Distractor que confunde empresas generadoras de contenido y plataformas de software con proveedores de infraestructura de conectividad.'
      },
      {
        id: 'B',
        text: 'Proveer la infraestructura de transporte físico (fibra óptica, cables submarinos o radioenlaces) y el enrutamiento troncal que conecta las redes locales residenciales e institucionales a la red troncal mundial de Internet.',
        distractorAnalysis: 'Respuesta correcta: define técnicamente el rol del ISP como puente de telecomunicaciones, asignador de conectividad IP y gestor del ancho de banda hacia el backbone mundial.'
      },
      {
        id: 'C',
        text: 'Sustituir los protocolos TCP/IP convencionales por frecuencias radiales propietarias que impiden que los datos deban fraccionarse en paquetes.',
        distractorAnalysis: 'Distractor falso; los ISPs no sustituyen TCP/IP, sino que lo emplean universalmente como base de interoperabilidad.'
      },
      {
        id: 'D',
        text: 'Fabricar físicamente los microprocesadores y circuitos integrados de las computadoras y teléfonos inteligentes que se importan al país.',
        distractorAnalysis: 'Distractor que confunde el sector de manufactura de hardware electrónico con los servicios de telecomunicaciones y acceso a redes.'
      }
    ],
    correctOptionId: 'B',
    pedagogicalFeedback: 'Un ISP (Internet Service Provider) es la entidad que construye, mantiene y comercializa la infraestructura de acceso físico y lógico a Internet (en Ecuador, ejemplos notorios son la empresa pública CNT y operadoras privadas como Netlife, Claro y Movistar). Su función operativa radica en brindar la "última milla" de conexión (por fibra óptica o red móvil) e interconectar esas redes con los backbones nacionales y los cables submarinos internacionales. Sin un ISP, una red local carece del canal físico y lógico para incorporarse a la gran red global WAN.',
    bloomLevel: 'Comprensión'
  }
];

export interface QuizTopicSummary {
  key: string;
  name: string;
  questionCount: number;
  description: string;
}

export const QUIZ_TOPICS: QuizTopicSummary[] = [
  {
    key: 'paquetes',
    name: 'Fraccionamiento en Paquetes',
    questionCount: 1,
    description: 'Comportamiento de la información dividida en fragmentos con rutas independientes y reensamblaje secuencial.'
  },
  {
    key: 'tcpip',
    name: 'Protocolo Universal TCP/IP',
    questionCount: 1,
    description: 'Reglamento maestro: funciones de transporte e integridad de TCP coordinadas con el direccionamiento lógico de IP.'
  },
  {
    key: 'lan_wan',
    name: 'Redes LAN vs WAN',
    questionCount: 1,
    description: 'Diferenciación geográfica y técnica entre redes de alcance local (campus/laboratorio) y la red de área amplia global.'
  },
  {
    key: 'router',
    name: 'Rol Operativo del Router',
    questionCount: 1,
    description: 'Guardia de tránsito que conecta y media entre la red local doméstica/institucional y la pasarela del ISP.'
  },
  {
    key: 'isp',
    name: 'ISPs en Ecuador (CNT, Netlife, etc.)',
    questionCount: 1,
    description: 'Proveedores de Servicios de Internet: infraestructura de última milla, ancho de banda y acceso a backbones globales.'
  }
];
