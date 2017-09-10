export const GET_SCENE_DATA: string = "GET_SCENE_DATA";
export const CHANGE_SCENE_DATA: string = "CHANGE_SCENE_DATA";

export interface ISceneTreeAction {
    getSceneData: Function;
    changeSceneData: Function;
}

export const getSceneData = () => ({
    type: GET_SCENE_DATA
});

export const changeSceneData = (treeData) => ({
    type: CHANGE_SCENE_DATA,
    data: treeData
});
