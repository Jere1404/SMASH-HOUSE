# SMASH HOUSE 3.0

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

El flujo de pedido es **Menú → Carrito → Datos del cliente → Revisar pedido → WhatsApp**. Con productos en el carrito, “FINALIZAR PEDIDO” permite completar los datos. Después de validarlos se muestra el mensaje generado. Si `SITE_CONFIG.whatsappNumber` contiene un número autorizado con formato válido, aparece “ABRIR WHATSAPP”. El enlace usa `encodeURIComponent` y solo abre un **borrador**: el visitante decide si lo envía. Si el número está vacío o no tiene formato válido, se mantiene la vista previa con la opción de copiar el mensaje. No se envía automáticamente ni se confirma una compra; abrir WhatsApp no vacía el carrito.

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


## Pedidos por WhatsApp — versión 3.0

Rama de desarrollo: `feat/smash-house-v3-whatsapp`, creada desde `main` en el commit `e6a0c17`.

### Datos y validación

- Nombre obligatorio (hasta 100 caracteres).
- Modalidad obligatoria: retiro en el local o delivery.
- Dirección obligatoria solo para delivery (hasta 250 caracteres). Con retiro, se oculta y no se incluye en el mensaje; si volvés a delivery, se conserva lo que habías escrito.
- Observaciones opcionales (hasta 800 caracteres).
- Los campos obligatorios no aceptan valores formados únicamente por espacios. Los errores aparecen junto al campo y el foco va al primer dato que necesita corrección.
- No se puede finalizar un carrito vacío.

El mensaje incluye nombre, modalidad, dirección si corresponde, nombres de productos, cantidades, precio unitario, subtotal por producto, total y observaciones si existen. Los importes provienen del carrito actual y se formatean con separadores argentinos y la indicación ARS. Los precios siguen siendo ficticios. No hay pagos, cobros ni cálculo de tarifas de envío.

Podés volver al carrito o editar tus datos sin perder los productos. Si cambiás cantidades, se genera un nuevo mensaje al revisar. Cerrar el diálogo conserva los datos durante la sesión. Recargar la página reinicia el carrito y el formulario. No se guardan datos personales en almacenamiento persistente ni se envían a un servidor.

El número se configura **solo en `SITE_CONFIG.whatsappNumber`, al inicio de `script.js`**. Está vacío por defecto. Ingresar únicamente un número autorizado, en formato internacional con solo dígitos. No usar números de ejemplo. Este proyecto no incluye ningún teléfono real ni inventado.

### Vista previa y copia

La vista previa está disponible con o sin número configurado. “COPIAR MENSAJE” usa la API del portapapeles cuando el navegador lo permite. Si está bloqueada o no está disponible (por ejemplo, según la configuración al abrir un archivo local), se selecciona el texto y se muestran instrucciones para copiarlo manualmente. No se afirma que el mensaje haya sido enviado.

### Pruebas de la versión 3.0

Se verificó en Chromium mediante un servidor estático:

- Agregar y eliminar productos, incrementar y reducir cantidades, totales y bloqueo del carrito vacío.
- Validaciones de nombre, modalidad y dirección, incluidos valores con solo espacios; alternar delivery/retiro y omitir la dirección para retiro.
- Mensajes con precios unitarios, subtotales y total exactos en ARS; nombres con acentos y emoji, observaciones multilínea y caracteres especiales.
- Vista previa sin teléfono, copia al portapapeles y selección manual cuando falla la copia automática.
- Regresar al carrito y editar datos sin perder productos; regenerar los importes después de cambiar cantidades.
- Construcción y codificación del enlace de WhatsApp mediante un destino simbólico de prueba, sin configurar teléfonos ni realizar solicitudes externas. El carrito se conserva al abrir el enlace.
- Navegación por teclado, foco dentro del diálogo y Escape; filtros del menú; sin errores JavaScript ni recursos fallidos.
- Pasos del carrito, formulario y revisión sin desbordes en 320, 375, 390, 768, 1024 y 1440 px.

Las fotografías, el encabezado, la portada y las secciones existentes se mantienen. No se publicó el sitio ni se fusionó con `main`.
