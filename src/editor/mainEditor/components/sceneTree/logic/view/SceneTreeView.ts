import {
    insertDragedTreeNodeToTargetTreeNode as insertDragedTreeNodeToTargetTreeNodeBuss, getSceneTreeData as getSceneTreeDataBuss,
    updateTreeNodeParent as updateTreeNodeParentBuss,
    setSceneTreeData as setSceneTreeDataBuss
} from "../bussiness/SceneTreeBuss";
import { ISceneTreeGameObject } from "../interface/ISceneTree";

export const getSceneTreeData = () => {
    return getSceneTreeDataBuss();
};

export const setSceneTreeData = setSceneTreeDataBuss;

export const insertDragedTreeNodeToTargetTreeNode = insertDragedTreeNodeToTargetTreeNodeBuss;

export const updateTreeNodeParent = updateTreeNodeParentBuss;

