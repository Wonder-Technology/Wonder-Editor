export var saveSceneGraphData = function (state, sceneGraphData) {
    var resultState = state;
    for (var key in sceneGraphData) {
        if (sceneGraphData.hasOwnProperty(key)) {
            var item = sceneGraphData[key];
            resultState = resultState.setIn(["scene", key], item);
        }
    }
    return resultState;
};
//# sourceMappingURL=SceneGraphEdit.js.map