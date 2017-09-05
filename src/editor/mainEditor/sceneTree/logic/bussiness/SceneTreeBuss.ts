import { Map } from "immutable";
import { ISceneTreeGameObject } from "../interface/ISceneTree";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { getSceneChildren } from "../../../logic/adaptorOperator/SceneOper";
import { getSceneTreeDataFromState, saveSceneTreeData } from "../editor/SceneTreeDataEdit";
import { getState, setState } from "../../../logic/editor/StateManagerEdit";
import { getChildren, hasComponent } from "../../../logic/adaptorOperator/GameObjectOper";
import { CameraController } from "wonder.js/dist/es2015/component/camera/CameraController";
import {createTempGameObject1, createTempGameObject2} from "../../../../definition/GlobalTempSystem";
import {addChild} from "../../../adaptor/GameObjectAdaptor";
import {getScene} from "../../../adaptor/SceneAdaptor";

//todo create scene tree data for editor

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
    var registeredInitList: Array<Function> = state.get("registeredInitList");

    registeredInitList.push(init);

    return state.set("registeredInitList", registeredInitList);
};

export const resetTreeNodeParent = (parentUid:number,chilUid:number) => {
    let parent:GameObject = createTempGameObject1(parentUid);
    let child:GameObject = createTempGameObject2(chilUid);

    addChild(parent,child);
};

export const resetSceneGameObjectRelation = (sceneTreeData:Array<ISceneTreeGameObject>) => {
     sceneTreeData.forEach((gameObject:ISceneTreeGameObject) => {
         if(gameObject.children !== void 0){
             let parent:GameObject = createTempGameObject1(gameObject.uid);

             _setGameObjectChild(parent,gameObject.children);
         }
     });

    sceneTreeData.forEach((gameObject:ISceneTreeGameObject) => {
        console.log(getChildren(gameObject));
    });
};

export const dragTreeNode = (draggedId:number,targetId:number,sceneTreeData:Array<ISceneTreeGameObject>) => {
    var data = [...sceneTreeData],
        dragObj = null;

    const _iterateSceneGraph = (data: Array<ISceneTreeGameObject>, uid: number, callback: Function) => {
        data.forEach((item, index, arr) => {
            if (item.uid === uid) {
                return callback(item, index, arr);
            }
            if (item.children) {
                return _iterateSceneGraph(item.children, uid, callback);
            }
        });
    };

    const _removeFromParent = (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
    };

    const _insertToTarget = (item, index, arr) => {
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
    var sceneChilrens: Array<ISceneTreeGameObject> = [];

    sceneGameObjects.forEach(gameObject => {
        var children: any = null,
            obj: ISceneTreeGameObject = {
                uid: gameObject.uid,
                name: null,
            } as any;

        //todo get gameobject component by uid,store in component array
        if (hasComponent(gameObject, CameraController)) {
            obj.name = `mainCamera`;
        }
        else {
            obj.name = `gameObject${gameObject.uid}`;
        }

        children = getChildren(gameObject);

        if (children !== void 0 && children.length !== 0) {
            obj.children = _iterateSceneChildren(children);
        }

        sceneChilrens.push(obj);
    });

    return sceneChilrens;
};

const _setGameObjectChild = (parent:GameObject,children:Array<ISceneTreeGameObject>) => {
    children.forEach((gameObject:ISceneTreeGameObject) => {
        var child:GameObject = createTempGameObject2(gameObject.uid);

        addChild(parent,child);

        if(gameObject.children !== void 0){
            _setGameObjectChild(child,gameObject.children);
        }
    });
}
