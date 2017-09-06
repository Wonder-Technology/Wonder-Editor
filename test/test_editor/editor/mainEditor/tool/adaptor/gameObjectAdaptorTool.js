var GameObjectAdaptorTool = YYC.Class({
    Public: {
        getComponent: function (gameObject, _class) {
            return we.getComponentAdaptor(gameObject, _class);
        },
        hasComponent: function (gameObject, _class) {
            return we.hasComponentAdaptor(gameObject, _class);
        },
        getTransform: function (gameObject) {
            return we.getTransformComponentAdaptor(gameObject);
        },
        getChildren: we.getChildrenAdaptor
    }
})

var gameObjectAdaptorTool = new GameObjectAdaptorTool();
