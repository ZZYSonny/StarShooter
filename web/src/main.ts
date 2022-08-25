import { ILayout } from "./pdf/layout";
import { MuBackend } from "./pdf/mupdf";
import { DocViewerController } from "./viewer/control";
import { ChoosePDF, ConstantPDF } from "./viewer/picker";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {scope: '.'})
}

(async ()=>{
    const [url, name] = await ChoosePDF();
    const doc = new MuBackend();
    await doc.init(url, name);

    const layout = new ILayout(25, doc.pageinfo);
    const viewer = new DocViewerController();
    viewer.init(doc,layout);
})()