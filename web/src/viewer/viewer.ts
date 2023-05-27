import { MuBackend, PDFOutlineObject } from "../pdf/mupdf";
import { evTransformer, getCurVPBox, getEarlyVPBox, PageRange, rangeEqual, scrollVPto, ViewRectangle } from "../helper/viewport";


class DivLayout {
    doc: MuBackend
    pageStartX: Uint32Array
    pageEndY: Uint32Array
    pageImgs: HTMLDivElement[] = []
    writtenPages: Set<number> = new Set()

    constructor(doc: MuBackend, pad: number) {
        this.doc = doc;
        this.pageStartX = new Uint32Array(doc.num_pages);
        this.pageEndY = new Uint32Array(doc.num_pages);

        this.pageStartX[0] = 0;
        this.pageEndY[0] = doc.page_height[0];
        for (var i = 1; i < doc.num_pages; i++) {
            this.pageStartX[i] = this.pageEndY[i - 1] + pad;
            this.pageEndY[i] = this.pageStartX[i] + doc.page_height[i];
        }

        const doc_div = document.createElement("div");
        doc_div.style.height = `${this.pageEndY[this.pageEndY.length - 1]}px`;
        doc_div.style.setProperty("--image-quality", "auto");
        document.body.appendChild(doc_div);

        for (var i = 0; i < doc.num_pages; i++) {
            const page_div = document.createElement('div');
            const page_img = document.createElement('div');

            page_div.className = 'PDFPageContainer'
            page_img.className = 'PDFPageImage';

            page_div.style.top = `${this.pageStartX[i]}px`
            page_div.style.left = `0px`;
            page_div.style.height = `${this.doc.page_height[i]}px`

            page_img.style.width = `${this.doc.page_width[i]}px`
            page_img.style.height = `${this.doc.page_height[i]}px`

            page_div.appendChild(page_img);
            doc_div.appendChild(page_div);
            this.pageImgs.push(page_img)
        }
    }

    getPage(p: PageRange): number {
        const [x, y] = p;
        const l = this.pageStartX.findIndex((a) => (a >= y));
        return l;
    }

    getPageRange(rect: ViewRectangle): PageRange {
        const [x0, y0, x1, y1] = rect;
        const l = this.pageEndY.findIndex((a) => (a >= y0));
        const r = this.pageStartX.findIndex((a) => (a >= y1));
        const lans = l;
        const rans = r != -1 ? r - 1 : this.doc.num_pages - 1;
        return [lans, rans];
    }

    scrollTo(pn: number, x: number, y: number) {
        scrollVPto({
            left: x,
            top: this.pageStartX[pn] + y
        })
    }

    setContent(pn: number, innerHTML: string) {
        console.assert(!this.writtenPages.has(pn))
        this.pageImgs[pn].innerHTML = innerHTML;
        this.writtenPages.add(pn);
    }

    clearContentOutside(p: PageRange) {
        for (const i of this.writtenPages)
            if (i < p[0] || i > p[1]) {
                this.pageImgs[i].innerHTML = '';
                this.writtenPages.delete(i);
            }
    }
}

class DivUpdaterState {
    layout: DivLayout
    isScrolling: boolean
    rangeInScreen: PageRange
    rangeOutScreen: PageRange

    constructor(layout: DivLayout, scroll: boolean, ratio: number) {
        if (layout) {
            this.layout = layout;
            this.isScrolling = scroll;
            this.rangeOutScreen = layout.getPageRange(getEarlyVPBox(ratio));
            this.rangeInScreen = layout.getPageRange(getEarlyVPBox(0));
        } else {
            this.isScrolling = scroll;
            this.rangeOutScreen = [-1, -1];
            this.rangeInScreen = [-1, -1];
        }
    }

    countUnrendered(): number {
        var ans = 0;
        for (var i = this.rangeInScreen[0]; i <= this.rangeInScreen[1]; i++)
            if (!this.layout.writtenPages.has(i))
                ans++;
        return ans;
    }

    changed(other: DivUpdaterState): boolean {
        return this.isScrolling != other.isScrolling
            || this.rangeOutScreen[0] != other.rangeOutScreen[0]
            || this.rangeOutScreen[1] != other.rangeOutScreen[1]
    }
}

