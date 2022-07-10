import { DocViewer, IPageImage } from "./viewer";

interface ISVGPageImage extends IPageImage {
  img: HTMLImageElement
}

export class SVGimgDocViewer extends DocViewer<ISVGPageImage> {
  pageInit(pn: number): ISVGPageImage {
    return {
      img: document.createElement("img"),
      div: document.createElement("div"),
      pn: pn
    }
  }

  async pageImgUpdate(page: ISVGPageImage, priority: number) {
    if (page.img.src === "") {
      const blob = await this.doc_render.renderSVG(page.pn, -1);
      const url = URL.createObjectURL(blob);
      page.img.src = url;
    }
  }
}