import { setHeight, setStyleHeight, setStyleWidth, setViewport, setWidth } from "../logic/view/MainView";

export const resizeCanvas = () => {
    var canvasParent: any = document.querySelector(".canvas-parent"),
        mainCanvas: any = document.querySelector("#webgl");

    var width = canvasParent.offsetWidth,
        height = canvasParent.offsetHeight;

    setWidth(mainCanvas, width);
    setHeight(mainCanvas, height);
    setStyleHeight(mainCanvas, height);
    setStyleWidth(mainCanvas, width);
    setViewport(0, 0, width, height);
};