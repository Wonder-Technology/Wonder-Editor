describe("translation", function () {
    var editorState = null,
        engineState = null,
        sandbox = null,
        gl = null;

    var triangle;

    function getTranslate(state) {
        var triangle = sceneGameObjectEditTool.getTriangleFromState(state),
            translation = transformOperTool.getTransform(triangle);

        //todo need test

        return 10;
    }

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

    it("update translation data", function(){
        // editorState = mainBussTool.initEditor(editorState);
        // stateEditTool.setState(editorState);


        // expect(getTranslate(editorState)).toEqual(10);
    });
});
