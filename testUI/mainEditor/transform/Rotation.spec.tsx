import { shallow} from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import Rotation from "../../../src/mainEditor/transform/ui/component/Rotation";
import {getDom, getDomAttribute} from "../tool/domTool";

describe("Rotation Component", () => {
    var ct = null;
    var sandbox = null;
    var props = null;

    var getButton = (ct) => {
        return getDom(ct,"Button");
    };

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();
        props = {
            rotate:sandbox.stub()
        };
        ct = shallow(<Rotation {...props}/>);
    });
    afterEach(()=>{
        sandbox.restore();
    });

    it("Rotation component should have 2 button", () => {
        expect(getButton(ct).length).toEqual(2);
    });
    it("Button type should be primary", function(){
        var type = getDomAttribute(getButton(ct).at(0), "type");

        expect(type).toEqual("primary");
    });
    it("when click first button,rotate should be called", function(){
        var btn = getButton(ct).at(0)
        btn.simulate("click");

        expect(props.rotate).toCalledOnce();
    });

    describe("test button click,the rotate method call with value",function () {
        function testClick(btnIndex,angle){
            var btn = getButton(ct).at(btnIndex);
            btn.simulate("click");

            expect(props.rotate).toCalledWith(angle);
        }

        it("when click first button,the angle +1", function(){
            testClick(0,1)
        });
        it("when click second button,the angle -1", function(){
            testClick(1,-1)
        });
    })
});
