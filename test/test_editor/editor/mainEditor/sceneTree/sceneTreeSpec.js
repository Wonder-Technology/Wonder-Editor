describe("test sceneTree", function(){
    var editorState = null,
        engineState = null,
        sandbox = null,
        gl;

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

    describe("test setSceneTreeData", function(){
        var newSceneTree;

        beforeEach(function(){
            newSceneTree = [
                {
                    uid:1,
                    name:"mainCamera",
                    children:[
                        {
                            uid:0,
                            name:"gameObject0"
                        }
                    ]
                }
            ];

            editorState = mainBussTool.initEditor(editorState);
            stateEditTool.setState(editorState);
        });

        it("setSceneTreeData,store new data in state", function(){
            sceneTreeTool.setSceneTreeData(newSceneTree);
            editorState = stateEditTool.getState();

            expect(editorState.get("sceneTree")).toEqual(newSceneTree);
        });
    });
});