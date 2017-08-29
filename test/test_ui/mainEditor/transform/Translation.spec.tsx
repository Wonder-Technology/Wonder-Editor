import { shallow} from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import Translation from "../../../../src/editor/mainEditor/transform/ui/component/Translation";
import {getDom} from "../tool/domTool";

describe("Translation Component", () => {
    var ct = null;
    var props = null;
    var sandbox = null;

    var getButton = (ct)=>getDom(ct,"button");

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();
        props = {
            translate:sandbox.stub()
        };
        ct = shallow(<Translation {...props}/>);
    });
    afterEach(()=>{
        sandbox.restore();
    });

    describe("test dom", function() {
        beforeEach(function(){
        });

        it("Translation component should have 6 button", () => {
            expect(getButton(ct).length).toEqual(6);
        });
    });

    it("when click button,translate method should be called", function(){
        var btn = getButton(ct).at(0);
        btn.simulate("click");

        expect(props.translate).toCalledOnce();
    });

    describe("test button click,the translate method called with value",function () {
        function testClick(btnIndex,x,y,z){
            var btn = getButton(ct).at(btnIndex);
            btn.simulate("click");

            expect(props.translate).toCalledWith(x,y,z);
        }

        it("when click first button,the x +0.1", function(){
            testClick(0,0.1,0,0);
        });
        it("when click second button,the x -0.1", function(){
            testClick(1,-0.1,0,0);
        });
        it("when click third button,the y +0.1", function(){
            testClick(2,0,0.1,0);
        });
        it("when click fourth button,the y -0.1", function(){
            testClick(3,0,-0.1,0);
        });
        it("when click the fifth button,the z +0.1", function(){
            testClick(4,0,0,0.1);
        });
        it("when click the sixth button,the z -0.1", function(){
            testClick(5,0,0,-0.1);
        });
    })
});
