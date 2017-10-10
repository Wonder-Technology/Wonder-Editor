import * as sinon from "sinon";
import {clear, clearAndOpenContractCheck} from "../../tool/testTool";
import {createState} from "../../../../../../src/editor/mainEditor/logic/bussiness/MainBuss";
import {createAndSetFakeGLState, getGLFromFakeGLState} from "../../tool/stateTool";
import {changeWidthBySplit} from "../../../../../../src/editor/mainEditor/component/split/logic/view/SplitView";
import {buildFakeReactComponentForJudgeDirty, judgeInvokeMarkDirty} from "../../tool/utils/dirtyUtilsTool";

describe("test split editor", () => {
    var sandbox,
        editorState,
        engineState,
        sandbox,
        gl;

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();

        clearAndOpenContractCheck(sandbox);

        editorState = createState();

        engineState = createAndSetFakeGLState(sandbox);

        gl = getGLFromFakeGLState(engineState);
    });
    afterEach(()=>{
        clear(sandbox);
        sandbox.restore();
    });

    describe("test changeWidthBySplit", function(){
        var fakeReactComponent,
            fakeStyle,
            width;

        beforeEach(function () {
            fakeReactComponent = buildFakeReactComponentForJudgeDirty();

            fakeStyle = {
                width:"15%"
            };

            width = 20;

            changeWidthBySplit(fakeReactComponent,fakeStyle,width);
        });

        it("should change style width", function(){
            expect(fakeStyle.width).toEqual(width+"%");
        });
        it("should refresh react component", function(){
            judgeInvokeMarkDirty(fakeReactComponent, expect);
        });
    });
});