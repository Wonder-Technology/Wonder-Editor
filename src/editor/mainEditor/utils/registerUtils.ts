import {Map} from "immutable";

export const registerInit = (state: Map<any, any>, init:(state: Map<any, any>) => void) => {
    var registeredInitList: Array<Function> = state.get("registeredInitList");

    registeredInitList.push(init);

    return state.set("registeredInitList", registeredInitList);
};
