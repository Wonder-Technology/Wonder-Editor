import { setHeight, setStyleHeight, setStyleWidth, setViewport, setWidth } from "../logic/view/MainView";
import {root} from "../../definition/Variable";

export const resizeCanvas = () => {
    var canvasParent: HTMLElement = document.querySelector(".canvas-parent") as HTMLElement,
        mainCanvas: HTMLCanvasElement = document.querySelector("#webgl") as HTMLCanvasElement,
        width:number = canvasParent.offsetWidth,
        height:number = canvasParent.offsetHeight,
        styleWidth:number = getDomStyle(canvasParent).getPropertyValue("width"),
        styleHeight:number = getDomStyle(canvasParent).getPropertyValue("height");

    setWidth(mainCanvas, width);
    setHeight(mainCanvas, height);
    setStyleHeight(mainCanvas, styleHeight);
    setStyleWidth(mainCanvas, styleWidth);
    setViewport(0, 0, width, height);
};

export const getDomStyle = (dom:Element,pseudoElt:string = null) => {
    return root.getComputedStyle(dom,pseudoElt);
};

