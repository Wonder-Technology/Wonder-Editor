import { shallow } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import Material from "../../../../../../src/editor/mainEditor/component/inspector/component/material/ui/Material";
import {getDom, getDomAttribute, getState} from "../../../tool/domTool";
import {execEventHandler} from "../../../tool/eventTool";
import {EColorPickerType} from "../../../../../../src/editor/mainEditor/component/inspector/component/enum/EColorPickerType";
import {judgeInvokeMarkDirty} from "../../../tool/dirtyTool";

describe("Material Component", () => {
    var ct = null,
        props = null,
        sandbox = null;

    var setMaterialCurrentGameObjectColor = (color) => {
        props = {
            getCurrentGameObjectColor:sandbox.stub().returns(color),
            setCurrentGameObjectColor:sandbox.stub()
        };

        ct = shallow(<Material {...props}/>);
    }

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();

        setMaterialCurrentGameObjectColor({
            toString:sandbox.stub()
        })
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
            it("ColorPicker type should be SKETCH",function () {
                expect(getDomAttribute(colorPicker,"type")).toEqual(EColorPickerType.SKETCH);
            });
            it("ColorPicker color should be getCurrentGameObjectColor",function () {
                var currentColor = "#00FF00";

                setMaterialCurrentGameObjectColor({
                    toString:sandbox.stub().returns(currentColor)
                })

                colorPickers = getDom(ct,"ColorPicker");
                colorPicker = colorPickers.at(0);
                expect(getDomAttribute(colorPicker,"color")).toEqual(currentColor);
            });

            describe("test ColorPicker event", function(){
                var changedColor = null;

                var execColorPickerHandler = (handlerName:string,fakeData:any) =>{
                    execEventHandler(colorPicker,handlerName,fakeData);
                };
                
                beforeEach(function () {
                    changedColor = "#FF0000";
                })

                it("set current gameObject color when trigger change event", function(){
                    execColorPickerHandler("onChange",changedColor);

                    expect(props.setCurrentGameObjectColor).toCalledOnce();
                    expect(props.setCurrentGameObjectColor).toCalledWith(changedColor);
                });
                it("refresh when trigger change event",function () {
                    execColorPickerHandler("onChange",changedColor);

                    judgeInvokeMarkDirty(ct, expect);
                })
            });
        });
    });
});

