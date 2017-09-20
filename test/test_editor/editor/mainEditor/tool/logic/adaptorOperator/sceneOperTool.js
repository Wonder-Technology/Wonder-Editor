var sceneOperTool = (function(){
    return {
        removeSceneGameObjects:function () {
            we.removeAllChildrenAdaptor(we.getSceneAdaptor(directorAdaptorTool.getDirector()));
        },
        getSceneGameObjects:function () {
            return we.getChildrenAdaptor(we.getSceneAdaptor(directorAdaptorTool.getDirector()));
        },
        getTriangles:function () {
            var children = this.getSceneGameObjects();

            return children.filter(function (item) {
                return sceneOperTool.isTriangle(item);
            });
        },
        getCameras:function () {
            var children = this.getSceneGameObjects();

            return children.filter(function (item) {
                return sceneOperTool.isCamera(item);
            });
        },
        isTriangle:function(gameObject) {
            return we.hasComponentAdaptor(gameObject, we.getGeometryAdaptor()) === true;
        },
        isCamera:function(gameObject) {
            return we.hasComponentAdaptor(gameObject, we.getCameraControllerAdaptor()) === true;
        }
    }
})();