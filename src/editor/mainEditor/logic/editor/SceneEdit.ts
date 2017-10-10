import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { Map } from "immutable";
import {isValueExist} from "./utils/stateUtils";

export const setCurrentGameObject = (state: Map<any, any>, gameObject: GameObject) => {
    var resultState: Map<any, any> = state;

    resultState = resultState.set("currentGameObject", gameObject);

    return resultState;
};

export const getCurrentGameObject = (state: Map<any, any>) => {
    return state.get("currentGameObject");
};

export const hasCurrentGameObject = (gameObject:GameObject) => isValueExist(gameObject);

export const removeCurrentGameObject = (state: Map<any, any>) => {
    var resultState: Map<any, any> = state;

    resultState = resultState.set("currentGameObject", null);

    return resultState;
};
