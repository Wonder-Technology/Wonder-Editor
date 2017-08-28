import { getChildren, removeAllChildren } from "./GameObjectAdaptor";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { getScene } from "./SceneAdaptor";
import { getGL } from "./DeviceAdaptor";

export const removeAllChildrenAdaptor = removeAllChildren;
export const getSceneAdaptor = getScene;
export const getChildrenAdaptor = getChildren;
export const getGLAdaptor = getGL;
