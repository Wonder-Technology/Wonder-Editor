import * as sinon from "sinon";
import {clear, clearAndOpenContractCheck} from "../../../editor/mainEditor/tool/testTool";
import {createAndSetFakeGLState, getGLFromFakeGLState} from "../../../editor/mainEditor/tool/stateTool";
import {resizeCanvas} from "../../../../../src/editor/mainEditor/utils/canvasUtils";

describe("test canvas utils engine", () => {
    var sandbox,
        engineState,
        sandbox,
        gl;

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();

        clearAndOpenContractCheck(sandbox);

        engineState = createAndSetFakeGLState(sandbox);

        gl = getGLFromFakeGLState(engineState);

    });
    afterEach(()=>{
        clear(sandbox);
        sandbox.restore();
    });

    describe("resizeCanvas", function(){
        var canvasParent,
            fakeCanvasParentProperty,
            mainCanvas,
            fakeCanvasProperty;

        beforeEach(function(){
            fakeCanvasParentProperty = {
                offsetWidth:650,
                offsetHeight:850
            };

            fakeCanvasProperty = {
                width:0,
                height:0,
                style:{
                    width:0,
                    height:0
                }
            };

            document.querySelector = sandbox.stub();
            document.querySelector.withArgs(".canvas-parent").returns(fakeCanvasParentProperty);
            document.querySelector.withArgs("#webgl").returns(fakeCanvasProperty);

            sandbox.stub(window, "getComputedStyle").returns({
                getPropertyValue:sandbox.stub().returns(0)
            });

            canvasParent = document.querySelector(".canvas-parent");
            mainCanvas = document.querySelector("#webgl");

            console.log(canvasParent,mainCanvas)
        });

        it("set canvas's width and height equal to canvasParent's width and height", function(){
            resizeCanvas();

            expect(fakeCanvasProperty.width).toEqual(fakeCanvasParentProperty.offsetWidth);
            expect(fakeCanvasProperty.height).toEqual(fakeCanvasParentProperty.offsetHeight);
        });
        it("set canvas's css style width and height equal to canvasParent's", function(){
            var styleWidth = 800,
                styleHeight = 1000;
            window.getComputedStyle.onCall(0).returns({
                getPropertyValue:sandbox.stub().returns(styleWidth)
            });
            window.getComputedStyle.onCall(1).returns({
                getPropertyValue:sandbox.stub().returns(styleHeight)
            });

            resizeCanvas();

            expect(fakeCanvasProperty.style.width).toEqual(styleWidth);
            expect(fakeCanvasProperty.style.height).toEqual(styleHeight);
        });
        it("called method gl.viewport to resize viewport",function () {
            resizeCanvas();

            expect(gl.viewport).toCalledWith(0,0,650,850);
        })
    });
});
