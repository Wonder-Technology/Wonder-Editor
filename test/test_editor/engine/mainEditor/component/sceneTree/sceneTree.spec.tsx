import * as sinon from "sinon";
import {clear, clearAndOpenContractCheck} from "../../../../editor/mainEditor/tool/testTool";
import {createState, initAllData, setState} from "../../../../../../src/editor/mainEditor/logic/bussiness/MainBuss";
import {createAndSetFakeGLState, getGLFromFakeGLState} from "../../../../editor/mainEditor/tool/stateTool";
import {initEditor} from "../../../../../../src/editor/mainEditor/logic/view/MainView";
import {
    create as createGameObject,
    getChildren
} from "../../../../../../src/editor/mainEditor/adaptor/GameObjectAdaptor";
import {updateTreeNodeParent} from "../../../../../../src/editor/mainEditor/component/sceneTree/logic/bussiness/SceneTreeBuss";

describe("test sceneTree engine", () => {
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

    describe("update tree node parent", function(){
        var children;

        beforeEach(function(){
            initAllData();
        });

        it("add child tree node to parent tree node", function(){
            var parent = createGameObject(),
                child = createGameObject();

            var parentUId = parent.uid,
                childUId = child.uid;

            updateTreeNodeParent(parentUId, childUId);

            children = getChildren(parent);

            expect(children[0]).toEqual(child);
        });
    });
});