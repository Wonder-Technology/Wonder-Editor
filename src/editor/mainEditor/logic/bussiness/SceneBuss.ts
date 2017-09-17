import { Map } from "immutable";
import { getCurrentGameObject as getCurrentGameObjectEdit, setCurrentGameObject as setCurrentGameObjectEdit } from "../editor/SceneEdit";
import { getState, setState } from "../editor/StateManagerEdit";
import {getSceneChildren as getSceneChildrenOper} from "../adaptorOperator/SceneOper";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { getChildren } from "../adaptorOperator/GameObjectOper";
import {error} from "../../../../utils/logUtils";

export const getCurrentGameObject = () => {
    return getCurrentGameObjectEdit(getState());
};

export const setCurrentGameObject = (gameObjectUid: number, sceneChildren:Array<GameObject>) => {
    var resultState: Map<any, any> = getState(),
        gameObject:GameObject = _getGameObjectFromSceneGraph(gameObjectUid, sceneChildren);

    setState(setCurrentGameObjectEdit(resultState, gameObject));
};

export const getSceneChildren = getSceneChildrenOper;

const _getGameObjectFromSceneGraph = (uid: number, sceneChildren: Array<GameObject>) => {
    var currentObject: GameObject = null;

    _iterateSceneGraph(uid, sceneChildren, (gameObject) => {
        currentObject = gameObject;
    });

    if(currentObject === void 0 || currentObject === null){
        error("the appoint uid can't find gameObject");
    }
    return currentObject;
};

const _iterateSceneGraph = (uid: number, sceneChildren: Array<GameObject>, callback: Function) => {
    sceneChildren.forEach((gameObject: GameObject) => {
        if (_isEqualGameObjectUid(uid, gameObject)) {
            return callback(gameObject);
        }

        var children = getChildren(gameObject);

        if (children !== void 0) {
            _iterateSceneGraph(uid, children, callback);
        }
    });
};

const _isEqualGameObjectUid = (uid: number, gameObject: GameObject) => {
    return gameObject.uid === uid;
};