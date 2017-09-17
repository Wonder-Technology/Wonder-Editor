var mainBussTool = (function(){
    return {
        initEditor:we.initEditorBuss,
        initContainer:we.initContainerBuss,
        initAllData:we.initAllDataBuss,
        loopBody:function (state, time) {
            we.loopBodyBuss(state, time || 0);
        }
    }
})();
