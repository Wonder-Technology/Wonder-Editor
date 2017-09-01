import {
    getCanvas as getCanvasEngine, getCanvasHeight, getCanvasLeft, getCanvasStyleHeight, getCanvasStyleWidth,
    getCanvasTop, getCanvasWidth,
    setCanvas as setCanvasEngine, setCanvasHeight, setCanvasLeft, setCanvasStyleHeight, setCanvasStyleWidth,
    setCanvasTop, setCanvasWidth
} from "wonder.js/dist/es2015/structure/View";

export const getCanvas = () => {
    return getCanvasEngine();
}

export const setCanvas = (canvas: HTMLCanvasElement) => {
    return setCanvasEngine(canvas);
}

export const getLeft = (canvas: HTMLCanvasElement) => {
    return getCanvasLeft(canvas);
}

export const setLeft = (canvas: HTMLCanvasElement, x: number) => {
    return setCanvasLeft(canvas, x);
}

export const getTop = (canvas: HTMLCanvasElement) => {
    return getCanvasTop(canvas);
}

export const setTop = (canvas: HTMLCanvasElement, y: number) => {
    return setCanvasTop(canvas, y);
}

export const getWidth = (canvas: HTMLCanvasElement) => {
    return getCanvasWidth(canvas);
}

export const setWidth = (canvas: HTMLCanvasElement, width: number) => {
    return setCanvasWidth(canvas, width);
}

export const getHeight = (canvas: HTMLCanvasElement) => {
    return getCanvasHeight(canvas);
}

export const setHeight = (canvas: HTMLCanvasElement, height: number) => {
    return setCanvasHeight(canvas, height);
}

export const getStyleWidth = (canvas: HTMLCanvasElement) => {
    return getCanvasStyleWidth(canvas);
}

export const setStyleWidth = (canvas: HTMLCanvasElement, width: number) => {
    return setCanvasStyleWidth(canvas, width);
}

export const getStyleHeight = (canvas: HTMLCanvasElement) => {
    return getCanvasStyleHeight(canvas);
}

export const setStyleHeight = (canvas: HTMLCanvasElement, height: number) => {
    return setCanvasStyleHeight(canvas, height);
}
