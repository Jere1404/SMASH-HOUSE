# SMASH HOUSE 3.2

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
- `assets/crispy-fries.png`, `loaded-fries.png`, `onion-rings.png`, `cola-helada.png` y `house-lemonade.png`: fotografías de acompañamientos y bebidas incorporadas en 3.2. Los SVG anteriores se conservan como archivos históricos, pero ya no se utilizan en las tarjetas. Las salsas mantienen sus fotografías de la versión 2.0.
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

El número predeterminado del local se configura **solo en `SITE_CONFIG.whatsappNumber`, al inicio de `script.js`**. Para pruebas temporales, la versión 3.1 permite introducir un destino en la interfaz sin modificar este archivo. Está vacío por defecto. Ingresar únicamente un número autorizado, en formato internacional con solo dígitos. No usar números de ejemplo. Este proyecto no incluye ningún teléfono real ni inventado.

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


## Modo de prueba y revisión visual — versión 3.1

Rama: `feat/smash-house-v3-1-testing`, creada desde `feat/smash-house-v3-whatsapp` (versión 3.0, commit `031e611`). No se modifican productos, precios, fotografías, portada, secciones, filtros ni cálculo del carrito.

### Cómo usarlo

1. Agregá productos, abrí el carrito y elegí **FINALIZAR PEDIDO**.
2. Completá nombre y modalidad; para delivery, también la dirección. Elegí **REVISAR PEDIDO**.
3. Revisá el resumen visual: cliente, entrega, productos, cantidades, precios unitarios, subtotales, total destacado y observaciones si existen.
4. Activá **MODO DE PRUEBA** e ingresá un número cuyo uso tengas autorizado, con código de país. Para Argentina corresponde +54 y, cuando aplique a un celular, el 9, sin el 0 de área ni el 15 local. No se incluyen teléfonos de ejemplo en el proyecto.
5. Cuando el formato sea válido aparece **ABRIR WHATSAPP DE PRUEBA**. El enlace oficial `https://wa.me/` contiene los dígitos normalizados y el mensaje codificado con `encodeURIComponent`. Vos revisás y enviás manualmente desde WhatsApp; el sitio no envía el mensaje ni vacía el carrito.
6. Desactivá **MODO DE PRUEBA** para borrar el campo, la variable en memoria y el enlace de prueba. Si existe un destino predeterminado autorizado, vuelve a ofrecerse el enlace normal; de lo contrario, sigue disponible la copia.

Se aceptan entre 8 y 15 dígitos, sin cero inicial, con signo `+` opcional. Se permiten espacios, guiones, puntos y paréntesis como separadores. Se rechazan letras, extensiones, signos `+` internos y prefijo `00`. Esta validación solo comprueba un formato internacional razonable: no confirma la existencia del número, la disponibilidad de WhatsApp ni la autorización de su titular.

Mientras el modo de prueba está activo, un destino vacío o inválido **no utiliza como alternativa el número predeterminado del local**. El botón de WhatsApp permanece oculto y el mensaje sigue disponible para copiar.

### Privacidad y duración

El teléfono de prueba vive exclusivamente en el campo de la interfaz y una variable en memoria. No se escribe en `SITE_CONFIG`, localStorage, sessionStorage, cookies, archivos, repositorios, logs ni mensajes de error. No se envía a servidores propios ni a almacenamiento externo. Solo se utiliza al abrir voluntariamente el enlace oficial de WhatsApp.

Cerrar el carrito conserva el destino de prueba durante esa página abierta. Desactivar el modo, recargar o abandonar la página lo borra. Los eventos de navegación limpian el estado para evitar que vuelva un destino anterior al restaurar la página desde la caché del navegador. El campo tiene autocompletado desactivado.

### Mensaje completo y copia

La revisión ya no depende de un cuadro de texto grande: usa un resumen legible y adaptable. **Ver mensaje completo** despliega el texto exacto que se copia o incorpora al enlace. **COPIAR MENSAJE** funciona aunque el desplegable esté cerrado y aunque no haya ningún teléfono configurado. Si el navegador bloquea la copia automática, se abre el desplegable, se selecciona el texto y se indican los pasos para copiarlo manualmente. El teléfono de destino no se incluye dentro del mensaje del pedido.

### Pruebas de 3.1

