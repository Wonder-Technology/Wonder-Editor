var GameObjectAdaptorTool = YYC.Class({
    Public: {
        create: function () {
            var gameObject = we.createGameObjectAdaptor();

            return gameObject;
        },
        getGameObjectMaterial:we.getGameObjectMaterialAdaptor,
        addComponent: function (gameObject, component) {
            return we.addComponentAdaptor(gameObject,component);
        },
        getComponent: function (gameObject, _class) {
            return we.getComponentAdaptor(gameObject, _class);
        },
        hasComponent: function (gameObject, _class) {
            return we.hasComponentAdaptor(gameObject, _class);
        },
        getTransform: function (gameObject) {
            return we.getTransformComponentAdaptor(gameObject);
        },
        getChildren: we.getChildrenAdaptor,
        getName: function (gameObject) {
            return "gameObject" + String(gameObject.uid);
        }
    }
})

var gameObjectAdaptorTool = new GameObjectAdaptorTool();
