import {
    dragTreeNode as dragTreeNodeBuss, getSceneTreeData as getSceneTreeDataBuss,
    updateTreeNodeParent as updateTreeNodeParentBuss,
    setSceneTreeData as setSceneTreeDataBuss
} from "../bussiness/SceneTreeBuss";
import { ISceneTreeGameObject } from "../interface/ISceneTree";

export const getSceneTreeData = () => {
    return getSceneTreeDataBuss();
};

export const setSceneTreeData = setSceneTreeDataBuss;

export const dragTreeNode = dragTreeNodeBuss;

export const updateTreeNodeParent = updateTreeNodeParentBuss;

