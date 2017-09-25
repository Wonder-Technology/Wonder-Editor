describe("test inspector engine", function(){
    var editorState = null,
        engineState = null,
        sandbox = null,
        gl;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        editorState = stateEditTool.createState();

        engineState = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(engineState);

        editorState = mainViewTool.initEditor(editorState);

    });
    afterEach(function(){
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("test get all component data", function(){
        var gameObject;

        beforeEach(function(){
            gameObject = gameObjectAdaptorTool.create();
        });

        describe("test transform component", function(){
            var components,
                transformComponent;

            beforeEach(function(){
                components = gameObjectOperTool.getAllComponentData(gameObject);

                transformComponent = components[0];
            });

            it("engine add ThreeDTransform component to new gameObject", function(){
                expect(components.length).toEqual(1);
            });
            it("transform component data's type is TRANSFORM",function () {
                expect(transformComponent.type).toEqual("TRANSFORM");
            });
            it("transform component data's component has index and uid",function () {
                expect(transformComponent.component).not.toBeUndefined();
                expect(transformComponent.component.uid).not.toBeUndefined();
                expect(transformComponent.component.index).not.toBeUndefined();
            });
        });

        describe("test material component", function(){
            var components,
                materialComponent;

            beforeEach(function(){
                gameObjectAdaptorTool.addComponent(gameObject,basicMaterialAdaptorTool.create());

                components = gameObjectOperTool.getAllComponentData(gameObject);

                materialComponent = components[1];
            });

            it("gameObject should has two component", function(){
                expect(components.length).toEqual(2);
            });
            it("material component data's type is MATERIAL",function () {
                expect(materialComponent.type).toEqual("MATERIAL");
            });
            it("material component data's component has index",function () {
                expect(materialComponent.component).not.toBeUndefined();
                expect(materialComponent.component.index).not.toBeUndefined();
            });
        });
    });
});