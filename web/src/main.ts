import { MuBackend } from "./pdf/mupdf";
import { DocViewer } from "./viewer/viewer";
import { ChoosePDF, ConstantPDF } from "./viewer/picker";

//if ('serviceWorker' in navigator) {
//    navigator.serviceWorker.register('sw.js', {scope: '.'})
//}

(async ()=>{
    const [url, name] = await ConstantPDF();
    const doc = new MuBackend();
    await doc.init(url, name);

    const viewer = new DocViewer(doc);
})()