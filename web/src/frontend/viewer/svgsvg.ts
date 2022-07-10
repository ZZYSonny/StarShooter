import { DocViewer, IPageImage } from "./viewer";

interface ISVGPageImage extends IPageImage {
  rendered: boolean
}

export class SVGsvgDocViewer extends DocViewer<ISVGPageImage> {
  pageInit(pn: number): ISVGPageImage {
    return {
      img: document.createElement("div"),
      div: document.createElement("div"),
      pn: pn,
      rendered: false
    }
  }

  async pageImgUpdate(page: ISVGPageImage, priority: number) {
    if (!page.rendered) {
      const svg_str = await this.doc_render.renderSVG(page.pn, -1);
      page.img.innerHTML = svg_str;
      page.rendered = true;
    }
  }
}