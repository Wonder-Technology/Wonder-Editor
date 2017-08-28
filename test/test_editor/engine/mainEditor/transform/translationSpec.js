describe("translation", function () {
    var editorState = null,
        engineState = null,
        sandbox = null,
        gl = null;
    var triangle;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        editorState = stateEditTool.createState();

        engineState = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(engineState);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    it("test translate triangle", function () {
        editorState = mainBussTool.initEditor(editorState);
        stateEditTool.setState(editorState);

        triangle = sceneOperTool.getTriangles()[0];
        var pos = [0.5, 0, 0];

        transformViewTool.setTriangleTranslation(pos[0], pos[1], pos[2]);

        mainBussTool.loopBody(editorState);

        var transform = gameObjectAdaptorTool.getTransform(triangle);
        expect(
            testTool.getValues(
                transformAdaptorTool.getPosition(transform).values
            )
        ).toEqual(pos);
    });
});

