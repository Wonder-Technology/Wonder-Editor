import { addGameObject as addGameObjectAdaptor, getScene as getSceneAdaptor } from "../../adaptor/SceneAdaptor";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { getChildren } from "../../adaptor/GameObjectAdaptor";
import { getDirector } from "../../adaptor/DirectorAdaptor";

export const getSceneChildren = () => {
    return getChildren(getSceneAdaptor(getDirector()));
};

export const getScene = getSceneAdaptor;

export const addGameObject = addGameObjectAdaptor;
