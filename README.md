# El Bitute Tres Porter

Landing page estática del restaurante El Bitute Tres Porter.

## Abrir en Visual Studio Code

1. Abre Visual Studio Code.
2. Selecciona **File > Open Folder**.
3. Elige esta carpeta: `bitute-tres-corregido`.
4. Para previsualizarla, usa Live Server sobre `index.html` o ejecuta un servidor HTTP local.

No abras el archivo mediante doble clic para la revisión final: un servidor local reproduce mejor el comportamiento del hosting.

## Desarrollo

Requiere Node.js solamente si se modifican clases de Tailwind:

```bash
npm install
npm run watch
```

Para generar el CSS listo para publicación:

```bash
npm run build
npm run check
```

El archivo compilado `css/tailwind.min.css` ya está incluido. El sitio publicado no necesita Node.js ni `node_modules`.

## Carta vigente

La carta actual está en:

```text
docs/carta-el-bitute-tres-web.pdf
```

El archivo consolidado contiene la portada y las secciones Appetizers, Sandwiches, Entrees, Main Dishes, Noodles, Desserts y Drinks. El botón **Ver nuestra carta** abre este PDF.

El contenido de `menuCategories` en `js/main.js` está sincronizado con esta versión. La carta entregada no muestra precios, por lo que la web tampoco presenta precios provisionales.

## Publicación

Para GitHub Pages o cualquier hosting estático se deben subir:

- `index.html`
- `css/`
- `js/`
- `img/`
- `docs/`

No subas `node_modules`. La carpeta entregada no contiene el historial `.git` original ni configuraciones locales de VS Code.

## Datos confirmados

- WhatsApp: `+1 (240) 491-2936`
- Dirección: `23242 FM-1314, Porter, TX 77365-3708`
