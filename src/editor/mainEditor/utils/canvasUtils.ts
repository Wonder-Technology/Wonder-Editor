import { setHeight, setStyleHeight, setStyleWidth, setViewport, setWidth } from "../logic/view/MainView";

export const resizeCanvas = () => {
    var canvasParent: HTMLElement = document.querySelector(".canvas-parent") as HTMLElement,
        mainCanvas: HTMLCanvasElement = document.querySelector("#webgl") as HTMLCanvasElement,
        width:number = canvasParent.offsetWidth,
        height:number = canvasParent.offsetHeight,
        styleWidth:number = Number(canvasParent.style.width.slice(0, -2)),
        styleHeight:number = Number(canvasParent.style.height.slice(0, -2));

    setWidth(mainCanvas, width);
    setHeight(mainCanvas, height);
    setStyleHeight(mainCanvas, styleHeight);
    setStyleWidth(mainCanvas, styleWidth);
    setViewport(0, 0, width, height);
};