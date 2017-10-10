import * as sinon from "sinon";
import {clear, clearAndOpenContractCheck} from "../../tool/testTool";
import {createState, getState, setState} from "../../../../../../src/editor/mainEditor/logic/bussiness/MainBuss";
import {createAndSetFakeGLState, getGLFromFakeGLState} from "../../tool/stateTool";
import {initEditor} from "../../../../../../src/editor/mainEditor/logic/view/MainView";
import {
    getSceneTreeData, insertDragedTreeNodeToTargetTreeNode,
    setSceneTreeData
} from "../../../../../../src/editor/mainEditor/component/sceneTree/logic/bussiness/SceneTreeBuss";

describe("test sceneTree editor", () => {
    var sandbox,
        editorState,
        engineState,
        sandbox,
        fakeSceneTreeData,
        newState,
        sceneTreeData,
        gl;

    var getFakeSceneTreeData = function () {
        return [
            {name:"gameObject1",uid:1},
            {name:"gameObject2",uid:2},
            {name:"gameObject3",uid:3}
        ];
    };

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();

        clearAndOpenContractCheck(sandbox);

        editorState = createState();

        engineState = createAndSetFakeGLState(sandbox);

        gl = getGLFromFakeGLState(engineState);

        fakeSceneTreeData = getFakeSceneTreeData();
        newState = initEditor(editorState);
    });
    afterEach(()=>{
        clear(sandbox);
        sandbox.restore();
    });

    describe("set scene tree data", function(){
        beforeEach(function(){
            setState(newState);
        });

        it("should add data in editor state 'sceneTreeData' filed",()=>{
            setSceneTreeData(fakeSceneTreeData);

            sceneTreeData = getState().get("sceneTreeData")

            expect(sceneTreeData).toEqual(fakeSceneTreeData);
        });
    });

    describe("get scene tree data", function(){
        beforeEach(() => {
            newState = newState.set("sceneTreeData",fakeSceneTreeData);

            setState(newState);
        });

        it("should get data from editor state 'sceneTreeData' filed",()=>{
            sceneTreeData = getSceneTreeData();

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
                dragedSceneTreeData = insertDragedTreeNodeToTargetTreeNode(1,2,getFakeSceneTreeData());

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
                        dragedSceneTreeData = insertDragedTreeNodeToTargetTreeNode(1,2,getFakeSceneTreeData());


                        expect(dragedSceneTreeData).toEqual([
                            {name:"gameObject1",uid:1,children:[
                                {name:"gameObject4",uid:4},
                                {name:"gameObject2",uid:2}
                            ]},
                            {name:"gameObject3",uid:3}
                        ])
                    });
                    it("add into first level children", function(){
                        dragedSceneTreeData = insertDragedTreeNodeToTargetTreeNode(4,2,getFakeSceneTreeData());


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
                    dragedSceneTreeData = insertDragedTreeNodeToTargetTreeNode(5,2,getFakeSceneTreeData());

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