export function sleep(ms: number): Promise<void>{
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,ms);
    })
}

export function download(filename:string, text:string):void {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

export async function timeLog<T>(name:string, promise:Promise<T>){
    const time_start = new Date().getTime();
    const ans = await promise;
    const time_end = new Date().getTime();
    const duration = time_end - time_start;
    console.log(`${name}: ${duration}ms`)
    return ans;
}