import {Director, isDirectorInit} from "wonder.js/dist/es2015/core/Director";

export const getDirector = () => {
    return Director.getInstance();
};

export const init = () => {
    getDirector().init();
};

export const loopBody = (time: number) => {
    getDirector().loopBody(time);
};

export const isStart = () => {
    return isDirectorInit();
}

