var mainBussTool = (function(){
    return {
        initEditor:we.initEditorBuss,
        initContainer:we.initContainerBuss,
        initAllData:we.initAllDataBuss,
        getAllComponentData:we.getAllComponentDataBuss,
        loopBody:function (state, time) {
            we.loopBodyBuss(state, time || 0);
        }
    }
})();
