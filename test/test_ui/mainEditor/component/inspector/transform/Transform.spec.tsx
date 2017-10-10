import { shallow} from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import {getDom, getDomAttribute} from "../../../tool/domTool";
import Transform from "../../../../../../src/editor/mainEditor/component/inspector/component/transform/ui/Transform";

describe("Transform Component", () => {
    var ct,
        props,
        component,
        sandbox;

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();
        component = {index:2};

        props = {
            component:component,
            translate:sandbox.stub()
        };
        ct = shallow(<Transform {...props}/>);
    });
    afterEach(()=>{
        sandbox.restore();
    });

    describe("test render component", function() {
        describe("test render Position component", function(){
            var positions,
                position;

            beforeEach(function(){
                positions = getDom(ct,"Position");
                position = positions.at(0);
            });

            it("should has one Position component", function(){
                expect(positions.length).toEqual(1);
            });
            it("should inject props.component to Position component",function () {
                expect(getDomAttribute(position,"component")).toEqual(component);
            })
        });
    });
});
