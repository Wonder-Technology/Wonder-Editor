import { shallow} from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import Split from "../../../../src/editor/mainEditor/ui/components/Split";
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
        ct = shallow(<Split {...props} />);
    });

    afterEach(()=>{
        sandbox.restore();
    });

    describe("test dom", function() {
        var div;
        beforeEach(()=>{
            div = getDiv(ct).at(0);
        });

        it("the dom should be add", function(){
            expect(div).not.toBeUndefined();
        });
        it("the div position is right", function(){
            var style = getDomAttribute(div,"style");

            expect(style.right).not.toBeUndefined();
        });
    });
});
