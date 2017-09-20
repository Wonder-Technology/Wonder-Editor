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
            var gameObject = gameObjectAdaptorTool.create();
            newState = stateEditTool.getState().set("currentGameObject",gameObject);
            stateEditTool.setState(newState);

            currentGameObject = sceneBussTool.getCurrentGameObject();

            expect(currentGameObject.uid).toEqual(gameObject.uid);
        });
    });

    describe("set current gameObject", function(){
        var currentGameObject;

        it("set current gameObject by specific uid", function(){
            var gameObject1 = gameObjectAdaptorTool.create();
            var gameObject2 = gameObjectAdaptorTool.create();
            sceneBussTool.setCurrentGameObject(gameObject2.uid, [
                gameObject1,
                gameObject2
            ]);

            currentGameObject = stateEditTool.getState().get("currentGameObject");

            expect(currentGameObject.uid).toEqual(gameObject2.uid);
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
