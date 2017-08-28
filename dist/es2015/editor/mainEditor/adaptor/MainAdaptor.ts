import { Main } from "wonder.js/dist/es2015/core/Main";

export const init = (canvasId: string) => {
    Main.setConfig({
        canvasId: canvasId
    }).init();
};
