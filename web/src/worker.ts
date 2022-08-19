import registerPromiseWorker from 'promise-worker/register';
import Module from './pdf/libmupdf'

interface MuPdfModule extends EmscriptenModule {
  ccall: typeof ccall;
  cwrap: typeof cwrap;
  FS: typeof FS;
}

const mu_module_promise:Promise<MuPdfModule> = Module();
const mu_module_functions = mu_module_promise.then(mu_module => {
  const openDocumentFromBuffer = mu_module.cwrap('openDocumentFromBuffer', null, ['number', 'number'])
  const drawPageAsSVG = mu_module.cwrap("drawPageAsSVG", "string", ["number", "number"])
  const pageWeightHeight = mu_module.cwrap("pageWeightHeight", "string", []);
  const getFontName = mu_module.cwrap("loadFontName", "string", []);
  const getFontFile = mu_module.cwrap("loadFontFile", "number", []);
  const getBufferLen = mu_module.cwrap("getBufferLen", "number", []);

  return new Map<string,any>([
    ["openDocumentFromBuffer", async (url: string) => {
      const file = await fetch(url);
      const data = await file.arrayBuffer();
      const src = new Uint8Array(data);
      const ptr = mu_module._malloc(src.byteLength);
      mu_module.HEAPU8.set(src, ptr);
      return openDocumentFromBuffer(ptr, src.byteLength);
    }],
    ["drawPageAsSVG", (pn:number, text_as_text:number) => {
      return drawPageAsSVG(pn, text_as_text)
        .replace('viewBox','buffered-rendering="static" viewBox')
        .replaceAll('font_', `font_${pn}_`)
        .replaceAll('<mask id="ma',`<mask id="ma_${pn}_`)
        .replaceAll('"url(#ma',`"url(#ma_${pn}_`)
        .replaceAll('<clipPath id="cp',`<clipPath id="cp_${pn}_`)
        .replaceAll('"url(#cp',`"url(#cp_${pn}_`);
    }],
    ["documentTitle",mu_module.cwrap("documentTitle", "string", [])],
    ["pageWeightHeight", () => {
      const weightHeight = JSON.parse(pageWeightHeight());
      const n = weightHeight.length >> 1;
      const widths = new Uint32Array(n + 1);
      const heights = new Uint32Array(n + 1);
      for(var i=1;i<=n;i++){
        widths[i] = weightHeight[2*i-2];
        heights[i] = weightHeight[2*i-1];
      }
      return [n, widths, heights];
    }],
    ["pageWidth", mu_module.cwrap("pageWidth", "number", ["number"])],
    ["pageHeight", mu_module.cwrap("pageHeight", "number", ["number"])],
    ["loadOutline", mu_module.cwrap("loadOutline", "string", [])],
    ["loadFonts", () => {
      var finalCSS = "";
      const fonts = new Set();
      while(true){
        const basefont = getFontName();
        if(basefont=="(finish)") break;
        //if(fontName=="(null)") continue
        const fontname = basefont.split("+").pop().split("-");
        const svgFontFamily = fontname[0];
        var fontCSS = `font-family: '${svgFontFamily}';`;
        const fontSuffix = fontname[1] || "";
        //if(fonts.has(svgFontFamily)) continue;
        if(fontSuffix.includes("Bold")) fontCSS += "font-weight: bold;";
        if(fontSuffix.includes("Italic")) fontCSS += "font-style: italic;";
        fonts.add(svgFontFamily);
        const ptr = getFontFile();
        const len = getBufferLen();
        const ttfData = mu_module.HEAP8.slice(ptr, ptr+len);
        const ttfBlob = new Blob([ttfData.buffer], {type : 'font/ttf'});
        const ttfURL = URL.createObjectURL(ttfBlob);
        finalCSS += `@font-face {${fontCSS} src: url('${ttfURL}');}\n`;
      }
      const cssBlob = new Blob([finalCSS], {type : 'text/css'});
      const cssURL = URL.createObjectURL(cssBlob);
      return cssURL;
    }]
  ]);
});
registerPromiseWorker(async ([name, args]) => {
  const mu_functions = await mu_module_functions;
  const func = mu_functions.get(name)
  return func(...args)
});  