import {getState} from "./domTool";

export const judgeInvokeMarkDirty = (ctFromShallow:any, expect:any) => {
    expect(getState(ctFromShallow).isChange).toBeTruthy();
}