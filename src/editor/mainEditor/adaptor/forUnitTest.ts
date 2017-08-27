import { gameObjectScene, getChildren, removeAllChildren } from "./SceneAdaptor";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
import { GameObject } from "amyjs/dist/es2015/core/Entity/GameObject";

export const removeAllChildrenAdaptor = removeAllChildren;
export const gameObjectSceneAdaptor = gameObjectScene;
export const getChildrenAdaptor = getChildren;
