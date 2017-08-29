/*export const saveSceneGraphData = (state: Map<any, any>, sceneGraphData: ISceneGraph) => {
    var resultState: Map<any, any> = state;

    for (let key in sceneGraphData) {
        if (sceneGraphData.hasOwnProperty(key)) {
            let item = sceneGraphData[key];

            resultState = resultState.setIn(["scene", key], item);
        }
    }

    return resultState;
};*/
export var saveSceneGraphData = function (state, sceneChildren) {
    var resultState = state;
    // var scene:IGameObject[] = [];
    sceneChildren.forEach(function (gameObject) {
        var obj = {
            uid: gameObject.uid,
            name: null,
            component: []
        };
        //todo get gameobject name by uid
        //todo get gameobject component by uid,store in component array
        //obj.name = getGameObjectName(gameObject.uid);
        // scene.push(obj);
        resultState = resultState.setIn(["scene", obj.name], obj);
    });
    // resultState = resultState.setIn(["scene"], scene);
    return resultState;
};
//# sourceMappingURL=SceneGraphEdit.js.map