describe("test sceneTree engine", function(){
    var editorState = null,
        engineState = null,
        sandbox = null,
        gameObject1,
        gameObject2,
        children,
        gl;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        editorState = stateEditTool.createState();

        engineState = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(engineState);

        editorState = mainViewTool.initEditor(editorState);
        stateEditTool.setState(editorState);
    });

    afterEach(function(){
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("update tree node parent", function(){
        beforeEach(function(){
            mainBussTool.initAllData();
        });
        afterEach(function(){
        });

        it("add child tree node to parent tree node", function(){
            var parent = gameObjectAdaptorTool.create(),
                child = gameObjectAdaptorTool.create();
            var parentUid = parent.uid,
                childUid = child.uid;

            sceneTreeBussTool.updateTreeNodeParent(parentUid, childUid);

            children = gameObjectAdaptorTool.getChildren(parent);

            expect(children[0]).toEqual(child);
        });
    });
});