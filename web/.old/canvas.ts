import { timeLog } from "../../helper/general";
import { DocViewer, IPageImage } from "./viewer";
import { getCurVPBox, PageRange } from "../../helper/viewport";

interface CanvasInfo {
  ratio: number
  predict: null | Promise<ImageBitmap>
  predict_ratio: number
}

function getRatio(vp_scale: number = visualViewport.scale): number {
  const pg_scale = vp_scale * window.devicePixelRatio;
  const pg_scale_int = Math.ceil(pg_scale - 0.1);
  const pg_scale_range = Math.max(1, Math.min(10, pg_scale_int));
  return pg_scale_range;
}

function maxRatio(): number {
  return getRatio(4);
}

function minRatio(): number {
  return getRatio(1);
}

export class CanvasDocViewer extends DocViewer<HTMLCanvasElement, CanvasInfo> {

  pageInit(pn: number): IPageImage<HTMLCanvasElement, CanvasInfo> {
    return {
      img: document.createElement("canvas"),
      div: document.createElement("div"),
      pn: pn,
      extra: {
        ratio: -1,
        predict: null,
        predict_ratio: 0
      }
    }
  }

  async pageImgUpdate(page: IPageImage<HTMLCanvasElement, CanvasInfo>, priority: number) {
    const ratio = getRatio();
    const canvas = page.img;
    const ctx = canvas.getContext("bitmaprenderer");

    //Attempt prediction first
    if (page.extra.predict_ratio>0){
      if (ratio>page.extra.ratio){
        //If rendering current page at a higher scaling
        const bmp = await page.extra.predict;
        if(bmp.width!=0 && bmp.height!=0){
          ctx.transferFromImageBitmap(bmp);
          const new_ratio = page.extra.predict_ratio;
          const kind = new_ratio>=ratio?"Prediction Matched":"Prediction Used";
          console.log(`Render | ${kind}\t| Page ${page.pn} Predicted ${new_ratio} Actual ${ratio}`)
          page.extra.ratio = new_ratio;
        }
      }
      page.extra.predict_ratio = 0;
    } 

    //If current page needs update, and prediction missed
    if (page.extra.ratio == -1 || page.extra.ratio < ratio || page.extra.ratio > ratio && ratio ==minRatio()){
      page.extra.ratio = ratio;
      const kind = priority==0?"JIT":"AoT";
      const bmp = await timeLog(
        `Render | ${kind}\t| Page ${page.pn} Zoom ${ratio}`,
        this.doc_render.renderBMP(page.pn, ratio)
      );
      ctx.transferFromImageBitmap(bmp);  
    }
  }

  async pagePredictiveUpdate(page: IPageImage<HTMLCanvasElement, CanvasInfo>, ratio: number) {
    if(page.extra.predict_ratio==0){
      page.extra.predict_ratio=ratio;
      const bmp = timeLog(
        `Render | Prediction Prepare\t| Page ${page.pn} Zoom ${ratio}`,
        this.doc_render.renderBMP(page.pn, ratio)
      );
      page.extra.predict = bmp;
      await bmp;
    }
  }

  async viewUpdateCur([l, r]: PageRange) {
    await super.viewUpdateCur([l, r]);
    for (var i = l; i <= r; i++) {
      var page = this.viewer_pages.get(i);
      this.pageImgUpdate(page, 0);
    }
  }

  onScrollIng(): void {
    super.onScrollIng()
    const ratio = getRatio();
    const [l,r] = this.viewer_layout.getPageRange(getCurVPBox());
    for(var i = l; i<=r; i++) {
      var page = this.viewer_pages.get(i);
      if(page && page.extra.ratio > 0 && page.extra.ratio < ratio) 
        this.pagePredictiveUpdate(page, ratio);
    }
  }

  onZoomStart(): void {
    super.onZoomStart();
    const box = this.viewer_layout.getPageRange(getCurVPBox());
    const page = this.viewer_pages.get(box[0]);
    const ratio = Math.min(getRatio() + 3, maxRatio());
    this.pagePredictiveUpdate(page, ratio);
  }
}
