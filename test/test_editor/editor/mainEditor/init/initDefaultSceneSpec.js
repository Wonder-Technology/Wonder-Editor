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

    describe("should add gameObject and camera to editorState's scene", function(){
        var scene;

        beforeEach(function(){
            editorState = mainBussTool.initEditor(editorState);
            scene = editorState.get("sceneTree")[0];
        });

        it("should add gameobject in editorState's scene", function(){
            expect(scene.children.length).toBe(2);
        });
        it("has gameObject0 and mainCamera in the editorState's sceneTree", function(){
            scene.children.forEach(function (gameObject) {
                if(gameObject.name == "mainCamera"){
                    expect(gameObject.name).toBe("mainCamera");
                }
                else{
                    expect(gameObject.name).toBe("gameObject0");
                }
            });
        });
    });
});
