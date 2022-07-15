import { IBackend, IDocInteract, IDocPages, IDocRender } from "./interface";
import Module from './libmupdf'

interface MuPdfModule extends EmscriptenModule {
    ccall: typeof ccall;
    cwrap: typeof cwrap;
}

export class MuWrapper {
    protected mu_module: 
        MuPdfModule;
    protected mu_doc:
        number;
    protected mu_openDocumentFromBuffer:
        (data: number, size: number) => void
    protected mu_documentTitle:
        () => string;
    protected mu_countPages:
        () => number;
    protected mu_pageWidth:
        (pn: number) => number;
    protected mu_pageHeight:
        (pn: number) => number;
    protected mu_loadOutline: 
        () => string;
    protected mu_drawPageAsSVG: (pn: number, text_as_text: number) => string
    //protected mu_pageLinks:
    //    (arg_0: number, arg_1: number, arg_2: number) => string;

    protected async loadModule() {
        //initialize mupdf module
        this.mu_module = await Module()
        this.mu_openDocumentFromBuffer = this.mu_module.cwrap('openDocumentFromBuffer', null, ['number', 'number']);
        this.mu_documentTitle = this.mu_module.cwrap("documentTitle", "string", []);
        this.mu_countPages = this.mu_module.cwrap("countPages", "number", []);
        this.mu_pageWidth = this.mu_module.cwrap("pageWidth", "number", ["number"]);
        this.mu_pageHeight = this.mu_module.cwrap("pageHeight", "number", ["number"]);
        this.mu_loadOutline = this.mu_module.cwrap("loadOutline", "string", []);
        //this.mu_pageLinks = this.mu_module.cwrap("pageLinks", "string", ["number", "number", "number"]);
        this.mu_drawPageAsSVG = this.mu_module.cwrap("drawPageAsSVG", "string", ["number", "number"]);
        console.log("--Mu: Module Loaded")
    }
}


export class MuBackend extends MuWrapper implements IBackend {
    pageinfo: IDocPages;
    renderer: IDocRender;
    interact: IDocInteract;

    async init(url: string): Promise<void> {
        await this.loadModule()

        const file = await fetch(url);
        const data = await file.arrayBuffer()
        const src = new Uint8Array(data);

        const ptr = this.mu_module._malloc(src.byteLength);
        this.mu_module.HEAPU8.set(src, ptr);
        this.mu_openDocumentFromBuffer(ptr, src.byteLength);
        console.log("--Mu: Document Loaded")

        this.initPages()
        this.initRenderer()
        this.initInteract();
        console.log("--Mu: Component Loaded")
    }

    initPages() {
        const n = this.mu_countPages();
        const widths = new Uint32Array(n + 1);
        const heights = new Uint32Array(n + 1);
        for (var i = 1; i <= n; i++) {
            const w = this.mu_pageWidth(i);
            const h = this.mu_pageHeight(i);
            widths[i] = w;
            heights[i] = h;
        }
        this.pageinfo = {
            doc_title: this.mu_documentTitle(),
            doc_pages: n,
            page_width: widths,
            page_height: heights
        }
    }

    initRenderer() {
        this.renderer = {
            renderSVG: async (pn) => {
                var svg_str = this.mu_drawPageAsSVG(pn, 0)
                    .replace('viewBox','buffered-rendering="static" viewBox')
                    .replaceAll('font_', `font_${pn}_`)
                    .replaceAll('<mask id="ma',`<mask id="ma_${pn}_`)
                    .replaceAll('"url(#ma',`"url(#ma_${pn}_`)
                    .replaceAll('<clipPath id="cp',`<clipPath id="cp_${pn}_`)
                    .replaceAll('"url(#cp',`"url(#cp_${pn}_`)
                //download(`${pn}.svg`, svg_str)
                return svg_str;
            }
        }
    }

    initInteract() {
        this.interact = {
            getOutline: async () => {
                console.log(this.mu_loadOutline());
                return {
                    title: this.pageinfo.doc_title,
                    page: 0,
                    x: 0,
                    y: 0,
                    children: JSON.parse(this.mu_loadOutline())
                }
            }
        }
    }
}