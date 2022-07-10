//import { SVGimgDocViewer } from "../frontend/viewer/svgimg";
//import { CanvasDocViewer} from "../frontend/viewer/canvas";
//import Bowser from "bowser";

//const parser = Bowser.getParser(window.navigator.userAgent);
//const browser = parser.getBrowser();
//
//export function pickViewer(){
//    console.log(browser.name)
//    if(window.location.search=="?svg") return new SVGimgDocViewer();
//    else if(window.location.search=="?canvas") return new CanvasDocViewer();
//    else if(browser.name=="Chrome") return new CanvasDocViewer();
//    else if(browser.name=="Microsoft Edge") return new CanvasDocViewer();
//    else return new SVGimgDocViewer();
//}