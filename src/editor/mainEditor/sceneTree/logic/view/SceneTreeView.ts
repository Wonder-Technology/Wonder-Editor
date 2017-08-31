import {getSceneTreeData as getSceneTreeDataBuss} from "../bussiness/SceneTreeBuss";

export const getTempSceneData = () => {
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
        },
        {
            name:"box",
            uid:3,
            children:[
                {
                    name:"box",
                    uid:4
                },
                {
                    name:"box",
                    uid:5
                }
            ]
        },
    ];

    return sceneGraph;
};

export const getSceneTreeData = () => {
    return getSceneTreeDataBuss();
};
