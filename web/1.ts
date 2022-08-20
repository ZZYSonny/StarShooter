import registerPromiseWorker from 'promise-worker/register';
import Module from './pdf/libmupdf'
import svg2ttf from 'svg2ttf';
const path1 = "M 45.410158 -165.52735 L 178.22266 -180.17578 C 181.47786 -153.15755 189.9414 -133.13802 203.61328 -120.11719 C 217.28516 -107.09635 235.35157 -100.58594 257.8125 -100.58594 C 286.1328 -100.58594 310.22135 -113.60677 330.07814 -139.64844 C 349.9349 -165.69011 362.63023 -219.72657 368.16407 -301.7578 C 333.65885 -261.71876 290.52735 -241.69922 238.76953 -241.69922 C 182.45442 -241.69922 133.78907 -263.34635 92.77344 -306.64064 C 52.083333 -350.2604 31.738282 -406.90104 31.738282 -476.5625 C 31.738282 -549.1536 53.222658 -607.58468 96.19141 -651.85549 C 139.48567 -696.45187 194.4987 -718.75 261.23048 -718.75 C 333.82164 -718.75 393.39195 -690.59249 439.9414 -634.27737 C 486.49089 -578.2878 509.76564 -486.0026 509.76564 -357.42189 C 509.76564 -226.5625 485.5143 -132.16146 437.01173 -74.21875 C 388.50914 -16.276041 325.35807 12.6953129 247.5586 12.6953129 C 191.56902 12.6953129 146.32161 -2.1158856 111.81641 -31.738282 C 77.311199 -61.6862 55.17578 -106.282558 45.410158 -165.52735 M 355.95704 -465.33204 C 355.95704 -509.60289 345.70314 -543.9453 325.1953 -568.3594 C 305.01304 -592.77346 281.57554 -604.98049 254.88282 -604.98049 C 229.49219 -604.98049 208.33333 -594.88937 191.40625 -574.70706 C 174.80469 -554.8503 166.5039 -522.13546 166.5039 -476.5625 C 166.5039 -430.33854 175.61849 -396.32164 193.84766 -374.51173 C 212.07683 -353.02735 234.86328 -342.28517 262.20704 -342.28517 C 288.57423 -342.28517 310.70964 -352.7018 328.61329 -373.53517 C 346.84245 -394.3685 355.95704 -424.96745 355.95704 -465.33204 Z ";

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
  const getFontFile = mu_module.cwrap("loadFontFile", "string", []);
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
        const svgString = getFontFile();
        const s = `
<font id="fontello" horiz-adv-x="100" >
<font-face font-family="fontello" font-weight="400" font-stretch="normal" units-per-em="1000"/>
${svgString}
</font>
`;
        //console.log(s);
        const ttf = svg2ttf(s, {});
        const ttfURL = URL.createObjectURL(new Blob([ttf.buffer], {type : 'font/ttf'}));
        finalCSS += `@font-face {${fontCSS} src: url('${ttfURL}');}\n`;
      }
      const cssURL = URL.createObjectURL(new Blob([finalCSS], {type : 'text/css'}));
      return cssURL;
    }]
  ]);
});
registerPromiseWorker(async ([name, args]) => {
  const mu_functions = await mu_module_functions;
  const func = mu_functions.get(name)
  return func(...args)
});  