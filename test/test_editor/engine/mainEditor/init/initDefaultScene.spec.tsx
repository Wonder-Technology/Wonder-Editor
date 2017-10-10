import * as sinon from "sinon";
import {clear, clearAndOpenContractCheck} from "../../../editor/mainEditor/tool/testTool";
import {createState} from "../../../../../src/editor/mainEditor/logic/bussiness/MainBuss";
import {createAndSetFakeGLState, getGLFromFakeGLState} from "../../../editor/mainEditor/tool/stateTool";
import {initEditor} from "../../../../../src/editor/mainEditor/logic/view/MainView";
import {getSceneChildren} from "../../../../../src/editor/mainEditor/logic/adaptorOperator/SceneOper";
import {getCameras, getTriangles} from "../../tool/sceneTool";
import {getComponent, hasComponent} from "../../../../../src/editor/mainEditor/adaptor/GameObjectAdaptor";
import {CameraController} from "wonder.js/dist/es2015/component/camera/CameraController";
import {getNear, getFar, getAspect, getFovy} from "../../../../../src/editor/mainEditor/adaptor/CameraAdaptor";
import {Material} from "wonder.js/dist/es2015/component/material/Material";
import {BasicMaterial} from "wonder.js/dist/es2015/component/material/BasicMaterial";
import {Color} from "wonder.js/dist/es2015/structure/Color";
import {getColor} from "../../../../../src/editor/mainEditor/component/inspector/component/material/logic/adaptorOperator/BasicMaterialOper";
import {MeshRenderer} from "wonder.js/dist/es2015/component/renderer/MeshRenderer";
import {isStart} from "../../../../../src/editor/mainEditor/logic/adaptorOperator/DirectorOper";

describe("test init default scene engine", () => {
    var sandbox,
        editorState,
        engineState,
        sandbox,
        children,
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

    describe("init director", function () {
        it("director->isInit should be true", function () {
            console.log(isStart())
            expect(isStart()).toBeFalsy();

            initEditor(editorState);

            expect(isStart()).toBeTruthy();
        });
    });

    describe("test default scene", function () {
        beforeEach(function () {
            initEditor(editorState);

            children = getSceneChildren();
        });

        it("should have two gameObjects", function () {
            expect(children.length).toEqual(2);
        });

        describe("add camera", function () {
            it("add one camera to scene", function () {
                expect(getCameras().length).toEqual(1);
            });
            it("test camera default value", function () {
                var camera = getCameras()[0],
                    cameraController = getComponent(camera, CameraController);

                expect(getNear(cameraController)).toEqual(1);
                expect(getFar(cameraController)).toEqual(1000);
                expect(getAspect(cameraController)).toEqual(1);
                expect(getFovy(cameraController)).toEqual(45);
            });
        });

        describe("add triangle", function () {
            var triangle;

            beforeEach(function () {
                triangle = getTriangles()[0];
            });

            it("add one triangle to scene", function () {
                expect(getTriangles().length).toEqual(1);
            });

            describe("test components", function () {
                describe("test material", function () {
                    it("add basic material", function () {
                        var material = getComponent(triangle, Material);

                        expect(material).toBeInstanceOf(BasicMaterial);
                    });
                    it("color should be red", function () {
                        var color = Color.create();
                        color.r = 1;
                        color.g = 0;
                        color.b = 0;

                        expect(getColor(getComponent(triangle, Material))).toEqual(color);
                    });
                });

                it("should add meshRenderer component", function () {
                    expect(hasComponent(triangle, MeshRenderer)).toBeTruthy();
                });

                // describe("test geometry component", function () {
                // })
            });
        });
    });
});