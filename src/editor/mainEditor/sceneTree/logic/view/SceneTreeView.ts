import {getSceneTreeData as getSceneTreeDataBuss, setSceneTreeData as setSceneTreeDataBuss} from "../bussiness/SceneTreeBuss";
import {ISceneTreeGameObject} from "../interface/ISceneTree";

export const getSceneTreeData = () => {
    return getSceneTreeDataBuss();
};

export const setSceneTreeData = setSceneTreeDataBuss;

/*export const getTempSceneData = () => {
    const sceneGraph = [
        {
            name:"triangle",
            uid:1,
            children:[
                {
                    name:"triangle",
                    uid:6,
                    children:[
                        {
                            name:"box",
                            uid:7
                        },
                        {
                            name:"box",
                            uid:8
                        }
                    ]
                }
            ]
        },
        {
            name:"camera",
            uid:2
        }
    ];

    return sceneGraph;
};*/
