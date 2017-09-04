import { shallow} from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import {getDom, getDomAttribute} from "../tool/domTool";
import SceneTree from "../../../../src/editor/mainEditor/sceneTree/ui/SceneTree";

describe("Split", () => {
    var ct = null;
    var props = null;
    var sandbox = null;

    var getDiv = (ct)=>getDom(ct,"div");

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();

        props = {
            getScneneData:sandbox.stub(),
            sceneTree:[]
        };
        ct = shallow(<SceneTree {...props} />);
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

        });
    });
});
