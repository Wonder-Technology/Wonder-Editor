import * as sinon from "sinon";
import {createState, getState, setState} from "../../../../../src/editor/mainEditor/logic/bussiness/MainBuss";
import {clear, clearAndOpenContractCheck} from "../tool/testTool";
import {createAndSetFakeGLState, getGLFromFakeGLState} from "../tool/stateTool";
import {initEditor} from "../../../../../src/editor/mainEditor/logic/view/MainView";
import {create as createGameObject} from "../../../../../src/editor/mainEditor/adaptor/GameObjectAdaptor";
import {
    removeCurrentGameObject,
    setCurrentGameObject
} from "../../../../../src/editor/mainEditor/logic/bussiness/SceneBuss";
import {
    getCurrentGameObjectUId,
    hasCurrentGameObjectByUId
} from "../../../../../src/editor/mainEditor/logic/view/SceneView";

describe("test scene editor", () => {
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

    describe("set current gameObject", function(){
        var currentGameObject;

        it("set current gameObject by specific uid", function(){
            var gameObject1 = createGameObject();
            var gameObject2 = createGameObject();

            setCurrentGameObject(gameObject2.uid,[
                gameObject1,
                gameObject2
            ]);

            currentGameObject = getState().get("currentGameObject");

            expect(currentGameObject.uid).toEqual(gameObject2.uid);
        });
    });

    describe("remove current gameObject", function(){
        it("set editor state 'currentGameObject' to null", function(){
            var gameObject = createGameObject();
            var newState = getState().set("currentGameObject",gameObject);
            setState(newState);

            removeCurrentGameObject();

            expect(getState().get("currentGameObject")).toEqual(null);
        });
    });

    describe("get current gameObject uid", function(){
        var uid,
            gameObject1,
            gameObject2;

        describe("if current gameObject1 exist", function(){
            beforeEach(function(){
                gameObject1 = createGameObject();
                gameObject2 = createGameObject();

                setCurrentGameObject(gameObject1.uid, [
                    gameObject1,
                    gameObject2
                ]);


                uid = getCurrentGameObjectUId();
            });

            it("return its uid", function(){
                expect(uid).toEqual(gameObject1.uid);
            });
            it("test hasCurrentGameObjectByUId should return true if pass current gameObject uid",function () {
                expect(hasCurrentGameObjectByUId(uid)).toBeTruthy();
            })
        });
        describe("else", function(){
            beforeEach(function () {
                removeCurrentGameObject();

                uid = getCurrentGameObjectUId();
            });

            it("return -1", function(){
                expect(uid).toEqual(-1);
            });
            it("test hasCurrentGameObjectByUId should return false if not pass current gameObject uid", function(){
                expect(hasCurrentGameObjectByUId(uid)).toBeFalsy();
            });
        });
    });
});