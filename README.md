# SMASH HOUSE 2.0

Sitio web estático de una hamburguesería **ficticia** de Corrientes, Argentina. Diseño basado en la referencia visual proporcionada: carbón, rojo intenso, blanco hueso, tipografía contundente y detalles streetwear.

## Cómo probarlo

Abrí `index.html` directamente en un navegador moderno. No requiere instalación, compilación, frameworks ni claves API. Las imágenes y la tipografía son locales y el sitio funciona sin conexión.

Opcionalmente, desde esta carpeta:

```sh
python3 -m http.server 8000
```

Abrí el puerto 8000 en tu navegador local. Para cerrar el servidor, presioná Ctrl+C.

Probá cambiar entre Burgers, Papas & más y Bebidas; agregar productos; abrir el carrito; aumentar, reducir y quitar cantidades; y verificar el total. El carrito se mantiene mientras la página está abierta y se reinicia al recargar. Usá Tab, Enter y Escape para recorrer la navegación y el carrito. El diálogo limita el foco mientras está abierto y se cierra con Escape. El menú móvil también se puede cerrar con Escape.

## Archivos

- `index.html`: estructura semántica, secciones, navegación y diálogo del carrito.
- `styles.css`: diseño responsive, tipografía local, efectos hover, foco visible y soporte para movimiento reducido.
- `script.js`: catálogo, filtros, carrito, cálculo de totales y configuración pública del local.
- `assets/hero-burger.png`: imagen de demostración utilizada en la portada y la sección de historia, conservadas sin cambios.
- `assets/fries.svg`, `rings.svg`, `drink.svg`, `lemonade.svg`: ilustraciones originales de demostración. Las salsas utilizan las fotografías nuevas detalladas a continuación.
- `assets/Anton-Regular.ttf` y `Anton-OFL.txt`: tipografía Anton, distribuida bajo SIL Open Font License; licencia incluida.

## Configuración del local

Al principio de `script.js`, completar `SITE_CONFIG` únicamente con información autorizada:

- `address`: dirección del local.
- `hours`: horarios de atención.
- `whatsappNumber`: número internacional, únicamente dígitos, sin espacios ni `+`. Vacío por defecto. No usar un número de ejemplo.
- `googleMapsUrl`: URL HTTPS del local en `google.com`, `www.google.com`, `maps.google.com` o `maps.app.goo.gl`. Vacío por defecto.

Sin esa configuración se muestran mensajes claros de información pendiente. El mapa es una ilustración de Corrientes, sin pin comercial real. No se realiza ninguna petición a Google Maps.

Cuando se configura un número válido y el carrito tiene productos, aparece un enlace que abre WhatsApp con el detalle del pedido y su total en un **borrador**. El visitante debe decidir si envía ese mensaje. El sitio nunca envía automáticamente ni muestra una confirmación de compra.

## Editar el menú y las imágenes

El arreglo `products` de `script.js` contiene nombres, ingredientes, categorías, precios e imágenes. Todos los importes son **ficticios en pesos argentinos** y se identifican como tales en el menú, el carrito y el borrador de WhatsApp. No hay pagos, envío, impuestos ni compra real.

Podés reemplazar las imágenes en `assets/` por fotografías propias o con licencia. Actualizá los campos `image` del catálogo y las rutas de `.hero-photo` y `.story-image` en CSS si cambiás el nombre de archivo. Evitá insertar contenido HTML no confiable en el catálogo: es configuración estática del desarrollador, no una fuente de datos externa.

## Compatibilidad y publicación posterior

Compatible con GitHub Pages: todos los enlaces a archivos son relativos. Para publicarlo luego de la revisión, usar la raíz del repositorio como carpeta de publicación. Esta entrega **no publica el sitio ni hace push a GitHub**.

Validación en Chromium mediante servidor estático; tamaños de celular, tablet y escritorio. La apertura directa usa recursos relativos sin módulos ni peticiones fetch; el navegador administrado de este entorno bloquea las URL file://, por lo que esa modalidad debe comprobarse en un navegador local. No requiere servicios externos para su funcionamiento. El acceso a WhatsApp o Maps, cuando se configure, sí requiere conexión a Internet.

## Validación de esta entrega

- Chromium: filtros de 5 burgers, 3 acompañamientos y 2 bebidas.
- Carrito: agregar, aumentar, reducir, quitar, estado vacío y totales exactos; WhatsApp oculto mientras no hay número autorizado.
- Navegación móvil, cierre con Escape y recorrido del foco dentro del carrito.
- Sin desborde horizontal en anchos de 320, 375, 390, 768, 1024 y 1440 px; sin imágenes de producto rotas ni errores de JavaScript durante las pruebas.
- Auditoría automatizada axe-core para WCAG A/AA y 2.1 AA: sin incidencias detectadas en vistas de 390 y 1440 px. No reemplaza una revisión manual completa con tecnologías de asistencia.


## Fotografías de la versión 2.0

Se integraron los ocho archivos de la rama `feat/smash-house-v2` sin modificarlos ni renombrarlos:

| Producto | Archivo exacto en `assets/` |
| --- | --- |
| THE OG | `THE OG.png` |
| HOT HONEY | `HOT HONEY.png` |
| TRUFFLE CLUB | `TRUFFLE CLUB.png` |
| SMOKED OUT | `SMOKED OUT .png` (espacio antes de `.png`) |
| THE MONSTER | `THE MOSNTER.png` (nombre original del archivo) |
| HOUSE SAUCE | `HOUSE SAUCE.png` |
| TRUFFLE MAYO | `TRUFFLE MAYO.png` |
| HOT HONEY, salsa | `HOT HONEY SAUCE.png` |

Las imágenes originales miden 1536 × 1024 px. Se presentan completas, con altura automática, sin recortes ni ampliación al pasar el mouse. Las tarjetas usan dos columnas en escritorio y una hasta 1000 px para dar espacio a los textos integrados. Los nombres siguen disponibles como encabezados para lectores de pantalla; los ingredientes de las burgers y las descripciones de las salsas se pueden desplegar como texto HTML legible. El precio y el botón de agregar permanecen fuera de la fotografía.

La descripción HTML de HOT HONEY incluye el bacon crujiente y los jalapeños que aparecen en su nueva fotografía. Los importes, los identificadores de producto y el funcionamiento del carrito no cambian. El título SECRET SAUCE SOCIETY se conserva y las salsas ahora se llaman HOUSE SAUCE, TRUFFLE MAYO y HOT HONEY.

### Pruebas de la actualización 2.0

- Las ocho imágenes cargan y se decodifican; se comprobó la correspondencia exacta entre archivo y producto.
- Imágenes completas con proporción 3:2, sin recortes ni zoom en hover; sin desbordes en 320, 375, 390, 768, 1000, 1024 y 1440 px. Revisión visual de menú y salsas en celular y escritorio.
- Ingredientes y descripciones desplegables; filtros 5/3/2; agregar, aumentar, reducir y quitar productos; carrito vacío y totales exactos; navegación móvil, Escape y foco del diálogo.
- Sin errores JavaScript ni recursos fallidos durante las pruebas. Auditoría automática axe-core sin incidencias en 390 y 1440 px.
- Se compararon las imágenes PNG contra los originales de la rama: sin alteraciones. Encabezado, portada, historia, precios y lógica de navegación, carrito y WhatsApp conservados.
