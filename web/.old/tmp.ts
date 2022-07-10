async function renderDocAsCanvas(doc: PDFDocumentProxy, pageNum: number){
    const canvas = document.createElement('canvas');
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: window.devicePixelRatio });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({
      canvasContext: canvas.getContext("2d"),
      viewport
    }).promise
    document.body.appendChild(canvas);
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
  