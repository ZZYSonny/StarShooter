## Plan
- Renderer
    - [ ] Write a custom MuPDF WASM wrapper.
    - [ ] Improve text selection layer as in the official demo. The official demo seems to use `jsonText -> HTML` instead of directly using the `generateHTML`. https://mupdf.com/wasm/demo/view.html
    - [ ] A Lazy PDF Renderer
    - [ ] Fallback to PNG mode when the rendered SVG has a lot of PNGs (especially when font is embeded as PNG)
    - [ ] Toolbar UI (toc, current number of page)
- SVG Crop
    - [x] Drag and release Implementation
    - [x] Crop Page SVG by pressing PrtSc
    - [ ] Minify SVG
    - [ ] Normalize SVG font size
    - [ ] Integration with VSCode
- SVG Latex Formula Recongition
- Extra Reference: https://mupdf.com/wasm/demo/view.html

TMP
```ts
window.visualViewport.onresize = e => console.log(e)
```

## Renderer IDEAS
- MuPDF PNG 
    - Failed: MuPDF wasm only uses CPU rendering, too slow
- MuPDF SVG: Text=Path
    - Failed: Scrolling/Zooming with Large SVG is too sluggish
- MuPDF SVG: Text=Text
    - Pending WASM compile
    - add this before `<g>` in pdf `<link xmlns="http://www.w3.org/1999/xhtml" rel="stylesheet" href="font.css" type="text/css"/>`
- MuPDF SVG -> ImageBitmap -> Canvas
    - Current Solution
    - Known issue
        - Firefox renders slowly (maybe asynchronous panning?)
        - Need to move this part to a web worker, but createImageBitmap does not accept a svg blob yet

- Bionic Reading https://bionic-reading.com/