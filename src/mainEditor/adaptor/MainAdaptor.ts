import { Main } from "amyjs/dist/es2015/core/Main";

export const init = (webglId: string, parentId: string) => {
    Main.setCanvas(webglId, parentId).init();
};

