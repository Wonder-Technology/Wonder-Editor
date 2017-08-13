import {init, render} from "../adaptor/Director";
import {addGameObject, createGameObject, createCameraObject, setColor, getScene} from "../adaptor/Scene";
import {Main} from "amyjs/dist/es2015/core/Main";
export const main = () => {
    Main.setCanvas("webgl","parent").init()

    setColor(0,0,0,1);
    addGameObject(createGameObject());
    addGameObject(createCameraObject());
    init();
    loop();
};
const loop = () => {
    render();

    window.requestAnimationFrame(loop);
};

