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

        it("get from editorState->'currentGameObject' field", function(){
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
            newState = stateEditTool.getState().set("currentGameObject",gameObjectAdaptorTool.create());
            stateEditTool.setState(newState);

            sceneBussTool.removeCurrentGameObject();

            expect(stateEditTool.getState().get("currentGameObject")).toEqual(null);
        });
    });

    describe("get current gameObject uid", function(){
        var uid,
            gameObject;

        describe("if current gameObject exist", function(){
            beforeEach(function(){
                gameObject = gameObjectAdaptorTool.create();

                newState = stateEditTool.getState().set("currentGameObject",gameObject);
                stateEditTool.setState(newState);
            });

            it("return it uid", function(){
                uid = sceneViewTool.getCurrentGameObjectUId();
                expect(uid).toEqual(gameObject.uid);
            });
            it("has current gameObject by uid return true",function () {
                expect(sceneViewTool.hasCurrentGameObjectByUId()).toBeTruthy();
            })
        });
        describe("else", function(){
            it("return uid = -1", function(){
                uid = sceneViewTool.getCurrentGameObjectUId();

                expect(uid).toEqual(-1);
            });
            it("has current gameObject by uid return false", function(){
                expect(sceneViewTool.hasCurrentGameObjectByUId()).toBeTruthy();
            });
        });
    });
});
