import {Director} from "amyjs/dist/commonjs/core/Director";

export const getDirector = () => {
    return Director.getInstance();
};

export const init = () => {
    let director = getDirector();

    director.init();
};

export const render = () => {
    var director = getDirector();

    director.Render();
};

export const loop = () => {
    render();

    window.requestAnimationFrame(loop);
};
