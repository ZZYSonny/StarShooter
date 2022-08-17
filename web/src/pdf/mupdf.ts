// main.js
import PromiseWorker from 'promise-worker';
import { IBackend, IDocInteract, IDocPages, IDocRender } from "./interface";

export class MuWrapper {
    protected mu_worker: PromiseWorker
    protected mu_openDocumentFromBuffer = (url:string) =>
        this.mu_worker.postMessage(["openDocumentFromBuffer", [url]]) as Promise<void>;
    protected mu_documentTitle = () =>
        this.mu_worker.postMessage(["documentTitle", []]) as Promise<string>;
    protected mu_pageWidthHeight = () =>
        this.mu_worker.postMessage(["pageWeightHeight", []]) as Promise<[number, Uint32Array, Uint32Array]>;
    protected mu_loadOutline = () =>
        this.mu_worker.postMessage(["loadOutline", []]) as Promise<string>;
    protected mu_drawPageAsSVG = (pn: number, text_as_text: number) =>
        this.mu_worker.postMessage(["drawPageAsSVG", [pn, text_as_text]]) as Promise<string>;
    //protected mu_pageLinks:
    //    (arg_0: number, arg_1: number, arg_2: number) => string;

    protected async loadModule() {
        const worker = new Worker('worker.js');
        this.mu_worker = new PromiseWorker(worker);
        console.log("--Mu: Module Loaded")
    }
}


export class MuBackend extends MuWrapper implements IBackend {
    pageinfo: IDocPages;
    renderer: IDocRender;
    interact: IDocInteract;

    async init(url: string, name: string): Promise<void> {
        await this.loadModule()
        await this.mu_openDocumentFromBuffer(url);
        console.log("--Mu: Document Loaded")
        await this.initPages(name)
        await this.initRenderer()
        await this.initInteract();
        console.log("--Mu: Component Loaded")
    }

    async initPages(name:string) {
        const [n, widths, heights] = await this.mu_pageWidthHeight();
        var title = await this.mu_documentTitle();
        if(title=="") title=name;
        this.pageinfo = {
            doc_title: title,
            doc_pages: n,
            page_width: widths,
            page_height: heights
        }
    }

    async initRenderer() {
        this.renderer = {
            renderSVG: async (pn) => await this.mu_drawPageAsSVG(pn, 0)
        }
    }

    async initInteract() {
        this.interact = {
            getOutline: async () => {
                return {
                    title: this.pageinfo.doc_title,
                    page: 0,
                    x: 0,
                    y: 0,
                    children: JSON.parse(await this.mu_loadOutline())
                }
            }
        }
    }
}