import { shallow } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import {getDom, getDomAttribute} from "../../tool/domTool";
import Inspector from "../../../../../src/editor/mainEditor/component/inspector/ui/Inspector";
import {EComponentType} from "../../../../../src/editor/mainEditor/enum/EComponentType";
import {execEventHandler} from "../../tool/eventTool";

describe("Inspector Component", () => {
    var ct = null,
        props = null,
        sandbox = null;

    var getArticle = (ct) => getDom(ct,"article");

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();

        props = {
            currentGameObjectId:-1,
            getAllComponentData:sandbox.stub(),
            resizeCanvas:sandbox.stub(),
            changeWidthBySplit:sandbox.stub()
        };
        ct = shallow(<Inspector {...props}/>);
    });
    afterEach(()=>{
        sandbox.restore();
    });

    describe("test container", function(){
        var articles;

        beforeEach(function(){
            articles = getArticle(ct);
        });

        describe("test dom", function(){
            var article;

            beforeEach(function(){
                article = articles.at(0);
            });

            it("test should add a article as container", function(){
                expect(articles.length).toEqual(1);
                expect(article).not.toBeUndefined();
            });
            it("test className", function(){
                expect(getDomAttribute(article,"className")).toEqual("main-inspector");
            });
            it("test style",function () {
                expect(getDomAttribute(article,"style").width).toEqual("20%");
            })
        });
    });

    describe("test render component by gameObject", function(){
        var setGameObjectComponents = (gameObjectId:number,components) =>{
            props = {
                currentGameObjectId:gameObjectId,
                getAllComponentData:sandbox.stub().returns(components)
            };
            ct = shallow(<Inspector {...props}/>);
        };

        describe("if has current gameObject", function(){
            describe("show its all components", function(){
                var uidComponent;
                var noUIdComponent;

                beforeEach(() => {
                    uidComponent = {index:0,uid:0};
                    noUIdComponent = {index:1};
                })

                it("test if has transform component", function(){
                    setGameObjectComponents(1,[
                        {type:EComponentType.TRANSFORM,component:uidComponent}
                    ]);

                    var transforms = getDom(ct,"Transform");
                    expect(transforms.length).toEqual(1);
                    expect(getDomAttribute(transforms.at(0), "component")).toEqual(uidComponent);
                });
                it("test if has material component", function(){
                    setGameObjectComponents(1,[
                        {type:EComponentType.MATERIAL,component:noUIdComponent}
                    ]);

                    expect(getDom(ct,"Material").length).toEqual(1);
                    expect(getDomAttribute(getDom(ct,"Material").at(0), "component")).toEqual(noUIdComponent);
                });
                it("test if has transform and material component", function(){
                    setGameObjectComponents(1,[
                        {type:EComponentType.TRANSFORM,component:uidComponent},
                        {type:EComponentType.MATERIAL,component:noUIdComponent},
                    ]);

                    expect(getDom(ct,"Transform").length).toEqual(1);
                    expect(getDom(ct,"Material").length).toEqual(1);
                    expect(getDomAttribute(getDom(ct,"Transform").at(0), "component")).toEqual(uidComponent);
                    expect(getDomAttribute(getDom(ct,"Material").at(0), "component")).toEqual(noUIdComponent);
                });
            });
        });
        
        describe("else", function(){
            var showNoComponents = () => {
                expect(getDom(ct,"Transform").length).toEqual(0);
                expect(getDom(ct,"Material").length).toEqual(0);
            };

            it("not show components, only show split component", function(){
                setGameObjectComponents(1,[
                ]);

                showNoComponents();
                expect(getDom(ct,"Split").length).toEqual(1);
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

        describe("test dom", function(){
            it("has one split component", function(){
                expect(splits).not.toBeUndefined();
                expect(splits.length).toEqual(1);
            });
            it("should position left", function(){
                expect(getDomAttribute(split, "position")).toEqual("left");
            });
            it("test min,max", function(){
                expect(getDomAttribute(split, "minPercent")).toEqual(20);
                expect(getDomAttribute(split, "maxPercent")).toEqual(25);
            });
            it("should change width when drag", function(){
                var width = 100;

                execEventHandler(split, "onDrag", width);

                expect(props.changeWidthBySplit).toCalledWith(sinon.match.any, getDomAttribute(getArticle(ct),"style"), width);
            });
            it("should resize canvas when finish drag", function(){

                execEventHandler(split, "onDragFinish", {});

                expect(props.resizeCanvas).toCalledOnce();
            });
        });
    });
});