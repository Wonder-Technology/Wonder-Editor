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
              let (editGl, runGl) =
                FakeGlToolEngine.getEditEngineStateGlAndRunEngineStateGl();
              let editGlShaderSource = editGl##shaderSource;
              let runGlShaderSource = runGl##shaderSource;

              SceneTreeNodeDomTool.OperateDefaultScene.getLightComponentFromDirectionLight()
              |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

              (
                GLSLToolEngine.contain(
                  GLSLToolEngine.getVsSource(editGlShaderSource),
                  {|#define DIRECTION_LIGHTS_COUNT 0|},
                ),
                GLSLToolEngine.contain(
                  GLSLToolEngine.getFsSource(runGlShaderSource),
                  {|#define DIRECTION_LIGHTS_COUNT 0|},
                ),
              )
              |> expect == (true, true);
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

      describe("test remove meshRenderer component", () => {
        describe("test snapshot", () =>
          test(
            "test remove meshRenderer component, should remove from inspector",
            () => {
            SceneTreeNodeDomTool.OperateDefaultScene.getMeshRendererComponentFromBox()
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
            "test if not remove meshRenderer component, current gameObject should has it",
            () =>
            GameObjectComponentEngineService.hasMeshRendererComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true
          );
          test(
            "test click remove meshRenderer component, current gameObject shouldn't has it",
            () => {
              SceneTreeNodeDomTool.OperateDefaultScene.getMeshRendererComponentFromBox()
              |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

              GameObjectComponentEngineService.hasMeshRendererComponent(
                GameObjectTool.unsafeGetCurrentSceneTreeNode(),
              )
              |> StateLogicService.getEngineStateToGetData
              |> expect == false;
            },
          );
        });
      });
      describe("test remove material component", () => {
        describe("test snapshot", () =>
          test(
            "test remove material component, should remove from inspector", () => {
            SceneTreeNodeDomTool.OperateDefaultScene.getMaterialComponentFromBox()
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
            "test if not remove material component, current gameObject should has it",
            () =>
            MaterialEngineService.hasMaterialComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true
          );
          test(
            "test click remove material component, current gameObject shouldn't has it",
            () => {
            SceneTreeNodeDomTool.OperateDefaultScene.getMaterialComponentFromBox()
            |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

            MaterialEngineService.hasMaterialComponent(
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

            let boxComponentCount = ComponentDomTool.getBoxComponentCount();
            let cameraCategoryDomIndex =
              ComponentDomTool.getCameraCategoryDomIndex();
            let cameraGroupTypeDomIndex =
              ComponentDomTool.getCameraGroupTypeDomIndex();

            OperateComponentEventTool.addComponentIntoCurrentGameObject(
              boxComponentCount,
              cameraCategoryDomIndex,
              cameraGroupTypeDomIndex,
            );

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
        describe("test logic", () => {
          describe(
            "test if not add other cameraGroup, can't remove last cameraGroup",
            () =>
            test("test remove last cameraGroup, should throw warn message", () =>
              expect(() =>
                SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
                |> OperateComponentEventTool.removeComponentFromCurrentGameObject
              )
              |> toThrowMessageRe(
                   [%re
                     {|/First argument to Node.prototype.appendChild must be a Node/img|}
                   ],
                 )
            )
          );
          describe("test add other cameraGroup", () => {
            beforeEach(() => {
              HeaderTool.triggerAddBox();

              SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectDomIndex()
              |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

              let boxComponentCount = ComponentDomTool.getBoxComponentCount();
              let cameraCategoryDomIndex =
                ComponentDomTool.getCameraCategoryDomIndex();
              let cameraGroupTypeDomIndex =
                ComponentDomTool.getCameraGroupTypeDomIndex();

              OperateComponentEventTool.addComponentIntoCurrentGameObject(
                boxComponentCount,
                cameraCategoryDomIndex,
                cameraGroupTypeDomIndex,
              );

              MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode();
            });
            test(
              "test if not remove cameraGroup component, current gameObject should has it",
              () =>
              CameraEngineService.hasCameraComponent(
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

              CameraEngineService.hasCameraComponent(
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

                CameraEngineService.hasCameraComponent(
                  GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                )
                |> StateLogicService.getEngineStateToGetData
                |> expect == false;
              },
            );
          });
        });
      });
      describe("test remove arcballCamera component", () => {
        beforeEach(() => {
          let cameraComponentCount =
            ComponentDomTool.getCameraComponentCount();
          let cameraCategoryDomIndex =
            ComponentDomTool.getCameraCategoryDomIndex();
          let arcballCameraTypeDomIndex =
            ComponentDomTool.getArcballCameraControllerTypeDomIndex();

          OperateComponentEventTool.addComponentIntoCurrentGameObject(
            cameraComponentCount,
            cameraCategoryDomIndex,
            arcballCameraTypeDomIndex,
          );
        });
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
  });