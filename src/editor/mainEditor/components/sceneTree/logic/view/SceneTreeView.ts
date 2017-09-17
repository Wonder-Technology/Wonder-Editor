import {
    insertDragedTreeNodeToTargetTreeNode as insertDragedTreeNodeToTargetTreeNodeBuss, getSceneTreeData as getSceneTreeDataBuss,
    updateTreeNodeParent as updateTreeNodeParentBuss,
    setSceneTreeData as setSceneTreeDataBuss
} from "../bussiness/SceneTreeBuss";
import { ISceneTreeGameObject } from "../interface/ISceneTree";

export const getSceneTreeData = getSceneTreeDataBuss;

export const setSceneTreeData = setSceneTreeDataBuss;

export const insertDragedTreeNodeToTargetTreeNode = insertDragedTreeNodeToTargetTreeNodeBuss;

export const updateTreeNodeParent = updateTreeNodeParentBuss;