class DivUpdater {
    doc: MuBackend
    layout: DivLayout
    isLoopRunning: boolean = false
    state: DivUpdaterState = new DivUpdaterState(null, true, 0);

    constructor(doc: MuBackend, layout: DivLayout) {
        this.layout = layout;
        this.doc = doc;
        const cb1 = () => this.scrollingCallback();
        const cb2 = evTransformer("scroll", 160, null,
            () => this.scrollEndCallback()
        );
        window.addEventListener("scroll", cb1);
        window.addEventListener("scroll", cb2);
        visualViewport.addEventListener("scroll", cb1);
        visualViewport.addEventListener("scroll", cb2);
        this.scrollEndCallback();
    }

    scrollingCallback() {
        const newState = new DivUpdaterState(this.layout, true, 2)
        if (this.state.changed(newState))
            if (this.state.countUnrendered() >= 1) {
                console.log("Scrolling Too Fast")
            } else {
                this.state = newState;
                this.updatePageLoop();
            }
    }

    scrollEndCallback() {
        const newState = new DivUpdaterState(this.layout, true, 5)
        if (this.state.changed(newState)) {
            this.state = newState;
            this.updatePageLoop();
        }
    }

    async updatePageLoop() {
        if (this.isLoopRunning) return;
        this.isLoopRunning = true;

        var stateChanged = false;
        const local = this.state;

        for (const range of [local.rangeInScreen, local.rangeOutScreen])
            for (var i = range[0]; i <= range[1]; i++)
                if (!this.layout.writtenPages.has(i)) {
                    const s = await this.doc.draw(i, 1);
                    this.layout.setContent(i, s);
                    if (local.isScrolling)
                        console.log(`ScrollIng | Rendered Page ${i}`)
                    else
                        console.log(`ScrollEnd | Rendered Page ${i}`)

                    stateChanged ||= this.state.changed(this.state)
                }

        if (local.isScrolling && !stateChanged) {
            const keepRange = this.layout.getPageRange(getEarlyVPBox(5));
            console.log(`Removing | ${keepRange[0]} - ${keepRange[1]}`)
            this.layout.clearContentOutside(keepRange);
        }

        this.isLoopRunning = false;
        if (stateChanged) this.updatePageLoop();
    }
}

class DocOutline {
    outlineToHTML(out: PDFOutlineObject, layout: DivLayout) {
        const title = document.createElement('span');
        title.innerHTML = out.title + "&#10;&#13;";
        title.addEventListener('click', (ev) => {
            layout.scrollTo(out.page, out.x, out.y)
        });
        if (out.children) {
            const details = document.createElement("details");
            const summary = document.createElement("summary");
            summary.appendChild(title);
            details.appendChild(summary);
            for (const c of out.children) {
                details.appendChild(this.outlineToHTML(c, layout));
            }
            return details;
        } else {
            title.className = "MenuOutlineTitleSingle";
            return title;
        }
    }

    constructor(doc: MuBackend, layout: DivLayout){
        const outlinehtml = this.outlineToHTML(doc.doc_outline, layout);
        const menu = document.createElement("div");
        menu.id = "MenuOutline"
        menu.appendChild(outlinehtml)
        document.body.appendChild(menu);
    }
}

class DocHotkey {
    constructor(doc: MuBackend, layout: DivLayout){
        document.addEventListener('keydown', ev => {
            const curPageNum = layout.getPageRange(getCurVPBox())[0];
            if (ev.key == 'n') {
                layout.scrollTo(Math.min(curPageNum + 1, doc.num_pages - 1), 0, 0);
            } else if (ev.key == 'k') {
                layout.scrollTo(Math.max(curPageNum - 1, 0), 0, 0);
            }
        })
    }

}

class DocFont {
    constructor(doc: MuBackend){
        
    }
}

export class DocViewer {
    constructor(doc: MuBackend) {
        const layout = new DivLayout(doc, 25)
        const updater = new DivUpdater(doc, layout);
        const hotkey = new DocHotkey(doc, layout);
        const outline = new DocOutline(doc, layout);
    }
}