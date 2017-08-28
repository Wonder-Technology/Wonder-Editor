var mainBussTool = (function(){
    return {
        initEditor:we.initEditorBuss,
        initContainer:we.initContainerBuss,
        loopBody:function (state, time) {
            we.loopBodyBuss(state, time || 0);
        }
    }
})();
