export const GETSCENEDATA: string = "GETSCENEDATA";
export const CHANGESCENEDATA: string = "CHANGESCENEDATA";

export interface ISceneTreeAction {
    getSceneData: Function;
    changeSceneData: Function;
}

export const getSceneData = () => ({
    type: GETSCENEDATA
});

export const changeSceneData = (treeData) => ({
    type: CHANGESCENEDATA,
    data: treeData
});