- Carrito vacío y con varios productos, modificación de cantidades, eliminación y totales exactos; resumen y mensaje actualizados después de editar el pedido.
- Formulario obligatorio, retiro/delivery, dirección condicional, observaciones y caracteres especiales.
- Activación, desactivación, borrado y reactivación del modo; validación internacional y normalización de separadores; rechazo de formatos inválidos sin mostrar el valor en errores.
- Correspondencia exacta entre mensaje y enlace oficial codificado. Navegación externa interceptada con destinos sintéticos generados solo durante las pruebas: no se enviaron mensajes ni se usaron números reales.
- Carrito conservado después de abrir WhatsApp; ausencia de alternativa al destino del local cuando el modo de prueba tiene un número inválido.
- Sin escrituras en almacenamiento del navegador; limpieza al recargar y al abandonar la página.
- Copia automática y alternativa manual; navegación por teclado; resumen y mensaje desplegable con textos largos sin desbordes a 320, 375, 390, 768, 1024 y 1440 px.
- Sin errores JavaScript; auditoría automática axe-core WCAG A/AA y 2.1 AA sin incidencias en los pasos del checkout a 390 y 1440 px, incluido el error del campo de prueba. No sustituye una revisión manual completa con tecnologías de asistencia.

Los cambios quedan locales en la rama de 3.1: sin commit, push, fusión con `main` ni publicación.


## Fotografías y títulos dinámicos — versión 3.2

Trabajo realizado exclusivamente en `feat/smash-house-v3-2-photos`, a partir de la versión remota con las cinco nuevas fotos (commit `83d923d`).

### Archivos de las fotografías

Al obtener la rama, las imágenes estaban en la raíz del repositorio, con nombres en mayúsculas y espacios. Se movieron a `assets/` y se normalizaron los nombres solicitados **sin modificar los bytes de las imágenes**:

| Archivo recibido en la raíz | Ubicación utilizada | Producto |
| --- | --- | --- |
| `CRISPY FIRES.png` | `assets/crispy-fries.png` | CRISPY FRIES |
| `LOADED FRIES.png` | `assets/loaded-fries.png` | LOADED FRIES |
| `ONION RINGS.png` | `assets/onion-rings.png` | ONION RINGS |
| `COLA HELADA.png` | `assets/cola-helada.png` | COLA HELADA |
| `HOUSE LEMONADE.png` | `assets/house-lemonade.png` | HOUSE LEMONADE |

Las cinco tienen proporción 3:2 (1536 × 1024). Se usa ancho adaptable, altura automática y `object-fit: contain`, sin ampliación al pasar el mouse. Las tarjetas se distribuyen en una grilla adaptable. El nombre, ingredientes, precio y botón siguen como HTML debajo de la fotografía; se retiró el número que antes se superponía a las ilustraciones. No se modificaron las fotografías de hamburguesas ni salsas.

### Título del menú

`menuTitles` y `updateMenuTitle()` en `script.js` actualizan el mismo encabezado cuando se renderiza una categoría:

- Burgers: **BURGER** en blanco hueso y **SELECTION.** en rojo.
- Papas & más: **CHOOSE YOUR** en blanco hueso y **SIDE DISH.** en rojo.
- Bebidas: **DRINKS.** en rojo.

La actualización es inmediata y no recarga la página. Conserva la tipografía y escala originales. Los grupos de palabras pueden pasar de línea sin recortes. La transición dura 180 ms, es discreta y respeta `prefers-reduced-motion`. El encabezado anuncia los cambios mediante `aria-live="polite"`; el filtro mantiene sus estados `aria-pressed`. Sin JavaScript, el HTML conserva el título inicial **BURGER SELECTION.**.

### Validación de 3.2

- Correspondencia visual y de rutas para las cinco fotos, carga y decodificación correctas; proporción original y contenido HTML debajo, sin superposiciones ni referencias a ilustraciones en esas tarjetas.
- Textos exactos, colores y tipografía de los tres títulos, filtros 5/3/2, cambio inmediato y movimiento reducido.
- Sin desbordes del documento ni recortes en el título a 320, 375, 390, 768, 1024 y 1440 px; revisión visual de papas y bebidas en celular y escritorio.
- Carrito con productos de las tres categorías: agregar, modificar cantidades, quitar y comprobar total; formulario y mensaje con los importes actuales.
- Se repitieron las pruebas del modo de prueba de WhatsApp: validación, enlace codificado, copia, ausencia de persistencia, limpieza al desactivar/recargar y conservación del carrito. Sin envíos reales ni números reales incorporados.
- Sin errores de JavaScript ni recursos fallidos; título inicial verificado con JavaScript desactivado.

Cambios locales en la rama de 3.2, sin commit, push, publicación ni fusión con `main`.
