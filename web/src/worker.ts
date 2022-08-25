import registerPromiseWorker from 'promise-worker/register';
import Module from './pdf/libmupdf'

interface MuPdfModule extends EmscriptenModule {
  ccall: typeof ccall;
  cwrap: typeof cwrap;
}

const mu_module_promise:Promise<MuPdfModule> = Module();
const mu_module_functions = mu_module_promise.then(mu_module => {
  const openDocumentFromBuffer = mu_module.cwrap('openDocumentFromBuffer', null, ['number', 'number'])
  const drawPageAsSVG = mu_module.cwrap("drawPageAsSVG", "string", ["number", "number"])

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
    ["countPages", mu_module.cwrap("countPages", "number", [])],
    ["pageWidth", mu_module.cwrap("pageWidth", "number", ["number"])],
    ["pageHeight", mu_module.cwrap("pageHeight", "number", ["number"])],
    ["loadOutline", mu_module.cwrap("loadOutline", "string", [])]
    
  ]);
});
registerPromiseWorker(async ([name, args]) => {
  const mu_functions = await mu_module_functions;
  const func = mu_functions.get(name)
  return func(...args)
});  