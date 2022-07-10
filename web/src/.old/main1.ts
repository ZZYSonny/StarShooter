import createMuPdf, { MuPdf } from "mupdf-js";

const PDFUploader = document.getElementById('PDFUploader') as HTMLInputElement;
const PDFContainer = document.getElementById('PDFContainer') as HTMLDivElement;
const mupdf_promise = createMuPdf();
const DPI = 96;
var is_screenshoting = false;

PDFUploader.addEventListener('change',(ev)=>{
    ev.preventDefault();
    const file = PDFUploader.files[0];
    loadPDF(file.arrayBuffer());
})
  

async function loadPDF(buf: Promise<ArrayBuffer>) {
  const mu = await mupdf_promise;
  const buf8 = new Uint8Array(await buf);
  const doc = mu.load(buf8);
  
  PDFUploader.style.display = 'none';
  const numPage = mu.countPages(doc);
  var bottomPageNum = 1;
  var bottomPageBottom = 10;

  const addPage = async (i: number) => {
    //const png = mu.drawPageAsPNG(doc, i, 300);
    const svg_str = mu.drawPageAsSVG(doc, i)
    const pageHeight = Math.floor(mu.pageHeight(doc, i, DPI));
    const pageWidth = Math.floor(mu.pageWidth(doc, i, DPI));

    const svg_div = document.createElement('img');
    svg_div.className = 'SvgContainer';
    const svg_blob = new Blob([svg_str], {type : 'image/svg+xml'})
    const svg_url = URL.createObjectURL(svg_blob);
  
    svg_div.src = svg_url;
    //svg_div.style.height = `${pageHeight}px`;
    //svg_div.style.width = `${pageWidth}px`
    //svg_div.innerHTML = svg_str;
  
    //const html_str = mu.drawPageAsHTML(doc, i);
    //const html_div = document.createElement('div');
    //html_div.className = 'HtmlContainer';
    //html_div.innerHTML = html_str;

    const page_div = document.createElement('div');
    page_div.className = 'PageContainer';
    page_div.style.height = `${pageHeight}px`
    page_div.style.width = `${pageWidth}px`
    page_div.id = 'page_container_'+i;
    page_div.append(svg_div);
    PDFContainer.appendChild(page_div);

    bottomPageBottom = page_div.offsetTop + pageHeight;
    console.log(i, bottomPageBottom);
    return page_div;
  }
  
  while(bottomPageNum<=numPage 
     && bottomPageBottom < 2 * window.innerHeight){
    await addPage(bottomPageNum);
    bottomPageNum++;
  }

  var adding = false;
  document.addEventListener('scroll', async ev => {
    console.log(window.scrollY + window.innerHeight, bottomPageBottom);
    if(!adding){
      adding=true;
      while(bottomPageNum<=numPage 
         && window.scrollY + 2 * window.innerHeight > bottomPageBottom){
        console.log(bottomPageNum);
        await addPage(bottomPageNum);
        bottomPageNum++
      }
      adding=false;
    }
});


  document.addEventListener('keydown', ev => {
    const curPage = document.querySelectorAll(".PageContainer:hover")[0];
    if(curPage){
      const curPageNum=parseInt(curPage.id.split('page_container_')[1])
      console.log(curPageNum);
      if(ev.key=='PrintScreen' && !is_screenshoting){
        handleScreenshot(mu, doc, curPage);
      } else if(ev.key=='n'){
        const targetPage=PDFContainer.children[curPageNum-1+1] as HTMLDivElement;
        if(targetPage) window.scrollTo({top: targetPage.offsetTop})
      } else if(ev.key=='k'){
        const targetPage=PDFContainer.children[curPageNum-1-1] as HTMLDivElement;
        if(targetPage) window.scrollTo({top: targetPage.offsetTop})
      }
    } 
  })
}

async function handleScreenshot(mu: MuPdf.Instance, doc: MuPdf.DocumentHandle, div: Element){
  is_screenshoting=true;
  const background = document.createElement('div');
  const selection = document.createElement('div');
  background.className = 'ScreenshotBackground';
  selection.className = 'ScreenshotSelection';
  background.append(selection);
  div.append(background);

  const mouseDownHandler = (ev:MouseEvent) => {
    const rect = div.getBoundingClientRect();
    selection.style.left = (ev.clientX - rect.left)+'px';
    selection.style.top = (ev.clientY - rect.top) +'px';
    background.removeEventListener('mousedown', mouseDownHandler);
  }
  background.addEventListener('mousedown', mouseDownHandler);
  background.addEventListener('mousemove', ev =>{
    const rect = div.getBoundingClientRect();
    selection.style.right = (rect.right - ev.clientX)+'px';
    selection.style.bottom = (rect.bottom - ev.clientY) +'px';
  })
  background.addEventListener('mouseup', async ev => {
    const selection_rect = selection.getBoundingClientRect();
    const background_rect = background.getBoundingClientRect();
    background.remove();
    
    const page_id = parseInt(div.id.split('_').pop());
    const svg_str = mu.drawPageAsSVG(doc, page_id);
    const svg_lines = svg_str.split('\n');

    const width = parseFloat(svg_lines[2].match(/width="\d*/)[0].split('"')[1]);
    const height = parseFloat(svg_lines[2].match(/height="\d*/)[0].split('"')[1]);
    const scaleX = width / background_rect.width;
    const scaleY = height / background_rect.height;
    
    const nvb_arr = [
      Math.floor(scaleX * (selection_rect.left - background_rect.left)),
      Math.floor(scaleY * (selection_rect.top - background_rect.top)),
      Math.ceil(selection_rect.width * scaleX),
      Math.ceil(selection_rect.height * scaleY)
    ]
    is_screenshoting=false;
    download('screenshot.svg',svg_str.replace(
      /width="([0-9]*[.])?[0-9]+pt" height="([0-9]*[.])?[0-9]+pt" viewBox="0 0 ([0-9]*[.])?[0-9]+ ([0-9]*[.])?[0-9]+"/, 
      `width="${nvb_arr[2]}pt" height="${nvb_arr[3]}pt" viewBox="${nvb_arr.join(" ")}"`
    ))
  })
}
async function loadPDFURL(url: string){
    const file = await fetch(url);
    await loadPDF(file.arrayBuffer());
}

function download(filename:string, text:string):void {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}


loadPDFURL('sample1.pdf').catch(err => {console.log("Not in Development")})