describe("test gameObject components", function(){
    var editorState = null,
        engineState = null,
        sandbox = null,
        triangle,
        gl;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        editorState = stateEditTool.createState();

        engineState = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(engineState);

        editorState = mainViewTool.initEditor(editorState);

        triangle = sceneOperTool.getTriangles()[0];
    });
    afterEach(function(){
        testTool.clear(sandbox);
        sandbox.restore();
    });


});