import { shallow, mount} from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import MainEditor from "../../../src/editor/mainEditor/ui/MainEditor";
import { getDom, getDomAttribute } from "./tool/domTool";

describe("MainEditor", () => {
    var ct = null,
        props = null,
        sandbox = null;

    var getCanvas = (ct)=>getDom(ct,"canvas");

    var initMainEditor = (isStart:boolean)=>{
        props ={
            isStart:sandbox.stub().returns(isStart),
            getCurrentGameObjectUId:sandbox.stub()
        };

        ct = shallow(<MainEditor {...props}/>);
    };

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();
    });
    afterEach(()=>{
        sandbox.restore();
    });

    describe("test dom render", function() {
        describe("before engine start,only render canvas", function(){
            beforeEach(function(){
                initMainEditor(false);
            });

            it("should has one canvas dom", () => {
                expect(getCanvas(ct).length).toEqual(1);
            });
            it("canvas id should be webgl", function () {
                expect(getDomAttribute(getCanvas(ct).at(0), "id")).toEqual("webgl");
            });
            it("not render other component", function(){
                expect(getDom(ct,"SceneTree").length).toEqual(0);
            });
        });
        
        describe("after engine start", function(){
            it("not create and render new canvas", function(){
                initMainEditor(false);

                var canvasParents1 = getDom(ct,".canvas-parent");
                var key1 = getDomAttribute(canvasParents1.at(0), "key");

                expect(canvasParents1.length).toEqual(1);




                initMainEditor(true);




                var canvasParents2 = getDom(ct,".canvas-parent");
                var key2 = getDomAttribute(canvasParents2.at(0), "key");

                expect(canvasParents2.length).toEqual(1);
                expect(key1).toEqual(key2);
                expect(getCanvas(ct).length).toEqual(1);
            });

            describe("render other component", function(){
                beforeEach(function(){
                    initMainEditor(true);
                });

                it("should has one SceneTree component", function(){
                    expect(getDom(ct,"SceneTree").length).toEqual(1);
                });
                it("should has one Inspector component", function(){
                    expect(getDom(ct,"Inspector").length).toEqual(1);
                });
                it("should has one Asset component", function(){
                    expect(getDom(ct,"Asset").length).toEqual(1);
                });
            });
        });
    });
});
