import { Map } from "immutable";

import { setEmptyComponentInitList as setEmptyComponentInitListEdit, getComponentInitList } from "../editor/ComponentManagerEdit";

export const setEmptyComponentInitList = setEmptyComponentInitListEdit;

export const triggerComponentInit = (state: Map<any, any>) => {
    var initList: Array<Function> = getComponentInitList(state),
        resultState: Map<any, any> = state;

    initList.forEach((item: Function) => {
        resultState = item(resultState);
    });

    return resultState;
};
