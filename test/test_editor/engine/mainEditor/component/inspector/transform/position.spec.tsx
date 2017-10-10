import * as sinon from "sinon";
import {clear, clearAndOpenContractCheck, getValues} from "../../../../../editor/mainEditor/tool/testTool";
import {
    createState,
    setState
} from "../../../../../../../src/editor/mainEditor/logic/bussiness/MainBuss";
import {createAndSetFakeGLState, getGLFromFakeGLState} from "../../../../../editor/mainEditor/tool/stateTool";
import {initEditor} from "../../../../../../../src/editor/mainEditor/logic/view/MainView";
import {
    create as createGameObject,
    getTransform
} from "../../../../../../../src/editor/mainEditor/adaptor/GameObjectAdaptor";
import {
    getCurrentGameObject,
    setCurrentGameObject
} from "../../../../../../../src/editor/mainEditor/logic/bussiness/SceneBuss";
import {translateLocal} from "../../../../../../../src/editor/mainEditor/component/inspector/component/transform/logic/view/TransformView";
import {getPosition} from "../../../../../../../src/editor/mainEditor/adaptor/TransformAdaptor";
import {loopBody} from "../../../../tool/mainBussTool";

describe("test position engine", () => {
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

        editorState = initEditor(editorState);
        setState(editorState);
    });
    afterEach(()=>{
        clear(sandbox);
        sandbox.restore();
    });

    describe("translate current gameObject", function(){
        var currentGameObject;

        beforeEach(function(){


            var gameObject1 = createGameObject();
            var gameObject2 = createGameObject();

            setCurrentGameObject(gameObject1.uid, [
                gameObject1,
                gameObject2
            ]);
            currentGameObject = getCurrentGameObject();
        });

        it("test translate current gameObject's position once", function () {
            var pos = [0.5, 0, 0],
                transform = getTransform(currentGameObject);

            translateLocal(transform,pos[0], pos[1], pos[2]);

            loopBody(editorState,null);

            expect(
                getValues(getPosition(transform).values)
            ).toEqual([0.5, 0, 0]);
        });

        it("test translate current gameObject twice", function () {
            var pos = [0.5, 1, 2],
                transform = getTransform(currentGameObject);

            translateLocal(transform,pos[0], pos[1], pos[2]);
            translateLocal(transform,pos[0], pos[1], pos[2]);

            loopBody(editorState,1);

            expect(
                getValues(getPosition(transform).values)
            ).toEqual([1,2,4]);
        });
    });
});