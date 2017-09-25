describe("test material engine", function(){
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

    describe("test set gameObject color", function(){
        it("set gameObject color to engine",function () {
            var color = "#ff0000";

            materialBussTool.setGameObjectColor(triangle,color);

            var gameObjectColor = basicMaterialAdaptorTool.getColor(gameObjectAdaptorTool.getGameObjectMaterial(triangle));

            expect(gameObjectColor.toString()).toEqual(color);
        })
    });

    describe("test get gameObject color", function(){
        it("get gameObject color from engine",function () {
            var color = "#ff0000";

            materialBussTool.setGameObjectColor(triangle,color);

            var gameObjectColor = materialBussTool.getGameObjectColor(triangle);

            expect(gameObjectColor.toString()).toEqual(color);
        })
    });

});