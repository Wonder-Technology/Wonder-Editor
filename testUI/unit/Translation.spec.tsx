import { shallow} from "enzyme";
import * as React from "react";
import Position from "../../src/mainEditor/ui/component/Translation";
import * as sinon from "sinon";

describe("Translation Component", () => {
    var ct = null;
    var props = null;
    var sandbox = null;

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();
        props = {
            translate:sandbox.stub()
        };
        ct = shallow(<Position {...props}/>);
    });
    afterEach(()=>{
        sandbox.restore();
    });

    it("Translation component should have 6 button", () => {
        expect(ct.find("button").length).toEqual(6);
    });
    it("when click button,translate method should be called", function(){
        var btn = ct.find("button").at(0);
        btn.simulate("click");

        expect(props.translate).toCalledOnce();
    });

    describe("test button click,the translate method called with value",function () {
        it("when click first button,the x +0.1", function(){
            var btn = ct.find("button").at(0);
            btn.simulate("click");

            expect(props.translate).toCalledWith(0.1,0,0);
        });
        it("when click second button,the x -0.1", function(){
            var btn = ct.find("button").at(1);
            btn.simulate("click");

            expect(props.translate).toCalledWith(-0.1,0,0);
        });
        it("when click third button,the y +0.1", function(){
            var btn = ct.find("button").at(2);
            btn.simulate("click");

            expect(props.translate).toCalledWith(0,0.1,0);
        });
        it("when click fourth button,the y -0.1", function(){
            var btn = ct.find("button").at(3);
            btn.simulate("click");

            expect(props.translate).toCalledWith(0,-0.1,0);
        });
        it("when click the fifth button,the z +0.1", function(){
            var btn = ct.find("button").at(4);
            btn.simulate("click");

            expect(props.translate).toCalledWith(0,0,0.1);
        });
        it("when click the sixth button,the z -0.1", function(){
            var btn = ct.find("button").at(5);
            btn.simulate("click");

            expect(props.translate).toCalledWith(0,0,-0.1);
        });
    })
});
