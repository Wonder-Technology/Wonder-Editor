describe("test scene editor", function(){
    var editorState,
        engineState,
        sandbox,
        newState,
        gl;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        editorState = stateEditTool.createState();

        engineState = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(engineState);

        newState = mainViewTool.initEditor(editorState);
    });
    afterEach(function(){
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("get current gameObject", function(){
        var currentGameObject;

        it("get from editorState->currentGameObject", function(){
            newState = stateEditTool.getState().set("currentGameObject",gameObjectAdaptorTool.create(1));
            stateEditTool.setState(newState);

            currentGameObject = sceneBussTool.getCurrentGameObject();

            expect(currentGameObject.uid).toEqual(1);
        });
    });

    describe("set current gameObject", function(){
        var currentGameObject;

        it("set current gameObject by specific uid", function(){
            sceneBussTool.setCurrentGameObject(1, [
                gameObjectAdaptorTool.create(0),
                gameObjectAdaptorTool.create(1)
            ]);

            currentGameObject = stateEditTool.getState().get("currentGameObject");

            expect(currentGameObject.uid).toEqual(1);
        });
    });

    describe("remove current gameObject", function(){
        it("set editor state 'currentGameObject' to null", function(){
            newState = stateEditTool.getState().set("currentGameObject",gameObjectAdaptorTool.create(2));
            stateEditTool.setState(newState);

            sceneBussTool.removeCurrentGameObject();

            expect(stateEditTool.getState().get("currentGameObject")).toEqual(null);
        });
    });
});
