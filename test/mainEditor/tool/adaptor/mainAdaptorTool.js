var mainAdaptorTool = (function(){
    return {
        removeSceneGameObjects:function () {
            we.removeAllChildrenAdaptor(we.gameObjectSceneAdaptor());
        },
        getSceneGameObjects:function () {
            return we.getChildrenAdaptor(we.gameObjectSceneAdaptor());
        },
    }
})();
