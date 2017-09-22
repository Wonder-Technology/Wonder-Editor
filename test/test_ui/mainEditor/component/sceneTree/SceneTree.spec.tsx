import {mount, shallow} from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import {getDom, getDomAttribute} from "../../tool/domTool";
import SceneTree from "../../../../../src/editor/mainEditor/component/sceneTree/ui/SceneTree";
import {ISceneTreeGameObject} from "../../../../../src/editor/mainEditor/component/sceneTree/logic/interface/ISceneTree";
import {execEventHandler} from "../../tool/eventTool";

describe("SceneTree component", () => {
    var ct = null,
        props = null,
        sandbox = null;


    beforeEach(()=>{
        sandbox = sinon.sandbox.create();

        props = {
            getScneneTreeData:sandbox.stub(),
            sceneTreeData:[]
        };
        ct = shallow(<SceneTree {...props} />);
    });
    afterEach(()=>{
        sandbox.restore();
    });

    describe("test container", function() {
        var articles;

        var getArticle = (ct)=>getDom(ct,"article");

        beforeEach(()=>{
            articles = getArticle(ct);
        });

        describe("test dom", function(){
            describe("should add a article as container", function(){
                var container;

                beforeEach(() => {
                    container = articles.at(0);
                });

                it("test should has container dom", function(){
                    expect(articles.length).toEqual(1);
                });
                it("test className", function(){
                    expect(getDomAttribute(container, "className")).toEqual("tree-component");
                });
                it("test default style", function(){
                    expect(getDomAttribute(container, "style").width).toEqual("15%");
                });
            });
        });

   });

    describe("test Tree", function () {
        describe("test tree root", function(){
            var trees,
                tree;

            beforeEach(function(){
                trees = getDom(ct, "Tree");

                tree = trees.at(0);
            });

            describe("test dom", function(){
                it("should has one tree", function(){
                    expect(trees.length).toEqual(1);
                });
                it("should expand no 2 key default", function(){
                    expect(getDomAttribute(tree, "defaultExpandedKeys")).toEqual([ "2" ]);
                });
                it("should be draggable", function(){
                    expect(getDomAttribute(tree, "draggable")).toBeDefined();
                });
            });
        });

        describe("test tree node", function(){
            var tree,
                treeNodes,
                treeNode;

            var setSceneTreeData = (sceneTreeData:Array<ISceneTreeGameObject>) => {
                props = {
                    changeEditorState:sandbox.stub(),

                    getSceneTreeData:sandbox.stub(),
                    setCurrentGameObject:sandbox.stub(),
                    removeCurrentGameObject:sandbox.stub(),
                    insertDragedTreeNodeToTargetTreeNode: sandbox.stub(),
                    updateTreeNodeParent:sandbox.stub(),
                    setSceneTreeData:sandbox.stub(),

                    sceneTreeData:sceneTreeData
                };

                ct = shallow(<SceneTree {...props} />);

                tree = getDom(ct, "Tree").at(0);
            }

            describe("test dom", function(){
                var getTreeNode = (ct)=>getDom(ct,"TreeNode");

                describe("should add tree nodes based on sceneTreeData", () =>{
                    it("test props", function(){
                        setSceneTreeData([{name:"gameObject1",uid:1}]);

                        treeNodes = getTreeNode(ct);
                        treeNode = treeNodes.at(0);

                        expect(treeNode.key()).toEqual("1");
                        expect(getDomAttribute(treeNode, "uid")).toEqual(1);
                        expect(getDomAttribute(treeNode, "title")).toEqual("gameObject1");
                    });
                    it("test has no children case", function(){
                        setSceneTreeData([{name:"gameObject0",uid:0},{name:"gameObject1",uid:1}]);

                        treeNodes = getTreeNode(ct);

                        expect(treeNodes.length).toEqual(2);
                    });

                    describe("test has children case", function(){
                        it("test first level children", function(){
                            setSceneTreeData([
                                {
                                    name:"gameObject0",uid:0, children:[{name:"gameObject2",uid:2}]
                                }
                            ]);


                            treeNodes = getTreeNode(ct);


                            expect(treeNodes.length).toEqual(2);

                            expect(tree.children().length).toEqual(1);

                            expect(tree.children().at(0).children().length).toEqual(1);
                        });
                        it("test second level children", function(){
                            setSceneTreeData([
                                {name:"gameObject1",uid:1, children:[
                                    {name:"gameObject3",uid:3, children:[
                                        {name:"gameObject4",uid:4}
                                    ]}
                                ]}
                            ]);


                            treeNodes = getTreeNode(ct);


                            expect(treeNodes.length).toEqual(3);

                            expect(tree.children().length).toEqual(1);

                            expect(tree.children().at(0).children().length).toEqual(1);
                            expect(tree.children().at(0).children().at(0).children().length).toEqual(1);
                        });
                    });
                });
            });
            
            describe("test event", function(){
                var execTreeEventHandler = (handlerName:string, fakeData:any) => {
                    execEventHandler(getDom(ct, "Tree").at(0), handlerName, fakeData);
                };

                describe("test onSelect", function(){
                    var uid;

                    beforeEach(function(){
                        uid = 10;

                        setSceneTreeData([{name:"gameObject10",uid:uid}]);
                    });

                    it("set current gameObject when click treeNode", function(){
                        execTreeEventHandler("onSelect", [String(uid)]);

                        expect(props.setCurrentGameObject).toCalledOnce();
                        expect(props.setCurrentGameObject).toCalledWith(uid);
                    });
                    it("remove current gameObject when click the selected one again",()=>{
                        execTreeEventHandler("onSelect",[]);

                        expect(props.removeCurrentGameObject).toCalledOnce();
                    });
                    it("exec onSelect function should change call changeEditorState",()=>{
                        execTreeEventHandler("onSelect",[String(uid)]);

                        expect(props.changeEditorState).toCalledOnce();
                    })
                });


                describe("test onDrop", function(){
                    var targetId,
                        draggedId,
                        sceneTreeData;
                    var fakeData;

                    beforeEach(function(){
                        targetId = 2;
                        draggedId = 1;
                        sceneTreeData = [{name:"gameObject10",uid:10}];

                        fakeData = {
                            node:{
                                props:{
                                    eventKey:targetId
                                }
                            },
                            dragNode:{
                                props:{
                                    eventKey:draggedId
                                }
                            }
                        };

                        setSceneTreeData(sceneTreeData);
                    });

                    it("should call insertDragedTreeNodeToTargetTreeNode method when drop", function(){
                        execTreeEventHandler("onDrop", fakeData);

                        expect(props.insertDragedTreeNodeToTargetTreeNode).toCalledOnce();
                        expect(props.insertDragedTreeNodeToTargetTreeNode).toCalledWith(targetId, draggedId, sceneTreeData);
                    });
                    it("should call updateTreeNodeParent method when drop", function(){
                        execTreeEventHandler("onDrop", fakeData);

                        expect(props.updateTreeNodeParent).toCalledOnce();
                        expect(props.updateTreeNodeParent).toCalledWith(targetId, draggedId);
                    });
                    it("should call setSceneTreeData method with result show data when drop", function(){
                        var resultShowData =[];
                        props.insertDragedTreeNodeToTargetTreeNode.returns(resultShowData);

                        execTreeEventHandler("onDrop", fakeData);

                        expect(props.setSceneTreeData).toCalledOnce();
                        expect(props.setSceneTreeData).toCalledWith(resultShowData);
                    });
                    it("should refresh local when drop", function(){
                        execTreeEventHandler("onDrop", fakeData);

                        expect(props.getSceneTreeData).toCalledOnce();
                    });
                });
            });
        });
    });

    describe("test Split", function(){
        var splits,
            split;

        beforeEach(function(){
            splits = getDom(ct,"Split");
            split = splits.at(0);
        });
        afterEach(function(){
        });
        
        describe("test dom", function(){
            it("has one split component", function(){
                expect(splits).not.toBeUndefined();
                expect(splits.length).toEqual(1);
            });
            it("should position right", function(){
                expect(getDomAttribute(split, "position")).toEqual("right");
            });
            it("test min,max", function(){
                expect(getDomAttribute(split, "minPercent")).toEqual(15);
                expect(getDomAttribute(split, "maxPercent")).toEqual(25);
            });
        });
    });
});
