# SMASH HOUSE

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
- `assets/hero-burger.png`: imagen de hamburguesa generada con IA para esta demostración; se reutiliza como imagen ilustrativa de las cinco burgers y la sección de historia. No representa composiciones exactas de cada receta.
- `assets/fries.svg`, `rings.svg`, `drink.svg`, `lemonade.svg`: ilustraciones originales de demostración. Las salsas son ilustraciones realizadas con CSS.
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
