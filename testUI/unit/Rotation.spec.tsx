import { shallow} from "enzyme";
import * as React from "react";
import Angle from "../../src/mainEditor/ui/component/Rotation";
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
        ct = shallow(<Angle {...props}/>);
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
        it("when click first button,the angle +1", function(){
            var btn = ct.find("button").at(0)
            btn.simulate("click");

            expect(props.rotate).toCalledWith(1);
        });
        it("when click second button,the angle -1", function(){
            var btn = ct.find("button").at(1)
            btn.simulate("click");

            expect(props.rotate).toCalledWith(-1);
        });
    })
});
