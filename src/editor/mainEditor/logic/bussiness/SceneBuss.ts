import { Map } from "immutable";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";

import {
    getCurrentGameObject as getCurrentGameObjectEdit, hasCurrentGameObject as hasCurrentGameObjectEdit,
    removeCurrentGameObject as removeCurrentGameObjectEdit,
    setCurrentGameObject as setCurrentGameObjectEdit
} from "../editor/SceneEdit";
import { getState, setState } from "../editor/StateManagerEdit";
import {getScene as getSceneOper, getSceneChildren as getSceneChildrenOper} from "../adaptorOperator/SceneOper";
import { getChildren } from "../adaptorOperator/GameObjectOper";
import {ensureFunc, it, requireCheckFunc} from "../../../../typescript/contract";
import { expect } from "wonder-expect.js";

export const hasCurrentGameObject = hasCurrentGameObjectEdit;

export const getSceneChildren = getSceneChildrenOper;

export const getScene = getSceneOper;

export const getCurrentGameObject = ():GameObject => {
    return getCurrentGameObjectEdit(getState());
};

export const setCurrentGameObject = requireCheckFunc((gameObjectUId: number, sceneChildren: Array<GameObject>) => {
    it("the uid should >= o", () => {
        expect(gameObjectUId).gte(0);
    });
}, (gameObjectUId: number, sceneChildren: Array<GameObject>) => {
    var resultState: Map<any, any> = getState(),
        gameObject: GameObject = _getGameObjectFromSceneGraph(gameObjectUId, sceneChildren);

    setState(setCurrentGameObjectEdit(resultState, gameObject));
});


export const removeCurrentGameObject = () => {
    var resultState: Map<any, any> = getState();

    setState(removeCurrentGameObjectEdit(resultState));
};

const _getGameObjectFromSceneGraph = ensureFunc((gameObject:GameObject)=> {
    it("gameObject should exist", function(){
        expect(gameObject).exist;
    });
},(uid: number, sceneChildren: Array<GameObject>) => {
    var currentObject: GameObject = null;

    _iterateSceneGraph(uid, sceneChildren, (gameObject) => {
        currentObject = gameObject;
    });

    return currentObject;
});

const _iterateSceneGraph = (uid: number, sceneChildren: Array<GameObject>, callback: Function) => {
    sceneChildren.forEach((gameObject: GameObject) => {
        if (_isEqualGameObjectUId(uid, gameObject)) {
            return callback(gameObject);
        }

        var children = getChildren(gameObject);

        if (children !== void 0) {
            _iterateSceneGraph(uid, children, callback);
        }
    });
};

const _isEqualGameObjectUId = (uid: number, gameObject: GameObject) => {
    return gameObject.uid === uid;
};