# Service Learning GEA UPC

Landing page en español para presentar el programa Service Learning de GEA UPC, sus actividades junto a Casa Generación y las formas de participar como voluntario o apoyar sus iniciativas.

## Tecnologías

- **HTML5:** contenido y estructura de la página.
- **CSS3:** estilos, variables de color, componentes y adaptación a distintos tamaños de pantalla.
- **JavaScript nativo:** navegación e interacciones, sin dependencias externas.

El sitio es estático. No necesita instalar paquetes, compilar archivos, configurar variables de entorno ni conectar una base de datos.

## Estructura

```text
landing-page/
├── index.html             # Contenido completo y estructura de la landing
├── css/
│   └── styles.css         # Estilos y reglas responsive
├── js/
│   └── main.js            # Inicialización y funciones de interacción
├── assets/
│   ├── logo.jpg
│   ├── grupo.jpg
│   ├── grupo_vertical.jpg
│   ├── piano.jpg
│   ├── visita.jpg
│   └── rifa.jpg
└── README.md
```

## Ejecutar localmente

Abre `index.html` directamente en un navegador moderno. El contenido, los estilos y las interacciones funcionan sin un servidor.

También puedes servir la carpeta desde la terminal si tienes Python 3 instalado:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

En Windows puedes usar `py` en lugar de `python`. Abre [http://127.0.0.1:8000](http://127.0.0.1:8000) y detén el servidor con `Ctrl+C` cuando termines.

## Secciones e interacciones

| Sección | Contenido y comportamiento |
| --- | --- |
| Inicio | Presentación y accesos a las otras secciones. |
| Sobre Service Learning | Descripción del programa y principios de aprendizaje que muestran una explicación al seleccionarlos. |
| Actividades e impacto | Galería con filtros por visitas, proyectos y eventos; ampliación de fotografías. |
| Para voluntarios | Pasos orientativos para participar, preguntas frecuentes desplegables y enlaces a Instagram. |
| Apóyanos | Posibles usos de los aportes e información sobre medios pendientes de confirmación oficial. |

La navegación resalta la sección visible. En pantallas pequeñas se utiliza un menú desplegable, que se cierra al elegir una sección, hacer clic fuera o pulsar `Escape`. Las fotografías ampliadas también se cierran con `Escape` y devuelven el foco al elemento que las abrió.

Los medios de aporte son **informativos**: el sitio no procesa pagos, no publica cuentas ni códigos QR y no registra donaciones. Los canales deben ser confirmados por la Comisión de Finanzas.

## Organización y mantenimiento

- Edita textos, enlaces, imágenes y preguntas frecuentes en `index.html`. Todo el contenido principal está disponible aunque JavaScript esté desactivado.
- Edita la apariencia en `css/styles.css`. Las variables de color están en `:root`; el archivo conserva el orden de las reglas y agrupa los estilos por secciones, interacciones y tamaños de pantalla. Los detalles de composición también usan clases, sin estilos en línea.
- Edita el comportamiento en `js/main.js`. Las funciones `initNavigation`, `initLearningPrinciples`, `initGallery` e `initPayments` separan las responsabilidades; `showLightbox` gestiona la ampliación de fotografías. El script se carga con `defer`, después de analizar el HTML, y mantiene sus variables fuera del ámbito global.
- Guarda las imágenes en `assets/` y actualiza su ruta y texto alternativo en el HTML cuando las reemplaces. `grupo.jpg` se conserva como recurso disponible, aunque la landing utiliza `grupo_vertical.jpg`.
- Mantén los identificadores de las secciones y los atributos `data-category` de filtros y fotografías sincronizados con sus enlaces y categorías.

## Comprobaciones

No hay herramientas de compilación ni una suite de pruebas instalada. Si tienes Node.js, puedes comprobar la sintaxis de JavaScript con:

```sh
node --check js/main.js
```

Al hacer cambios, comprueba en escritorio y móvil la navegación, el menú, los tres principios, los cuatro filtros de la galería, la apertura y cierre de fotografías, las preguntas frecuentes y los cuatro medios informativos de aporte. Revisa también el uso con teclado y la carga de las imágenes.

## Publicación

Puede alojarse en cualquier servidor de archivos estáticos. Publica `index.html` y las carpetas `css/`, `js/` y `assets/` juntas, conservando sus rutas relativas. No necesita un backend.
