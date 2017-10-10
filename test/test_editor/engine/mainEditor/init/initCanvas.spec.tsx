import * as sinon from "sinon";
import {clear, clearAndOpenContractCheck} from "../../../editor/mainEditor/tool/testTool";
import {createState, initContainer, setState} from "../../../../../src/editor/mainEditor/logic/bussiness/MainBuss";
import {createAndSetFakeGLState, getGLFromFakeGLState} from "../../../editor/mainEditor/tool/stateTool";
import {getDomQuery} from "../../../editor/mainEditor/tool/domTool";
import {containerConfig} from "../../../../../src/editor/mainEditor/config/containerConfig";
import {initEditor} from "../../../../../src/editor/mainEditor/logic/view/MainView";
import {loopBody} from "../../tool/mainBussTool";
import {detect} from "wonder.js/dist/es2015/renderer/device/WebGLDetectSystem";
import {WebGLDetectData} from "wonder.js/dist/es2015/renderer/device/WebGLDetectData";

describe("test init canvas engine", () => {
    var sandbox,
        editorState,
        engineState,
        sandbox,
        gl;

    var canvas,
        canvasId,
        domQuery;

    function buildFakeDomQuery(canvasDom){
        return {
            css:sandbox.stub(),
            get:sandbox.stub().returns(canvasDom)
        };
    }

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();

        clearAndOpenContractCheck(sandbox);

        editorState = createState();

        engineState = createAndSetFakeGLState(sandbox);

        gl = getGLFromFakeGLState(engineState);

        domQuery = getDomQuery();

        canvas = {
            style:{},
            width:1,
            height:2,
            getContext:sandbox.stub().returns(gl)
        };

        canvasId = "canvasId";

        containerConfig.canvasId = canvasId;

        sandbox.stub(domQuery,"create");

        domQuery.create.withArgs(`#${canvasId}`).returns(buildFakeDomQuery(canvas));
        domQuery.create.withArgs("body").returns(buildFakeDomQuery(canvas));

    });
    afterEach(()=>{
        clear(sandbox);
        sandbox.restore();
    });

    describe("init Main", function () {
        it("add canvas dom", function () {
            initContainer();

            expect(domQuery.create).toCalled();
        });
        it("set canvas id", function () {
            initContainer();

            expect(domQuery.create).toCalledWith(`#${canvasId}`);
        });
    });

    describe("set clear color which is defined in config", function() {
        var clearColor;

        beforeEach(function(){
            clearColor = [0, 0.1, 1, 1];

            containerConfig.clearColor = clearColor;
        });

        it("set clear color after init", function () {
            initContainer();

            expect(gl.clearColor).toCalledOnce();
            expect(gl.clearColor).toCalledWith(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
        });
        it("set clear color only once", function () {
            initContainer();
            editorState = initEditor(editorState);
            setState(editorState);

            loopBody(editorState);

            expect(gl.clearColor).toCalledOnce();
        });
    });
});