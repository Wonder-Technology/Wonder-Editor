import { Director } from "wonder.js/dist/es2015/core/Director";

export const getDirector = () => {
    return Director.getInstance();
};

export const init = () => {
    getDirector().init();
};

export const loopBody = () => {
    getDirector().loopBody();
};
