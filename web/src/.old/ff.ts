/**
 * Firefox does not seem to support resizeWidth/resizeHeight cleverly
 * On a svg with no size information, createImageBitmap returns a white image
 * On a svg with given size, createImageBitmap renders the svg at given size and upscale to the new size
 * Since Firefox seems to struggle with this method, I will temporaily drop Firefox support
 */
 export class MuFFRenderer extends MuChromeRenderer implements IDocRender {
    svg_scaled_cache = new CacheMap<[number, number], Blob>();

    async render_svg(pn: number, scale: number): Promise<Blob> {
        return this.svg_scaled_cache.getOrSet([pn, scale], () => {
            const svg_str = this.mu.drawPageAsSVG(this.doc, pn);
            const width = this.page_width[pn] * scale;
            const height = this.page_height[pn] * scale;
            const svg_str_nosize = svg_str.replace(
                /width=".*pt" height=".*pt"/i,
                `width="${width}px" height="${height}px"`
            );
            return new Blob([svg_str_nosize], { type: 'image/svg+xml' })
        });
    }
}

