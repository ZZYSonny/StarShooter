import { getCurVPBox } from "src/helper/viewport";
import { IBackend, IDocInteract, PDFOutlineObject } from "../pdf/interface";
import { ILayout } from "../pdf/layout";
import { DocViewer } from "./viewer";

const outlineToHTML = (out: PDFOutlineObject, layout: ILayout) => {
  const title = document.createElement('span');
  title.innerHTML = out.title + "&#10;&#13;";
  title.addEventListener('click', (ev) => {
    layout.scrollTo(out.page, out.x, out.y)
  });
  if(out.children) {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.appendChild(title);
    details.appendChild(summary);
    for(const c of out.children){
      details.appendChild(outlineToHTML(c, layout));
    }
    return details;
  } else{
    title.className = "MenuOutlineTitleSingle";
    return title;
  }
}

export class DocViewerController extends DocViewer{
  doc_interact: IDocInteract;

  async init(doc: IBackend, layout: ILayout): Promise<void> {
    super.init(doc, layout);
    this.doc_interact = doc.interact;
    const outline = await this.doc_interact.getOutline();
    const outlinehtml = outlineToHTML(outline, this.viewer_layout);

    const menu = document.createElement("div");
    menu.id = "MenuOutline"
    menu.appendChild(outlinehtml)
    document.body.appendChild(menu);

    document.addEventListener('keydown', ev => {
      const curPageNum = layout.getPageRange(getCurVPBox())[0]-1;
      if(ev.key=='n'){
        layout.scrollTo(Math.min(curPageNum+1, doc.pageinfo.doc_pages - 1),0,0);
      } else if(ev.key=='k'){
        layout.scrollTo(Math.max(curPageNum-1, 0),0,0);
      }
    })
  
  }
}
