describe("init default scene", function () {
    var editorState = null,
        engineState = null,
        sandbox = null,
        gl = null;
    var children = null;

    var Color;
    var CameraContorller;
    var Material;
    var BasicMaterial;
    var MeshRenderer;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        editorState = stateEditTool.createState();

        engineState = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(engineState);

        Color = we.getColorAdaptor();
        CameraContorller = we.getCameraControllerAdaptor();
        Material = we.getMaterialAdaptor();
        BasicMaterial = we.getBasicMaterialAdaptor();
        MeshRenderer = we.getMeshRendererAdaptor();
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("test default scene", function () {
        beforeEach(function () {
            mainBussTool.initEditor(editorState);

            children = sceneOperTool.getSceneGameObjects();
        });

        it("should have two gameObjects", function () {
            expect(children.length).toEqual(2);
        });

        describe("add camera", function () {
            it("add one camera to scene", function () {
                expect(sceneOperTool.getCameras().length).toEqual(1);
            });
            it("test camera default value", function () {
                var camera = sceneOperTool.getCameras()[0],
                    cameraController = gameObjectAdaptorTool.getComponent(camera, CameraContorller);

                expect(cameraAdaptorTool.getNear(cameraController)).toEqual(1);
                expect(cameraAdaptorTool.getFar(cameraController)).toEqual(1000);
                expect(cameraAdaptorTool.getAspect(cameraController)).toEqual(1);
                expect(cameraAdaptorTool.getFovy(cameraController)).toEqual(45);
            });
        });

        describe("add triangle", function () {
            var triangle;

            beforeEach(function () {
                triangle = sceneOperTool.getTriangles()[0];
            });

            it("add one triangle to scene", function () {
                expect(sceneOperTool.getTriangles().length).toEqual(1);
            });

            describe("test components", function () {
                describe("test material", function () {
                    it("add basic material", function () {
                        var material = gameObjectAdaptorTool.getComponent(triangle, Material);

                        expect(material).toBeInstanceOf(BasicMaterial);
                    });
                    it("color should be red", function () {
                        var color = Color.create();
                        color.r = 1;
                        color.g = 0;
                        color.b = 0;

                        expect(basicMaterialAdaptorTool.getColor(gameObjectAdaptorTool.getComponent(triangle, Material))).toEqual(color);
                    });
                });

                it("should add meshRenderer component", function () {
                    expect(gameObjectAdaptorTool.hasComponent(triangle, MeshRenderer)).toBeTruthy();
                });

                // describe("test geometry component", function () {
                // })
            });
        });
    });

    describe("init director", function () {
        it("director->isInit should be true", function () {
            expect(directorAdaptorTool.isInit()).toBeFalsy();

            mainBussTool.initEditor(editorState);

            expect(directorAdaptorTool.isInit()).toBeTruthy();
        });
    });
});
