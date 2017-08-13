import {Director} from "amyjs/dist/es2015/core/Director";
export const getDirector = () => {
    return Director.getInstance();
};

export const init = () => {
    getDirector().init();
};

export const render = () => {
    getDirector().Render();
};

