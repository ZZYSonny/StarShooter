//import { MuChromeBackend } from "./backend/pdf/mu";
//import { ILayout } from "./backend/layout";
import { ILayout } from "./backend/layout";
import { MuBackend } from "./backend/pdf/mupdf";
import { ChoosePDF, ConstantPDF } from "./frontend/tools/picker";
import { SVGimgDocViewer } from "./frontend/viewer/svgimg";
import { SVGsvgDocViewer } from "./frontend/viewer/svgsvg";

(async ()=>{
    const url = await ConstantPDF();
    const doc = new MuBackend();
    await doc.init(url);

    const layout = new ILayout(25, doc.pageinfo);
    const viewer = new SVGsvgDocViewer();
    viewer.init(doc,layout);
})()
