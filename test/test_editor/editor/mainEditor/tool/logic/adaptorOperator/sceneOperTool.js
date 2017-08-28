var sceneOperTool = (function(){
    return {
        removeSceneGameObjects:function () {
            we.removeAllChildrenAdaptor(we.getSceneAdaptor());
        },
        getSceneGameObjects:function () {
            return we.getChildrenAdaptor(we.getSceneAdaptor());
        },
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
