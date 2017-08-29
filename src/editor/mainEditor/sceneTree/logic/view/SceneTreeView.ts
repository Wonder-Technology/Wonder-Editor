export const getTempSceneData = () => {
    const sceneGraph = [
        {
            name:"triangle",
            id:1,
            children:[
                {
                    name:"box",
                    id:3,
                    children:[
                        {
                            name:"box",
                            id:4,
                            children:[]
                        },
                        {
                            name:"box",
                            id:5,
                            children:[]
                        }
                    ]
                },
                {
                    name:"triangle",
                    id:6,
                    children:[
                        {
                            name:"box",
                            id:7,
                            children:[]
                        },
                        {
                            name:"box",
                            id:8,
                            children:[]
                        }
                    ]
                }
            ]
        },
        {
            name:"camera",
            id:2
        }
    ];

    return sceneGraph;
};