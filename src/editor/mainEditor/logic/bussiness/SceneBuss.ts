import { Map } from "immutable";
import { getCurrentGameObject as getCurrentGameObjectEdit, setCurrentGameObject as setCurrentGameObjectEdit } from "../editor/SceneEdit";
import { getState, setState } from "../editor/StateManagerEdit";
import { getSceneChildren } from "../adaptorOperator/SceneOper";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { getChildren } from "../adaptorOperator/GameObjectOper";

export const getCurrentGameObject = () => {
    return getCurrentGameObjectEdit(getState());
};

export const setCurrentGameObject = (gameObjectUid: number) => {
    var resultState: Map<any, any> = getState(),
        gameObject = _getGameObjectFromSceneGraph(gameObjectUid, getSceneChildren());

    setState(setCurrentGameObjectEdit(resultState, gameObject));
};

const _getGameObjectFromSceneGraph = (uid: number, sceneChildren: Array<GameObject>) => {
    var currentObject: GameObject = null;

    _iterateSceneGraph(uid, sceneChildren, (gameObject) => {
        currentObject = gameObject;
    });

    return currentObject;
};

const _iterateSceneGraph = (uid: number, sceneChildren: Array<GameObject>, callback: Function) => {
    sceneChildren.forEach((gameObject: GameObject) => {
        if (_isEqualGameObjectUid(uid, gameObject)) {
            return callback(gameObject);
        }

        var children = getChildren(gameObject);

        if (children !== void 0) {
            return _iterateSceneGraph(uid, children, callback);
        }
    });
};

const _isEqualGameObjectUid = (uid: number, gameObject: GameObject) => {
    return gameObject.uid === uid;
};