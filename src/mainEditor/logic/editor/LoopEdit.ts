import { Map } from "immutable";

export const saveLoop = (name: string, state: Map<any, any>, loop: any) => {
    var resultState: Map<any, any> = null;

    resultState = state.setIn(["MainView", name], loop);

    return resultState;
};