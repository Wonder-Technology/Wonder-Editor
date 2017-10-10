import { ISceneTreeGameObject } from "../interface/ISceneTree";

import {
    insertDragedTreeNodeToTargetTreeNode as insertDragedTreeNodeToTargetTreeNodeBuss, getSceneTreeData as getSceneTreeDataBuss,
    updateTreeNodeParent as updateTreeNodeParentBuss,
    setSceneTreeData as setSceneTreeDataBuss
} from "../bussiness/SceneTreeBuss";

export const getSceneTreeData = getSceneTreeDataBuss;

export const setSceneTreeData = setSceneTreeDataBuss;

export const insertDragedTreeNodeToTargetTreeNode = insertDragedTreeNodeToTargetTreeNodeBuss;

export const updateTreeNodeParent = updateTreeNodeParentBuss;

