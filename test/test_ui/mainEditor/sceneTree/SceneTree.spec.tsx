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
    var getTreeNode = (ct)=>getDom(ct,"TreeNode");

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();

        props = {
            getScneneData:sandbox.stub(),
            sceneTree:[{name:"gameObject0",uid:0},{name:"gameObject1",uid:1}]
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

        it("the div should be add", function(){
            expect(div.at(0)).not.toBeUndefined();
        });
        it("current scene has two gameObject,has two TreeNode", () =>{
            expect(getTreeNode(ct).length).toEqual(2);
        })
        it("has Split component,can change width", () => {
            expect(getDom(ct,"Split").length).toEqual(1);
        })
    });
});
