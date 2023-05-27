// main.js
import PromiseWorker from 'promise-worker';

export interface PDFOutlineObject{
    title: string
    page: number
    x: number
    y: number
    children?: PDFOutlineObject[]
}

export class MuBackend{
    num_pages: number
    page_width: Uint32Array
    page_height: Uint32Array
    doc_outline: PDFOutlineObject
    draw: (pn: number, text_as_text: number) => Promise<string>;

    async init(url: string, name: string): Promise<void> {
        const worker = new PromiseWorker(new Worker('worker.js'));
        console.log("--Mu: Module Loaded")

        await worker.postMessage(["openDocumentFromBuffer", [url]])
        console.log("--Mu: Document Loaded")
        

        const [widths, heights] = await worker.postMessage(["pageBounds", []]);
        this.num_pages = widths.length;
        this.page_width = widths;
        this.page_height = heights;
        this.doc_outline = {
            title: await worker.postMessage(["documentTitle", []]),
            page: 0,
            x: 0,
            y: 0,
            children: JSON.parse(await worker.postMessage(["loadOutline", []]))
        }
        console.log("--Mu: Component Loaded")

        this.draw = (pn: number, text_as_text: number) =>
            worker.postMessage(["drawPageAsSVG", [pn, text_as_text]]) as Promise<string>;
    }
}