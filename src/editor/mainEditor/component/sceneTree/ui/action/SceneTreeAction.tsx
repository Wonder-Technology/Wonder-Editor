export const GET_SCENE_TREE_DATA: string = "GET_SCENE_TREE_DATA";
export const CHANGE_SCENE_TREE_DATA: string = "CHANGE_SCENE_TREE_DATA";

export interface ISceneTreeAction {
    getSceneData: Function;
    changeSceneData: Function;
}

export const getSceneTreeData = () => ({
    type: GET_SCENE_TREE_DATA
});

export const changeSceneTreeData = (treeData) => ({
    type: CHANGE_SCENE_TREE_DATA,
    data: treeData
});
