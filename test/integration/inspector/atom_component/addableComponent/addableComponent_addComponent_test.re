open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("AddableComponent add component", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test gameObject add component workflow", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test add light component", () => {
        describe("test snapshot", () =>
          test("test click add light component, should add into inspector", () => {
            AddableComponentTool.addDirectionLightInBox();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );

        describe("test logic", () => {
          test(
            "test if not add light component, current gameObject shouldn't has it",
            () =>
            LightEngineService.hasLightComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == false
          );
          test("test click add light component, should add into engine", () => {
            AddableComponentTool.addDirectionLightInBox();

            LightEngineService.hasLightComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true;
          });
        });

        describe(
          "should re-init all light material components in the scene", () =>
          describe("test add direction light component", () =>
            test("glsl->DIRECTION_LIGHTS_COUNT should + 1", () => {
              let gl = FakeGlToolEngine.getEngineStateGl();
              let glShaderSource = gl##shaderSource;

              AddableComponentTool.addDirectionLightInBox();

              GLSLToolEngine.contain(
                GLSLToolEngine.getVsSource(glShaderSource),
                {|#define DIRECTION_LIGHTS_COUNT 2|},
              )
              |> expect == true;
            })
          )
        );
      });

      describe("test add cameraGroup component", () => {
        describe("test snapshot", () =>
          test("test click add cameraGroup, should add into inspector", () => {
            AddableComponentTool.addCameraGroupInBox();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );

        describe("test logic", () => {
          test(
            "test if not add cameraGroup component, current gameObject shouldn't has it",
            () =>
            CameraEngineService.hasCameraGroup(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == false
          );
          test(
            "test click add cameraGroup component, should add into engine", () => {
            AddableComponentTool.addCameraGroupInBox();

            CameraEngineService.hasCameraGroup(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true;
          });
        });
      });
    });

    describe("test camera add component", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test add geometry component", () => {
        describe("test snapshot", () =>
          test("test click add geometry, should add into inspector", () => {
            AddableComponentTool.addGeometryInCamera();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
        describe("test logic", () => {
          test(
            "test if not add geometry component, current gameObject shouldn't has it",
            () =>
            GameObjectComponentEngineService.hasGeometryComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == false
          );
          test("test click add geometry component, should add into engine", () => {
            AddableComponentTool.addGeometryInCamera();

            GameObjectComponentEngineService.hasGeometryComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true;
          });
        });
      });
      describe("test add renderGroup component", () => {
        describe("test snapshot", () =>
          test("test click add renderGroup, should add into inspector", () => {
            AddableComponentTool.addRenderGroupInCamera();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
        describe("test logic", () => {
          test(
            "test if not add renderGroup component, current gameObject shouldn't has it",
            () =>
            InspectorRenderGroupUtils.hasRenderGroupComponents(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == false
          );
          test(
            "test click add renderGroup component, should add into engine", () => {
            AddableComponentTool.addRenderGroupInCamera();

            InspectorRenderGroupUtils.hasRenderGroupComponents(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true;
          });
        });
      });
      describe("test add arcballCamera component", () => {
        describe("test snapshot", () =>
          test("test click add arcballCamera, should add into inspector", () => {
            AddableComponentTool.addArcballCameraInCamera();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );

        describe("test logic", () => {
          test(
            "test if not add arcballCamera component, current gameObject shouldn't has it",
            () =>
            GameObjectComponentEngineService.hasArcballCameraControllerComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == false
          );
          test(
            "test click add arcballCamera component, should add into engine",
            () => {
            AddableComponentTool.addArcballCameraInCamera();

            GameObjectComponentEngineService.hasArcballCameraControllerComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true;
          });
        });
      });
    });

    describe("deal with specific case", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
        )
      );
      describe(
        "test InspectorAddComponentUtils addComponentByType function", () =>
        test("test add unaddable component should throw error", () =>
          expect(() =>
            (
              StateEditorService.getState(),
              StateEngineService.unsafeGetState(),
            )
            |> InspectorAddComponentUtils.addComponentByType(
                 InspectorComponentType.SourceInstance,
                 GameObjectTool.unsafeGetCurrentSceneTreeNode(),
               )
          )
          |> toThrowMessageRe([%re {|/addComponentByType/img|}])
        )
      );

      describe(
        "test InspectorHasComponentUtils isHasSpecificComponentByType", () =>
        test("test has sourceInstance component, should throw error", () =>
          expect(() =>
            StateEngineService.unsafeGetState()
            |> InspectorHasComponentUtils.isHasSpecificComponentByType(
                 InspectorComponentType.SourceInstance,
                 GameObjectTool.unsafeGetCurrentSceneTreeNode(),
               )
          )
          |> toThrowMessageRe([%re {|/isHasSpecificComponentByType/img|}])
        )
      );
    });
  });