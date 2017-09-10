import {mount, shallow} from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import Split from "../../../../src/editor/mainEditor/ui/component/Split";
import {getDom, getDomAttribute} from "../tool/domTool";

describe("Split", () => {
    var ct = null;
    var props = null;
    var sandbox = null;

    var getDiv = (ct)=>getDom(ct,"div");

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();

        props = {
            position:"right",
            onDrag:sandbox.stub(),
            onDragFinish:sandbox.stub()
        };
        ct = mount(<Split {...props} />);
    });

    afterEach(()=>{
        sandbox.restore();
    });

    describe("test dom", function() {
        var div;
        beforeEach(()=>{
            div = getDiv(ct).at(0);
        });

        it("the div should be add", function(){
            expect(div).not.toBeUndefined();
        });
        it("the div position is right", function(){
            // var style = getDomAttribute(div,"style");

            // expect(style.right).not.toBeUndefined();
        });
        it("event mouseup should execute onDragFinish", () =>{
            div.simulate("mousedown");
            div.simulate("mousemove",{
                pageX: 42,
                pageY: 44,
            });
            div.simulate("mouseup");

            expect(props.onDrag).toCalledOnce();
        })
    });
});