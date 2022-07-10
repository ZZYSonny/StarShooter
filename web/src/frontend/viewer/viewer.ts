import { CacheMap } from "../../helper/cache";
import { ILayout } from "../../backend/layout";
import { IBackend, IDocPages, IDocRender } from "../../backend/pdf/interface";
import {
  evTransformer,
  getCurVPBox,
  getEarlyVPBox
} from "../../helper/viewport";
import { PageRange } from "../../helper/viewport";

const IMAGE_CAPACITY = 12;

export interface IPageImage {
  img: HTMLElement;
  div: HTMLDivElement;
  pn: number;
}

export abstract class DocViewer<X extends IPageImage> {
  doc_page: IDocPages;
  doc_render: IDocRender;
  viewer_layout: ILayout;
  viewer_div = document.createElement("div");
  viewer_pages = new CacheMap<number, X>();

  async init(doc: IBackend, layout: ILayout) {
    this.viewer_layout = layout;
    this.viewer_div.style.setProperty("--image-quality", "auto");
    this.doc_page = doc.pageinfo;
    this.doc_render = doc.renderer;
    layout.setContainerCSS(this.viewer_div);
    document.body.appendChild(this.viewer_div);
    document.title = this.doc_page.doc_title;

    const initBox = this.viewer_layout.getPageRange(getEarlyVPBox(2));
    this.viewUpdateEarly(initBox);

    const cb_scroll1 = () => this.onScrollIng();
    const cb_scroll2 = evTransformer("scroll", 160, 
      null,
      () => this.onScrollEnd()
    );
    const cb_zoom = evTransformer("zoom", 80,
      () => this.onZoomStart(),
      () => this.onZoomEnd()
    );
    window.addEventListener("scroll", cb_scroll1);
    window.addEventListener("scroll", cb_scroll2);
    visualViewport.addEventListener("scroll", cb_scroll1);
    visualViewport.addEventListener("scroll", cb_scroll2);
    visualViewport.addEventListener("resize", cb_zoom);
  }

  /**
   * Insert an empty page to the viewer
   */
  pageAdd(pn: number) {
    const info = this.pageInit(pn);
    const img = info.img;
    const div = info.div;
    this.viewer_pages.set(pn, info);
    this.viewer_layout.setPageCSS(div, img, pn);
    this.viewer_div.appendChild(div);
    div.appendChild(img);
    return info;
  }

  /**
   * Remove a page from the viewer
   */
  pageRemove(info: X) {
    const { div, img } = info;
    console.log(`Removing ${info.pn}`);
    this.viewer_div.removeChild(div);
    div.removeChild(img);
    img.className="";
  }

  abstract pageInit(pn: number): X

  /**
   * Rerender *page* at scale *ratio*
   */
  abstract pageImgUpdate(page: X, priority: number): Promise<void>;

  /**
   * Update the view **after scrolling finishes**
   * - Prerender nearby invisible (out of viewport) pages
   * - Rerender visible (in viewport) pages if ratio mismatches
   *
   * **Very computation heavy**
   */
  async viewUpdateEarly([l, r]: PageRange) {
    for (var i = l; i <= r; i++) {
      if (!this.viewer_pages.has(i)) {
        const info = this.pageAdd(i);
        await this.pageImgUpdate(info, 1);
      }
    }
    const cur_box = getCurVPBox();
    const vp_range = this.viewer_layout.getPageRange(cur_box);
    await this.viewUpdateCur(vp_range);
    this.viewer_pages.trim(
      IMAGE_CAPACITY,
      (x) => l <= x && x <= r,
      (e) => this.pageRemove(e)
    );
  }

  /**
   * Update the view **during scrolling**
   * - Prerender next/prev page if they do not exist
   *
   * Less computation heavy, **but may introduce lag**
   */
  async viewUpdateUrgent([l, r]: PageRange) {
    const pages: number[] = [];
    if (l - 1 >= 1) pages.push(l - 1);
    if (r + 1 <= this.doc_page.doc_pages) pages.push(r + 1);
    for (var i of pages) {
      //add box if box does not exist
      if (!this.viewer_pages.has(i)) {
        const info = this.pageAdd(i);
        await this.pageImgUpdate(info, 0);
      }
    }
  }

  /**
   * Update the view **after zooming finishes**
   * - Rerender visible (in viewport) pages if ratio mismatches
   *
   * **Very computation heavy**
   */
  async viewUpdateCur(vp: PageRange): Promise<void> {}

  onScrollIng() {
      const box = this.viewer_layout.getPageRange(getCurVPBox());
      this.viewUpdateUrgent(box);
  }

  onScrollEnd() {
    const box = this.viewer_layout.getPageRange(getEarlyVPBox(3));
    this.viewUpdateEarly(box);
  }

  onZoomStart() {
    this.viewer_div.style.setProperty("--image-quality", "pixelated");
  }

  onZoomEnd() {
    this.viewer_div.style.setProperty("--image-quality", "auto");
    //const box = this.viewer_layout.getPageRange(getCurVPBox());
    //this.viewUpdateCur(box);
  }
}
