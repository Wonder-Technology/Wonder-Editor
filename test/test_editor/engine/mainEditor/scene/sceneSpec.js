describe("test scene engine", function() {
    var editorState,
        engineState,
        sandbox,
        newState,
        gl;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        editorState = stateEditTool.createState();

        engineState = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(engineState);

        newState = mainViewTool.initEditor(editorState);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("get scene id", function(){
        var sceneFromEngine,
            sceneId;

        beforeEach(function(){
            sceneFromEngine = sceneAdaptorTool.getScene(directorAdaptorTool.getDirector());
            sceneId = sceneViewTool.getSceneId();
        });

        it("get scene from director", function(){
            expect(sceneFromEngine.uid).toEqual(sceneId);
        });
    });
});
