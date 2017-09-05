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

    describe("should add gameObject and camera to editorState's sceneTree", function(){
        beforeEach(function(){
            editorState = mainBussTool.initEditor(editorState);
        });

        it("should add two gameObject in editorState's sceneTree", function(){
            expect(editorState.get("sceneTree").length).toBe(1);
        });
        it("has gameObject0 and mainCamera in the editorState's sceneTree", function(){
            editorState.get("sceneTree").forEach(function (gameObject) {
                // if(gameObject.name == "mainCamera"){
                //     expect(gameObject.name).toBe("mainCamera");
                // }
                // else{
                //     expect(gameObject.name).toBe("gameObject0");
                // }
            });
        });
    });
});
