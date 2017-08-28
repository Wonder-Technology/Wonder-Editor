var StateTool = YYC.Class({
    Public:{
        createAndSetFakeGLState: function (sandbox) {
            var state = this.createFakeGLState(sandbox);

            this.setState(state);

            return state;
        },
        createFakeGLState: function (sandbox) {
            var state = we.createStateAdapator(),
                gl = glslTool.buildFakeGl(sandbox);

            we.setGLAdaptor(gl);

            return state;
        },
        getGLFromFakeGLState: function (state) {
            return we.getGLAdaptor();
        },
        setState: function(state){
            we.setStateAdaptor(state);
        }
    }
})

var stateTool = new StateTool();
