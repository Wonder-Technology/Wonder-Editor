export const CHANGESCENETREE:string = "CHANGESCENETREE";

export interface ISceneTreeAction{
    changeSceneTree:Function;
}

export const changeSceneTree = (treeData) => ({
    type:CHANGESCENETREE,
    data:treeData
});