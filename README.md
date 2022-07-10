## Highlights
- Touchpad scrolling and zooming are as smooth as normal webpages
- Fast PDF generation using MuPDF compiled in WASM

## Plan
- UI
    - [ ] Toolbar UI (toc, current number of page)
- SVG Crop
    - [ ] Use existing MuPDF functionality to generate cropped SVG 
    - [ ] Normalize SVG font size
    - [ ] Integration with VSCode
- SVG Latex Formula Recongition
- Extra Reference: https://mupdf.com/wasm/demo/view.html

## Implementation Notes
### How is a page rendered
- Pass PDF to MuPDF
- Render each page as a SVG picture
    - The PDF reader bundles some fonts to improve SVG rendering performance and allow browsers to do hinting with the font. 
        - If text is using a bundled font, it will be generated using `text_as_text` option in MuPDF. With this option, MuPDF generates the text as tspan in SVG, which is a lot more compat.
        - If text is not using a bundled font, SVG generation will fallback to use `text_as_path` option. With this option, MuPDF will convert fonts bundled in the PDF as fonts usable in SVG (represented by path). Then each character in the text will be generated separately. 
- Let browser handle the rendering of SVG pictures
