import { Map } from "immutable";

export const setEmptyComponentInitList = (state: Map<any, any>) => {
    var resultState: Map<any, any> = state;

    resultState = resultState.set("registeredInitList", []);

    return resultState;
};

export const getComponentInitList = (state: Map<any, any>) => {
    return state.get("registeredInitList");
};
