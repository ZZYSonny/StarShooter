//import { MuChromeBackend } from "./backend/pdf/mu";
//import { ILayout } from "./backend/layout";
import { ILayout } from "./pdf/layout";
import { MuBackend } from "./pdf/mupdf";
import { ChoosePDF, ConstantPDF } from "./viewer/picker";
import { DocViewer } from "./viewer/viewer";

(async ()=>{
    const url = await ConstantPDF();
    const doc = new MuBackend();
    await doc.init(url);

    const layout = new ILayout(25, doc.pageinfo);
    const viewer = new DocViewer();
    viewer.init(doc,layout);
})()
