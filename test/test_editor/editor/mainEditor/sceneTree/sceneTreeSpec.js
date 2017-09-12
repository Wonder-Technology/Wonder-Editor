describe("test sceneTreeData", function(){
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
                    uid:0,
                    name:"mainCamera",
                },
                {
                    uid:1,
                    name:"gameObject1"
                },
                {
                    uid:2,
                    name:"gameObject2"
                }
            ];

            editorState = mainBussTool.initEditor(editorState);
            stateEditTool.setState(editorState);
            sceneTreeBussTool.setSceneTreeData(newSceneTree);
        });

        it("setSceneTreeData,store new data in state", function(){
            expect(sceneTreeBussTool.getSceneTreeData()).toEqual(newSceneTree);
        });

        describe("drag operate", function(){
            it("insertDragedTreeNodeToTargetTreeNode,should isChange the state", function(){
                var data = sceneTreeBussTool.dragTreeNode(2,1,sceneTreeBussTool.getSceneTreeData());

                expect(data).toEqual([
                    {
                        uid:0,
                        name:"mainCamera",
                    },
                    {
                        uid:2,
                        name:"gameObject2",
                        children:[
                            {
                                uid:1,
                                name:"gameObject1"
                            }
                        ]
                    }
                ]);
            });
        });
    });
});
