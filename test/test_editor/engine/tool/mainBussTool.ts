import {loopBody as loopBodyBuss} from "../../../../src/editor/mainEditor/logic/bussiness/MainBuss";

export const loopBody = (state,time?:number) => {
    loopBodyBuss(state, time || 0);
};