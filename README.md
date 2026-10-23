# SMASH HOUSE · V4.2

Sitio web de demostración para una hamburguesería **ficticia** de Corrientes, Argentina, desarrollado como proyecto de aprendizaje y portfolio de desarrollo web.

Combina una identidad visual Modern/Bold y Street/Underground con un menú interactivo y un recorrido de pedido: **Menú → Carrito → Datos del cliente → Revisión → Mensaje para WhatsApp**.

**No representa un restaurante real ni procesa pedidos comerciales.** Los productos, precios y datos del local son de demostración.

## Ver el sitio

[**Abrir SMASH HOUSE**](https://jere1404.github.io/SMASH-HOUSE/)

Publicado mediante GitHub Pages.

## Tecnologías

- **HTML5:** estructura semántica, formularios y diálogo del pedido.
- **CSS3:** diseño responsive, grillas, animaciones y estados de foco.
- **JavaScript:** catálogo, filtros, carrito, validaciones y generación del mensaje.
- **Git y GitHub:** control de versiones y gestión del repositorio.
- **GitHub Pages:** alojamiento del sitio estático.

Sin frameworks, dependencias de ejecución, proceso de compilación ni claves API.

## Funcionalidades principales

- Diseño responsive con navegación para celulares, tablets y computadoras.
- Menú con categorías **Burgers**, **Papas & más** y **Bebidas**, y títulos que cambian con el filtro.
- Carrito con incorporación y eliminación de productos, modificación de cantidades, subtotales y cálculo del total en pesos argentinos.
- Formulario con nombre obligatorio, retiro o delivery, dirección obligatoria solo para delivery y observaciones opcionales.
- Revisión visual del pedido y generación de un mensaje completo para copiar o abrir voluntariamente en WhatsApp.
- Modo de prueba con un destino autorizado introducido por el usuario, válido únicamente mientras la página permanezca abierta.
- Mejoras de accesibilidad: etiquetas de formulario, errores asociados a campos, foco visible, navegación por teclado, diálogo modal y respeto por la preferencia de movimiento reducido.
- Anuncios accesibles breves para cambios de cantidades y eliminación; las pulsaciones rápidas se agrupan para evitar mensajes excesivos.
- Aviso durante el pedido: **al actualizar o cerrar la página se pierde su contenido**.
- Aviso y navegación alternativa entre secciones cuando JavaScript está desactivado. El catálogo interactivo y los pedidos requieren JavaScript.

### WhatsApp y privacidad de la demostración

No hay ningún teléfono configurado por defecto. Sin un destino autorizado se conserva la revisión del pedido y la opción de copiar el mensaje.

Para probar el enlace, completá un pedido, elegí **REVISAR PEDIDO**, activá **MODO DE PRUEBA** e ingresá un número cuyo uso tengas autorizado, con código de país. Solo se comprueba un formato internacional razonable; no se verifica su existencia ni la autorización de su titular.

El número de prueba no se guarda en almacenamiento persistente. Desactivar el modo lo borra. **Abrir WhatsApp genera un borrador: no envía automáticamente el mensaje, no confirma una compra y no vacía el carrito.**

Los campos públicos del local se encuentran en `SITE_CONFIG`, al principio de `script.js`. Permanecen vacíos en esta demo; no deben utilizarse para almacenar secretos ni credenciales.

## Optimización de recursos

- Fotografías convertidas de PNG a **WebP**, conservando los PNG originales como respaldo.
- Imágenes del menú y las salsas con **`srcset` y `sizes`**, para que el navegador elija una resolución adecuada al espacio disponible y a la densidad de pantalla.
- Fuente **Anton en WOFF2**, convertida sin subsetting: conserva los 1.373 glifos del TTF original. Se mantiene `font-display: swap`, el TTF de respaldo y su licencia.
- **Carga diferida** de imágenes del menú y las salsas mediante `loading="lazy"`.
- Portada WebP con una precarga de alta prioridad, sin lazy loading ni precargas masivas de las fotografías del menú.
- JavaScript cargado con `defer`.

## Resultados de rendimiento

Resultados de referencia registrados durante el proceso de optimización con **Google PageSpeed Insights para dispositivos móviles**:

| Métrica | Antes | Después |
| --- | ---: | ---: |
| Rendimiento | 73/100 | 97/100 |
| Accesibilidad | — | 100/100 |
| Buenas prácticas | — | 100/100 |
| SEO | — | 100/100 |
| Largest Contentful Paint (LCP) | 12,6 s | 2,6 s |

Son **mediciones de laboratorio de Lighthouse** y pueden variar según la red, el dispositivo simulado, la caché y las condiciones de prueba. No garantizan el mismo resultado en cada visita ni equivalen a una certificación completa de accesibilidad. Los guiones indican valores anteriores no informados.

## Cómo ejecutar el proyecto

### 1. Obtener el código

Con Git instalado, ejecutá en tu computadora:

```bash
git clone https://github.com/Jere1404/SMASH-HOUSE.git
cd SMASH-HOUSE
```

También podés descargar el ZIP del repositorio y extraer la carpeta completa, incluyendo `assets/`.

### 2. Abrir el sitio

El proyecto es estático y utiliza rutas relativas: no requiere instalar paquetes ni ejecutar una compilación. Podés abrir `index.html` junto con el resto de los archivos; algunas funciones del navegador, como la copia al portapapeles, pueden tener restricciones con `file://`.

Para una prueba consistente, se recomienda un servidor HTTP local. Si tenés **Python 3**, ejecutá desde la carpeta del proyecto:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

En Windows, si usás el lanzador de Python:

```powershell
py -m http.server 8000 --bind 127.0.0.1
```

Abrí `http://localhost:8000/` en el navegador de **la misma computadora donde ejecutaste el servidor**. Mantené la terminal abierta y presioná `Ctrl+C` para detenerlo. Python es una opción para servir los archivos, no una dependencia del sitio.

Si ejecutás el servidor en un entorno remoto, ese `localhost` pertenece al entorno remoto: necesitás un mecanismo de reenvío de puertos para acceder desde tu computadora.

## Estructura del proyecto

```text
SMASH-HOUSE/
├── index.html       # Secciones, navegación, formulario y diálogo del pedido
├── styles.css       # Diseño, responsive y estilos de accesibilidad
├── script.js        # Catálogo, filtros, carrito y flujo de pedido demo
├── assets/
│   ├── responsive/  # Variantes WebP del menú y las salsas
│   ├── Anton-Regular.woff2
│   ├── Anton-Regular.ttf
│   ├── Anton-OFL.txt
│   └── …            # Fotografías WebP, PNG de respaldo y recursos SVG
└── README.md
```

## Validación y alcance

Se realizaron pruebas en Chromium con pantallas emuladas, incluidos anchos de **320, 390, 768, 1024 y 1440 píxeles**: filtros, cantidades, totales, eliminación, validaciones, retiro/delivery, copia del mensaje, modo de prueba y navegación sin JavaScript.

Se verificó que el aviso de persistencia no tape campos ni botones, que las pulsaciones rápidas produzcan una única actualización del estado accesible y que no aparezcan errores de JavaScript o desbordes en los recorridos probados.

Las comprobaciones automatizadas de accesibilidad con axe no detectaron infracciones en los estados evaluados. **No sustituyen pruebas con un lector de pantalla real.** Quedan pendientes la validación manual con tecnologías de asistencia, dispositivos físicos y otros navegadores como Safari y Firefox. Durante las pruebas no se enviaron pedidos reales.

## Limitaciones y derechos de uso

- Productos y precios ficticios; pedidos exclusivamente demostrativos.
- Sin procesamiento de pagos, cobros, confirmación automática, reserva de stock ni cálculo de tarifas de delivery.
- El carrito y los datos del pedido no se conservan después de recargar o cerrar la página; no se añade almacenamiento persistente.
- La dirección, horarios, WhatsApp y ubicación comercial están pendientes de configuración autorizada.
- El menú interactivo y el flujo de pedido dependen de JavaScript. Sin él, se ofrece información y navegación básica, no un segundo catálogo.
- Abrir WhatsApp requiere conexión a Internet y que el usuario decida compartir el mensaje.
- Antes de cualquier utilización comercial, deben verificarse los derechos de uso de las fotografías, la marca y los demás recursos. La fuente Anton incluye su [licencia SIL Open Font License](assets/Anton-OFL.txt); esto no otorga una licencia general sobre el resto del proyecto.

SMASH HOUSE se presenta como una demo finalizada para portfolio: diseño e implementación de una interfaz responsive, interacción con JavaScript y mejoras de rendimiento, experiencia de usuario y accesibilidad.
