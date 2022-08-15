import { ILayout } from "./pdf/layout";
import { MuBackend } from "./pdf/mupdf";
import { DocViewerController } from "./viewer/control";
import { ChoosePDF, ConstantPDF } from "./viewer/picker";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {
        scope: './'
    }).then((registration) => {
        var serviceWorker;
        if (registration.installing) {
            serviceWorker = registration.installing;
        } else if (registration.waiting) {
            serviceWorker = registration.waiting;
        } else if (registration.active) {
            serviceWorker = registration.active;
        }
        if (serviceWorker) {
            // logState(serviceWorker.state);
            serviceWorker.addEventListener('statechange', (e) => {
                // logState(e.target.state);
            });
        }
    }).catch((error) => {
        // Something went wrong during registration. The service-worker.js file
        // might be unavailable or contain a syntax error.
    });
}

(async ()=>{
    const [url, name] = await ConstantPDF();
    const doc = new MuBackend();
    await doc.init(url, name);

    const layout = new ILayout(25, doc.pageinfo);
    const viewer = new DocViewerController();
    viewer.init(doc,layout);
})()