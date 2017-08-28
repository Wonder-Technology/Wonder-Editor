describe("init default scene", function(){
    var editorState = null,
        engineState = null,
        sandbox = null,
        gl = null;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        editorState = stateEditTool.createState();

        engineState = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(engineState);
    });

    afterEach(function(){
        testTool.clear(sandbox);
        sandbox.restore();
    });

    it("should add triangle and camera to editorState", function(){
        editorState = mainBussTool.initEditor(editorState);

        expect(sceneGameObjectEditTool.getTriangleFromState(editorState)).not.toBeUndefined();
        expect(editorState.getIn(["scene","camera"])).not.toBeUndefined();
    });
});
