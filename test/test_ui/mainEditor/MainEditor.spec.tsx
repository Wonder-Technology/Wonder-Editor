import { shallow} from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import MainEditor from "../../../src/editor/mainEditor/ui/MainEditor";
import { getDom, getDomAttribute } from "./tool/domTool";

describe("MainEditor", () => {
    var ct = null;
    var props = null;
    var sandbox = null;

    var getCanvas = (ct)=>getDom(ct,"canvas");

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();
        ct = shallow(<MainEditor/>);
    });
    afterEach(()=>{
        sandbox.restore();
    });

    describe("test dom", function() {
        beforeEach(function(){

        });

        it("add canvas dom", () => {
            expect(getCanvas(ct).length).toEqual(1);
        });
        it("canvas id should be webgl", function () {
            expect(getDomAttribute(getCanvas(ct).at(0), "id")).toEqual("webgl");
        });
    });
});
