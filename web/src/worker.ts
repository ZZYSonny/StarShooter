import registerPromiseWorker from 'promise-worker/register';
import Module from './pdf/libmupdf'

interface MuPdfModule extends EmscriptenModule {
  ccall: typeof ccall;
  cwrap: typeof cwrap;
}

const mu_module_promise:Promise<MuPdfModule> = Module();

registerPromiseWorker(async ([name, args]) => {
  const mu_module = await mu_module_promise;
  //await mu_module.ready;
  if(name=="openDocumentFromBuffer"){
    const [url]: [string] = args;
    const file = await fetch(url);
    const data = await file.arrayBuffer();
    const src = new Uint8Array(data);
    const ptr = mu_module._malloc(src.byteLength);
    mu_module.HEAPU8.set(src, ptr);
    return mu_module.openDocument(ptr, src.byteLength);

    
  } else if(name=="drawPageAsSVG"){
    const [pn]: [number] = args;
    const a = mu_module.drawPageAsSVG(pn)
    const b = mu_module.loadFont()
    console.log(b)
  } else {
    const func = mu_module[name];
    if(!func) throw new Error(`Function ${name} not found`);
    return func(...args);
  }
});