import * as sinon from "sinon";
import {clear, clearAndOpenContractCheck} from "../../../editor/mainEditor/tool/testTool";
import {createState, setState} from "../../../../../src/editor/mainEditor/logic/bussiness/MainBuss";
import {createAndSetFakeGLState, getGLFromFakeGLState} from "../../../editor/mainEditor/tool/stateTool";
import {initEditor} from "../../../../../src/editor/mainEditor/logic/view/MainView";
import {getScene} from "../../../../../src/editor/mainEditor/adaptor/SceneAdaptor";
import {getDirector} from "../../../../../src/editor/mainEditor/adaptor/DirectorAdaptor";
import {getSceneUId} from "../../../../../src/editor/mainEditor/logic/view/SceneView";

describe("test scene engine", () => {
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

    describe("get scene id", function(){
        var sceneFromEngine,
            sceneId;

        beforeEach(function(){
            sceneFromEngine = getScene(getDirector());
            sceneId = getSceneUId();
        });

        it("get scene from director", function(){
            expect(sceneId).toEqual(sceneFromEngine.uid);
        });
    });
});