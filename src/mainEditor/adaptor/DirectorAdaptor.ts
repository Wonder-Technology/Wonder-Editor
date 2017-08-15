import { Director } from "amyjs/dist/es2015/core/Director";
export const getDirector = () => {
    return Director.getInstance();
};

export const init = () => {
    getDirector().init();
};

export const render = () => {
    getDirector().Render();
};

export const setClearColor = (r: number, g: number, b: number, a: number) => {
    getDirector().renderer.setClearColor(r, b, g, a);
};
