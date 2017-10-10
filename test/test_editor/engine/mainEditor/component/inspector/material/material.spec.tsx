import * as sinon from "sinon";
import {clear, clearAndOpenContractCheck} from "../../../../../editor/mainEditor/tool/testTool";
import {createState} from "../../../../../../../src/editor/mainEditor/logic/bussiness/MainBuss";
import {createAndSetFakeGLState, getGLFromFakeGLState} from "../../../../../editor/mainEditor/tool/stateTool";
import {initEditor} from "../../../../../../../src/editor/mainEditor/logic/view/MainView";
import {getTriangles} from "../../../../tool/sceneTool";
import {getMaterial} from "../../../../../../../src/editor/mainEditor/logic/adaptorOperator/GameObjectOper";
import {getColor} from "../../../../../../../src/editor/mainEditor/component/inspector/component/material/logic/adaptorOperator/BasicMaterialOper";
import {
    getGameObjectColor,
    setGameObjectColor
} from "../../../../../../../src/editor/mainEditor/component/inspector/component/material/logic/bussiness/MaterialBuss";
import {GameObject} from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";

describe("test material engine", () => {
    var sandbox,
        editorState,
        engineState,
        sandbox,
        triangle,
        triangleMaterial,
        gl;

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();

        clearAndOpenContractCheck(sandbox);

        editorState = createState();

        engineState = createAndSetFakeGLState(sandbox);

        gl = getGLFromFakeGLState(engineState);

        initEditor(editorState);

        triangle = getTriangles()[0];

        triangleMaterial = getMaterial(triangle);
    });
    afterEach(()=>{
        clear(sandbox);
        sandbox.restore();
    });

    describe("test set gameObject color", function(){
        it("set gameObject color to engine",function () {
            var color = "#ffff00";

            setGameObjectColor(triangleMaterial,color);

            var gameObjectColor = getColor(triangleMaterial);

            expect(gameObjectColor.toString()).toEqual(color);
        })
    });

    describe("test get gameObject color", function(){
        it("get gameObject color from engine",function () {
            var color = "#ff0000";

            setGameObjectColor(triangleMaterial,color);

            var gameObjectColor = getGameObjectColor(triangleMaterial);

            expect(gameObjectColor.toString()).toEqual(color);
        })
    });
});
