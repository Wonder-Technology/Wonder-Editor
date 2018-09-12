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
          MainEditorSceneTool.setDirectionLightGameObjectTobeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test remove light component", () => {
        describe("test snapshot", () =>
          test("test remove light component, should remove from inspector", () => {
            SceneTreeNodeDomTool.OperateDefaultScene.getLightComponentFromDirectionLight()
            |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

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
            SceneTreeNodeDomTool.OperateDefaultScene.getLightComponentFromDirectionLight()
            |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

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

              SceneTreeNodeDomTool.OperateDefaultScene.getLightComponentFromDirectionLight()
              |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

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
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test remove geometry component", () => {
        describe("test snapshot", () =>
          test(
            "test remove geometry component, should remove from inspector", () => {
            SceneTreeNodeDomTool.OperateDefaultScene.getGeometryComponentFromBox()
            |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

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
            SceneTreeNodeDomTool.OperateDefaultScene.getGeometryComponentFromBox()
            |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

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
            SceneTreeNodeDomTool.OperateDefaultScene.getRenderGroupComponentFromBox()
            |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

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
          test(
            "test click remove renderGroup component, current gameObject shouldn't has it",
            () => {
            SceneTreeNodeDomTool.OperateDefaultScene.getRenderGroupComponentFromBox()
            |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

            InspectorRenderGroupUtils.hasRenderGroupComponents(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == false;
          });
        });
      });
    });

    describe("test remove camera gameObject component", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test remove cameraGroup component", () => {
        describe("test snapshot", () => {
          beforeEach(() => {
            HeaderTool.triggerAddBox();

            SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectDomIndex()
            |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

            AddableComponentTool.addCameraGroupInBox();

            MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode();
          });
          test(
            "test remove cameraGroup component, should remove from inspector",
            () => {
            SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
            |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });
        describe("test logic", () =>
          describe("test add other cameraGroup", () => {
            beforeEach(() => {
              HeaderTool.triggerAddBox();

              SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectDomIndex()
              |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

              AddableComponentTool.addCameraGroupInBox();

              MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode();
            });
            test(
              "test if not remove cameraGroup component, current gameObject should has it",
              () =>
              CameraEngineService.hasCameraGroup(
                GameObjectTool.unsafeGetCurrentSceneTreeNode(),
              )
              |> StateLogicService.getEngineStateToGetData
              |> expect == true
            );
            test(
              "test click remove cameraGroup component, current gameObject shouldn't has it",
              () => {
              SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
              |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

              CameraEngineService.hasCameraGroup(
                GameObjectTool.unsafeGetCurrentSceneTreeNode(),
              )
              |> StateLogicService.getEngineStateToGetData
              |> expect == false;
            });
            test(
              "test remove current cameraGroup, should set last unActive cameraGroup is currentCamera",
              () => {
                SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectDomIndex()
                |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

                SceneTreeNodeDomTool.OperateDefaultScene.getNewComponentFromBox()
                |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

                CameraEngineService.hasCameraGroup(
                  GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                )
                |> StateLogicService.getEngineStateToGetData
                |> expect == false;
              },
            );
          })
        );
      });
      describe("test remove arcballCamera component", () => {
        beforeEach(() => AddableComponentTool.addArcballCameraInCamera());
        describe("test snapshot", () =>
          test(
            "test remove arcballCamera component, should remove from inspector",
            () => {
            SceneTreeNodeDomTool.OperateDefaultScene.getArcballCameraComponentFromCamera()
            |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

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
              SceneTreeNodeDomTool.OperateDefaultScene.getArcballCameraComponentFromCamera()
              |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

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
          MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode,
        )
      );
      describe(
        "test InspectorRemoveComponentUtils removeComponentByType function", () => {
        test(
          "remove unRemovable component should throw error",
          () =>
          expect(() =>
            (
              StateEditorService.getState(),
              StateEngineService.unsafeGetState(),
            )
            |> InspectorRemoveComponentUtils.removeComponentByType(
                 InspectorComponentType.SourceInstance,
                 GameObjectTool.unsafeGetCurrentSceneTreeNode(),
               )
          )
          |> toThrowMessageRe([%re {|/removeComponentByType/img|}])
        );
      });
    });
  });