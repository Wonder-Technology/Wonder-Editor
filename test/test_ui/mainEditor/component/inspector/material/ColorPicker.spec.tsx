import { shallow } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import {getDom, getDomAttribute} from "../../../tool/domTool";
import ColorPicker from "../../../../../../src/editor/mainEditor/component/inspector/component/material/ui/component/ColorPicker";
import {EColorPickerType} from "../../../../../../src/editor/mainEditor/component/inspector/component/enum/EColorPickerType";

describe("ColorPicker Component", () => {
    var ct = null,
        props = null,
        sandbox = null;

    var initColorPicker = (color:string,type:EColorPickerType) => {
        props = {
            color:color,
            type:type,
            onChange:sandbox.stub()
        };
        ct = shallow(<ColorPicker {...props} />);
    };

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();

        initColorPicker("#000000",EColorPickerType.SKETCH);
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

        describe("should add a article as container", function(){
            var article;

            beforeEach(() => {
                article = articles.at(0);
            });

            it("test should has a article dom", function(){
                expect(articles.length).toEqual(1);
                expect(article).not.toBeUndefined();
            });
            it("test className", function(){
                expect(getDomAttribute(article, "className")).toEqual("color-component");
            });
        });

        describe("test color button", function(){
            var div;

            beforeEach(function(){
                div = getDom(ct,".color-button").at(0);
            });

            describe("test dom", function(){
                it("should has one color button", function(){
                    expect(div).not.toBeUndefined();
                });
                it("test default style", function(){
                    var color = "#FF0000";

                    initColorPicker(color,EColorPickerType.SKETCH);
                    div = getDom(ct,".color-button").at(0);

                    expect(getDomAttribute(div, "style").backgroundColor).toEqual(color);
                });
            });

            describe("test event", function(){
                beforeEach(function(){
                    initColorPicker("#000",EColorPickerType.SKETCH);

                    div = getDom(ct,".color-button");
                });

                it("show picker when first click", function(){
                    div.simulate("click");

                    expect(getDom(ct,".color-picker").children().length).toEqual(1);
                });
                it("hide picker when second click", function(){
                    div.simulate("click");
                    div.simulate("click");

                    expect(getDom(ct,".color-picker").children().length).toEqual(0);
                });
            });
        });

        describe("test color picker", function(){
            var div;

            beforeEach(function(){
                div = getDom(ct,".color-picker").at(0);
            });

            it("should has a .color-picker div", function(){
                expect(div).not.toBeUndefined();
            });

            /*!
                now can't judge which sub-picker is rendered by click color button, so can't test!

                // it("test render different sub-picker by type", function(){
                // });
             */
        });
    });
});