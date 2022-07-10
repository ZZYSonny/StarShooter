import { PageRange, ViewRectangle } from "../helper/viewport";
import { IDocPages } from "./interface";

export interface IILayout{
}


export class ILayout implements IILayout{
    doc: IDocPages
    page_y0: Uint32Array
    page_y1: Uint32Array

    constructor(pad: number, doc:IDocPages){
        this.doc=doc;
        this.page_y0 = new Uint32Array(doc.doc_pages+1);
        this.page_y1 = new Uint32Array(doc.doc_pages+1);

        for(var i=1;i<=doc.doc_pages;i++){
            this.page_y0[i]=this.page_y1[i-1]+pad;
            this.page_y1[i]=this.page_y0[i]+doc.page_height[i];
        }
    }

    getPage(p: PageRange): number {
        const [x,y] = p;
        const l = this.page_y0.findIndex((a)=>(a>=y));
        return Math.max(1,l);
    }

    getPageRange(rect: ViewRectangle): PageRange {
        const [x0,y0,x1,y1] = rect;
        const l = this.page_y1.findIndex((a)=>(a>=y0));
        const r = this.page_y0.findIndex((a)=>(a>=y1));
        const lans = Math.max(1,l);
        const rans = r!=-1?r-1:this.doc.doc_pages;
        return [lans,rans];
    }

    setContainerCSS(container: HTMLDivElement){
        container.style.height=`${this.page_y1[this.page_y1.length-1]}px`;
    }

    setPageCSS(container: HTMLElement, img: HTMLElement, pn: number){
        container.className='PDFPageContainer'
        img.className='PDFPageImage';

        container.style.top=`${this.page_y0[pn]}px`
        container.style.left=`0px`;
        container.style.height=`${this.doc.page_height[pn]}px`

        img.style.width=`${this.doc.page_width[pn]}px`
        img.style.height=`${this.doc.page_height[pn]}px`
    }

    scrollTo(pn:number, x:number, y:number){
        window.scrollTo({
            left: 0,
            top: this.page_y0[pn+1]+y
        })
    }
}