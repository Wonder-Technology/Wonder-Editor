describe("test material engine", function(){
    var editorState = null,
        engineState = null,
        sandbox = null,
        triangle,
        triangleMaterialComponent,
        gl;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        editorState = stateEditTool.createState();

        engineState = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(engineState);

        editorState = mainViewTool.initEditor(editorState);

        triangle = sceneOperTool.getTriangles()[0];

        triangleMaterialComponent = gameObjectAdaptorTool.getGameObjectMaterial(triangle);
    });
    afterEach(function(){
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("test set gameObject color", function(){
        it("set gameObject color to engine",function () {
            var color = "#ff0000";

            materialBussTool.setGameObjectColor(triangleMaterialComponent,color);

            var gameObjectColor = basicMaterialAdaptorTool.getColor(triangleMaterialComponent);

            expect(gameObjectColor.toString()).toEqual(color);
        })
    });

    describe("test get gameObject color", function(){
        it("get gameObject color from engine",function () {
            var color = "#ff0000";

            materialBussTool.setGameObjectColor(triangleMaterialComponent,color);

            var gameObjectColor = materialBussTool.getGameObjectColor(triangleMaterialComponent);

            expect(gameObjectColor.toString()).toEqual(color);
        })
    });

});