export interface IDocPages {
    /**Title of page */
    doc_title: string
    /**Total number of page */
    doc_pages: number
    /**Height of i-th page in default DPI */
    page_height: Uint32Array
    /**Width of i-th page in default DPI */
    page_width: Uint32Array
}

export interface IDocInteract {
    getOutline: () => Promise<PDFOutlineObject>
}

export interface IDocRender {
    /**Render Page pn in PNG Format. Return ImageBitmap use in canvas */
    renderSVG: (pn: number, scale: number) => Promise<string>
}

export interface IBackend{
    init(url: string, name: string): Promise<void>

    pageinfo: IDocPages
    renderer: IDocRender
    interact: IDocInteract
}

export interface PDFOutlineObject{
    title: string
    page: number
    x: number
    y: number
    children?: PDFOutlineObject[]
}