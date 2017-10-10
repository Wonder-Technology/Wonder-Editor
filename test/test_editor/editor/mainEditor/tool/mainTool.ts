import {Main} from "wonder.js/dist/es2015/core/Main";
import {Director, isDirectorInit as isDirectorInitEngine} from "wonder.js/dist/es2015/core/Director";
import {initData as initDataSystem} from "wonder.js/dist/es2015/core/MainSystem";

export const setIsTest = (isTest:boolean) => {
    Main.isTest = isTest;
};

export const initData = initDataSystem;

export const clearDirectorInstance = () => {
    (Director as any)._instance = null;
};

export const isDirectorInit = () => isDirectorInitEngine();
