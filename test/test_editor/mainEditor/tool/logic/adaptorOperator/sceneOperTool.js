var sceneOperTool = (function(){
    return {
        getTriangle:function () {
            var children = mainAdaptorTool.getSceneGameObjects().children;

            return children.filter(function (item) {
                return sceneOperTool.isTriangle(item);
            });
        },
        getCamera:function () {
            var children = mainAdaptorTool.getSceneGameObjects().children;

            return children.filter(function (item) {
                return sceneOperTool.isCamera(item);
            });
        },
        isTriangle:function(gameObject) {
            return gameObject.geometry !== null;
        },
        isCamera:function(gameObject) {
            return gameObject.geometry === null;
        }
    }
})();
