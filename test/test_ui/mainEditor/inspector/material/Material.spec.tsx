import { shallow } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import Material from "../../../../../src/editor/mainEditor/component/inspector/component/material/ui/Material";
import {getDom, getDomAttribute} from "../../tool/domTool";
import {ColorPickerType} from "../../../../../src/editor/mainEditor/component/inspector/component/material/ui/component/ColorPicker";
import {execEventHandler} from "../../tool/eventTool";

describe("Material Component", () => {
    var ct = null,
        props = null,
        sandbox = null,
        currentColor = "#00FF00";

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();

        props = {
            getCurrentGameObjectColor:sandbox.stub().returns({
                toString:sandbox.stub().returns(currentColor)
            }),
            setCurrentGameObjectColor:sandbox.stub()
        };
        ct = shallow(<Material {...props}/>);
    });
    afterEach(()=>{
        sandbox.restore();
    });

    describe("test container", function(){
        var articles;

        var getArticle = (ct) => getDom(ct,"article");

        beforeEach(function(){
            articles = getArticle(ct);
        });

        describe("test dom", function(){
            var article;

            beforeEach(function(){
                article = articles.at(0);
            });

            it("should add a article as container", function(){
                expect(articles.length).toEqual(1);
                expect(article).not.toBeUndefined();
            });
            it("test className", function(){
                expect(getDomAttribute(article,"className")).toEqual("material-component");
            });
            it("should call getCurrentGameObject,return a color string",function () {
                expect(props.getCurrentGameObjectColor).toCalledOnce();

                expect(props.getCurrentGameObjectColor().toString()).toEqual(currentColor);
            })
        });

        describe("test ColorPicker", function(){
            var colorPickers,
                colorPicker;

            beforeEach(function(){
                colorPickers = getDom(ct,"ColorPicker");
                colorPicker = colorPickers.at(0);
            });

            it("should add a ColorPicker", function(){
                expect(colorPickers.length).toEqual(1);
            });
            it("ColorPicker type should be Sketch",function () {
                expect(getDomAttribute(colorPicker,"type")).toEqual(ColorPickerType.Sketch);
            });
            it("ColorPicker color should be getCurrentGameObjectColor",function () {
                expect(getDomAttribute(colorPicker,"color")).toEqual(currentColor);
            });

            describe("test ColorPicker event", function(){
                var chanegColor = "#FF0000";

                var execColorPickerHandler = (handlerName:string,fakeData:any) =>{
                    execEventHandler(colorPicker,handlerName,fakeData);
                };

                it("setCurrentGameObjectColor when call onChange function", function(){
                    execColorPickerHandler("onChange",chanegColor);

                    expect(props.setCurrentGameObjectColor).toCalledOnce();
                    expect(props.setCurrentGameObjectColor).toCalledWith(chanegColor);
                });
                it("refresh when call onChange function",function () {
                    execColorPickerHandler("onChange",chanegColor);

                    expect(ct.state().isChange).toBeTruthy();
                })
            });
        });
    });
});

