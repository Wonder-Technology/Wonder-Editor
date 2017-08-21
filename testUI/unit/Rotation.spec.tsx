import { shallow} from "enzyme";
import * as React from "react";
import Angle from "../../src/mainEditor/ui/component/Angle";

describe("Rotate Component", () => {
    var ct = null;
    var props = null;

    beforeEach(()=>{
        props = {
            rotate:jest.fn()
        };
        ct = shallow(<Angle {...props}/>);
    });


    it("Angle component should have 2 button", () => {
        expect(ct.find("button").length).toEqual(2);
    });
    it("when click first button,rotate should be called", function(){
        var btn = ct.find("button").at(0)
        btn.simulate("click");

        expect(props.rotate).toHaveBeenCalledTimes(1);
    });
});
