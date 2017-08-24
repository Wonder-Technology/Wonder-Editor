import { shallow} from "enzyme";
import * as React from "react";
import Rotation from "../../src/mainEditor/ui/component/Rotation";
import * as sinon from "sinon";

describe("Rotation Component", () => {
    var ct = null;
    var sandbox = null;
    var props = null;

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();
        props = {
            rotate:sandbox.stub()
        };
        ct = shallow(<Rotation {...props}/>);
    });


    it("Rotation component should have 2 button", () => {
        expect(ct.find("button").length).toEqual(2);
    });
    it("when click first button,rotate should be called", function(){
        var btn = ct.find("button").at(0)
        btn.simulate("click");

        expect(props.rotate).toCalledOnce();
    });

    describe("test button click,the rotate method call with value",function () {
        function testClick(btnIndex,angle){
            var btn = ct.find("button").at(btnIndex);
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
