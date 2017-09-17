import { Map } from "immutable";
import { ISceneTreeGameObject } from "../interface/ISceneTree";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import {getScene, getSceneChildren} from "../../../../logic/adaptorOperator/SceneOper";
import { getSceneTreeDataFromState, saveSceneTreeData } from "../editor/SceneTreeDataEdit";
import { getState, setState } from "../../../../logic/editor/StateManagerEdit";
import {addChild, getChildren, hasComponent} from "../../../../logic/adaptorOperator/GameObjectOper";
import { CameraController } from "wonder.js/dist/es2015/component/camera/CameraController";
import {createTempGameObject1, createTempGameObject2} from "../../../../../definition/GlobalTempSystem";
import {ensureFunc, it} from "../../../../../../typescript/contract";
import {expect} from "wonder-expect.js";
import {registerInit as registerInitUtils} from "../../../../utils/registerUtils";

export const init = (state: Map<any, any>) => {
    var resultState: Map<any, any> = state,
        sceneTreeData = _createSceneTreeData(getScene());

    resultState = saveSceneTreeData(resultState, sceneTreeData);

    return resultState;
};

export const setSceneTreeData = (sceneTreeData: ISceneTreeGameObject[]) => {
    var resultState: Map<any, any> = getState();

    resultState = saveSceneTreeData(resultState, sceneTreeData);

    setState(resultState);
};

export const getSceneTreeData = () => {
    return getSceneTreeDataFromState(getState());
};

export const registerInit = (state: Map<any, any>) => {
    return registerInitUtils(state, init);
};

export const updateTreeNodeParent = (parentUid:number, childUid:number) => {
    var parent:GameObject = createTempGameObject1(parentUid),
        child:GameObject = createTempGameObject2(childUid);

    addChild(parent,child);
};

export const insertDragedTreeNodeToTargetTreeNode = (targetId:number, draggedId:number, sceneTreeData:Array<ISceneTreeGameObject>) => {
    var data = [...sceneTreeData],
        dragObj = null;

    const _iterateSceneGraph = (data: Array<ISceneTreeGameObject>, uid: number, callbackFunc: Function) => {
        for(let i = 0, len = data.length; i < len; i++){
            let item:ISceneTreeGameObject = data[i];

            if (item.uid === uid) {
                return callbackFunc(item, i, data);
            }
            if (item.children) {
                _iterateSceneGraph(item.children, uid, callbackFunc);
            }
        }
    };

    const _removeFromParent = (item:ISceneTreeGameObject, index:number, arr:Array<ISceneTreeGameObject>) => {
        arr.splice(index, 1);
        dragObj = item;
    };

    const _insertToTarget = (item:ISceneTreeGameObject, index:number, arr:Array<ISceneTreeGameObject>) => {
        item.children = item.children || [];
        item.children.push(dragObj);
    };

    _iterateSceneGraph(data, draggedId, _removeFromParent);
    _iterateSceneGraph(data, targetId, _insertToTarget);

    return data;
};

const _createSceneTreeData = (scene:GameObject) => {
    var sceneData = [{
        name: "scene",
        uid:scene.uid,
        children: _iterateSceneChildren(getSceneChildren())
    }];

    return sceneData;
};

const _iterateSceneChildren = (sceneGameObjects: Array<GameObject>) => {
    var sceneChildren: Array<ISceneTreeGameObject> = [];

    sceneGameObjects.forEach(gameObject => {
        var children: any = null,
            obj: ISceneTreeGameObject = {
                uid: gameObject.uid,
                name: null,
            };

        //todo get gameobject component by uid,store in component array
        if (hasComponent(gameObject, CameraController)) {
            obj.name = `mainCamera`;
        }
        else {
            obj.name = `gameObject${gameObject.uid}`;
        }

        children = getChildren(gameObject);

        if (_isChildrenExist(children)) {
            obj.children = _iterateSceneChildren(children);
        }

        sceneChildren.push(obj);
    });

    return sceneChildren;
};

const _isChildrenExist = (children:Array<GameObject>) => {
    return children !== void 0 || children.length !== 0;
}

