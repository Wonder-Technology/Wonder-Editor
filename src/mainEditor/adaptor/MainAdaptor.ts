import { Main } from "amyjs/dist/es2015/core/Main";

export const init = (canvasId: string, parentId?: string) => {
    Main.setCanvas(canvasId, parentId).init();
};

