describe("test sceneTree editor", function(){
    var editorState,
        engineState,
        sandbox,
        newState,
        fakeSceneTreeData,
        sceneTreeData,
        gl;

    var getFakeSceneTreeData = function () {
        return [
            {name:"gameObject1",uid:1},
            {name:"gameObject2",uid:2},
            {name:"gameObject3",uid:3}
        ];
    };

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        editorState = stateEditTool.createState();

        engineState = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(engineState);


        fakeSceneTreeData = getFakeSceneTreeData();
        newState = mainBussTool.initEditor(editorState);
    });
    afterEach(function(){
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("set scene tree data", function(){
        beforeEach(function(){
            stateEditTool.setState(newState);
        });

        it("should add data in editor state 'sceneTreeData' filed",()=>{
            sceneTreeBussTool.setSceneTreeData(fakeSceneTreeData);

            sceneTreeData = stateEditTool.getState().get("sceneTreeData")

            expect(sceneTreeData).toEqual(fakeSceneTreeData);
        });
    });

    describe("get scene tree data", function(){
        beforeEach(() => {
            newState = newState.set("sceneTreeData",fakeSceneTreeData);

            stateEditTool.setState(newState);
        });

        it("should get data from editor state 'sceneTreeData' filed",()=>{
            sceneTreeData = sceneTreeBussTool.getSceneTreeData();

            expect(sceneTreeData).toEqual(fakeSceneTreeData);
        });
    });

    describe("insert draged treeNode to target treeNode", function(){
        var dragedSceneTreeData;

        describe("should change sceneTree array data structure", function(){
            it("test has no children case", function(){
                var getFakeSceneTreeData = function () {
                    return [
                        {name:"gameObject1",uid:1},
                        {name:"gameObject2",uid:2},
                        {name:"gameObject3",uid:3}
                    ];
                };
                dragedSceneTreeData = sceneTreeBussTool.insertDragedTreeNodeToTargetTreeNode(1,2,getFakeSceneTreeData());

                expect(dragedSceneTreeData).toEqual([
                    {name:"gameObject1",uid:1,children:[
                        {name:"gameObject2",uid:2},
                    ]},
                    {name:"gameObject3",uid:3}
                ])
            });

            describe("test has children case", function(){
                describe("test has first level children", function(){
                    var getFakeSceneTreeData;

                   beforeEach(function () {
                        getFakeSceneTreeData = function () {
                            return [
                                {name:"gameObject1",uid:1,children:[
                                    {name:"gameObject4",uid:4}
                                ]},
                                {name:"gameObject2",uid:2},
                                {name:"gameObject3",uid:3}
                            ];
                        };
                    });
                    it("add into first level parent", function(){
                        dragedSceneTreeData = sceneTreeBussTool.insertDragedTreeNodeToTargetTreeNode(1,2,getFakeSceneTreeData());


                        expect(dragedSceneTreeData).toEqual([
                            {name:"gameObject1",uid:1,children:[
                                {name:"gameObject4",uid:4},
                                {name:"gameObject2",uid:2}
                            ]},
                            {name:"gameObject3",uid:3}
                        ])
                    });
                    it("add into first level children", function(){
                        dragedSceneTreeData = sceneTreeBussTool.insertDragedTreeNodeToTargetTreeNode(4,2,getFakeSceneTreeData());


                        expect(dragedSceneTreeData).toEqual([
                            {name:"gameObject1",uid:1,children:[
                                {name:"gameObject4",uid:4,children:[
                                    {name:"gameObject2",uid:2}
                                ]},
                            ]},
                            {name:"gameObject3",uid:3}
                        ])
                    });
                });

                it("test has second level children,add into second level children", function(){
                    var getFakeSceneTreeData = function () {
                        return [
                            {name:"gameObject1",uid:1,children:[
                                {name:"gameObject4",uid:4,children:[
                                    {name:"gameObject5",uid:5},
                                ]}
                            ]},
                            {name:"gameObject2",uid:2},
                            {name:"gameObject3",uid:3}
                        ];
                    };
                    dragedSceneTreeData = sceneTreeBussTool.insertDragedTreeNodeToTargetTreeNode(5,2,getFakeSceneTreeData());

                    expect(dragedSceneTreeData).toEqual([
                            {name:"gameObject1",uid:1,children:[
                                {name:"gameObject4",uid:4,children:[
                                    {name:"gameObject5",uid:5,children:[
                                        {name:"gameObject2",uid:2}
                                    ]}
                                ]}
                            ]},
                            {name:"gameObject3",uid:3}
                    ])
                });
            });
        });
    });
});