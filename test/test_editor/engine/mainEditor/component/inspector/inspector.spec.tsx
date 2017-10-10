import * as sinon from "sinon";
import {clear, clearAndOpenContractCheck} from "../../../../editor/mainEditor/tool/testTool";
import {createAndSetFakeGLState, getGLFromFakeGLState} from "../../../../editor/mainEditor/tool/stateTool";
import {
    createState,
    setState
} from "../../../../../../src/editor/mainEditor/logic/bussiness/MainBuss";
import {initEditor} from "../../../../../../src/editor/mainEditor/logic/view/MainView";
import {
    addComponent,
    create as createGameObject
} from "../../../../../../src/editor/mainEditor/adaptor/GameObjectAdaptor";
import {create as createBasicMaterial} from "../../../../../../src/editor/mainEditor/component/inspector/component/material/logic/adaptorOperator/BasicMaterialOper";
import {getAllComponentData} from "../../../../../../src/editor/mainEditor/logic/adaptorOperator/GameObjectOper";

describe("test inspector engine", () => {
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

    describe("test get all component data", function(){
        var gameObject;

        beforeEach(function(){
            gameObject = createGameObject();
        });

        describe("test transform component", function(){
            describe("new gameObject should has one ThreeDTransform component", function(){
                var components,
                    transformComponent;

                beforeEach(function(){
                    components = getAllComponentData(gameObject);

                    transformComponent = components[0];
                });
                afterEach(function(){
                });

                it("test has one component", function(){
                    expect(components.length).toEqual(1);
                });
                it("transform component data's type is TRANSFORM",function () {
                    expect(transformComponent.type).toEqual("Transform");
                });
                it("transform component data's component has index and uid",function () {
                    expect(transformComponent.component).not.toBeUndefined();
                    expect(transformComponent.component.uid).not.toBeUndefined();
                    expect(transformComponent.component.uid).toBeNumber();
                    expect(transformComponent.component.index).not.toBeUndefined();
                    expect(transformComponent.component.index).toBeNumber();
                });
            });
        });

        describe("test material component", function(){
            var components,
                materialComponent;

            beforeEach(function(){
                addComponent(gameObject,createBasicMaterial());

                components = getAllComponentData(gameObject);

                materialComponent = components[1];
            });

            it("gameObject should has two component", function(){
                expect(components.length).toEqual(2);
            });
            it("material component data's type is MATERIAL",function () {
                expect(materialComponent.type).toEqual("Material");
            });
            it("material component data's component has index",function () {
                expect(materialComponent.component).not.toBeUndefined();
                expect(materialComponent.component.index).not.toBeUndefined();
                expect(materialComponent.component.index).toBeNumber();
            });

            //todo test light material
        });

        //todo test cameraController component
    });
});