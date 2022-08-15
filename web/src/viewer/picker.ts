
export function ChoosePDF():Promise<[string, string]>{
    const container = document.createElement("div");
    document.body.appendChild(container);
    const uploader = document.createElement("input");
    uploader.className = "FileUploader";
    uploader.type = "file";
    uploader.accept = ".pdf"
    container.appendChild(uploader);
    return new Promise((resolve,reject)=>{
        if ('launchQueue' in window) {
            window.launchQueue.setConsumer(async (launchParams) => {
                const fileHandler=launchParams.files[0];
                const file=await fileHandler.getFile();
                document.body.removeChild(container);
                resolve([URL.createObjectURL(file), file.name]);
            });
          }          
        uploader.addEventListener('change',(ev)=>{
            ev.preventDefault();
            const file=uploader.files[0];
            document.body.removeChild(container);
            resolve([URL.createObjectURL(file), file.name]);
        })
    })
}

export async function ConstantPDF():Promise<[string, string]>{
    if(!window.location.href.startsWith("http://localhost")) return ChoosePDF();
    const URL = "http://localhost:8000/sample1.pdf";
    return [URL, URL];
}