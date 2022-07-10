
export function ChoosePDF():Promise<string>{
    const container = document.createElement("div");
    document.body.appendChild(container);
    const uploader = document.createElement("input");
    uploader.className = "FileUploader";
    uploader.type = "file";
    uploader.accept = ".pdf"
    container.appendChild(uploader);
    return new Promise((resolve,reject)=>{
        uploader.addEventListener('change',(ev)=>{
            ev.preventDefault();
            const file=uploader.files[0];
            document.body.removeChild(container);
            resolve(URL.createObjectURL(file));
        })    
    })
}

export async function ConstantPDF():Promise<string>{
    if(!window.location.href.startsWith("http://localhost")) return ChoosePDF();
    const URL = "sample1.pdf";
    return URL;
}