open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("AddableComponent remove component", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~loopPipelines=
              {|
                   [
                       {
                           "name": "default",
                           "jobs": [
                               {
                                   "name": "dispose"
                               }
                           ]
                       }
                   ]
               |},
            (),
          ),
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test remove directionLight gameObject component", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setDirectionLightGameObjectToBeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          SceneTreeWidgetService.getWidget(),
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test remove light component", () => {
        describe("test snapshot", () =>
          test("test remove light component, should remove from inspector", () => {
            MainEditorInspectorRemoveComponentTool.removeDirectionLightComponent();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
        describe("test logic", () => {
          test(
            "test if not remove light component, current gameObject should has it",
            () =>
            LightEngineService.hasLightComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true
          );
          test(
            "test click remove light component, current gameObject shouldn't has it",
            () => {
            MainEditorInspectorRemoveComponentTool.removeDirectionLightComponent();

            LightEngineService.hasLightComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == false;
          });
        });

        describe(
          "should re-init all light material components in the scene", () =>
          describe("test remove direction light component", () =>
            test("glsl->DIRECTION_LIGHTS_COUNT should - 1", () => {
              let gl = FakeGlToolEngine.getEngineStateGl();
              let glShaderSource = gl##shaderSource;

              MainEditorInspectorRemoveComponentTool.removeDirectionLightComponent();

              GLSLToolEngine.contain(
                GLSLToolEngine.getVsSource(glShaderSource),
                {|#define DIRECTION_LIGHTS_COUNT 0|},
              )
              |> expect == true;
            })
          )
        );
      });
    });

    describe("test remove box gameObject component", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          SceneTreeWidgetService.getWidget(),
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test remove geometry component", () => {
        describe("test snapshot", () =>
          test(
            "test remove geometry component, should remove from inspector", () => {
            MainEditorInspectorRemoveComponentTool.removeGeometryComponent();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
        describe("test logic", () => {
          test(
            "test if not remove geometry component, current gameObject should has it",
            () =>
            GameObjectComponentEngineService.hasGeometryComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true
          );
          test(
            "test click remove geometry component, current gameObject shouldn't has it",
            () => {
            MainEditorInspectorRemoveComponentTool.removeGeometryComponent();

            GameObjectComponentEngineService.hasGeometryComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == false;
          });
        });
      });
      describe("test remove renderGroup component", () => {
        describe("test snapshot", () =>
          test(
            "test remove renderGroup component, should remove from inspector",
            () => {
            MainEditorInspectorRemoveComponentTool.removeRenderGroupComponent();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
        describe("test logic", () => {
          test(
            "test if not remove renderGroup component, current gameObject should has it",
            () =>
            InspectorRenderGroupUtils.hasRenderGroupComponents(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true
          );

          describe("test click remove renderGroup component", () => {
            test("current gameObject shouldn't has it", () => {
              MainEditorInspectorRemoveComponentTool.removeRenderGroupComponent();

              InspectorRenderGroupUtils.hasRenderGroupComponents(
                GameObjectTool.unsafeGetCurrentSceneTreeNode(),
              )
              |> StateLogicService.getEngineStateToGetData
              |> expect == false;
            });
            test("should remove material instead of dispose it", () => {
              let currentGameObject =
                GameObjectTool.unsafeGetCurrentSceneTreeNode();
              let engineState = StateEngineService.unsafeGetState();
              let oldLightMaterial =
                GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                  currentGameObject,
                  engineState,
                );

              MainEditorInspectorRemoveComponentTool.removeRenderGroupComponent();

              let engineState = StateEngineService.unsafeGetState();
              (
                LightMaterialToolEngine.isAlive(oldLightMaterial, engineState),
                GameObjectComponentEngineService.hasLightMaterialComponent(
                  currentGameObject,
                  engineState,
                ),
              )
              |> expect == (true, false);
            });
          });
        });
      });
    });

    describe("test remove camera gameObject component", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          SceneTreeWidgetService.getWidget(),
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test remove arcballCamera component", () => {
        beforeEach(() =>
          MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent()
        );
        describe("test snapshot", () =>
          test(
            "test remove arcballCamera component, should remove from inspector",
            () => {
            MainEditorInspectorRemoveComponentTool.removeArcballCameraControllerComponent();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
        describe("test logic", () => {
          test(
            "test if not remove arcballCamera component, current gameObject should has it",
            () =>
            GameObjectComponentEngineService.hasArcballCameraControllerComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true
          );
          test(
            "test click remove arcballCamera component, current gameObject shouldn't has it",
            () => {
              MainEditorInspectorRemoveComponentTool.removeArcballCameraControllerComponent();

              GameObjectComponentEngineService.hasArcballCameraControllerComponent(
                GameObjectTool.unsafeGetCurrentSceneTreeNode(),
              )
              |> StateLogicService.getEngineStateToGetData
              |> expect == false;
            },
          );
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
        "test InspectorRemoveComponentUtils removeComponentByType function", () =>
        test("remove unRemovable component should throw error", () => {
          ConsoleTool.notShowMessage();
          let errorStub =
            createMethodStub(sandbox^, ConsoleTool.console, "error");

          (StateEditorService.getState(), StateEngineService.unsafeGetState())
          |> InspectorRemoveComponentUtils.removeComponentByType(
               InspectorComponentType.SourceInstance,
               GameObjectTool.unsafeGetCurrentSceneTreeNode(),
             )
          |> ignore;

          ConsoleTool.judgeError("can't remove", errorStub);
        })
      );
    });
  });